/**
 * 从URL路径中提取语言代码
 * @param {string} url - URL路径
 * @returns {string} 语言代码，默认为'zh'
 */
export function getLanguageFromURL(url) {
  const pathSegments = url.split('/').filter(segment => segment);
  
  // 检查第一个路径段是否为语言代码
  if (pathSegments.length > 0) {
    const firstSegment = pathSegments[0];
    if (firstSegment === 'en') {
      return 'en';
    }
    // 如果将来有其他语言，可以在这里添加
    // 例如: if (firstSegment === 'fr') return 'fr';
  }
  
  // 默认为中文
  return 'zh';
}

/**
 * 根据语言获取URL前缀
 * @param {string} lang - 语言代码
 * @returns {string} URL前缀
 */
export function getUrlPrefix(lang) {
  return lang === 'zh' ? '' : `/${lang}`;
}

/**
 * 根据当前语言返回本地化文本
 * @param {string} zhText - 中文文本
 * @param {string} enText - 英文文本
 * @param {string} lang - 语言代码
 * @returns {string} 本地化文本
 */
export function getLocalizedText(zhText, enText, lang = 'zh') {
  return lang === 'en' ? enText : zhText;
} 
