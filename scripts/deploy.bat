@echo off
REM 🚀 Windows 自动化部署脚本
REM 支持多种部署平台

setlocal enabledelayedexpansion

REM 颜色定义（Windows 10+ 支持）
set "RED=[91m"
set "GREEN=[92m"
set "YELLOW=[93m"
set "BLUE=[94m"
set "NC=[0m"

REM 日志函数
:log_info
echo %BLUE%ℹ️  %~1%NC%
goto :eof

:log_success
echo %GREEN%✅ %~1%NC%
goto :eof

:log_warning
echo %YELLOW%⚠️  %~1%NC%
goto :eof

:log_error
echo %RED%❌ %~1%NC%
goto :eof

REM 显示帮助信息
:show_help
echo 🚀 自动化部署脚本
echo.
echo 用法: %~nx0 [选项] [平台]
echo.
echo 平台选项:
echo   github    部署到 GitHub Pages
echo   vercel    部署到 Vercel
echo   netlify   部署到 Netlify
echo   docker    构建 Docker 镜像
echo   all       部署到所有平台
echo.
echo 选项:
echo   -h, --help     显示帮助信息
echo   -v, --verbose  详细输出
echo   -d, --dry-run  模拟运行（不实际部署）
echo.
echo 示例:
echo   %~nx0 github      # 部署到 GitHub Pages
echo   %~nx0 all         # 部署到所有平台
echo   %~nx0 -v vercel   # 详细模式部署到 Vercel
goto :eof

REM 检查依赖
:check_dependencies
call :log_info "检查部署依赖..."

REM 检查 Node.js
node --version >nul 2>&1
if errorlevel 1 (
    call :log_error "Node.js 未安装"
    exit /b 1
)

REM 检查 npm
npm --version >nul 2>&1
if errorlevel 1 (
    call :log_error "npm 未安装"
    exit /b 1
)

REM 检查 git
git --version >nul 2>&1
if errorlevel 1 (
    call :log_error "git 未安装"
    exit /b 1
)

call :log_success "所有依赖检查通过"
goto :eof

REM 构建项目
:build_project
call :log_info "开始构建项目..."

REM 创建构建目录
if exist dist rmdir /s /q dist
mkdir dist

REM 复制文件
copy *.html dist\ >nul 2>&1
copy *.css dist\ >nul 2>&1
copy *.js dist\ >nul 2>&1
copy *.md dist\ >nul 2>&1
if exist static xcopy static dist\static\ /e /i /q >nul 2>&1

REM 生成构建信息
echo {> dist\build-info.json
echo   "buildTime": "%date% %time%",>> dist\build-info.json
echo   "gitCommit": "unknown",>> dist\build-info.json
echo   "gitBranch": "unknown",>> dist\build-info.json
echo   "buildSize": "unknown">> dist\build-info.json
echo }>> dist\build-info.json

call :log_success "项目构建完成"
goto :eof

REM 部署到 GitHub Pages
:deploy_github
call :log_info "部署到 GitHub Pages..."

if "%DRY_RUN%"=="true" (
    call :log_warning "模拟模式: 跳过实际部署"
    goto :eof
)

REM 检查是否在 Git 仓库中
git rev-parse --git-dir >nul 2>&1
if errorlevel 1 (
    call :log_error "当前目录不是 Git 仓库"
    exit /b 1
)

REM 提交构建文件
git add dist/
git commit -m "🚀 自动部署 - %date% %time%" >nul 2>&1

REM 推送到 gh-pages 分支
git subtree push --prefix dist origin gh-pages
if errorlevel 1 (
    call :log_error "GitHub Pages 部署失败"
    exit /b 1
)

call :log_success "GitHub Pages 部署完成"
goto :eof

REM 部署到 Vercel
:deploy_vercel
call :log_info "部署到 Vercel..."

if "%DRY_RUN%"=="true" (
    call :log_warning "模拟模式: 跳过实际部署"
    goto :eof
)

REM 检查 Vercel CLI
vercel --version >nul 2>&1
if errorlevel 1 (
    call :log_info "安装 Vercel CLI..."
    npm install -g vercel
)

