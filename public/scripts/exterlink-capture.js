/**
 * 外链捕获脚本 - 事件代理版
 * 使用事件代理捕获所有链接点击，对外部链接进行重定向处理
 */

(function() {
  console.log('[外链捕获] 脚本已加载 - 事件代理版');
  
  // 获取当前站点域名
  const currentDomain = window.location.hostname;
  
  // 外链中转页面URL
  const redirectPage = '/link';
  
  // 检查当前页面是否是中转页面
  const isRedirectPage = window.location.pathname === redirectPage || 
                         window.location.pathname === `${redirectPage}/` ||
                         window.location.href.includes(`${redirectPage}?`);
  
  // 需要排除的域名列表（这些域名的链接不会被中转）
  const excludedDomains = [
    currentDomain, // 当前域名
    'localhost',
    '127.0.0.1',
    // 添加其他排除的域名
  ];
  
  // 如果当前页面是中转页面，不处理
  if (isRedirectPage) {
    console.log('[外链捕获] 当前页面是中转页面，不进行处理');
    return;
  }
  
  // 使用事件代理，捕获所有链接的点击事件
  document.addEventListener('click', function(event) {
    // 查找最近的a标签
    let target = event.target;
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
      // 如果已经到达文档根节点，则不是链接点击
      if (!target || target === document) {
        return;
      }
    }
    
    // 现在target是被点击的<a>元素
    const link = target;
    
    // 跳过没有href的链接、空链接、锚点链接、javascript伪协议
    if (!link.href || link.href === '' || link.href === '#' || 
        link.href.startsWith('javascript:') || link.href.startsWith('mailto:') ||
        link.hasAttribute('data-no-redirect')) {
      return;
    }
    
    try {
      const url = new URL(link.href);
      
      // 跳过非http或https链接
      if (!url.protocol.startsWith('http')) {
        return;
      }
      
      // 检查是否是外部链接（不同于当前域名）
      if (!excludedDomains.includes(url.hostname)) {
        // 这是一个外部链接，阻止默认行为
        event.preventDefault();
        
        console.log(`[外链捕获] 拦截外部链接点击: ${url.href}`);
        
        // 创建重定向URL
        const redirectUrl = `${redirectPage}?url=${encodeURIComponent(url.href)}`;
        
        // 跳转到中转页面
        console.log(`[外链捕获] 重定向到: ${redirectUrl}`);
        window.location.href = redirectUrl;
      }
    } catch (e) {
      console.warn('[外链捕获] 处理链接点击时出错:', e);
    }
  }, true); // 使用捕获阶段，确保在事件冒泡前处理
  
  // 添加鼠标悬停提示
  function addHoverInfo() {
    const links = document.querySelectorAll('a[href^="http"]:not([data-hover-processed])');
    
    links.forEach(link => {
      try {
        const url = new URL(link.href);
        
        // 只处理外部链接
        if (!excludedDomains.includes(url.hostname)) {
          // 标记为已处理
          link.setAttribute('data-hover-processed', 'true');
          
          // 添加提示信息
          if (!link.title) {
            link.title = `外部链接: ${url.href} (点击将跳转到确认页面)`;
          }
          
          // 添加视觉提示类
          link.classList.add('external-link');
        }
      } catch (e) {
        // 忽略无效URL
      }
    });
  }
  
  // 在DOM加载后添加悬停提示
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[外链捕获] DOM已加载，添加悬停提示');
    addHoverInfo();
    
    // 设置MutationObserver监听DOM变化
    if (window.MutationObserver) {
      const observer = new MutationObserver(function(mutations) {
        let hasNewNodes = false;
        mutations.forEach(mutation => {
          if (mutation.addedNodes && mutation.addedNodes.length > 0) {
            hasNewNodes = true;
          }
        });
        
        if (hasNewNodes) {
          addHoverInfo();
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
  
  // 在页面完全加载后再次处理
  window.addEventListener('load', function() {
    console.log('[外链捕获] 页面已完全加载，再次添加悬停提示');
    addHoverInfo();
  });
  
  // 添加样式使外部链接可识别
  const style = document.createElement('style');
  style.textContent = `
    a.external-link {
      position: relative;
    }
    a.external-link:after {
      content: "↗";
      display: inline-block;
      margin-left: 2px;
      opacity: 0.6;
      font-size: 0.9em;
    }
  `;
  document.head.appendChild(style);
  
  // 定期再次处理链接，以应对动态内容
  setInterval(addHoverInfo, 3000);
  
  console.log('[外链捕获] 事件监听器已设置');
})(); 
