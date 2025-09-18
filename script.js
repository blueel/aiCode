// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 初始化应用
function initializeApp() {
    setupNavigation();
    setupScrollAnimations();
    setupFormHandling();
    setupInteractiveElements();
    setupParallaxEffects();
    setupLoadingAnimations();
    setupThemeSwitcher();
}

// 导航栏功能
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 移动端菜单切换
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // 点击导航链接时关闭移动端菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // 滚动时导航栏样式变化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 高亮当前页面导航
    window.addEventListener('scroll', highlightCurrentSection);
}

// 高亮当前页面导航
function highlightCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// 滚动动画
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // 为浮动卡片添加延迟动画
                if (entry.target.classList.contains('floating-card')) {
                    const delay = entry.target.getAttribute('data-delay') || 0;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .gallery-item, .floating-card');
    animatedElements.forEach(el => observer.observe(el));
}

// 平滑滚动到指定区域
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70; // 考虑导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// 表单处理
function setupFormHandling() {
    const form = document.querySelector('.form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // 简单的表单验证
            if (!name || !email || !message) {
                showNotification('请填写所有必填字段', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('请输入有效的邮箱地址', 'error');
                return;
            }
            
            // 模拟提交
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('消息发送成功！我们会尽快回复您。', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// 邮箱验证
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 4000);
}

// 交互元素设置
function setupInteractiveElements() {
    // 画廊卡片交互
    const galleryCards = document.querySelectorAll('.gallery-card');
    galleryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // 点击效果
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
    
    // 功能卡片交互
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // 按钮点击效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 创建涟漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// 视差效果
function setupParallaxEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
        
        // 英雄区域背景视差
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroOffset = scrolled * 0.5;
            hero.style.transform = `translateY(${heroOffset}px)`;
        }
    });
}

// 加载动画
function setupLoadingAnimations() {
    // 页面加载完成后添加加载完成的类
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // 为所有动画元素添加延迟
        const animatedElements = document.querySelectorAll('.feature-card, .gallery-item');
        animatedElements.forEach((element, index) => {
            element.style.animationDelay = `${index * 0.1}s`;
        });
    });
    
    // 滚动时显示元素
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.feature-card, .gallery-item');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 键盘导航支持
document.addEventListener('keydown', function(e) {
    // ESC键关闭移动端菜单
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
    
    // 方向键导航
    if (e.key === 'ArrowDown' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const nextSection = getNextSection(currentSection);
        if (nextSection) {
            scrollToSection(nextSection);
        }
    }
    
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        const currentSection = getCurrentSection();
        const prevSection = getPrevSection(currentSection);
        if (prevSection) {
            scrollToSection(prevSection);
        }
    }
});

// 获取当前区域
function getCurrentSection() {
    const sections = document.querySelectorAll('section[id]');
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    return currentSection;
}

