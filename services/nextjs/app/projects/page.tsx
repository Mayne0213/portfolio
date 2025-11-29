import SectionHeader from '@/components/landing/section-header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, BookOpen, BarChart3, Github } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import joossamHome from '@/public/joossam/home.png';
import jotionHome from '@/public/jotion/home.png';
import joossamMain from '@/public/joossam/main.png';
import jaejadleHome from '@/public/jaejadle/home.png';
import portfolioHome from '@/public/portfolio/home.png';
import todoListHome from '@/public/todoList/home.png';
import joviesHome from '@/public/jovies/home.png';

interface ProjectData {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  imageSrc: StaticImageData;
  githubUrl?: string;
  liveUrl?: string;
  docsUrl?: string;
  monitoringUrl?: string;
  featured?: boolean;
}

const PROJECTS_DATA: ProjectData[] = [
  {
    title: 'Joossam English',
    description: 'English learning platform for Korean students',
    longDescription: 'A comprehensive English learning platform featuring interactive lessons, practice exercises, and progress tracking. Built with Next.js for optimal performance and SEO.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'MySQL', 'NextAuth.js', 'Tailwind CSS'],
    imageSrc: joossamHome,
    githubUrl: 'https://github.com/minjo-on/joossam',
    liveUrl: 'https://joossam.com',
    docsUrl: '#',
    monitoringUrl: '#',
    featured: true,
  },
  {
    title: 'Jotion',
    description: 'Notion-like note-taking application',
    longDescription: 'A powerful note-taking and knowledge management application inspired by Notion. Features rich text editing, hierarchical organization, and real-time collaboration.',
    tags: ['Next.js', 'React', 'Convex', 'Clerk', 'BlockNote', 'Tailwind CSS'],
    imageSrc: jotionHome,
    githubUrl: 'https://github.com/minjo-on/jotion',
    liveUrl: 'https://jotion.minjo.xyz',
    docsUrl: '#',
    monitoringUrl: '#',
    featured: true,
  },
  {
    title: 'Youni Classic',
    description: 'Church community management system',
    longDescription: 'A comprehensive church management system with member directory, event scheduling, and communication tools. Designed for efficient church administration.',
    tags: ['Next.js', 'TypeScript', 'MySQL', 'Prisma', 'Tailwind CSS'],
    imageSrc: joossamMain,
    githubUrl: 'https://github.com/minjo-on/youniClassic',
    docsUrl: '#',
    monitoringUrl: '#',
    featured: true,
  },
  {
    title: 'Jaejadle Church',
    description: 'Church website with event management',
    longDescription: 'Modern church website featuring event calendars, sermon archives, and member portals. Built with focus on accessibility and mobile responsiveness.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Shadcn/ui'],
    imageSrc: jaejadleHome,
    githubUrl: 'https://github.com/minjo-on/jaejadle',
    liveUrl: 'https://jaejadle.com',
    docsUrl: '#',
    monitoringUrl: '#',
  },
  {
    title: 'Portfolio',
    description: 'Personal portfolio website with Kubernetes deployment',
    longDescription: 'My personal portfolio website showcasing projects and skills. Deployed on self-managed Kubernetes cluster with GitOps workflow using ArgoCD.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Docker', 'Kubernetes', 'ArgoCD'],
    imageSrc: portfolioHome,
    githubUrl: 'https://github.com/minjo-on/portfolio',
    liveUrl: 'https://minjo.xyz',
    docsUrl: '#',
    monitoringUrl: '#',
  },
  {
    title: '[Seminar] Todo List',
    description: 'Educational todo list application for teaching',
    longDescription: 'A todo list application created for teaching full-stack development concepts. Covers React fundamentals, state management, and API integration.',
    tags: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    imageSrc: todoListHome,
    githubUrl: 'https://github.com/minjo-on/todoList',
    docsUrl: '#',
    monitoringUrl: '#',
  },
  {
    title: 'Jovies',
    description: 'Movie discovery and tracking application',
    longDescription: 'A movie discovery platform integrating with TMDB API. Features movie search, ratings, reviews, and personal watchlists.',
    tags: ['Next.js', 'TypeScript', 'TMDB API', 'Tailwind CSS'],
    imageSrc: joviesHome,
    githubUrl: 'https://github.com/minjo-on/jovies',
    liveUrl: 'https://jovies.minjo.xyz',
    docsUrl: '#',
    monitoringUrl: '#',
  },
];

function ProjectCard({
  title,
  description,
  longDescription,
  tags,
  imageSrc,
  githubUrl,
  liveUrl,
  docsUrl,
  monitoringUrl,
  featured,
}: ProjectData) {
  return (
    <Card className="overflow-hidden w-full p-0 hover:shadow-lg transition-shadow">
      {/* Image Section */}
      <div className="aspect-1440/770 relative bg-white">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover border-b-2 border-gray-200"
        />
        {featured && (
          <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="px-6 pt-6 pb-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold text-2xl">{title}</h3>
          <p className="text-muted-foreground">{description}</p>
          <p className="text-sm text-muted-foreground">{longDescription}</p>
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <Button key={tag} variant="outline" size="sm" className="text-xs">
              {tag}
            </Button>
          ))}
        </div>
      </div>

      {/* Links Section */}
      <div className="px-6">
        <Separator />
      </div>
      <div className="px-6 py-4 flex gap-4">
        {githubUrl && (
          <Link
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
        )}
        {liveUrl && (
          <Link
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Live Demo"
          >
            <ExternalLink className="w-5 h-5" />
          </Link>
        )}
        {docsUrl && (
          <Link
            href={docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Documentation"
          >
            <BookOpen className="w-5 h-5" />
          </Link>
        )}
        {monitoringUrl && (
          <Link
            href={monitoringUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Monitoring"
          >
            <BarChart3 className="w-5 h-5" />
          </Link>
        )}
      </div>
    </Card>
  );
}

export default function ProjectsPage() {
  return (
    <main className="page-container">
      <SectionHeader
        title="Projects"
        description="A collection of my web development projects, from full-stack applications to educational demonstrations"
      />

      <section className="grid grid-cols-1 pc:grid-cols-2 gap-6 pc:gap-8 max-w-[1400px]">
        {PROJECTS_DATA.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </section>
    </main>
  );
}
