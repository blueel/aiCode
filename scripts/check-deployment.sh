#!/bin/bash

# 🔍 部署状态检查脚本
# 检查各个部署平台的状态

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# 检查网站可访问性
check_website() {
    local url=$1
    local name=$2
    
    log_info "检查 $name: $url"
    
    if curl -s --head --fail "$url" > /dev/null 2>&1; then
        log_success "$name 可访问"
        return 0
    else
        log_error "$name 不可访问"
        return 1
    fi
}

# 检查 GitHub Pages
check_github_pages() {
    local repo_url=$1
    if [ -z "$repo_url" ]; then
        log_warning "未设置 GitHub Pages URL，跳过检查"
        return 0
    fi
    
    check_website "$repo_url" "GitHub Pages"
}

# 检查 Vercel
check_vercel() {
    local vercel_url=$1
    if [ -z "$vercel_url" ]; then
        log_warning "未设置 Vercel URL，跳过检查"
        return 0
    fi
    
    check_website "$vercel_url" "Vercel"
}

# 检查 Netlify
check_netlify() {
    local netlify_url=$1
    if [ -z "$netlify_url" ]; then
        log_warning "未设置 Netlify URL，跳过检查"
        return 0
    fi
    
    check_website "$netlify_url" "Netlify"
}

# 检查本地服务
check_local() {
    local port=${1:-8000}
    
    log_info "检查本地服务: http://localhost:$port"
    
    if curl -s --head --fail "http://localhost:$port" > /dev/null 2>&1; then
        log_success "本地服务运行正常"
        return 0
    else
        log_error "本地服务未运行"
        return 1
    fi
}

# 检查 Docker 容器
check_docker() {
    log_info "检查 Docker 容器状态"
    
    if ! command -v docker &> /dev/null; then
        log_warning "Docker 未安装"
        return 1
    fi
    
    if docker ps | grep -q "interactive-web"; then
        log_success "Docker 容器运行中"
        
        # 检查容器健康状态
        local health_status=$(docker inspect --format='{{.State.Health.Status}}' interactive-web 2>/dev/null || echo "unknown")
        if [ "$health_status" = "healthy" ]; then
            log_success "容器健康状态: 正常"
        elif [ "$health_status" = "unhealthy" ]; then
            log_error "容器健康状态: 异常"
        else
            log_warning "容器健康状态: 未知"
        fi
        
        return 0
    else
        log_error "Docker 容器未运行"
        return 1
    fi
}

