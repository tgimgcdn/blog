// 在移动端禁用图片缩放功能但保持响应式布局
document.addEventListener('DOMContentLoaded', function() {
  // 检查是否为移动设备
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  
  if (isMobile) {
    // 查找并禁用 starlight-image-zoom 插件的功能
    // 通常这个插件会给图片添加点击事件和特定的样式类

    // 监听DOM变化，处理动态加载的图片
    const imageObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach(node => {
            // 处理添加到DOM的新节点
            processNode(node);
          });
        }
      });
    });

    // 开始观察DOM变化
    imageObserver.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    // 处理节点函数
    function processNode(node) {
      // 如果节点可以查询子元素
      if (node.querySelectorAll) {
        // 查找所有图片
        const images = node.querySelectorAll('img');
        images.forEach(img => {
          // 检查父元素是否有缩放相关的类
          const parent = img.parentElement;
          if (parent && (parent.classList.contains('sl-image-zoom') || parent.classList.contains('medium-zoom-image'))) {
            // 移除父元素上的缩放类
            parent.classList.remove('sl-image-zoom');
            parent.classList.remove('medium-zoom-image');
            // 移除点击事件
            parent.style.cursor = 'default';
            parent.onclick = null;
            img.onclick = null;
          }
          
          // 检查图片本身是否有缩放相关的类
          if (img.classList.contains('sl-image-zoom') || img.classList.contains('medium-zoom-image')) {
            img.classList.remove('sl-image-zoom');
            img.classList.remove('medium-zoom-image');
            img.style.cursor = 'default';
            img.onclick = null;
          }
          
          // 防止图片被点击放大
          img.addEventListener('click', function(e) {
            e.stopPropagation();
            return false;
          }, true);
        });
        
        // 查找并处理具有缩放类的元素
        const zoomElements = node.querySelectorAll('.sl-image-zoom, .medium-zoom-image');
        zoomElements.forEach(el => {
          el.classList.remove('sl-image-zoom');
          el.classList.remove('medium-zoom-image');
          el.style.cursor = 'default';
          el.onclick = null;
        });
      }
    }

    // 立即处理当前页面上的所有图片
    processNode(document.body);
    
    // 添加样式来确保图片不会被点击放大
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        img {
          pointer-events: none;
        }
        .sl-image-zoom, .medium-zoom-image {
          cursor: default !important;
          pointer-events: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }
}); 
