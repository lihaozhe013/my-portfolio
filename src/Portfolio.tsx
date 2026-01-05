import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
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
  Home,
  DarkMode,
  LightMode,
} from "@mui/icons-material";
import avatarImage from "@/assets/photo.jpg";
import { useColorMode } from "@/App";

import Content_Class from "@/content";

const Content = new Content_Class();

const Portfolio = () => {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <div className="min-h-screen transition-colors bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <Box className="fixed top-4 right-4 z-50">
        <Tooltip
          title={mode === "dark" ? "Toggle Light Mode" : "Toggle Dark Mode"}
        >
          <IconButton
            onClick={toggleColorMode}
            aria-label="toggle color mode"
            size="medium"
            className="backdrop-blur bg-white/70 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-700 shadow ring-1 ring-black/5 dark:ring-white/10"
            sx={{ borderRadius: "14px" }}
          >
            {mode === "dark" ? (
              <LightMode fontSize="small" />
            ) : (
              <DarkMode fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Container maxWidth="lg" className="py-20">
        <Box className="text-center mb-16">
          <Avatar
            sx={{
              width: 150,
              height: 150,
              margin: "0 auto 2rem",
              borderRadius: "1000px",
            }}
            src={avatarImage}
            alt="Haozhe Li"
          />
          <Typography
            variant="h2"
            component="h1"
            className="mb-4 pb-4 font-bold! text-slate-900 dark:text-white"
          >
            Haozhe Li
          </Typography>
          <Typography
            variant="h5"
            className="pb-6 mb-6 text-slate-600 dark:text-gray-300"
          >
            {Content.headline}
          </Typography>
          <Typography
            variant="body1"
            align="center"
            className="mb-8 pb-8 text-slate-600 dark:text-gray-400"
            sx={{ textAlign: "center", maxWidth: "42rem", mx: "auto" }}
          >
            {Content.aboutMe}
          </Typography>
          <Box className="flex justify-center gap-4 mt-3">
            <Button
              variant="contained"
              startIcon={<GitHub />}
              href="https://github.com/lihaozhe013"
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-amber-500! dark:bg-indigo-500! dark:hover:bg-amber-500!"
              sx={{ borderRadius: "12px" }}
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              startIcon={<LinkedIn />}
              href="https://linkedin.com/in/lihaozhe013"
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-amber-500! dark:bg-indigo-500! dark:hover:bg-amber-500!"
              sx={{ borderRadius: "12px" }}
            >
              LinkedIn
            </Button>
            <Button
              variant="contained"
              startIcon={<Home />}
              href="https://lihaozhe013.github.io/lihaozhe-website/"
              target="_blank"
              rel="noreferrer"
              className="bg-indigo-600 hover:bg-amber-500! dark:bg-indigo-500! dark:hover:bg-amber-500!"
              sx={{ borderRadius: "12px" }}
            >
              My Website
            </Button>
            <Button
              variant="contained"
              startIcon={<Email />}
              href="mailto:lihaozhe013@gmail.com"
              className="bg-indigo-600 hover:bg-amber-500! dark:bg-indigo-500! dark:hover:bg-amber-500!"
              sx={{ borderRadius: "12px" }}
            >
              Email Me
            </Button>
          </Box>
        </Box>

        <Typography
          variant="h5"
          component="h2"
          className="mb-6 pb-4 flex items-center text-slate-900 dark:text-white"
        >
          <Code className="mr-3" />
          Technical Skills
        </Typography>
        <Paper
          className="p-6 mb-10 bg-white dark:bg-slate-800"
          sx={{ borderRadius: "20px" }}
        >
          <Box className="flex flex-wrap gap-2 mt-2">
            {Content.skills.map((skill) => (
              <Chip
                key={skill}
                label={skill}
              />
            ))}
          </Box>
        </Paper>

        <Typography
          variant="h5"
          component="h2"
          className="mb-8 flex items-center text-slate-900 dark:text-white"
        >
          <Work className="mr-3" />
          Featured Projects
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 pt-4">
          {Content.projects.map((project) => (
            <Box key={project.title} className="flex">
              <Card
                sx={{
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                }}
              >
                <CardContent sx={{ p: 4, flexGrow: 1 }}>
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
                    {project.technologies.map((tech) => (
                      <Chip
                        key={tech}
                        label={tech}
                        size="small"
                        className="mr-1 mb-2 bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-gray-300"
                        sx={{ borderRadius: "10px" }}
                      />
                    ))}
                  </Box>
                  <Box className="flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <Button
                        key={link.label}
                        size="small"
                        variant="text"
                        color="inherit"
                        startIcon={
                          link.type === "github" ? <GitHub /> : <Launch />
                        }
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={ "text-indigo-600! hover:text-amber-500! dark:text-indigo-400! dark:hover:text-amber-500!"
                        }
                        sx={{ borderRadius: "10px" }}
                      >
                        {link.label}
                      </Button>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>

        <Typography
          variant="h5"
          component="h2"
          className="mb-6 pb-4 flex items-center text-slate-900 dark:text-white"
        >
          <School className="mr-3" />
          Education
        </Typography>
        <Paper
          className="p-8 bg-white dark:bg-slate-800"
          sx={{ borderRadius: "20px" }}
        >
          <Typography
            variant="h6"
            className="mb-2 text-slate-900 dark:text-white"
          >
            B.A.Sc in Computer Engineering
          </Typography>
          <Typography
            variant="body1"
            className="pb-4 text-indigo-600 dark:text-indigo-400"
          >
            University of Toronto
          </Typography>
          <Typography
            variant="body2"
            className="text-slate-600 dark:text-gray-300"
          >
            Relevant Coursework: {Content.relevant_coursework.join(", ")}
          </Typography>
        </Paper>
      </Container>
    </div>
  );
};

export default Portfolio;
