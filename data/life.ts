import type { LocalizedText } from "@/data/locale";

export type LifeEvent = {
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  location?: LocalizedText;
  highlight?: LocalizedText;
};

export const lifeMoments: LifeEvent[] = [
  {
    title: {
      zh: "第一次用手柄蓝牙操控小车",
      en: "First time controlling my car with a Bluetooth gamepad",
    },
    description: {
      zh: "妈的谁学嵌入式谁傻逼",
      en: " Damn who studies embedded systems is a fool",
    },
    date: "2025.11.29",
    location: {
      zh: "珠海",
      en: "Zhuhai",
    },
    highlight: {
      zh: "吐槽",
      en: "Rant",
    },
  },
  {
    title: {
      zh: "实验的baseline跑错了",
      en: " Ran the experiment baseline wrong",
    },
    description: {
      zh: "我不行了，谁做计算机视觉谁傻逼",
      en: " I'm done, whoever does computer vision is a fool",
    },
    date: "2025.11.27",
    location: {
      zh: "珠海",
      en: "Zhuhai",
    },
    highlight: {
      zh: "计算机视觉",
      en: "Cv",
    },
  },
  {
    title: {
      zh: "好久没别人合照",
      en: "It's been a long time since I've taken a group photo with anyone.",
    },
    description: {
      zh: "嵌入式还是很有意思的，今天课上任老师帮我焊接了电机，感谢感谢！终于可以开始装小车了:/突然被b专同学合照，好久没别人合照了",
      en: "Embedded systems are really interesting. Today in class, my teacher helped me solder the motor, thank you so much! Finally, I can start assembling my little car :/ Suddenly I got a group photo taken with a classmate from the B major; it's been so long since I've had a group photo taken with anyone.",
    },
    date: "2025.11.26",
    highlight: {
      zh: "学习",
      en: "Knowledge",
    },
  },
  {
    title: {
      zh: "新买的深度相机可以用的",
      en: " I Brought a new Depth camera",
    },
    description: {
      zh: "70块钱要什么自行车啊",
      en: "Only 70 yuan, cheap",
    },
    date: "2024.11.19",
    highlight: {
      zh: "学习",
      en: "Knowledge",
    },
  },
];
