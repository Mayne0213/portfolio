'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { ModeToggle } from '@/components/ui/mode-toggle';

const HEADER_MENU_ITEMS = [
  { name: 'About', path: '/#about', isScroll: true },
  { name: 'Skills', path: '/#skills', isScroll: true },
  { name: 'Projects', path: '/#projects', isScroll: true },
  { name: 'Grafana', path: '/#monitoring', isScroll: true },
  { name: 'Contact', path: '/#contact', isScroll: true },
];

interface HeaderProfileProps {
  showImage?: boolean;
  showName?: boolean;
  imageClassName?: string;
  hasOrder?: boolean;
}

const HeaderProfile = ({
  showImage = true,
  showName = true,
  imageClassName,
  hasOrder = true,
}: HeaderProfileProps) => {
  return (
    <Link
      href="/"
      className={hasOrder ? 'order-2 tablet:order-1' : ''}
    >
      <div className="flex items-center gap-3 smalltablet:gap-4">
        {showImage && (
          <div
            className={`w-9 h-9 smalltablet:w-10 smalltablet:h-10 desktop:w-14 desktop:h-14 rounded-full bg-gray-300 dark:bg-gray-600 ${imageClassName || ''}`}
          />
        )}
        {showName && (
          <h1 className="text-sm smalltablet:text-base desktop:text-lg transition-colors font-bold">
            MINJO KIM
          </h1>
        )}
      </div>
    </Link>
  );
};


const HeaderMenuItemsDesktop = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isScroll: boolean) => {
    if (isScroll) {
      e.preventDefault();
      const sectionId = path.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      {HEADER_MENU_ITEMS.map((item) => (
        <div
          key={item.name}
          className="px-2 tablet:px-4 desktop:px-6 transition-all"
        >
          <Link
            href={item.path}
            onClick={(e) => handleScrollClick(e, item.path, item.isScroll)}
            className="font-extralight text-xs tablet:text-sm desktop:text-base duration-100 ease-in hover:border-b-2 hover:border-b-black hover:dark:border-b-white pb-1"
          >
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );
};

const HeaderMenuItemsMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string, isScroll: boolean) => {
    if (isScroll) {
      e.preventDefault();
      const sectionId = path.replace('/#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        const navbarHeight = 70;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="dark:invert hover:cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur">
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsOpen(false)}
                className="dark:invert hover:cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col items-center justify-between h-full py-12 smalltablet:py-16">
              <div className="flex flex-col w-full h-full justify-center items-center gap-16 smalltablet:gap-20">
                <HeaderProfile
                  showImage={false}
                  hasOrder={false}
                />
                <div className="flex flex-col items-center gap-8 smalltablet:gap-12">
                  {HEADER_MENU_ITEMS.map(item => (
                    <div
                      key={item.name}
                      className="px-4 smalltablet:px-6 desktop:px-8 transition-all items-center"
                    >
                      <Link
                        href={item.path}
                        onClick={(e) => handleScrollClick(e, item.path, item.isScroll)}
                        className="text-lg smalltablet:text-xl duration-100 ease-in hover:border-b-2 hover:border-b-brand-primary hover:dark:border-b-white pb-1"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Header = () => {
  return (
    <header
      className="fixed h-[70px] top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div className="flex justify-between items-center tracking-wider tablet:tracking-widest font-brand-book px-4 smalltablet:px-6 desktop:px-8 py-4 max-w-[1920px] mx-auto">
        <HeaderProfile
          showImage={false}
        />
        <div className="order-1 tablet:order-2 flex items-center">
          <div className="tablet:hidden">
            <HeaderMenuItemsMobile />
          </div>
          <div className="hidden tablet:block">
            <HeaderMenuItemsDesktop />
          </div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
