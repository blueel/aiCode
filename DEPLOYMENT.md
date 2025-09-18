# 🚀 自动化部署指南

本文档详细介绍了如何配置和使用项目的自动化部署功能。

## 📋 目录

- [快速开始](#快速开始)
- [部署平台](#部署平台)
- [GitHub Actions](#github-actions)
- [本地部署](#本地部署)
- [Docker 部署](#docker-部署)
- [环境变量配置](#环境变量配置)
- [故障排除](#故障排除)

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <your-repo-url>
cd interactive-web
```

### 2. 安装依赖
```bash
npm install
```

### 3. 本地开发
```bash
npm run start
# 或
npm run dev
```

### 4. 构建项目
```bash
npm run build
```

### 5. 部署到指定平台
```bash
# 部署到 GitHub Pages
npm run deploy:github

# 部署到 Vercel
npm run deploy:vercel

# 部署到 Netlify
npm run deploy:netlify

# 部署到所有平台
npm run deploy:all
```

## 🌐 部署平台

### GitHub Pages

#### 自动部署（推荐）
1. 推送代码到 `main` 分支
2. GitHub Actions 自动构建和部署
3. 访问 `https://<username>.github.io/<repo-name>`

#### 手动部署
```bash
npm run deploy:github
```

#### 配置要求
- 仓库必须是公开的
- 启用 GitHub Pages
- 选择 `gh-pages` 分支作为源

### Vercel

#### 自动部署
1. 连接 GitHub 仓库到 Vercel
2. 推送代码自动触发部署
3. 访问 Vercel 提供的域名

#### 手动部署
```bash
# 安装 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

#### 环境变量
在 Vercel 控制台设置：
- `VERCEL_TOKEN`: Vercel API Token
- `VERCEL_ORG_ID`: 组织 ID
- `VERCEL_PROJECT_ID`: 项目 ID

### Netlify

#### 自动部署
1. 连接 GitHub 仓库到 Netlify
2. 配置构建命令：`npm run build`
3. 配置发布目录：`dist`
4. 推送代码自动触发部署

#### 手动部署
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

#### 环境变量
在 Netlify 控制台设置：
- `NETLIFY_AUTH_TOKEN`: Netlify API Token
- `NETLIFY_SITE_ID`: 站点 ID

## 🔧 GitHub Actions

### 工作流说明

项目包含完整的 GitHub Actions 工作流：

1. **代码质量检查**
   - HTML 验证
   - CSS 检查
   - JavaScript 检查

2. **构建和测试**
   - 项目构建
   - 生成构建报告
   - 上传构建产物

3. **多平台部署**
   - GitHub Pages
   - Vercel
   - Netlify

4. **部署通知**
   - 部署状态通知
   - 构建报告

### 配置 Secrets

在 GitHub 仓库设置中添加以下 Secrets：

```
VERCEL_TOKEN=your_vercel_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
NETLIFY_AUTH_TOKEN=your_netlify_token
NETLIFY_SITE_ID=your_site_id
```

### 触发条件

- **Push 到 main/master 分支**: 自动部署
- **Pull Request**: 仅运行质量检查
- **手动触发**: 在 Actions 页面手动运行

## 🐳 Docker 部署

### 构建镜像
```bash
npm run docker:build
```

### 运行容器
```bash
npm run docker:run
```

### 使用 Docker Compose
```bash
# 启动服务
npm run docker:compose

# 停止服务
npm run docker:stop
```

### 访问应用
- 本地访问: http://localhost:3000
- 健康检查: http://localhost:3000/health

### Docker 配置特点

- **多阶段构建**: 优化镜像大小
- **Nginx 服务器**: 高性能静态文件服务
- **安全配置**: 非 root 用户运行
- **健康检查**: 自动监控服务状态
- **缓存优化**: 静态资源缓存策略

## 🔧 本地部署

### 开发服务器
```bash
# 启动开发服务器
npm run start
# 访问 http://localhost:8000
```

### 生产预览
```bash
# 构建并预览
npm run preview
# 访问 http://localhost:8000
```

### 静态文件服务器
```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve dist

# 使用 PHP
php -S localhost:8000
```

## ⚙️ 环境变量配置

### 开发环境
```bash
NODE_ENV=development
```

### 生产环境
```bash
NODE_ENV=production
```

### 部署平台特定变量

#### Vercel
```bash
VERCEL_TOKEN=your_token
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id
```

#### Netlify
```bash
NETLIFY_AUTH_TOKEN=your_token
NETLIFY_SITE_ID=your_site_id
```

## 🛠️ 构建脚本说明

### 构建流程
```bash
npm run build
```

执行以下步骤：
1. 清理构建目录
2. 复制源文件
3. 优化和压缩文件
4. 生成构建信息

### 自定义构建
```bash
# 仅清理
npm run build:clean

# 仅复制文件
npm run build:copy

# 仅优化
npm run build:optimize
```

## 🔍 代码质量检查

### 运行检查
```bash
# 检查所有文件
npm run lint

# 检查特定类型
npm run lint:html
npm run lint:css
npm run lint:js
```

### 检查工具
- **HTML**: html-validate
- **CSS**: stylelint
- **JavaScript**: eslint

## 🧪 测试

### 运行测试
```bash
npm run test
```

### 可访问性测试
```bash
npm run test:accessibility
```

## 🚨 故障排除

### 常见问题

#### 1. 构建失败
```bash
# 清理缓存
npm run clean

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install
```

#### 2. 部署失败
- 检查环境变量配置
- 确认 API Token 有效性
- 查看部署日志

#### 3. Docker 问题
```bash
# 清理 Docker 缓存
docker system prune -a

# 重新构建
docker build --no-cache -t interactive-web:latest .
```

#### 4. 权限问题
```bash
# 给脚本执行权限
chmod +x scripts/deploy.sh
```

### 日志查看

#### GitHub Actions
- 在仓库的 Actions 页面查看日志

#### 本地部署
```bash
# 查看构建日志
npm run build 2>&1 | tee build.log

# 查看部署日志
npm run deploy 2>&1 | tee deploy.log
```

#### Docker
```bash
# 查看容器日志
docker logs interactive-web

# 查看实时日志
docker logs -f interactive-web
```

## 📊 性能优化

### 构建优化
- 文件压缩和合并
- 静态资源缓存
- 图片优化

### 部署优化
- CDN 加速
- 压缩传输
- 缓存策略

### 监控指标
- 构建时间
- 部署成功率
- 页面加载速度

## 🔐 安全配置

### HTTPS
- 所有部署平台默认支持 HTTPS
- 自动 SSL 证书

### 安全头部
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

### 访问控制
- 环境变量保护
- API Token 安全
- 部署权限控制

## 📈 监控和维护

### 健康检查
- 自动健康检查
- 服务状态监控
- 错误告警

### 自动更新
- Watchtower 自动更新
- 依赖更新检查
- 安全补丁应用

### 备份策略
- 代码仓库备份
- 构建产物备份
- 配置备份

## 📞 支持

如果遇到问题，请：

1. 查看本文档的故障排除部分
2. 检查 GitHub Issues
3. 提交新的 Issue
4. 联系维护者

---

**🎉 恭喜！您已经掌握了完整的自动化部署流程！**
