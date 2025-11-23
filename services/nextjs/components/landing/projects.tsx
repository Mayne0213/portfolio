import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Separator } from '../ui/separator';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import SectionHeader from './section-header';

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  imageSrc: string;
}

function ProjectCard({ title, description, tags, imageSrc }: ProjectCardProps) {
  return (
    <Card className="overflow-hidden w-full p-0">
      <div className="aspect-1440/770 relative bg-white">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover border-b-2 border-gray-200"
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
      <div className="px-6 py-4">
          <SquareArrowOutUpRight className="w-6 h-6 cursor-pointer" />
      </div>
    </Card>
  );
}

export default function Projects() {
  return (
    <main className="flex flex-col items-center justify-center gap-16 p-4 tablet:p-8 py-20">
      <SectionHeader
        title="Featured Projects"
        description="Some of my recent work and side projects"
      />

      <section className="grid grid-cols-1 pc:grid-cols-2 gap-6 pc:gap-8 max-w-[1440px] w-full">
        <ProjectCard
          title="Joossam English"
          description="A full-featured online shopping platform with A full-featured online shopping platform with payment integratioA full-featured online shopping pntegration"
          tags={['Next.js', 'Stripe', 'PostgreSQL']}
          imageSrc="/joossam/home.png"
        />
        <ProjectCard
          title="Jotion"
          description="Collaborative task management tool with real-time updates"
          tags={['React', 'WebSocket', 'MongoDB']}
          imageSrc="/jotion/home.png"
        />
        <ProjectCard
          title="Youni Classic"
          description="Analytics dashboard for social media metrics and insights"
          tags={['Next.js', 'Chart.js', 'Redis']}
          imageSrc="/joossam/main.png"
        />
        <ProjectCard
          title="Jaejadle Church"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc="/jaejadle/home.png"
        />
        <ProjectCard
          title="Portfolio"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc="/portfolio/home.png"
        />
        <ProjectCard
          title="[Seminar] Todo List"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc="/todoList/home.png"
        />
        <ProjectCard
          title="Jovies"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc="/jovies/home.png"
        />
      </section>
    </main>
  );
}

