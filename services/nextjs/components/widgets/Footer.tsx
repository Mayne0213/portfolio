import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

const FOOTER_MENU_ITEMS = [
  { name: 'About', path: '#about' },
  { name: 'Experience', path: '#experience' },
  { name: 'Projects', path: '#projects' },
  { name: 'Contact', path: '#contact' },
];

const SOCIAL_MEDIA = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@example.com",
  },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="my-12 mx-6 tablet:m-12 pc:mx-24 pc:mt-20">
      <div className="flex items-center gap-8 mb-6 px-4">
        {FOOTER_MENU_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="text-lg font-light hover:opacity-70 transition-opacity"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Separator />
      <div className="flex w-full pt-4">
        <div className="w-full flex flex-col justify-between items-center gap-4 tablet:flex-row">
          <p className="text-sm text-center text-muted-foreground">
            © {currentYear} All rights reserved
          </p>
          <div className="flex justify-center gap-8">
            {SOCIAL_MEDIA.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Icon className="w-6 h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

