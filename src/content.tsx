type LinkType = "github" | "external";

interface ProjectLink {
  label: string;
  href: string;
  type: LinkType;
}

interface Project {
  title: string;
  description: string;
  technologies: string[];
  links: ProjectLink[];
}

class Content_Class {
  headline: string = "3rd Year Computer Engineering Student @ UofT";

  aboutMe: string =
    "Passionate about creating innovative solutions through code. Intersted in Cloud and DevOps, currently learning full-stack development, operating systems, computer networks and algorithms.";

  relevant_coursework: string[] = [
    "Algorithms & Data Structures",
    "Computer Hardware",
    "Operating Systems",
    "Introduction to Databases",
    "Computer Organization",
    "Software Design & Communication",
    "Communication Systems",
    "Digital Systems",
  ];

  skills: string[] = [
    "TypeScript",
    "Python",
    "Node.js",
    "React.js",
    "C",
    "C++",
    "Git",
    "Docker",
    "SQL",
    "PostgreSQL",
    "GitHub Actions",
    "AWS",
    "Ubuntu",
    "Debian",
    "Bash",
    "Nginx",
    "PyTorch",
    "Ant Design",
    "Tailwind CSS",
    "Figma",
    "LaTeX",
  ];

  projects: Project[] = [
    {
      title: "License Plate Recognition Systems - Course Project",
      description:
        "A LPR system for Ontario style license plate, trained on PyTorch. The architecture consists of a CNN bounding box layer and a CRNN for character recognition layer. Detailed structures and implementations are included in the report.",
      technologies: [
        "PyTorch",
        "Python",
        "jinja2",
        "playwright",
        "albumentations"
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/lihaozhe013/APS360-Project-License-Plate-Recognition",
          type: "github",
        },
        {
          label: "Report",
          href: "https://lihaozhe013.github.io/lihaozhe-website/portfolio/APS360_Project_Final_Report.pdf",
          type: "external",
        },
      ],
    },
    {
      title: "Dinosaur Game - Course Project",
      description:
        "An embedded systems project featuring a dinosaur game implemented on STM32 MCU with custom graphics and input handling.",
      technologies: [
        "C",
        "Embedded Systems",
        "STM32",
        "SSD1306 OLED Display",
        "DMA",
        "GPIO",
        "I2C",
      ],
      links: [
        {
          label: "Video",
          href: "https://youtu.be/_ZocQdUdjPw?si=gIY0hTswSoknH1XM",
          type: "external",
        },
        {
          label: "Report",
          href: "https://lihaozhe013.github.io/lihaozhe-website/portfolio/ECE342FinalReport.pdf",
          type: "external",
        },
      ],
    },
    {
      title: "TradeFlow System",
      description:
        "A full-stack trade management web app built for a small business, developed and deployed by me from design to production.",
      technologies: [
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "Express",
        "Decimal.js",
        "Sheet.js",
        "JSONWebToken",
        "Vite",
        "Tailwind CSS",
        "Ant Design",
      ],
      links: [
        {
          label: "Detail",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/",
          type: "external",
        },
        {
          label: "GitHub",
          href: "https://github.com/lihaozhe013/tradeflow-oss",
          type: "github",
        },
      ],
    },
    {
      title: "TradeFlow System Infrastructure",
      description:
        "Deployed the TradeFlow System on AWS, implementing CI Using GitHub Actions and Docker. Below are screenshots and links to my Pre-Production environment (which also serves as my Demo).",
      technologies: [
        "Docker",
        "Docker Compose",
        "PostgreSQL",
        "AWS",
        "GitHub Actions",
        "Nginx",
        "Argo CD",
        "Debian",
        "Ubuntu",
        "Linux",
        "Bash",
      ],
      links: [
        {
          label: "Detail",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/",
          type: "external",
        },
      ],
    },
    {
      title: "GIS Route Optimization Application - Course Project",
      description:
        "A comprehensive Geographic Information System built with C++ and GTK, featuring real-time pathfinding algorithms and interactive map visualization.",
      technologies: [
        "C++",
        "GTK",
        "TomTom API",
        "Algorithms",
        "Dijkstra",
        "A*",
        "Greedy Algorithm",
        "Git",
      ],
      links: [
        {
          label: "Presentation",
          href: "https://lihaozhe013.github.io/lihaozhe-website/portfolio/ECE297-OP2.pdf",
          type: "external",
        },
        {
          label: "Detail",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/gis-route-optimization-application/",
          type: "external",
        },
      ],
    },
    {
      title: "Runner Game - Course Project",
      description:
        "An embedded systems project featuring a runner game implemented on RISC-V processor with custom graphics and input handling.",
      technologies: [
        "C",
        "RISC-V Assembly",
        "Embedded Systems",
        "CPULator",
        "Git",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/lihaozhe013/ece243_runner_game",
          type: "github",
        },
        {
          label: "Detail",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/runner-game-ece243-project/",
          type: "external",
        },
      ],
    },
    {
      title: "Greedy Mouse Game - Course Project",
      description:
        "An embedded systems project featuring a runner game implemented on FPGA board with custom graphics and input handling.",
      technologies: [
        "Verilog",
        "Embedded Systems",
        "Quartus Prime",
        "ModelSim",
        "DE1-SoC FPGA Board",
      ],
      links: [
        {
          label: "Presentation Slides",
          href: "https://lihaozhe013.github.io/lihaozhe-website/portfolio/ece241-final-presentation.pdf",
          type: "external",
        },
      ],
    },
    {
      title: "StreamFile Server",
      description:
        "A lightweight, database-free static resource hosting server with markdown rendering, video/audio playback, webpage hosting, private link generation, file upload, and file search features.",
      technologies: [
        "TypeScript",
        "Node.js",
        "React",
        "Vite",
        "Express",
        "Video.js",
        "Tailwind CSS",
        "Docker",
      ],
      links: [
        {
          label: "Github",
          href: "https://github.com/lihaozhe013/streamfile-server-nodejs",
          type: "github",
        },
        {
          label: "Screenshots",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/streamfile-server/",
          type: "external",
        },
      ],
    },
  ];
}
export default Content_Class;
