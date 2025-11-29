'use client';

import { Card, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Code, Server, Layout, Globe, Router, TestTube2, LucideIcon, ChevronDown } from 'lucide-react';
import SectionHeader from './section-header';
import { useState } from 'react';

interface SkillCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  mainSkills: string[];
  subSkills: string[];
}

function SkillCard({ icon: Icon, title, description, mainSkills, subSkills }: SkillCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="p-4 smalltablet:p-5 w-full h-full gap-3 smalltablet:gap-4 relative">
      {/* Toggle Button - Top Right Corner */}
      {subSkills.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute top-4 right-4 smalltablet:top-6 smalltablet:right-6 p-2 h-8 w-8"
        >
          <ChevronDown className={`w-16 h-16 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </Button>
      )}

      <div className="flex flex-col gap-3 smalltablet:gap-4">
        <div className="flex items-center justify-center min-w-10 min-h-10 smalltablet:min-w-12 smalltablet:min-h-12 rounded-full bg-muted w-fit">
          <Icon className="min-w-6 min-h-6 smalltablet:min-w-8 smalltablet:min-h-8" />
        </div>
        <CardTitle>
          <h3 className="text-base smalltablet:text-lg">{title}</h3>
        </CardTitle>
      </div>

      <div className="flex flex-col gap-4 smalltablet:gap-6 justify-between h-full">
        <p className="text-sm smalltablet:text-base font-extralight">{description}</p>
        <div className="flex flex-col gap-3 smalltablet:gap-4">
          <Separator />
          {/* Main Skills */}
          <div className="flex gap-2 smalltablet:gap-3 flex-wrap">
            {mainSkills.map((skill) => (
              <span key={skill} className="text-xs smalltablet:text-sm font-medium text-gray-800 dark:text-gray-100">
                {skill}
              </span>
            ))}
          </div>
          {/* Sub Skills - Toggleable */}
          {subSkills.length > 0 && (
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
              <Separator className="opacity-50 mb-3 smalltablet:mb-4" />
              <div className="flex gap-2 smalltablet:gap-3 flex-wrap">
                {subSkills.map((skill) => (
                  <span key={skill} className="text-xs smalltablet:text-sm font-extralight text-gray-600 dark:text-gray-300 opacity-80">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

export default function Skills() {
  return (
    <main className="flex max-w-7xl mx-auto flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
      <SectionHeader
        title="Skills & Expertise"
        description="Technologies and tools I work with to build amazing web applications"
      />

      <div className="grid grid-cols-1 smalltablet:grid-cols-2 desktop:grid-cols-3 gap-4 smalltablet:gap-5 tablet:gap-6">
        <SkillCard
          icon={Code}
          title="Frontend Development"
          description="Building responsive and interactive user interfaces with modern frameworks and libraries"
          mainSkills={['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js']}
          subSkills={['Tailwind', 'Zustand', 'FSD', 'Radix UI', 'Shadcn/ui', 'Chart.js', 'React-Query', 'React-Hook-Form', 'Zod']}
        />
        <SkillCard
          icon={Server}
          title="Backend Development"
          description="Developing robust server-side applications and RESTful APIs"
          mainSkills={['Node.js', 'Prisma ORM', 'REST API', 'MySQL']}
          subSkills={['NextAuth.js', 'JWT', 'bcrypt', 'MariaDB']}
        />
        <SkillCard
          icon={Layout}
          title="DevOps & Tools"
          description="Managing deployment pipelines and development workflows"
          mainSkills={['Git', 'Docker', 'K8s', 'Github Actions', 'ArgoCD', 'Nginx ingress']}
          subSkills={['Kustomize', 'Helm', 'App of Apps Pattern', 'EC2', 'Lightsail', 'Vercel']}
        />
        <SkillCard
          icon={TestTube2}
          title="Monitoring"
          description="Implementing monitoring systems with Prometheus and Grafana"
          mainSkills={['Prometheus', 'Grafana']}
          subSkills={['Alertmanager', 'Node Exporter', 'kube-state-metrics']}
        />
        <SkillCard
          icon={Router}
          title="Testing"
          description="Implementing testing frameworks and tools"
          mainSkills={['Jest', 'Cypress', 'Puppeteer', 'Playwright']}
          subSkills={[]}
        />
        <SkillCard
          icon={Globe}
          title="Web Hosting"
          description="Deploying and managing web applications on various hosting platforms"
          mainSkills={['AWS EC2', 'AWS Lightsail', 'Vercel', 'Nginx']}
          subSkills={['SSL/TLS', 'Domain Management', 'Load Balancing', 'CDN']}
        />
      </div>
    </main>
  );
}

