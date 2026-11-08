// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/**
 * 站点地址与部署路径支持通过环境变量覆盖：
 * - DOCS_URL        站点完整域名，例如 https://newlan.github.io
 * - DOCS_BASE_URL   项目页路径，例如 /ESCore/
 *
 * GitHub Actions 会自动传入仓库名，因此同一条工作流既可用于
 * newlan/ESCore，也可用于独立的文档仓库。
 */
const siteUrl = (process.env.DOCS_URL || 'https://newlan.github.io').replace(/\/$/, '');
const rawBaseUrl = process.env.DOCS_BASE_URL || '/ESCore/';
const normalizedBaseUrl = rawBaseUrl.replace(/^\/|\/$/g, '');
const baseUrl = normalizedBaseUrl ? `/${normalizedBaseUrl}/` : '/';

const editUrl =
  'https://github.com/newlan/ESCore/tree/master/DOC/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ESCore 企业实时通信框架',
  tagline: '以实时通信为内核，构建企业中台与多端应用',
  favicon: 'img/favicon.svg',

  url: siteUrl,
  baseUrl,

  organizationName: 'newlan',
  projectName: 'ESCore',

  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
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
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl,
          breadcrumbs: true,
          showLastUpdateAuthor: false,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  plugins: [
    'docusaurus-plugin-image-zoom',
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'desktop',
        path: 'desktop',
        routeBasePath: 'desktop',
        sidebarPath: require.resolve('./sidebarsDesktop.js'),
        editUrl,
        breadcrumbs: true,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
    [
      require.resolve('@docusaurus/plugin-content-docs'),
      {
        id: 'app',
        path: 'app',
        routeBasePath: 'app',
        sidebarPath: require.resolve('./sidebarsApp.js'),
        editUrl,
        breadcrumbs: true,
        showLastUpdateAuthor: false,
        showLastUpdateTime: false,
      },
    ],
  ],

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
        searchResultLimits: 8,
        indexPages: true,
        docsRouteBasePath: ['/docs', '/desktop', '/app'],
        blogRouteBasePath: [],
        blogDir: [],
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/social-card.png',
      metadata: [
        {
          name: 'author',
          content: 'newlan',
        },
        {
          name: 'theme-color',
          content: '#0b1220',
        },
      ],
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      zoom: {
        selector: '.markdown img, .zoomable',
        background: {
          light: 'rgb(248, 250, 252)',
          dark: 'rgb(8, 13, 24)',
        },
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: false,
        },
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
      navbar: {
        title: 'ESCore',
        hideOnScroll: true,
        logo: {
          alt: 'ESCore',
          src: 'img/logo.svg',
        },
        items: [
          {to: '/intro', label: '简介', position: 'left'},
          {to: '/docs/intro', label: '企业中台', position: 'left'},
          {
            type: 'dropdown',
            label: '多终端',
            position: 'left',
            items: [
              {
                to: '/desktop/intro',
                label: 'Windows 桌面端 · Electron',
              },
              {
                to: '/app/intro',
                label: '移动 App · uni-app',
              },
              {
                to: '/intro',
                label: '多端能力总览',
              },
            ],
          },
          {to: '/thanks', label: '鸣谢开源', position: 'left'},
          {to: '/about', label: '关于作者', position: 'left'},
          {type: 'search', position: 'right'},
          {
            href: 'https://github.com/newlan/ESCore',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub 仓库',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文档',
            items: [
              {label: '项目简介', to: '/intro'},
              {label: '安装与环境', to: '/docs/install'},
              {label: '快速开始', to: '/docs/quick-start'},
              {label: '架构设计', to: '/docs/architecture'},
            ],
          },
          {
            title: '多终端',
            items: [
              {label: 'Windows 桌面端', to: '/desktop/intro'},
              {label: '移动 App', to: '/app/intro'},
              {label: '扩展文档站', to: '/docs/extend'},
            ],
          },
          {
            title: '社区',
            items: [
              {
                label: 'GitHub 仓库',
                href: 'https://github.com/newlan/ESCore',
              },
              {
                label: 'Issue 反馈',
                href: 'https://github.com/newlan/ESCore/issues',
              },
              {label: '鸣谢开源', to: '/thanks'},
            ],
          },
          {
            title: '关于',
            items: [
              {label: '关于作者', to: '/about'},
              {
                label: '邮件联系',
                href: 'mailto:newlanliu@gmail.com',
              },
              {
                label: 'Docusaurus',
                href: 'https://docusaurus.io/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ESCore · ISC License · Built with Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: [
          'bash',
          'json',
          'yaml',
          'nginx',
          'sql',
          'powershell',
          'docker',
          'diff',
          'typescript',
        ],
      },
    }),
};

export default config;