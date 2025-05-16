// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'
import starlightImageZoom from 'starlight-image-zoom'
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import { visit } from 'unist-util-visit'
import { i18nPlugin } from './src/utils/i18n-plugin.js';

// 自定义 Markdown 处理器
function processMarkdownLinks() {
	return {
		name: 'process-markdown-links',
		hooks: {
			'astro:config:setup': ({ updateConfig, config }) => {
				updateConfig({
					markdown: {
						remarkPlugins: [
							function() {
								return function(tree, file) {
									// 获取站点域名
									const siteUrl = new URL(config.site);
									const siteHostname = siteUrl.hostname;
									
									// 检测当前文件的语言
									let lang = 'zh'; // 默认为中文
									const filePath = file.history[0] || '';
									if (filePath.includes('/en/') || filePath.includes('\\en\\')) {
										lang = 'en';
									}
									// 构建语言前缀
									const langPrefix = lang === 'zh' ? '' : `/${lang}`;
									
									// 遍历所有节点
									visit(tree, ['link', 'mdxJsxFlowElement'], (node) => {
										try {
											let url;
											if (node.type === 'link') {
												url = node.url;
											} else if (node.type === 'mdxJsxFlowElement' && node.name === 'LinkButton') {
												// 查找 href 属性
												const hrefAttr = node.attributes.find(attr => attr.name === 'href');
												if (hrefAttr) {
													url = hrefAttr.value;
												}
											}
											
											if (url) {
												// 检查URL是否符合格式要求
												if (!isValidExternalUrl(url)) {
													return; // 如果不是有效的外部URL，跳过处理
												}
												
												try {
													const urlObj = new URL(url);
													
													// 检查是否是本域名或子域名
													const isSameDomain = urlObj.hostname === siteHostname || 
																	urlObj.hostname.endsWith('.' + siteHostname) ||
																	siteHostname.endsWith('.' + urlObj.hostname);
													
													// 如果不是本域名或子域名，且是http链接，则进行中转
													if (!isSameDomain && urlObj.protocol.startsWith('http')) {
														// 提取URL中的锚点部分（不包含#符号）
														let hashPart = '';
														if (urlObj.hash) {
															hashPart = urlObj.hash.substring(1); // 移除开头的#
														}
														
														try {
															// 对URL主体部分进行base64编码（不含锚点）
															const encodedUrl = btoa(url.split('#')[0]);
															
															// 构建最终的URL，将锚点作为查询参数传递
															let finalUrl = `${langPrefix}/link/?url=${encodedUrl}`;
															
															// 如果有锚点，将其作为额外查询参数
															if (hashPart) {
																finalUrl += `&hash=${encodeURIComponent(hashPart)}`;
															}
															
															if (node.type === 'link') {
																node.url = finalUrl;
															} else if (node.type === 'mdxJsxFlowElement') {
																// 更新 LinkButton 的 href 属性
																const hrefAttr = node.attributes.find(attr => attr.name === 'href');
																if (hrefAttr) {
																	hrefAttr.value = finalUrl;
																}
															}
														} catch (encodeError) {
															// 如果base64编码失败（可能包含非ASCII字符），使用整个链接而不处理
															console.log('链接编码失败，使用原始链接:', url, encodeError.message);
														}
													}
												} catch (urlError) {
													// URL无效或不是标准的URL，跳过处理
													console.log('链接格式不标准，跳过处理:', url);
												}
											}
										} catch (e) {
											// 如果URL解析失败，保持原样
											console.log('链接处理失败:', e.message);
										}
									});
								};
							}
						]
					}
				});
			}
		}
	};
}

// 检查URL是否是有效的外部链接
function isValidExternalUrl(url) {
	// 检查是否为空
	if (!url || typeof url !== 'string') {
		return false;
	}
	
	// 跳过锚点链接(#开头)、相对路径(/开头)和特殊协议链接
	if (url.startsWith('#') || url.startsWith('/')) {
		return false;
	}
	
	// 检查特殊协议
	const specialProtocols = ['mailto:', 'tel:', 'javascript:', 'file:'];
	for (const protocol of specialProtocols) {
		if (url.startsWith(protocol)) {
			return false;
		}
	}
	
	// 确保URL有协议前缀
	if (!url.includes('://')) {
		return false;
	}
	
	// 基本格式验证
	try {
		new URL(url);
		return true;
	} catch (e) {
		return false;
	}
}

// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.org',
	integrations: [
		starlight({
			locales: {
                            root: { label: '简体中文', lang: 'zh' },
                            en: { label: 'English', lang: 'en' },
                                  },
			plugins: [
				starlightImageZoom(),
				starlightBlog({
					title: {
                                           zh: '参界说',
                                           en: 'Canjie Says',
                                         },
					authors: {
						cmssky: {
							name: 'cmssky',
							picture: 'https://img20.360buyimg.com/openfeedback/jfs/t1/297564/4/2943/9987/6816f2f6Ff7a97a86/37decef475f8f719.jpg',
							url: 'https://canjie.org',
						},
					},
					prevNextLinksOrder: 'reverse-chronological',
					prefix: 'blog'
				}),
				starlightThemeFlexoki(),
				i18nPlugin()
			],
			title: {
                          zh: '参界说',
                          en: 'Canjie Says',
                        },
			components: {
				Footer: './src/components/Footer.astro',
				Page: './src/components/Page.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
				PageTitle: './src/components/PageTitle.astro',
				ThemeSelect: './src/components/ThemeSelect.astro',
			},
			sidebar: [
				{
					label: '博客',
					items: [
						{ label: '文章归档', link: '/archives/' },
					],
				},
			],
			// 添加需要隐藏在侧边栏和搜索结果中的页面
			pagefind: {
				excludeSelectors: ['[data-pagefind-ignore]'],
			},
		}),
		processMarkdownLinks(),
	],
});
