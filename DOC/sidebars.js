// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'intro',
    {
      type: 'category',
      label: '开始使用',
      collapsed: false,
      items: ['install', 'quick-start'],
    },
    {
      type: 'category',
      label: '架构与配置',
      items: ['architecture', 'configuration'],
    },
    {
      type: 'category',
      label: '开发指南',
      items: ['development', 'realtime', 'mqtt-iot', 'extend'],
    },
    {
      type: 'category',
      label: '上线部署',
      items: ['deploy'],
    },
    'faq',
  ],
};

export default sidebars;