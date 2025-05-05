/**
 * 外链处理脚本
 * 自动拦截页面上的所有外部链接并重定向到中转页面
 */

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
  // 获取页面上所有的链接
  const links = document.querySelectorAll('a');
  
  links.forEach(link => {
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
        
        // 标记为已处理
        link.setAttribute('data-external-handled', 'true');
        
        // 保存原始链接
        const originalHref = link.href;
        
        // 创建重定向URL
        const redirectUrl = `${redirectPage}?url=${encodeURIComponent(originalHref)}`;
        
        // 更新链接
        link.href = redirectUrl;
        
        // 添加原始链接信息到title
        if (!link.title) {
          link.title = `链接将跳转至: ${originalHref}`;
        }
      }
    } catch (e) {
      // URL解析错误，忽略
      console.warn('链接处理错误:', e);
    }
  });
}

// 在DOM加载完成后处理链接
document.addEventListener('DOMContentLoaded', handleExternalLinks);

// 监听动态添加的内容
if (window.MutationObserver) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        // 当页面有新元素添加时，重新处理链接
        handleExternalLinks();
      }
    });
  });
  
  // 开始监听
  observer.observe(document.body, { 
    childList: true, 
    subtree: true 
  });
}

// 导出函数以便其他地方调用
export { handleExternalLinks }; 
