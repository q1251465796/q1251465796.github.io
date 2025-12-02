import {navbar} from "vuepress-theme-hope";

export default navbar([
  {
    text: "首页",
    icon: "home",
    link: "/",
  },
  {
    text: "个人成长",
    icon: "star",
    link: "/个人成长/",
    children: [
      {
        text: "如何学习",
        icon: "book",
        link: "/posts/如何学习/",
      },
    ]
  },
  {
    text: "编程",
    prefix: "/posts",
    icon: "code",
    children: [
      {
        text: "前端",
        icon: "bars",
        children: [
          {
            text: "未分类",
            link: "/posts/前端/未分类/",
          },
          {
            text: "webpack",
            link: "/posts/前端/webpack/",
          },
          {
            text: "Vue",
            link: "/posts/前端/Vue/",
          }
        ],
      },
      {
        text: "后端",
        icon: "database",
        children: [
          {
            text: "Java",
            link: "/posts/后端/Java/",
          },
          {
            text: "Spring",
            link: "/posts/后端/Spring/",
          }
        ],
      },
    ]
  },
  {
    text: "软件",
    icon: "tool",
    link: "/软件/"
  },
  {
    text: "心理",
    icon: "heart",
    link: "/心理/",
  },
  {
    text: "随笔",
    icon: "note",
    link: "posts/随笔/",
  },
  {
    text: "其他",
    link: "/other/"
  }
]);
