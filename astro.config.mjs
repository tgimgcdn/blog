// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'
import starlightImageZoom from 'starlight-image-zoom'
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import { visit } from 'unist-util-visit'

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
								return function(tree) {
									// 获取站点域名
									const siteUrl = new URL(config.site);
									const siteHostname = siteUrl.hostname;
									
									// 遍历所有节点
									visit(tree, 'link', (node) => {
										try {
											const url = new URL(node.url);
											// 检查是否是本域名或子域名
											const isSameDomain = url.hostname === siteHostname || 
															  url.hostname.endsWith('.' + siteHostname) ||
															  siteHostname.endsWith('.' + url.hostname);
											
											// 如果不是本域名或子域名，且是http链接，则进行中转
											if (!isSameDomain && url.protocol.startsWith('http')) {
												// 将链接替换为重定向链接，使用base64编码
												const encodedUrl = btoa(node.url);
												node.url = `/link?url=${encodedUrl}`;
											}
										} catch (e) {
											// 如果URL解析失败，保持原样
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

// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.ggff.net',
	integrations: [
		starlight({
			plugins: [
				starlightBlog({
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
				starlightImageZoom(),
				starlightThemeFlexoki()
			],
			title: '参界说',
			components: {
				Footer: './src/components/Footer.astro',
				Page: './src/components/Page.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
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
			// 添加 KaTeX 支持
			head: [
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css',
					},
				},
				{
					tag: 'script',
					attrs: {
						defer: true,
						src: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js',
					},
				},
				{
					tag: 'script',
					attrs: {
						defer: true,
						src: 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js',
					},
				},
			],
		}),
		processMarkdownLinks(),
	],
});
