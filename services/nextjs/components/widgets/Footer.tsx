import { Separator } from '@/components/ui/separator';
import { Github, Mail } from 'lucide-react';
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
    <footer className="my-8 mx-4 smalltablet:my-10 smalltablet:mx-6 tablet:m-12 desktop:mx-24 desktop:mt-20">
      <div className="flex flex-wrap items-center gap-4 smalltablet:gap-6 tablet:gap-8 mb-4 smalltablet:mb-6 px-2 smalltablet:px-4">
        {FOOTER_MENU_ITEMS.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="text-sm smalltablet:text-base tablet:text-lg font-light hover:opacity-70 transition-opacity"
          >
            {item.name}
          </Link>
        ))}
      </div>
      <Separator />
      <div className="flex w-full pt-3 smalltablet:pt-4">
        <div className="w-full flex flex-col justify-between items-center gap-3 smalltablet:gap-4 tablet:flex-row">
          <p className="text-xs smalltablet:text-sm text-center text-muted-foreground">
            © {currentYear} All rights reserved
          </p>
          <div className="flex justify-center gap-6 smalltablet:gap-8">
            {SOCIAL_MEDIA.map(({ name, icon: Icon, href }) => (
              <Link
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
              >
                <Icon className="w-5 h-5 smalltablet:w-6 smalltablet:h-6" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

