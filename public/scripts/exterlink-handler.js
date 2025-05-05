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
  
  // 检查当前页面是否是中转页面
  const isRedirectPage = window.location.pathname === redirectPage || 
                         window.location.pathname === `${redirectPage}/` ||
                         window.location.href.includes(`${redirectPage}?`);
  
  // 如果是中转页面，不处理链接
  if (isRedirectPage) {
    console.log('[外链处理] 当前是中转页面，不处理链接');
    return;
  }
  
  // 外链处理函数
  function handleExternalLinks() {
    console.log('[外链处理] 开始处理外部链接');
    
    // 获取页面上所有的链接
    const links = document.querySelectorAll('a[href]:not([data-no-redirect]):not([data-external-handled])');
    console.log(`[外链处理] 找到 ${links.length} 个待处理链接`);
    
    let externalCount = 0;
    
    links.forEach((link, index) => {
      // 跳过没有href属性或空href的链接
      if (!link.href || link.href === '' || link.href === '#' || link.href.startsWith('javascript:')) {
        return;
      }
      
      try {
        const url = new URL(link.href);
        
        // 跳过非http/https链接
        if (!url.protocol.startsWith('http')) {
          return;
        }
        
        // 标记为已处理，避免重复处理
        link.setAttribute('data-external-handled', 'true');
        
        // 检查是否是外部链接（不同的域名）
        if (!excludedDomains.includes(url.hostname)) {
          externalCount++;
          console.log(`[外链处理] 处理外部链接 #${index}: ${url.href} -> ${url.hostname}`);
          
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
          
          // 添加目标属性
          link.setAttribute('rel', 'noopener noreferrer');
        } else {
          console.log(`[外链处理] 跳过内部链接: ${url.href}`);
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
  setTimeout(handleExternalLinks, 100);
  
  // 在DOM加载完成后处理链接
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[外链处理] DOM已加载完成，开始处理链接');
    setTimeout(handleExternalLinks, 100);
  });
  
  // window加载完成后再处理一次
  window.addEventListener('load', function() {
    console.log('[外链处理] 页面已完全加载，再次处理链接');
    setTimeout(handleExternalLinks, 100);
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
        setTimeout(handleExternalLinks, 100);
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
  
  // 处理iframe内的链接
  try {
    document.querySelectorAll('iframe').forEach(iframe => {
      iframe.addEventListener('load', function() {
        try {
          // 尝试访问iframe内容
          const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
          console.log('[外链处理] 检测到iframe，尝试处理其中的链接');
          
          // 对iframe内的链接应用同样的处理
          const iframeLinks = iframeDocument.querySelectorAll('a');
          if (iframeLinks.length > 0) {
            console.log(`[外链处理] 在iframe中找到 ${iframeLinks.length} 个链接`);
            // iframe内链接处理逻辑...
          }
        } catch (e) {
          // 跨域限制或其他错误
          console.warn('[外链处理] 无法访问iframe内容:', e);
        }
      });
    });
  } catch (e) {
    console.warn('[外链处理] 处理iframe时出错:', e);
  }
})(); 