# 检查构建状态
check_build() {
    log_info "检查构建状态"
    
    if [ -d "dist" ]; then
        local build_size=$(du -sh dist | cut -f1)
        local file_count=$(find dist -type f | wc -l)
        
        log_success "构建目录存在"
        log_info "构建大小: $build_size"
        log_info "文件数量: $file_count"
        
        # 检查关键文件
        local missing_files=()
        [ ! -f "dist/index.html" ] && missing_files+=("index.html")
        [ ! -f "dist/styles.css" ] && missing_files+=("styles.css")
        [ ! -f "dist/script.js" ] && missing_files+=("script.js")
        
        if [ ${#missing_files[@]} -eq 0 ]; then
            log_success "关键文件完整"
        else
            log_error "缺少关键文件: ${missing_files[*]}"
            return 1
        fi
        
        return 0
    else
        log_error "构建目录不存在"
        return 1
    fi
}

# 检查 Git 状态
check_git() {
    log_info "检查 Git 状态"
    
    if ! git rev-parse --git-dir > /dev/null 2>&1; then
        log_warning "当前目录不是 Git 仓库"
        return 1
    fi
    
    local current_branch=$(git branch --show-current)
    local last_commit=$(git log -1 --format="%h - %s (%cr)")
    local uncommitted_changes=$(git diff --name-only | wc -l)
    
    log_info "当前分支: $current_branch"
    log_info "最新提交: $last_commit"
    
    if [ "$uncommitted_changes" -gt 0 ]; then
        log_warning "有 $uncommitted_changes 个未提交的更改"
    else
        log_success "工作目录干净"
    fi
    
    return 0
}

# 生成状态报告
generate_report() {
    local report_file="deployment-status-$(date +%Y%m%d-%H%M%S).txt"
    
    log_info "生成状态报告: $report_file"
    
    cat > "$report_file" << EOF
# 🚀 部署状态报告

生成时间: $(date)
项目: $(basename "$PWD")

## 📊 检查结果

### 构建状态
- 构建目录: $([ -d "dist" ] && echo "✅ 存在" || echo "❌ 不存在")
- 构建大小: $([ -d "dist" ] && du -sh dist | cut -f1 || echo "N/A")

### Git 状态
- 当前分支: $(git branch --show-current 2>/dev/null || echo "N/A")
- 最新提交: $(git log -1 --format="%h - %s" 2>/dev/null || echo "N/A")

### 服务状态
- 本地服务: $(curl -s --head --fail "http://localhost:8000" > /dev/null 2>&1 && echo "✅ 运行中" || echo "❌ 未运行")
- Docker 容器: $(docker ps | grep -q "interactive-web" && echo "✅ 运行中" || echo "❌ 未运行")

### 部署平台
- GitHub Pages: $([ -n "$GITHUB_PAGES_URL" ] && (curl -s --head --fail "$GITHUB_PAGES_URL" > /dev/null 2>&1 && echo "✅ 可访问" || echo "❌ 不可访问") || echo "⚠️ 未配置")
- Vercel: $([ -n "$VERCEL_URL" ] && (curl -s --head --fail "$VERCEL_URL" > /dev/null 2>&1 && echo "✅ 可访问" || echo "❌ 不可访问") || echo "⚠️ 未配置")
- Netlify: $([ -n "$NETLIFY_URL" ] && (curl -s --head --fail "$NETLIFY_URL" > /dev/null 2>&1 && echo "✅ 可访问" || echo "❌ 不可访问") || echo "⚠️ 未配置")

EOF

    log_success "状态报告已生成: $report_file"
}

# 显示帮助信息
show_help() {
    echo "🔍 部署状态检查脚本"
    echo ""
    echo "用法: $0 [选项]"
    echo ""
    echo "选项:"
    echo "  -h, --help          显示帮助信息"
    echo "  -l, --local [port]   检查本地服务 (默认端口: 8000)"
    echo "  -d, --docker         检查 Docker 容器"
    echo "  -b, --build          检查构建状态"
    echo "  -g, --git            检查 Git 状态"
    echo "  -r, --report         生成状态报告"
    echo "  -a, --all            检查所有项目"
    echo ""
    echo "环境变量:"
    echo "  GITHUB_PAGES_URL     GitHub Pages URL"
    echo "  VERCEL_URL           Vercel URL"
    echo "  NETLIFY_URL          Netlify URL"
    echo ""
    echo "示例:"
    echo "  $0 --all             # 检查所有项目"
    echo "  $0 --local 3000      # 检查本地服务 (端口 3000)"
    echo "  $0 --report          # 生成状态报告"
}

# 主函数
main() {
    local check_local=false
    local check_docker=false
    local check_build=false
    local check_git=false
    local generate_report=false
    local check_all=false
    local local_port=8000
    
    # 解析参数
    while [[ $# -gt 0 ]]; do
        case $1 in
            -h|--help)
                show_help
                exit 0
                ;;
            -l|--local)
                check_local=true
                if [[ $2 =~ ^[0-9]+$ ]]; then
                    local_port=$2
                    shift
                fi
                shift
                ;;
            -d|--docker)
                check_docker=true
                shift
                ;;
            -b|--build)
                check_build=true
                shift
                ;;
            -g|--git)
                check_git=true
                shift
                ;;
            -r|--report)
                generate_report=true
                shift
                ;;
            -a|--all)
                check_all=true
                shift
                ;;
            *)
                log_error "未知参数: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # 如果没有指定任何选项，显示帮助
    if [ "$check_local" = false ] && [ "$check_docker" = false ] && [ "$check_build" = false ] && [ "$check_git" = false ] && [ "$generate_report" = false ] && [ "$check_all" = false ]; then
        show_help
        exit 1
    fi
    
    log_info "开始部署状态检查..."
    
    local exit_code=0
    
    # 执行检查
    if [ "$check_all" = true ] || [ "$check_local" = true ]; then
        check_local "$local_port" || exit_code=1
    fi
    
    if [ "$check_all" = true ] || [ "$check_docker" = true ]; then
        check_docker || exit_code=1
    fi
    
    if [ "$check_all" = true ] || [ "$check_build" = true ]; then
        check_build || exit_code=1
    fi
    
    if [ "$check_all" = true ] || [ "$check_git" = true ]; then
        check_git || exit_code=1
    fi
    
    if [ "$check_all" = true ]; then
        check_github_pages "$GITHUB_PAGES_URL" || exit_code=1
        check_vercel "$VERCEL_URL" || exit_code=1
        check_netlify "$NETLIFY_URL" || exit_code=1
    fi
    
    if [ "$generate_report" = true ]; then
        generate_report
    fi
    
    if [ $exit_code -eq 0 ]; then
        log_success "所有检查通过！"
    else
        log_warning "部分检查失败，请查看上述错误信息"
    fi
    
    exit $exit_code
}

# 执行主函数
main "$@"
