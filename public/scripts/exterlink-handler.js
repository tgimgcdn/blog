/**
 * 外链处理脚本
 * 自动拦截页面上的所有外部链接并重定向到中转页面
 */

(function() {
  // 调试信息
  console.log('[外链处理] 脚本已加载');
  
  // 获取当前站点域名
  const currentDomain = window.location.hostname;
  
  // 外链中转页面URL
  const redirectPage = '/link';
  
  // 需要排除的域名列表（这些域名的链接不会被中转）
  const excludedDomains = [
    currentDomain, // 当前域名
    'localhost',
    '127.0.0.1',
    // 添加其他排除的域名
  ];
  
  // 外链处理函数
  function handleExternalLinks() {
    console.log('[外链处理] 开始处理外部链接');
    
    // 获取页面上所有的链接
    const links = document.querySelectorAll('a');
    console.log(`[外链处理] 找到 ${links.length} 个链接`);
    
    let externalCount = 0;
    
    links.forEach((link, index) => {
      // 跳过没有href属性的链接
      if (!link.href) return;
      
      try {
        const url = new URL(link.href);
        
        // 检查是否是外部链接（不同的域名）
        if (!excludedDomains.includes(url.hostname) && url.protocol.startsWith('http')) {
          // 跳过已经处理过的链接和有特殊属性的链接
          if (link.getAttribute('data-external-handled') || link.getAttribute('data-no-redirect')) {
            return;
          }
          
          externalCount++;
          console.log(`[外链处理] 处理外部链接 #${index}: ${url.href} -> ${url.hostname}`);
          
          // 标记为已处理
          link.setAttribute('data-external-handled', 'true');
          
          // 保存原始链接
          const originalHref = link.href;
          
          // 创建重定向URL
          const redirectUrl = `${redirectPage}?url=${encodeURIComponent(originalHref)}`;
          
          // 更新链接
          link.href = redirectUrl;
          console.log(`[外链处理] 已重定向到: ${redirectUrl}`);
          
          // 添加原始链接信息到title
          if (!link.title) {
            link.title = `链接将跳转至: ${originalHref}`;
          }
        }
      } catch (e) {
        // URL解析错误，忽略
        console.warn('[外链处理] 链接处理错误:', e, link.href);
      }
    });
    
    console.log(`[外链处理] 处理完成，共处理 ${externalCount} 个外部链接`);
  }
  
  // 确保脚本在各种情况下都会执行
  
  // 直接运行一次（不等待DOMContentLoaded）
  setTimeout(handleExternalLinks, 0);
  
  // 在DOM加载完成后处理链接
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[外链处理] DOM已加载完成，开始处理链接');
    handleExternalLinks();
  });
  
  // window加载完成后再处理一次
  window.addEventListener('load', function() {
    console.log('[外链处理] 页面已完全加载，再次处理链接');
    handleExternalLinks();
  });
  
  // 监听动态添加的内容
  if (window.MutationObserver) {
    console.log('[外链处理] 设置MutationObserver监听动态内容');
    const observer = new MutationObserver(mutations => {
      let hasNewNodes = false;
      mutations.forEach(mutation => {
        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
          hasNewNodes = true;
        }
      });
      
      if (hasNewNodes) {
        console.log('[外链处理] 检测到页面变化，重新处理链接');
        handleExternalLinks();
      }
    });
    
    // 当DOM加载完成后开始监听
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { 
        childList: true, 
        subtree: true 
      });
      console.log('[外链处理] MutationObserver已开始监听');
    });
  }
  
  // 公开API以便其他脚本调用
  window.handleExternalLinks = handleExternalLinks;
  
  // 每隔3秒再次处理一次，确保处理到动态加载的内容
  setInterval(handleExternalLinks, 3000);
})(); 
