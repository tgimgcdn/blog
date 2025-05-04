// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki'
import starlightImageZoom from 'starlight-image-zoom'
import starlightBlog from 'starlight-blog'


// https://astro.build/config
export default defineConfig({
	site: 'https://canjie.ggff.net',
	integrations: [
	      starlight({
	        plugins: [
		starlightImageZoom({
                  // Configure zoom to be disabled on mobile
                  filter: (img) => {
                    // This script runs client-side and checks if device is mobile
                    if (typeof window !== 'undefined') {
                      const isMobile = window.matchMedia('(max-width: 768px)').matches;
                      return !isMobile; // Return false for mobile devices
                    }
                    return true; // Default to true on server side
                  }
                }),
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
