import Hero from '@/components/landing/hero';
import About from '@/components/landing/about';
import Skills from '@/components/landing/skills';
import Projects from '@/components/landing/projects';
import Contact from '@/components/landing/contact';
import GrafanaPage from '@/components/landing/grafana';

export default function Home() {
  return (
    <div className="flex flex-col">
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="monitoring">
        <GrafanaPage />
      </div>
      <div id="contact">
        <Contact />
      </div>
    </div>
  );
}