// 获取下一个区域
function getNextSection(currentSection) {
    const sections = ['home', 'features', 'gallery', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;
}

// 获取上一个区域
function getPrevSection(currentSection) {
    const sections = ['home', 'features', 'gallery', 'contact'];
    const currentIndex = sections.indexOf(currentSection);
    return currentIndex > 0 ? sections[currentIndex - 1] : null;
}

// 触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 为触摸设备添加特殊样式
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .btn:hover {
            transform: none;
        }
        .touch-device .feature-card:hover {
            transform: none;
        }
        .touch-device .gallery-card:hover {
            transform: none;
        }
    `;
    document.head.appendChild(style);
}

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(function() {
    highlightCurrentSection();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// 主题切换功能
function setupThemeSwitcher() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentThemeLabel = document.querySelector('.current-theme');
    const body = document.body;
    
    // 从本地存储获取主题设置，默认为动漫风格
    let currentTheme = localStorage.getItem('theme') || 'anime';
    
    // 初始化主题
    applyTheme(currentTheme);
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        currentTheme = currentTheme === 'anime' ? 'cyberpunk' : 'anime';
        applyTheme(currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        // 添加切换动画
        body.classList.add('theme-transition');
        setTimeout(() => {
            body.classList.remove('theme-transition');
        }, 500);
    });
    
    function applyTheme(theme) {
        // 设置body的data-theme属性
        body.setAttribute('data-theme', theme);
        
        // 更新切换器状态
        if (theme === 'cyberpunk') {
            themeToggle.classList.add('active');
            currentThemeLabel.textContent = '赛博朋克';
        } else {
            themeToggle.classList.remove('active');
            currentThemeLabel.textContent = '动漫风格';
        }
        
        // 更新页面标题
        updatePageTitle(theme);
        
        // 触发主题切换事件
        document.dispatchEvent(new CustomEvent('themeChanged', {
            detail: { theme: theme }
        }));
    }
    
    function updatePageTitle(theme) {
        const titles = {
            'anime': '🌸 唯美动漫风格 - 现代化交互展示',
            'cyberpunk': '⚡ 赛博朋克风格 - 现代化交互展示'
        };
        document.title = titles[theme] || '现代化交互展示 - 响应式网页';
    }
}

// 主题特定效果
document.addEventListener('themeChanged', function(e) {
    const theme = e.detail.theme;
    
    // 为不同主题添加特殊效果
    if (theme === 'anime') {
        addAnimeEffects();
    } else if (theme === 'cyberpunk') {
        addCyberpunkEffects();
    }
});

function addAnimeEffects() {
    // 移除赛博朋克效果
    removeCyberpunkEffects();
    
    // 添加樱花飘落效果
    createSakuraEffect();
    
    // 添加动漫风格的粒子效果
    createAnimeParticles();
}

function addCyberpunkEffects() {
    // 移除动漫效果
    removeAnimeEffects();
    
    // 添加赛博朋克网格效果
    createCyberpunkGrid();
    
    // 添加霓虹灯效果
    createNeonEffects();
}

function createSakuraEffect() {
    // 创建樱花飘落效果
    const sakuraContainer = document.createElement('div');
    sakuraContainer.className = 'sakura-container';
    sakuraContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    document.body.appendChild(sakuraContainer);
    
    // 创建樱花花瓣
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createSakuraPetal(sakuraContainer);
        }, i * 200);
    }
}

function createSakuraPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    petal.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #ff6b9d, #ff8fab);
        border-radius: 50% 0 50% 0;
        opacity: 0.7;
        animation: sakura-fall ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(petal);
    
    // 5秒后移除花瓣
    setTimeout(() => {
        if (petal.parentNode) {
            petal.parentNode.removeChild(petal);
        }
    }, 15000);
}

function createAnimeParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'anime-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // 创建粒子
    for (let i = 0; i < 15; i++) {
        createAnimeParticle(particleContainer);
    }
}

function createAnimeParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: #f8b500;
        border-radius: 50%;
        opacity: 0.6;
        animation: anime-float ${3 + Math.random() * 4}s ease-in-out infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 3}s;
    `;
    
    container.appendChild(particle);
}

function createCyberpunkGrid() {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'cyberpunk-grid';
    gridContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        background: linear-gradient(90deg, transparent 0%, rgba(0, 255, 136, 0.1) 50%, transparent 100%);
        animation: cyber-grid-scan 3s linear infinite;
    `;
    
    document.body.appendChild(gridContainer);
}

function createNeonEffects() {
    // 为所有可交互元素添加霓虹效果
    const interactiveElements = document.querySelectorAll('.btn, .feature-card, .gallery-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 20px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 255, 136, 0.4)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
}

function removeAnimeEffects() {
    const sakuraContainer = document.querySelector('.sakura-container');
    const particleContainer = document.querySelector('.anime-particles');
    
    if (sakuraContainer) sakuraContainer.remove();
    if (particleContainer) particleContainer.remove();
}

function removeCyberpunkEffects() {
    const gridContainer = document.querySelector('.cyberpunk-grid');
    if (gridContainer) gridContainer.remove();
}

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    @keyframes sakura-fall {
        0% {
            transform: translateY(-100px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes anime-float {
        0%, 100% {
            transform: translateY(0px) scale(1);
            opacity: 0.6;
        }
        50% {
            transform: translateY(-20px) scale(1.2);
            opacity: 1;
        }
    }
    
    @keyframes cyber-grid-scan {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
`;
document.head.appendChild(style);
