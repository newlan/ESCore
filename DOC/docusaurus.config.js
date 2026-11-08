// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'DOC 文档中心',
  tagline: '基于 Docusaurus 3 的中文文档站',
  favicon: 'img/logo.svg',

  // 部署到 GitHub Pages 时改成你的地址（见 docs/guide/deploy）
  url: 'https://your-domain.com',
  baseUrl: '/',

  organizationName: 'your-github-name',
  projectName: 'doc',

  trailingSlash: false,
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
    localeConfigs: {
      'zh-Hans': {
        label: '简体中文',
        direction: 'ltr',
        htmlLang: 'zh-Hans',
      },
    },
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/your-github-name/doc/tree/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          breadcrumbs: true,
        },
        blog: {
          blogTitle: '文章',
          blogDescription: '随手记录的技术笔记',
          showReadingTime: true,
          postsPerPage: 10,
          blogSidebarCount: 0,
          feedOptions: {type: ['rss', 'atom']},
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: ['docusaurus-plugin-image-zoom'],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      /** @type {import('@easyops-cn/docusaurus-search-local').PluginOptions} */
      ({
        hashed: true,
        language: ['zh', 'en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchBarShortcutHint: true,
        docsRouteBasePath: '/docs',
        blogRouteBasePath: '/blog',
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.svg',
      zoom: {
        selector: '.markdown :not(em) > img, .markdown > img, article img[loading]',
        background: {
          light: 'rgb(255, 255, 255)',
          dark: 'rgb(40, 42, 54)',
        },
        config: {},
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      navbar: {
        title: 'DOC',
        hideOnScroll: true,
        logo: {
          alt: 'DOC Logo',
          src: 'img/logo.svg',
        },
        items: [
          {type: 'docSidebar', sidebarId: 'docs', position: 'left', label: '文档'},
          {to: '/blog', label: '文章', position: 'left'},
          {type: 'search', position: 'right'},
          {
            href: 'https://github.com/your-github-name/doc',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {label: '简介', to: '/docs/intro'},
              {label: '安装与运行', to: '/docs/install'},
              {label: '写作指南', to: '/docs/guide/writing-docs'},
            ],
          },
          {
            title: '更多',
            items: [
              {label: '文章', to: '/blog'},
              {label: '部署指南', to: '/docs/guide/deploy'},
              {label: 'Docusaurus 官网', href: 'https://docusaurus.io'},
            ],
          },
          {
            title: '关于',
            items: [
              {label: 'GitHub', href: 'https://github.com/your-github-name/doc'},
              {label: '常见问题', to: '/docs/faq'},
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} DOC. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'bash', 'json', 'yaml', 'nginx', 'sql', 'properties'],
      },
    }),
};

export default config;