// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightBlog from 'starlight-blog'
import starlightImageZoom from 'starlight-image-zoom'

import starlightThemeFlexoki from 'starlight-theme-flexoki'


// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.ggff.net',
	integrations: [
	      starlight({
	        plugins: [
		starlightImageZoom(),
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
		starlightThemeFlexoki()
            ],
			title: 'My Docs',
			components: {
				Footer: './src/components/Footer.astro',
				Page: './src/components/Page.astro',
				MarkdownContent: './src/components/MarkdownContent.astro',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
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
			tableOfContents: false, // 隐藏链接页面的目录

		}),
	],
});
