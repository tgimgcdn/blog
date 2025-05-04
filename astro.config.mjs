// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import starlightImageZoom from 'starlight-image-zoom'
import starlightBlog from 'starlight-blog'
import starlightFullViewMode from 'starlight-fullview-mode'

// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.ggff.net',
	integrations: [
	      starlight({
	        plugins: [
		starlightImageZoom(),
		starlightThemeFlexoki(),
                starlightBlog({
                authors: {
                  cmssky: {
                    name: 'cmssky',
                    title: '网站管理员',
                    picture: 'https://cdn.canjie.org/avatar2.jpg',
                    url: 'https://canjie.org',
                  },
                },
              }),
		starlightFullViewMode({
                   leftSidebarEnabled: true,
                   rightSidebarEnabled: true,
		// to have the sidebars appear until the user collapses
                leftSidebarCollapsedWidth: "0px",
                rightSidebarCollapsedWidth: "0px",
               // to never let the sidebars appear
               leftSidebarExpandedWidth: "0px",
              rightSidebarExpandedWidth: "0px",
              })
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
