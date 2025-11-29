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
    link: "/growth/",
  },
  {
    text: "前端",
    icon: "bars",
    children: [
      {
        text: "JavaScript",
        link: "",
      },
      {
        text: "webpack",
        link: "",
      },
      {
        text: "Vue",
        link: "",
      }

    ],
  },
  {
    text: "后端",
    icon: "database",
    children: [
      {
        text: "Java",
        link: "",
      },
      {
        text: "Spring系列",
        link: "",
      },
      {
        text: "mysql",
        link: "",
      }
    ],
  },
  {
    text: "编程经验",
    icon: "code",
    link: "",
  },
  {
    text: "随笔",
    icon: "note",
    link: "",
  }
]);
