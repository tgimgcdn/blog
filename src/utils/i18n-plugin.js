/**
 * 自定义Starlight插件，为starlight-blog添加中文翻译
 */
import { StarlightBlogTranslations } from './blog-translations.js';

export function i18nPlugin() {
  return {
    name: 'starlight-zh-translations-plugin',
    hooks: {
      'config:setup': () => {
        // 必须的钩子，可以为空
      },
      'i18n:setup': ({ injectTranslations }) => {
        // 注意：Starlight中的方法是injectTranslations，不是addTranslations
        injectTranslations({
          zh: StarlightBlogTranslations.zh
        });
      }
    }
  };
} 
