/**
 * 自定义Starlight插件，为starlight-blog添加中文翻译
 */
import { StarlightBlogTranslations } from './blog-translations.js';

export function i18nPlugin() {
  return {
    name: 'starlight-zh-translations-plugin',
    hooks: {
      'i18n:setup': ({ addTranslations }) => {
        addTranslations({
          zh: StarlightBlogTranslations.zh
        });
      }
    }
  };
} 
