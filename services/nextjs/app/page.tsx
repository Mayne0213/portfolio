import Hero from '@/components/landing/hero';
import Skills from '@/components/landing/skills';
import Projects from '@/components/landing/projects';
import Contact from '@/components/landing/contact';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
