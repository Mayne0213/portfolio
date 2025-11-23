'use client';

import { Button } from '@/components/ui/button';
import Particles from '@/components/ui/Particles';

export default function Hero() {
  return (
    <div className="relative flex items-center justify-center min-h-screen w-full h-full overflow-hidden">
      <Particles
        particleColors={['#000000']}
        particleCount={300}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={true}
        className="absolute inset-0 -z-10"
      />
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-12 text-center">
          <div className="flex flex-col items-center justify-center gap-12 px-5">
            <h2 className="font-bold text-5xl tablet:text-7xl text-center bg-linear-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400 bg-clip-text text-transparent">
              Full Stack Developer
            </h2>
            <div className="max-w-3xl">
              <p className="text-2xl tablet:text-3xl text-center leading-[160%]">
                Creating beautiful and functional web experiences with modern technologies
              </p>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              View Projects
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex items-center gap-2 cursor-pointer"
            >
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

