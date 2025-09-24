import React from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  Launch,
  School,
  Work,
  Code,
  Home
} from "@mui/icons-material";
import { DarkMode, LightMode } from '@mui/icons-material'
import { useColorMode } from './App'
import avatarImage from "./assets/avatar.png";

const Portfolio = () => {
  const projects = [
    {
      title: "TradeFlow System",
      description:
        "A web-based lightweight modular platform for managing trade orders, inventory, and pricing with stateless authentication, role-based access control, i18n, and excel export.",
      technologies: [
        "React",
        "Node.js",
        "Express",
        "SQLite",
        "AWS",
        "RHEL",
        "Debian",
        "HTML",
        "CSS",
        "Tailwind CSS",
        "AntD",
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
        "Express",
        "Multer",
        "Rust",
        "Video.js",
        "Tailwind CSS",
        "HTML",
        "JavaScript"
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
          href: "https://lihaozhe013.github.io/lihaozhe-website/posts/gis-route-optimization-application-ece297-course-project/",
          type: "external",
        },
      ],
    },
    {
      title: "Runner Game - ECE243 Project",
      description:
        "An embedded systems project featuring a runner game implemented on RISC-V processor with custom graphics and input handling.",
      technologies: ["C", "RISC-V Assembly", "Embedded Systems"],
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
      technologies: ["Verilog", "Embedded Systems", "Quartus Prime", "ModelSim", "DE1-SoC FPGA Board"],
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

  const skills = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "C++",
    "C",
    "Java",
    "SQLite",
    "Git",
    "DevOps",
    "AWS",
    "RHEL",
    "Debian",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "AntD",
  ];

  const { mode, toggleColorMode } = useColorMode()

  return (
    <div className="min-h-screen transition-colors bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      {/* Color Mode Toggle */}
      <Box className="fixed top-4 right-4 z-50">
        <Tooltip title={mode === 'dark' ? 'Toggle Light Mode' : 'Toggle Dark Mode'}>
          <IconButton
            onClick={toggleColorMode}
            aria-label="toggle color mode"
            size="medium"
            className="backdrop-blur bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 shadow ring-1 ring-black/5 dark:ring-white/10"
            sx={{ borderRadius: '14px' }}
          >
            {mode === 'dark' ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      {/* Hero Section */}
      <Container maxWidth="lg" className="py-20">
        <Box className="text-center mb-16">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              margin: "0 auto 2rem",
              borderRadius: "20px",
            }}
            src={avatarImage}
            alt="Haozhe Li"
          />
          <Typography
            variant="h2"
            component="h1"
            className="mb-4 pb-4 font-bold text-slate-900 dark:text-white"
          >
            Haozhe Li
          </Typography>
          <Typography variant="h5" className="pb-6 mb-6 text-slate-600 dark:text-gray-300">
            3rd Year Computer Engineering Student @ UofT
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className="mb-8 pb-8 text-slate-600 dark:text-gray-400"
            sx={{ textAlign: "center", maxWidth: "42rem", mx: "auto" }}
          >
            Passionate about creating innovative solutions through code.
            Currently learning full-stack development, embedded systems, and
            algorithms.
          </Typography>
          <Box className="flex justify-center gap-4 mt-3">
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com/lihaozhe013"
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-700"
              sx={{ borderRadius: "12px" }}
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              startIcon={<LinkedIn />}
              href="https://linkedin.com/in/lihaozhe013"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700"
              sx={{ borderRadius: "12px" }}
            >
              LinkedIn
            </Button>
            <Button
              variant="contained"
              startIcon={<Home />}
              href="https://lihaozhe013.github.io/lihaozhe-website/"
              className="border-gray-400 text-slate-700 dark:border-gray-500 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400"
              sx={{ borderRadius: "12px" }}
            >
              My Website
            </Button>
            <Button
              variant="contained"
              startIcon={<Email />}
              href="mailto:lihaozhe013@gmail.com"
              className="border-gray-400 text-slate-700 dark:border-gray-500 dark:text-gray-300 hover:border-gray-500 dark:hover:border-gray-400"
              sx={{ borderRadius: "12px" }}
            >
              Email Me
            </Button>
          </Box>
        </Box>

        {/* Skills Section */}
        <Typography variant="h5" component="h2" className="mb-6 pb-4 flex items-center text-slate-900 dark:text-white">
          <Code className="mr-3" />
          Technical Skills
        </Typography>
        <Paper className="p-6 mb-10 bg-white dark:bg-slate-800" sx={{ borderRadius: "20px" }}>
          <Box className="flex flex-wrap gap-2 mt-2">
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
                sx={{ borderRadius: "12px" }}
              />
            ))}
          </Box>
        </Paper>

        {/* Projects Section */}
        <Typography variant="h5" component="h2" className="mb-8 flex items-center text-slate-900 dark:text-white">
          <Work className="mr-3" />
          Featured Projects
        </Typography>
        <Grid container spacing={4} className="mb-10 pt-4">
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card
                className="h-full bg-yellow-50 text-slate-800 dark:bg-slate-800 dark:text-white transition-colors"
                sx={{ borderRadius: "16px" }}
              >
                <CardContent sx={{ padding: "2.5rem !important" }}>
                  <Typography
                    variant="h6"
                    component="h3"
                    className="mb-4 pb-4 font-semibold"
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="mb-6 pb-6 leading-relaxed text-slate-600 dark:text-gray-300"
                  >
                    {project.description}
                  </Typography>
                  <Box className="mb-6 pt-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        className="mr-1 mb-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-gray-300"
                        sx={{ borderRadius: "10px" }}
                      />
                    ))}
                  </Box>
                  <Box className="flex flex-wrap gap-2">
                    {(
                      project.links ?? [
                        {
                          label: "GitHub",
                          href: project.githubUrl,
                          type: "github",
                        },
                        {
                          label: "Demo",
                          href: project.demoUrl,
                          type: "external",
                        },
                      ]
                    ).map((link, i) => (
                      <Button
                        key={i}
                        size="small"
                        startIcon={
                          link.type === "github" ? <GitHub /> : <Launch />
                        }
                        href={link.href}
                        className={
                          link.type === "github"
                            ? "text-indigo-600 hover:text-amber-500 dark:text-indigo-400 dark:hover:text-amber-300"
                            : "text-amber-600 hover:text-amber-500 dark:text-indigo-400 dark:hover:text-amber-300"
                        }
                        sx={{ borderRadius: "10px" }}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Education Section */}
        <Typography variant="h5" component="h2" className="mb-6 pb-4 flex items-center text-slate-900 dark:text-white">
          <School className="mr-3" />
          Education
        </Typography>
        <Paper className="p-8 bg-white dark:bg-slate-800" sx={{ borderRadius: "20px" }}>
          <Typography variant="h6" className="mb-2 text-slate-900 dark:text-white">
            B.A.Sc in Computer Engineering
          </Typography>
          <Typography variant="body1" className="pb-4 text-indigo-600 dark:text-indigo-400">
            University of Toronto
          </Typography>
          <Typography variant="body2" className="text-slate-600 dark:text-gray-300">
            Relevant Coursework: Algorithms and Data Structures, Computer
            Organization, Communication Systems, Digital Systems, Introductory
            Electronics
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Portfolio;
