// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightThemeFlexoki from 'starlight-theme-flexoki';
import starlightImageZoom from 'starlight-image-zoom';
import starlightBlog from 'starlight-blog';

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
          prevNextLinksOrder: 'reverse-chronological',
        }),
      ],
      title: 'My Docs',
      social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
      sidebar: [
        {
          label: 'Guides',
          items: [{ label: 'Example Guide', slug: 'guides/example' }],
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
