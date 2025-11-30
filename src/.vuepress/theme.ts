import { hopeTheme } from "vuepress-theme-hope";

import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://q1251465796.github.io",

  author: {
    name: "qiuxz",
    url: "/", // 作者个人链接
  },

  logo: "/assets/images/logo.jpg",

  repo: "vuepress-theme-hope/vuepress-theme-hope",

  docsDir: "src",

  // 导航栏
  navbar,

  // 侧边栏
  sidebar,

  // 页脚
  footer: "powered by vuepress-theme-hope",
  displayFooter: true,

  // 博客相关
  blog: {
    avatar: "/assets/images/avatar.jpg",
    name: "qiuxz",
    description: "全栈开发者，终身学习者，大二学生",
    intro: "/intro.html",
    medias: {
      Gitee: "https://gitee.com/q1251465796",
      GitHub: "https://github.com/q1251465796",
    },
  },

  // 多语言配置
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  // 如果想要实时查看任何改变，启用它。注: 这对更新性能有很大负面影响
  // hotReload: true,

  // 此处开启了很多功能用于演示，你应仅保留用到的功能。
  markdown: {
    align: true,
    attrs: true,
    codeTabs: true,
    component: true,
    demo: true,
    figure: true,
    gfm: true,
    imgLazyload: true,
    imgSize: true,
    include: true,
    mark: true,
    plantuml: true,
    spoiler: true, // 开启剧透功能 支持!!j剧透内容!!
    obsidianImgSize: true,
    sub: true,
    sup: true,
    tabs: true,
    tasklist: true,
    vPre: true,

  },

  // 在这里配置主题提供的插件
  plugins: {
    blog: true,

    components: {
      components: ["Badge", "VPCard"],
    },

    icon: {
      prefix: "fa6-solid:",
    },
    sitemap: false, // 关闭sitemap插件/

  },
});
