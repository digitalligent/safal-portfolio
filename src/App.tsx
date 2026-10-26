
import { useState } from "react";

import profileData from "./data/profile.json";
import servicesData from "./data/services.json";
import projectsData from "./data/projects.json";
import skillsData from "./data/skills.json";
import timelineData from "./data/timeline.json";

import type {
  Profile,
  Service,
  Project,
  Skill,
  TimelineEntry,
} from "./types";

import { useTheme } from "./hooks/useTheme";
import { useActiveSection } from "./hooks/useActiveSection";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Services from "./components/Services";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
import ProjectModal from "./components/ProjectModal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";

import MusicPlayer from "./MusicPlayer";

const profile: Profile = profileData;
const services: Service[] = servicesData;
const projects: Project[] = projectsData;
const skills: Skill[] = skillsData;
const timeline: TimelineEntry[] = timelineData;

function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  function closeProjectModal() {
    setSelectedProject(null);
  }

  return (
    <>
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        activeSection={activeSection}
      />

      <main>
        <Hero profile={profile} />

        <Stats stats={profile.stats} />

        <Services services={services} />

        <About
          profile={profile}
          skills={skills}
          timeline={timeline}
        />

        <Portfolio
          projects={projects}
          onOpenProject={setSelectedProject}
        />

        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />

      {selectedProject !== null && (
        <ProjectModal
          project={selectedProject}
          onClose={closeProjectModal}
        />
      )}

      <BackToTop />

      <MusicPlayer />
    </>
  );
}

export default App;
