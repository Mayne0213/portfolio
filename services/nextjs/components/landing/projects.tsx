import { Card } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import { Separator } from '../ui/separator';
import { Github, BookOpen, ExternalLink, BarChart3, FileText } from 'lucide-react';
import { Button } from '../ui/button';
import SectionHeader from './section-header';
import Link from 'next/link';
import joossamHome from '@/public/joossam/home.png';
import jotionHome from '@/public/jotion/home.png';
import joossamMain from '@/public/joossam/main.png';
import jaejadleHome from '@/public/jaejadle/home.png';
import portfolioHome from '@/public/portfolio/home.png';
import todoListHome from '@/public/todoList/home.png';
import joviesHome from '@/public/jovies/home.png';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: StaticImageData;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  docusaurusUrl?: string;
  monitoringUrl?: string;
}

function ProjectCard({ title, description, tags, imageSrc, githubUrl, liveUrl, docsUrl, docusaurusUrl, monitoringUrl }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden w-full p-0">
      <div className="aspect-1440/770 relative bg-white">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover border-b-2 border-gray-200"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="px-6 pt-6 pb-4 flex flex-col gap-3">
        <h3 className="font-semibold text-2xl">{title}</h3>
        <p className="text-muted-foreground font-extralight">{description}</p>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Button key={tag} variant="outline" className="text-xs px-3 py-1">
              {tag}
            </Button>
          ))}
        </div>
      </div>
      <div className="px-6">
        <Separator />
      </div>
      <div className="px-6 py-4 flex gap-4 flex-wrap">
        {liveUrl && (
          <Link href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <ExternalLink className="w-5 h-5" />
            </div>
          </Link>
        )}
        {githubUrl && (
          <Link href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Github className="w-5 h-5" />
            </div>
          </Link>
        )}
        {docsUrl && (
          <Link href={docsUrl} target="_blank" rel="noopener noreferrer" aria-label="Documentation">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <BookOpen className="w-5 h-5" />
            </div>
          </Link>
        )}
        {docusaurusUrl && (
          <Link href={docusaurusUrl} target="_blank" rel="noopener noreferrer" aria-label="Docusaurus">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <FileText className="w-5 h-5" />
            </div>
          </Link>
        )}
        {monitoringUrl && (
          <Link href={monitoringUrl} target="_blank" rel="noopener noreferrer" aria-label="Monitoring">
            <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <BarChart3 className="w-5 h-5" />
            </div>
          </Link>
        )}
      </div>
    </Card>
  );
}

export default function Projects() {
  return (
    <main className="flex bg-muted flex-col items-center justify-center gap-16 p-4 tablet:p-8 py-20">
      <SectionHeader
        title="Featured Projects"
        description="Some of my recent work and side projects"
      />

      <section className="grid grid-cols-1 pc:grid-cols-2 gap-6 pc:gap-8 max-w-[1440px] w-full">
        <ProjectCard
          title="Joossam English"
          description="English learning platform for Korean students"
          tags={['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'NextAuth.js']}
          imageSrc={joossamHome}
          githubUrl="https://github.com/minjo-on/joossam"
          liveUrl="https://joossam.com"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="Jotion"
          description="Notion-like note-taking application"
          tags={['Next.js', 'React', 'Convex', 'Clerk', 'BlockNote']}
          imageSrc={jotionHome}
          githubUrl="https://github.com/minjo-on/jotion"
          liveUrl="https://jotion.minjo.xyz"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="Youni Classic"
          description="Church community management system"
          tags={['Next.js', 'TypeScript', 'MySQL', 'Prisma']}
          imageSrc={joossamMain}
          githubUrl="https://github.com/minjo-on/youniClassic"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="Jaejadle Church"
          description="Church website with event management"
          tags={['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui']}
          imageSrc={jaejadleHome}
          githubUrl="https://github.com/minjo-on/jaejadle"
          liveUrl="https://jaejadle.com"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="Portfolio"
          description="Personal portfolio website with Kubernetes deployment"
          tags={['Next.js', 'TypeScript', 'Docker', 'Kubernetes', 'ArgoCD']}
          imageSrc={portfolioHome}
          githubUrl="https://github.com/minjo-on/portfolio"
          liveUrl="https://minjo.xyz"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="[Seminar] Todo List"
          description="Educational todo list application for teaching"
          tags={['React', 'TypeScript', 'Vite', 'Tailwind CSS']}
          imageSrc={todoListHome}
          githubUrl="https://github.com/minjo-on/todoList"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
        <ProjectCard
          title="Jovies"
          description="Movie discovery and tracking application"
          tags={['Next.js', 'TypeScript', 'TMDB API', 'Tailwind CSS']}
          imageSrc={joviesHome}
          githubUrl="https://github.com/minjo-on/jovies"
          liveUrl="https://jovies.minjo.xyz"
          docsUrl="#"
          docusaurusUrl="#"
          monitoringUrl="#"
        />
      </section>
    </main>
  );
}

