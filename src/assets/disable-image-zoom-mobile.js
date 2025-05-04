// 在移动端禁用图片缩放功能
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否为移动设备
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (isMobile) {
    // 移除所有图片上的缩放功能
    const imageObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            // 寻找所有带有缩放相关类的元素并移除它们
            if (node.querySelectorAll) {
              const zoomElements = node.querySelectorAll('.sl-image-zoom');
              zoomElements.forEach(el => {
                // 移除缩放功能
                el.classList.remove('sl-image-zoom');
                // 移除其他可能的缩放相关类
                el.classList.remove('medium-zoom-image');
                // 移除任何点击事件
                el.style.cursor = 'default';
                el.onclick = null;
              });
            }
          });
        }
      });
    });

    // 开始观察DOM变化
    imageObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // 立即处理当前已有的图片
    document.querySelectorAll('.sl-image-zoom, .medium-zoom-image').forEach(el => {
      el.classList.remove('sl-image-zoom');
      el.classList.remove('medium-zoom-image');
      el.style.cursor = 'default';
      el.onclick = null;
    });
  }
}); 
