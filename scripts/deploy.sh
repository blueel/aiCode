#!/bin/bash

# 🚀 自动化部署脚本
# 支持多种部署平台

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 显示帮助信息
show_help() {
    echo "🚀 自动化部署脚本"
    echo ""
    echo "用法: $0 [选项] [平台]"
    echo ""
    echo "平台选项:"
    echo "  github    部署到 GitHub Pages"
    echo "  vercel    部署到 Vercel"
    echo "  netlify   部署到 Netlify"
    echo "  docker    构建 Docker 镜像"
    echo "  all       部署到所有平台"
    echo ""
    echo "选项:"
    echo "  -h, --help     显示帮助信息"
    echo "  -v, --verbose  详细输出"
    echo "  -d, --dry-run  模拟运行（不实际部署）"
    echo ""
    echo "示例:"
    echo "  $0 github      # 部署到 GitHub Pages"
    echo "  $0 all         # 部署到所有平台"
    echo "  $0 -v vercel   # 详细模式部署到 Vercel"
}

# 检查依赖
check_dependencies() {
    log_info "检查部署依赖..."
    
    local missing_deps=()
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        missing_deps+=("Node.js")
    fi
    
    # 检查 npm
    if ! command -v npm &> /dev/null; then
        missing_deps+=("npm")
    fi
    
    # 检查 git
    if ! command -v git &> /dev/null; then
        missing_deps+=("git")
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        log_error "缺少必要依赖: ${missing_deps[*]}"
        log_info "请安装缺少的依赖后重试"
        exit 1
    fi
    
    log_success "所有依赖检查通过"
}

# 构建项目
build_project() {
    log_info "开始构建项目..."
    
    # 创建构建目录
    mkdir -p dist
    
    # 复制文件
    cp -r *.html *.css *.js *.md dist/ 2>/dev/null || true
    cp -r static dist/ 2>/dev/null || true
    
    # 压缩文件（如果安装了压缩工具）
    if command -v gzip &> /dev/null; then
        log_info "压缩静态文件..."
        find dist -type f \( -name "*.html" -o -name "*.css" -o -name "*.js" \) -exec gzip -k {} \;
    fi
    
    # 生成构建信息
    cat > dist/build-info.json << EOF
{
    "buildTime": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
    "gitCommit": "$(git rev-parse HEAD 2>/dev/null || echo 'unknown')",
    "gitBranch": "$(git branch --show-current 2>/dev/null || echo 'unknown')",
    "buildSize": "$(du -sh dist | cut -f1)"
}
EOF
    
    log_success "项目构建完成"
    log_info "构建大小: $(du -sh dist | cut -f1)"
}

# 部署到 GitHub Pages
deploy_github() {
    log_info "部署到 GitHub Pages..."
    
    if [ "$DRY_RUN" = true ]; then
        log_warning "模拟模式: 跳过实际部署"
        return 0
    fi
    
    # 检查是否在 Git 仓库中
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_error "当前目录不是 Git 仓库"
        return 1
    fi
    
    # 检查是否有未提交的更改
    if ! git diff-index --quiet HEAD --; then
        log_warning "检测到未提交的更改"
        read -p "是否继续部署? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log_info "部署已取消"
            return 0
        fi
    fi
    
    # 提交构建文件
    git add dist/
    git commit -m "🚀 自动部署 - $(date)" || true
    
    # 推送到 gh-pages 分支
    git subtree push --prefix dist origin gh-pages || {
        log_error "GitHub Pages 部署失败"
        return 1
    }
    
    log_success "GitHub Pages 部署完成"
}

# 部署到 Vercel
deploy_vercel() {
    log_info "部署到 Vercel..."
    
    if [ "$DRY_RUN" = true ]; then
        log_warning "模拟模式: 跳过实际部署"
        return 0
    fi
    
    # 检查 Vercel CLI
    if ! command -v vercel &> /dev/null; then
        log_info "安装 Vercel CLI..."
        npm install -g vercel
    fi
    
    # 部署
    vercel --prod --yes || {
        log_error "Vercel 部署失败"
        return 1
    }
    
    log_success "Vercel 部署完成"
}

# 部署到 Netlify
deploy_netlify() {
    log_info "部署到 Netlify..."
    
    if [ "$DRY_RUN" = true ]; then
        log_warning "模拟模式: 跳过实际部署"
        return 0
    fi
    
    # 检查 Netlify CLI
    if ! command -v netlify &> /dev/null; then
        log_info "安装 Netlify CLI..."
        npm install -g netlify-cli
    fi
    
    # 部署
    netlify deploy --prod --dir=dist || {
        log_error "Netlify 部署失败"
        return 1
    }
    
    log_success "Netlify 部署完成"
}

# 构建 Docker 镜像
build_docker() {
    log_info "构建 Docker 镜像..."
    
    if [ "$DRY_RUN" = true ]; then
        log_warning "模拟模式: 跳过实际构建"
        return 0
    fi
    
    # 检查 Docker
    if ! command -v docker &> /dev/null; then
        log_error "Docker 未安装"
        return 1
    fi
    
    # 构建镜像
    docker build -t interactive-web:latest . || {
        log_error "Docker 镜像构建失败"
        return 1
    }
    
    log_success "Docker 镜像构建完成"
}

# 主函数
main() {
    local platform=""
    local verbose=false
    local dry_run=false
    
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -v|--verbose)
                verbose=true
                shift
                ;;
            -d|--dry-run)
                dry_run=true
                shift
                ;;
            github|vercel|netlify|docker|all)
                platform="$1"
                shift
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 设置全局变量
    VERBOSE="$verbose"
    DRY_RUN="$dry_run"
    
    # 如果没有指定平台，显示帮助
    if [ -z "$platform" ]; then
        show_help
        exit 1
    fi
    
    log_info "开始自动化部署流程..."
    log_info "平台: $platform"
    log_info "详细模式: $VERBOSE"
    log_info "模拟模式: $DRY_RUN"
    
    # 检查依赖
    check_dependencies
    
    # 构建项目
    build_project
    
    # 根据平台执行部署
    case $platform in
        github)
            deploy_github
            ;;
        vercel)
            deploy_vercel
            ;;
        netlify)
            deploy_netlify
            ;;
        docker)
            build_docker
            ;;
        all)
            deploy_github
            deploy_vercel
            deploy_netlify
            build_docker
            ;;
    esac
    
    log_success "部署流程完成！"
}

# 执行主函数
main "$@"
