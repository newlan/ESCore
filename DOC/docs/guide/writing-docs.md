---
sidebar_position: 4
title: 写作指南
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 写作指南

所有文档都是 `docs/` 下的 Markdown（`.md`）或 MDX（`.mdx`）文件，写完保存即可在本地看到效果。

## 新建一篇文档

在 `docs/` 下任意位置新建 `.md` 文件，文件开头写 front matter：

```markdown
---
sidebar_position: 5
title: 我的新文档
---

# 我的新文档

正文从这里开始。
```

- `sidebar_position`：决定在侧边栏中的排序，数字小的在前；
- `title`：菜单和浏览器标题显示的名字，不写则用一级标题；
- `slug`：想自定义 URL 时使用，例如 `slug: /intro` 会输出 `/docs/intro`。

## 目录与分组

`docs/` 下的一级文件夹会自动变成一个分组，例如：

```text
docs/
├── intro.md
├── install.md
├── quick-start/
│   └── how-to-make-architecture.md
└── guide/
    └── writing-docs.md
```

想给分组单独命名或排序，在该文件夹里放一个 `_category_.json`：

```json title="docs/guide/_category_.json"
{
  "label": "使用指南",
  "position": 4,
  "collapsed": false
}
```

## 提示块

```markdown
:::note
补充说明。
:::

:::tip 小技巧
这条更有用。
:::

:::warning
注意风险。
:::

:::danger
会导致数据丢失的操作。
:::
```

渲染效果：

:::tip 小技巧
提示块支持自定义标题，用 `:::tip 标题` 即可。
:::

## 代码块

带语言标识即可高亮，还支持标题和高亮行：

````markdown
```js title="docusaurus.config.js" {3}
const config = {
  title: 'DOC 文档中心',
  baseUrl: '/',
};
```
````

```js title="docusaurus.config.js" {3}
const config = {
  title: 'DOC 文档中心',
  baseUrl: '/',
};
```

## 图片

图片放在 `static/img/` 下，用绝对路径引用：

```markdown
![示意图](/img/example.png)
```

也可以放进 `docs/` 同级目录用相对路径引用，构建时会一起处理。站内已启用图片放大，点击即可查看原图。

## 表格与链接

表格用标准 Markdown 语法；站内链接建议写相对路径，方便 `baseUrl` 变化后仍然有效：

```markdown
[写作指南](./writing-docs.md)
[部署指南](/docs/guide/deploy)
```

## MDX 能力

文件后缀改成 `.mdx` 后可以直接写 React 组件：

```mdx
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="npm" label="npm" default>npm install</TabItem>
  <TabItem value="pnpm" label="pnpm">pnpm install</TabItem>
</Tabs>
```

<Tabs>
  <TabItem value="npm" label="npm" default>npm install</TabItem>
  <TabItem value="pnpm" label="pnpm">pnpm install</TabItem>
</Tabs>

:::warning
MDX 里 `{` 和 `}` 会被当作表达式，正文中需要写成 `\{` 转义，或改用 `.md` 文件。
:::