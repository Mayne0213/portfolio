import SectionHeader from '@/components/landing/section-header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, MapPin, Mail, GraduationCap, LucideIcon, Github } from 'lucide-react';

interface InfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 smalltablet:gap-4">
      <div className="flex items-center justify-center min-w-8 min-h-8 smalltablet:min-w-10 smalltablet:min-h-10 rounded-full theme-background">
        <Icon className="w-4 h-4 smalltablet:w-5 smalltablet:h-5" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm smalltablet:text-base font-semibold">{label}</span>
        <span className="text-xs smalltablet:text-sm text-muted-foreground">{value}</span>
      </div>
    </div>
  );
}

const PERSONAL_INFO = [
  { icon: User, label: 'Name', value: 'MINJO KIM' },
  { icon: GraduationCap, label: 'Education', value: 'Yonsei University (Computer Science)' },
  { icon: Calendar, label: 'Birthday', value: '1997.01.17' },
  { icon: MapPin, label: 'Location', value: 'Seoul, Korea' },
  { icon: Github, label: 'Github', value: 'Mayne0213' },
  { icon: Mail, label: 'Email', value: 'minjo.dev@gmail.com' },
];

export default function About() {
  return (
    <div className="bg-muted">
      <main className="flex flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
        <SectionHeader
          title="About Me"
          description="Passionate full-stack developer with expertise in building scalable web applications and cloud infrastructure"
        />

        <section className="grid grid-cols-1 tablet:grid-cols-2 gap-6 smalltablet:gap-7 tablet:gap-8 max-w-7xl w-full">
          {/* Personal Info */}
          <div className="flex flex-col gap-3 smalltablet:gap-4 h-full">
            <Card className="p-4 smalltablet:p-5 tablet:p-6 flex-1 gap-3 smalltablet:gap-4">
            <h3 className="text-xl smalltablet:text-2xl font-bold">Personal Info</h3>
            <Separator/>
              <div className="grid grid-cols-1 smalltablet:grid-cols-2 gap-4 smalltablet:gap-5 tablet:gap-6 items-center h-full">
                {PERSONAL_INFO.map((info, index) => (
                  <InfoItem
                    key={index}
                    icon={info.icon}
                    label={info.label}
                    value={info.value}
                  />
                ))}
              </div>
            </Card>
          </div>

          {/* Who I Am */}
          <div className="flex flex-col gap-3 smalltablet:gap-4 h-full">
            <Card className="p-4 smalltablet:p-5 tablet:p-6 flex-1">
              <div className="flex flex-col gap-3 smalltablet:gap-4">
                <h3 className="text-xl smalltablet:text-2xl font-bold">Who I Am</h3>
                <Separator/>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  I&apos;m Minjo Kim, a Full-Stack Developer and Bachelor in Computer Science at Seoul National University, Korea.
                  I have experience in web development and cloud infrastructure, passionate about building scalable and efficient systems.
                </p>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  My academic background gave me solid knowledge in Algorithms, Data Structures, System Design, and Databases
                  which I apply to create efficient and modern systems. I&apos;ve delivered impactful solutions using TypeScript,
                  React, Next.js, and Tailwind CSS.
                </p>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  I&apos;m responsible for building full-stack applications, setting up Kubernetes clusters with ArgoCD for GitOps workflows,
                  and implementing monitoring systems with Prometheus and Grafana. I focus on creating maintainable code and
                  improving system performance and scalability.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
