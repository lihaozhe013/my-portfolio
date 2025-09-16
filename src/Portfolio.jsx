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
} from "@mui/material";
import {
  GitHub,
  LinkedIn,
  Email,
  Launch,
  School,
  Work,
  Code,
} from "@mui/icons-material";

const Portfolio = () => {
  const projects = [
    {
      title: "Simple ERP System",
      description:
        "A web-based Enterprise Resource Planning system with inventory management, user authentication, and reporting capabilities.",
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
        { label: "GitHub", href: "https://github.com/lihaozhe013/myf-lightweight-ERP-system", type: "github" },
        { label: "Demo", href: "https://lihaozhe013.github.io/lihaozhe-portfolio/posts/simple-erp-system/", type: "external" },
      ],
    },
    {
      title: "ECE297 Project - GIS Mapping System",
      description:
        "A comprehensive Geographic Information System built with C++ and GTK, featuring real-time pathfinding algorithms and interactive map visualization.",
      technologies: [
        "C++",
        "GTK",
        "TomTom API",
        "Algorithms",
        "Dijkstra",
        "A*",
        "Greedy Algorithm"
      ],
      links: [
        { label: "Presentation", href: "https://lihaozhe013.github.io/lihaozhe-portfolio/documents/ECE297-OP2.pdf", type: "external" },
        { label: "Detail", href: "https://lihaozhe013.github.io/lihaozhe-portfolio/posts/ece297-project/", type: "external" },
      ],
    },
    {
      title: "ECE243 Runner Game",
      description:
        "An embedded systems project featuring a runner game implemented on RISC-V processor with custom graphics and input handling.",
      technologies: ["C", "RISC-V Assembly", "Embedded Systems"],
      links: [
        { label: "GitHub", href: "https://github.com/lihaozhe013/ece243_runner_game", type: "github" },
        { label: "Detail", href: "https://lihaozhe013.github.io/lihaozhe-portfolio/posts/ece243-project-runner-game/", type: "external" },
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
    "MongoDB",
    "PostgreSQL",
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

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <Container maxWidth="lg" className="py-20">
        <Box className="text-center mb-16">
          <Avatar
            sx={{ width: 150, height: 150, margin: "0 auto 2rem" }}
            src="/src/assets/avatar.jpg"
            alt="Haozhe Li"
          />
          <Typography
            variant="h2"
            component="h1"
            className="text-white mb-4 font-bold"
          >
            Haozhe Li
          </Typography>
          <Typography variant="h5" className="text-gray-300 mb-6">
            3rd Year Computer Engineering Student @ UofT
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className="text-gray-400 mb-8"
            sx={{ textAlign: "center", maxWidth: "42rem", mx: "auto" }}
          >
            Passionate about creating innovative solutions through code.
            Currently pursuing Computer Engineering with experience in
            full-stack development, embedded systems, and algorithms.
          </Typography>
          <Box className="flex justify-center gap-4 mt-3">
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com/lihaozhe013"
              target="_blank"
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              startIcon={<LinkedIn />}
              href="https://linkedin.com/in/lihaozhe013"
              target="_blank"
              className="bg-blue-600 hover:bg-blue-700"
            >
              LinkedIn
            </Button>
            <Button
              variant="outlined"
              startIcon={<Email />}
              href="mailto:lihaozhe013@gmail.com"
              className="border-gray-500 text-gray-300 hover:border-gray-400"
            >
              Email Me
            </Button>
          </Box>
        </Box>

        {/* Skills Section */}
        <Paper className="bg-slate-800 p-8 mb-10 rounded-lg">
          <Typography
            variant="h4"
            component="h2"
            className="text-white mb-6 flex items-center"
          >
            <Code className="mr-3" />
            Technical Skills
          </Typography>
          <Box className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                className="bg-indigo-600 text-white hover:bg-indigo-700"
              />
            ))}
          </Box>
        </Paper>

        {/* Projects Section */}
        <Typography
          variant="h4"
          component="h2"
          className="text-white mb-8 flex items-center"
        >
          <Work className="mr-3" />
          Featured Projects
        </Typography>
        <Grid container spacing={4} className="mb-10 pt-4">
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card className="h-full bg-slate-800 text-white">
                <CardContent className="p-6">
                  <Typography
                    variant="h6"
                    component="h3"
                    className="mb-3 font-semibold"
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    className="text-gray-300 mb-4 leading-relaxed"
                  >
                    {project.description}
                  </Typography>
                  <Box className="mb-4 pt-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        className="mr-1 mb-1 bg-slate-700 text-gray-300"
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
                            ? "text-indigo-400 hover:text-indigo-300"
                            : "text-amber-400 hover:text-amber-300"
                        }
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
        <Paper className="bg-slate-800 p-8 rounded-lg">
          <Typography
            variant="h4"
            component="h2"
            className="text-white mb-6 flex items-center"
          >
            <School className="mr-3" />
            Education
          </Typography>
          <Typography variant="h6" className="text-white mb-2">
            B.A.Sc in Computer Engineering
          </Typography>
          <Typography variant="body1" className="text-indigo-400 mb-2">
            University of Toronto
          </Typography>
          <Typography variant="body2" className="text-gray-300">
            Relevant Coursework: Algorithms and Data Structures, Computer
            Organization, Communication Systems, Digital Systems, Introductory Electronics
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Portfolio;