REM 部署
vercel --prod --yes
if errorlevel 1 (
    call :log_error "Vercel 部署失败"
    exit /b 1
)

call :log_success "Vercel 部署完成"
goto :eof

REM 部署到 Netlify
:deploy_netlify
call :log_info "部署到 Netlify..."

if "%DRY_RUN%"=="true" (
    call :log_warning "模拟模式: 跳过实际部署"
    goto :eof
)

REM 检查 Netlify CLI
netlify --version >nul 2>&1
if errorlevel 1 (
    call :log_info "安装 Netlify CLI..."
    npm install -g netlify-cli
)

REM 部署
netlify deploy --prod --dir=dist
if errorlevel 1 (
    call :log_error "Netlify 部署失败"
    exit /b 1
)

call :log_success "Netlify 部署完成"
goto :eof

REM 构建 Docker 镜像
:build_docker
call :log_info "构建 Docker 镜像..."

if "%DRY_RUN%"=="true" (
    call :log_warning "模拟模式: 跳过实际构建"
    goto :eof
)

REM 检查 Docker
docker --version >nul 2>&1
if errorlevel 1 (
    call :log_error "Docker 未安装"
    exit /b 1
)

REM 构建镜像
docker build -t interactive-web:latest .
if errorlevel 1 (
    call :log_error "Docker 镜像构建失败"
    exit /b 1
)

call :log_success "Docker 镜像构建完成"
goto :eof

REM 构建项目（简化版）
:build_only
call :log_info "开始构建项目..."

REM 创建构建目录
if exist dist rmdir /s /q dist
mkdir dist

REM 复制文件
copy *.html dist\ >nul 2>&1
copy *.css dist\ >nul 2>&1
copy *.js dist\ >nul 2>&1
copy *.md dist\ >nul 2>&1
if exist static xcopy static dist\static\ /e /i /q >nul 2>&1

REM 生成构建信息
echo {> dist\build-info.json
echo   "buildTime": "%date% %time%",>> dist\build-info.json
echo   "buildSize": "unknown">> dist\build-info.json
echo }>> dist\build-info.json

call :log_success "项目构建完成"
call :log_info "构建目录: dist"
goto :eof

REM 主函数
:main
set "platform="
set "verbose=false"
set "dry_run=false"

REM 解析参数
:parse_args
if "%~1"=="" goto :args_done
if "%~1"=="-h" goto :show_help
if "%~1"=="--help" goto :show_help
if "%~1"=="-v" set "verbose=true" & shift & goto :parse_args
if "%~1"=="--verbose" set "verbose=true" & shift & goto :parse_args
if "%~1"=="-d" set "dry_run=true" & shift & goto :parse_args
if "%~1"=="--dry-run" set "dry_run=true" & shift & goto :parse_args
if "%~1"=="build" call :build_only & exit /b 0
if "%~1"=="github" set "platform=github" & shift & goto :parse_args
if "%~1"=="vercel" set "platform=vercel" & shift & goto :parse_args
if "%~1"=="netlify" set "platform=netlify" & shift & goto :parse_args
if "%~1"=="docker" set "platform=docker" & shift & goto :parse_args
if "%~1"=="all" set "platform=all" & shift & goto :parse_args

call :log_error "未知参数: %~1"
call :show_help
exit /b 1

:args_done
REM 如果没有指定平台，显示帮助
if "%platform%"=="" (
    call :show_help
    exit /b 1
)

call :log_info "开始自动化部署流程..."
call :log_info "平台: %platform%"
call :log_info "详细模式: %verbose%"
call :log_info "模拟模式: %dry_run%"

REM 检查依赖
call :check_dependencies
if errorlevel 1 exit /b 1

REM 构建项目
call :build_project

REM 根据平台执行部署
if "%platform%"=="github" call :deploy_github
if "%platform%"=="vercel" call :deploy_vercel
if "%platform%"=="netlify" call :deploy_netlify
if "%platform%"=="docker" call :build_docker
if "%platform%"=="all" (
    call :deploy_github
    call :deploy_vercel
    call :deploy_netlify
    call :build_docker
)

call :log_success "部署流程完成！"
goto :eof

REM 执行主函数
call :main %*
