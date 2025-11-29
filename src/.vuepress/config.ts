import {defineUserConfig} from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  port: 9091,

  lang: "zh-CN",
  title: "qiuxz",
  description: "qiuxz's Blog",

  theme,

  plugins: [

  ]

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
