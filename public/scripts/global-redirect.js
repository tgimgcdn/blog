/**
 * 全局外链重定向脚本
 * 使用最简单直接的方式处理所有外链
 */

(function() {
  // 直接替换window.open和location的原始方法
  
  // 保存原始的window.open方法
  var originalWindowOpen = window.open;
  
  // 外链中转页面URL
  var redirectPage = '/link';
  
  // 获取当前站点域名
  var currentDomain = window.location.hostname;
  
  // 简单判断是否是外部链接
  function isExternalLink(url) {
    try {
      // 创建URL对象
      var urlObj = new URL(url);
      
      // 如果协议不是http或https，不处理
      if (!urlObj.protocol.startsWith('http')) {
        return false;
      }
      
      // 如果域名相同，不处理
      return urlObj.hostname !== currentDomain;
    } catch (e) {
      // 无效URL，不处理
      return false;
    }
  }
  
  // 替换window.open方法
  window.open = function(url, target, features) {
    if (isExternalLink(url)) {
      console.log('[全局重定向] 拦截window.open:', url);
      var redirectUrl = redirectPage + '?url=' + encodeURIComponent(url);
      return originalWindowOpen.call(window, redirectUrl, target, features);
    }
    return originalWindowOpen.apply(window, arguments);
  };
  
  // 劫持所有链接点击
  document.addEventListener('click', function(e) {
    var target = e.target;
    
    // 向上查找最近的a标签
    while (target && target.tagName !== 'A') {
      target = target.parentNode;
      if (!target || target === document) return;
    }
    
    var link = target;
    if (!link || !link.href) return;
    
    // 检查是否是外部链接
    if (isExternalLink(link.href)) {
      e.preventDefault();
      e.stopPropagation();
      console.log('[全局重定向] 拦截链接点击:', link.href);
      var redirectUrl = redirectPage + '?url=' + encodeURIComponent(link.href);
      window.location.href = redirectUrl;
      return false;
    }
  }, true);
  
  console.log('[全局重定向] 脚本已加载, 当前域名:', currentDomain);
})(); 
