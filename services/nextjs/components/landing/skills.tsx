import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Code, Server, Layout, Globe, Router, TestTube2, LucideIcon } from 'lucide-react';
import SectionHeader from './section-header';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  skills: string[];
}

function SkillCard({ icon: Icon, title, description, skills }: SkillCardProps) {
  return (
    <Card className="p-5 max-w-[400px] h-full gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-center min-w-12 min-h-12 rounded-full bg-gray-100 dark:bg-neutral-800 w-fit">
          <Icon className="min-w-8 min-h-8" />
        </div>
        <CardTitle>
          <h3 className="text-lg">{title}</h3>
        </CardTitle>
      </div>

      <div className="flex flex-col gap-6 justify-between h-full">
        <p className="font-extralight">{description}</p>
        <div className="flex flex-col gap-4">
          <Separator />
          <div className="flex gap-4 flex-wrap">
            {skills.map((skill) => (
              <p key={skill} className="text-sm text-gray-600 dark:text-gray-100 font-extralight">
                {skill}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Skills() {
  return (
    <div className="bg-gray-100 dark:bg-neutral-800">
      <main className="flex flex-col items-center justify-center gap-16 p-4 tablet:p-8 py-20">
        <SectionHeader
          title="Skills & Expertise"
          description="Technologies and tools I work with to build amazing web applications"
        />

        <div className="grid grid-cols-1 tablet:grid-cols-2 pc:grid-cols-3 gap-6">
          <SkillCard
            icon={Code}
            title="Frontend Development"
            description="Building responsive and interactive user interfaces with modern frameworks and libraries"
            skills={['React', 'Next.js', 'TypeScript', 'Tailwind CSS']}
          />
          <SkillCard
            icon={Server}
            title="Backend Development"
            description="Developing robust server-side applications and RESTful APIs"
            skills={['Node.js', 'Express', 'PostgreSQL', 'MongoDB']}
          />
          <SkillCard
            icon={Layout}
            title="DevOps & Tools"
            description="Managing deployment pipelines and development workflows"
            skills={['Git', 'Docker','K8s', 'ArgoCD', 'AWS', 'CI/CD']}
          />
          <SkillCard
            icon={TestTube2}
            title=" Software Testing"
            description="End to End & Unit Tests, building high rate requests scenarios (Stress Tests)."
            skills={['Jest', 'Cypress', 'Puppeteer', 'Playwright']}
          />
          <SkillCard
            icon={Globe}
            title="Performance & Digital Presence"
            description="Performance Testing, Digital Presence, SEO, Accessibility, and more."
            skills={['Lighthouse', 'Google Search Console', 'Google Analytics', 'Google Tag Manager']}
          />
          <SkillCard
            icon={Router}
            title="Web Hosting"
            description="Web Hosting, Cloud Computing, and more."
            skills={['AWS', 'DigitalOcean', 'Vercel', 'Netlify', 'Cloudflare']}
          />
        </div>
      </main>
    </div>
  );
}

