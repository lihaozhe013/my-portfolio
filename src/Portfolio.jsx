import React from 'react'
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
} from '@mui/material'
import {
  GitHub,
  LinkedIn,
  Email,
  Launch,
  School,
  Work,
  Code,
} from '@mui/icons-material'

const Portfolio = () => {
  const projects = [
    {
      title: 'ECE297 Project - GIS Mapping System',
      description: 'A comprehensive Geographic Information System built with C++ and GTK, featuring real-time pathfinding algorithms and interactive map visualization.',
      technologies: ['C++', 'GTK', 'OpenStreetMap API', 'Algorithms'],
      githubUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'ECE243 Runner Game',
      description: 'An embedded systems project featuring a side-scrolling runner game implemented on ARM Cortex-A9 processor with custom graphics and input handling.',
      technologies: ['C', 'ARM Assembly', 'Embedded Systems', 'Graphics'],
      githubUrl: '#',
      demoUrl: '#',
    },
    {
      title: 'Simple ERP System',
      description: 'A web-based Enterprise Resource Planning system with inventory management, user authentication, and reporting capabilities.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      githubUrl: '#',
      demoUrl: '#',
    },
  ]

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'C++', 'C',
    'Java', 'MongoDB', 'PostgreSQL', 'Git', 'Docker', 'AWS', 'Linux',
    'Embedded Systems', 'Algorithms', 'Data Structures'
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <Container maxWidth="lg" className="py-20">
        <Box className="text-center mb-16">
          <Avatar
            sx={{ width: 150, height: 150, margin: '0 auto 2rem' }}
            src="/avatar.jpg"
            alt="Haozhe Li"
          />
          <Typography variant="h2" component="h1" className="text-white mb-4 font-bold">
            Haozhe Li
          </Typography>
          <Typography variant="h5" className="text-gray-300 mb-6">
            Computer Engineering Student & Software Developer
          </Typography>
          <Typography variant="body1" className="text-gray-400 max-w-2xl mx-auto mb-8">
            Passionate about creating innovative solutions through code. Currently pursuing Computer Engineering 
            with experience in full-stack development, embedded systems, and algorithms.
          </Typography>
          <Box className="flex justify-center gap-4">
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
              Contact
            </Button>
          </Box>
        </Box>

        {/* Skills Section */}
        <Paper className="bg-slate-800 p-8 mb-16 rounded-lg">
          <Typography variant="h4" component="h2" className="text-white mb-6 flex items-center">
            <Code className="mr-3" />
            Technical Skills
          </Typography>
          <Box className="flex flex-wrap gap-2">
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
        <Typography variant="h4" component="h2" className="text-white mb-8 flex items-center">
          <Work className="mr-3" />
          Featured Projects
        </Typography>
        <Grid container spacing={4} className="mb-16">
          {projects.map((project, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card className="h-full bg-slate-800 text-white">
                <CardContent className="p-6">
                  <Typography variant="h6" component="h3" className="mb-3 font-semibold">
                    {project.title}
                  </Typography>
                  <Typography variant="body2" className="text-gray-300 mb-4 leading-relaxed">
                    {project.description}
                  </Typography>
                  <Box className="mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Chip
                        key={techIndex}
                        label={tech}
                        size="small"
                        className="mr-1 mb-1 bg-slate-700 text-gray-300"
                      />
                    ))}
                  </Box>
                  <Box className="flex gap-2">
                    <Button
                      size="small"
                      startIcon={<GitHub />}
                      href={project.githubUrl}
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      Code
                    </Button>
                    <Button
                      size="small"
                      startIcon={<Launch />}
                      href={project.demoUrl}
                      className="text-amber-400 hover:text-amber-300"
                    >
                      Demo
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Education Section */}
        <Paper className="bg-slate-800 p-8 rounded-lg">
          <Typography variant="h4" component="h2" className="text-white mb-6 flex items-center">
            <School className="mr-3" />
            Education
          </Typography>
          <Typography variant="h6" className="text-white mb-2">
            Bachelor of Applied Science in Computer Engineering
          </Typography>
          <Typography variant="body1" className="text-indigo-400 mb-2">
            University of Toronto
          </Typography>
          <Typography variant="body2" className="text-gray-300">
            Relevant Coursework: Data Structures & Algorithms, Computer Organization, 
            Software Engineering, Digital Systems, Embedded Systems
          </Typography>
        </Paper>
      </Container>
    </div>
  )
}

export default Portfolio