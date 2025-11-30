import type { LocalizedText } from "@/data/locale";

export type SkillCategory = {
  title: LocalizedText;
  highlight: LocalizedText;
  items: LocalizedText[];
};

export const skills: SkillCategory[] = [

  {
    title: {
      zh: "计算机视觉",
      en: "Computer Vision",
    },
    highlight: {
      zh: "图像处理与恢复技术",
      en: "Image Processing and Restoration Techniques",
    },
    items: [
      {
        zh: "Moe 风格图像生成与优化",
        en: "Moe-style image generation and optimization",
      },
      {
        zh: "4K 高分辨率图像恢复算法",
        en: "4K high-resolution image restoration algorithms",
      },
      {
        zh: "深度学习模型用于图像增强（如GAN或Diffusion模型）",
        en: "Deep learning models for image enhancement (e.g., GAN or Diffusion models)",
      },
      {
        zh: "特征提取与对象检测框架（如YOLO或Faster R-CNN）",
        en: "Feature extraction and object detection frameworks (e.g., YOLO or Faster R-CNN)",
      },
      {
        zh: "图像分割与语义理解（使用U-Net或Mask R-CNN）",
        en: "Image segmentation and semantic understanding (using U-Net or Mask R-CNN)",
      },
    ],
  },
  {
    title: {
      zh: "嵌入式系统",
      en: "Embedded Systems",
    },
    highlight: {
      zh: "实时定位、建图与硬件设计",
      en: "Real-time Localization, Mapping, and Hardware Design",
    },
    items: [
      {
        zh: "SLAM（同时定位与建图）算法实现与优化",
        en: "SLAM (Simultaneous Localization and Mapping) algorithm implementation and optimization",
      },
      {
        zh: "3D 环境建图与点云处理",
        en: "3D environmental mapping and point cloud processing",
      },
      {
        zh: "电吉他效果器硬件设计与DSP信号处理",
        en: "Electric guitar effects pedal hardware design and DSP signal processing",
      },
      {
        zh: "微控制器编程（如Arduino或TM4C123）与传感器集成",
        en: "Microcontroller programming (e.g., Arduino or STM32) and sensor integration",
      },
    
    ],
  },
  {
    title: {
      zh: "操作系统",
      en: "Operating Systems",
    },
    highlight: {
      zh: "自定义配置、管理与优化",
      en: "Custom Configuration, Management, and Optimization",
    },
    items: [
      {
        zh: "Arch Linux 安装、配置与包管理（pacman）",
        en: "Arch Linux installation, configuration, and package management (pacman)",
      },
    
      {
        zh: "自定义内核编译与模块加载",
        en: "Custom kernel compilation and module loading",
      },
      {
        zh: "虚拟化技术（如Docker、VirtualBox或KVM）",
        en: "Virtualization technologies (e.g., Docker, VirtualBox, or KVM)",
      },
      {
        zh: "脚本自动化与Shell编程（Bash/Zsh）",
        en: "Script automation and Shell programming (Bash/Zsh)",
      },
      {
        zh: "系统安全强化与防火墙配置（ufw或firewalld）",
        en: "System security hardening and firewall configuration (ufw or firewalld)",
      },
    ],
  },
  
  {
    title: {
      zh: "后端与部署召唤术",
      en: "Backend & deployment summoning",
    },
    highlight: {
      zh: "自建服务器小剧场",
      en: "Home-lab experiments in progress",
    },
    items: [
      {
        zh: "Node.js + Fastify 写轻量 API 和留言板服务",
        en: "Node.js + Fastify for lightweight APIs and guestbook services",
      },
      {
        zh: "SQLite + PlanetScale 让数据随时打包游走",
        en: "SQLite + PlanetScale keep data portable and happy",
      },
      {
        zh: "Docker Compose 指挥家庭开发板合奏",
        en: "Docker Compose orchestrates the home dev board",
      },
      {
        zh: "GitHub Actions 负责 CI/CD 小精灵",
        en: "GitHub Actions takes care of CI/CD sprites",
      },
    ],
  },
 
];
