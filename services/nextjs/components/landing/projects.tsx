import { Card } from '@/components/ui/card';
import Image, { StaticImageData } from 'next/image';
import { Separator } from '../ui/separator';
import { SquareArrowOutUpRight } from 'lucide-react';
import { Button } from '../ui/button';
import SectionHeader from './section-header';
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
          imageSrc={joossamHome}
        />
        <ProjectCard
          title="Jotion"
          description="Collaborative task management tool with real-time updates"
          tags={['React', 'WebSocket', 'MongoDB']}
          imageSrc={jotionHome}
        />
        <ProjectCard
          title="Youni Classic"
          description="Analytics dashboard for social media metrics and insights"
          tags={['Next.js', 'Chart.js', 'Redis']}
          imageSrc={joossamMain}
        />
        <ProjectCard
          title="Jaejadle Church"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc={jaejadleHome}
        />
        <ProjectCard
          title="Portfolio"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc={portfolioHome}
        />
        <ProjectCard
          title="[Seminar] Todo List"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc={todoListHome}
        />
        <ProjectCard
          title="Jovies"
          description="Beautiful weather forecasting application with location detection"
          tags={['React', 'OpenWeather API', 'Geolocation']}
          imageSrc={joviesHome}
        />
      </section>
    </main>
  );
}

