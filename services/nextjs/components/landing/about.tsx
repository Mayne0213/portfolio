'use client';

import SectionHeader from '@/components/landing/section-header';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, MapPin, Mail, GraduationCap, LucideIcon, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

export default function About() {
  const t = useTranslations('about');

  const PERSONAL_INFO = [
    { icon: User, label: t('name'), value: 'MINJO KIM' },
    { icon: GraduationCap, label: t('education'), value: 'Yonsei University (Computer Science)' },
    { icon: Calendar, label: t('birthday'), value: '1997.01.17' },
    { icon: MapPin, label: t('location'), value: 'Seoul, Korea' },
    { icon: Github, label: t('github'), value: 'Mayne0213' },
    { icon: Mail, label: t('email'), value: 'minjo.dev@gmail.com' },
  ];

  return (
    <div className="bg-muted">
      <main className="flex flex-col items-center justify-center gap-12 smalltablet:gap-14 tablet:gap-16 p-4 smalltablet:p-6 tablet:p-8 py-16 smalltablet:py-18 tablet:py-20">
        <SectionHeader
          title={t('title')}
          description={t('description')}
        />

        <section className="grid grid-cols-1 tablet:grid-cols-2 gap-6 smalltablet:gap-7 tablet:gap-8 max-w-7xl w-full">
          {/* Personal Info */}
          <div className="flex flex-col gap-3 smalltablet:gap-4 h-full">
            <Card className="p-4 smalltablet:p-5 tablet:p-6 flex-1 gap-3 smalltablet:gap-4">
            <h3 className="text-xl smalltablet:text-2xl font-bold">{t('personalInfo')}</h3>
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
                <h3 className="text-xl smalltablet:text-2xl font-bold">{t('whoIAm')}</h3>
                <Separator/>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  {t('bio1')}
                </p>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  {t('bio2')}
                </p>
                <p className="text-sm smalltablet:text-base text-muted-foreground tablet:text-justify leading-relaxed">
                  {t('bio3')}
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
