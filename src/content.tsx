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
    "Passionate about creating innovative solutions through code. Currently learning full-stack development, embedded systems, and algorithms.";

  relevant_coursework: string[] = [
    "Algorithms and Data Structures",
    "Computer Organization",
    "Software Design and Communication",
    "Communication Systems",
    "Digital Systems",
    "Introductory Electronics",
  ];

  skills: string[] = [
    "TypeScript",
    "React.js",
    "Node.js",
    "C",
    "C++",
    "C#",
    "Java",
    "Python",
    "Git",
    "GitHub",
    "GitHub Actions",
    "AWS",
    "Ubuntu",
    "SQLite",
    "Tailwind CSS",
    "Ant Design",
    "Figma",
    "LaTeX"
  ];

  projects: Project[] = [
    {
      title: "TradeFlow System",
      description:
        "A web-based lightweight modular platform for managing trade orders, inventory, and pricing with stateless authentication, role-based access control, i18n, and excel export.",
      technologies: [
        "React.js",
        "Node.js",
        "SQLite",
        "Vite",
        "AWS",
        "Tailwind CSS",
        "Ant Design",
        "TypeScript",
        "JavaScript",
        "Nginx",
      ],
      links: [
        {
          label: "GitHub",
          href: "https://github.com/lihaozhe013/myf-tradeflow-core",
          type: "github",
        },
        {
          label: "Demo",
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/tradeflow-system/",
          type: "external",
        },
      ],
    },
    {
      title: "StreamFile Server",
      description:
        "An lightweight, database-free static resource hosting server supporting markdown, video/audio playback, webpage hosting, private link generation, file upload, and search functionality.",
      technologies: [
        "Go",
        "Gin",
        "Node.js",
        "React.js",
        "Rust",
        "Video.js",
        "Tailwind CSS",
        "HTML",
        "TypeScript",
      ],
      links: [
        {
          label: "GitHub (Go Version)",
          href: "https://github.com/lihaozhe013/streamfile-server-go",
          type: "github",
        },
        {
          label: "Github (Node.js Version)",
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
    {
      title: "GIS Route Optimization Application - ECE297 Project",
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
      title: "Runner Game - ECE243 Project",
      description:
        "An embedded systems project featuring a runner game implemented on RISC-V processor with custom graphics and input handling.",
      technologies: ["C", "RISC-V Assembly", "Embedded Systems", "CPULator"],
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
      title: "Greedy Mouse Game - ECE241 Project",
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
      title: "Git Snapshot Tool",
      description:
        "A tool with GUI that can auto fetch, pull, commit and push markdown notes to github with one click.",
      technologies: ["Tauri", "Rust", "JavaScript"],
      links: [
        {
          label: "Github",
          href: "https://github.com/lihaozhe013/git-snapshot-tauri",
          type: "github",
        },
      ],
    },
  ];
}
export default Content_Class;
