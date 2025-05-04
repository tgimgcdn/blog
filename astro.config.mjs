// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightImageZoom from 'starlight-image-zoom'
import starlightBlog from 'starlight-blog'
import starlightThemeFlexoki from 'starlight-theme-flexoki'


// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.ggff.net',
	integrations: [
	      starlight({
		// 添加自定义组件覆盖，使用我们的PageFrame
		components: {
              	  PageFrame: './src/components/PageFrame.astro',
            	},
	        plugins: [
                starlightImageZoom(),
		        starlightBlog({
                  authors: {
                    cmssky: {
                      name: 'cmssky',
                      title: '网站管理员',
                      picture: 'https://img20.360buyimg.com/openfeedback/jfs/t1/297564/4/2943/9987/6816f2f6Ff7a97a86/37decef475f8f719.jpg',
                      url: 'https://canjie.org',
                    },
                  },
                  prevNextLinksOrder: 'chronological',
                  prefix: 'blog'
                }),
                starlightThemeFlexoki()
            ],
			title: 'My Docs',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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
			],
		}),
	],
});
