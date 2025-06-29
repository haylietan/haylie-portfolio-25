// EmblaCarousel.tsx
'use client';

import type { EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useCallback } from 'react';
// import EmblaSlide from './Slide';
import Hero from './Hero/Hero';
import About from './About/About';
import Contact from './Contact/Contact';
import Projects from './Projects/Projects';
import Experience from './Experience/Experience';

const SLIDES = [
  { title: 'Hero', color: 'bg-white/10', component: <Hero/> },
  { title: 'About', color: 'bg-blue/20', component: <About/> },
  { title: 'Experience', color: 'bg-white/20', component: <Experience/> },
  { title: 'Projects', color: 'bg-white/30', component: <Projects/> },
  { title: 'Contact', color: 'bg-white/40', component: <Contact/> },
];

type EmblaCarouselProps = {
  onInit?: (api: EmblaCarouselType) => void;
  onSelect?: (index: number) => void;
};

export default function EmblaCarousel({ onInit, onSelect }: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false });

  const handleSelect = useCallback(() => {
    if (emblaApi && onSelect) {
      onSelect(emblaApi.selectedScrollSnap());
    }
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    onInit?.(emblaApi);
    handleSelect();
    emblaApi.on('select', handleSelect);
  }, [emblaApi, onInit, handleSelect]);

  return (
    <div className="h-full w-full">
      <div className="overflow-hidden h-full max-h-screen" ref={emblaRef}>
        <div className="flex flex-col h-full">
          {SLIDES.map((slide, index) => (
            <div key={index} className="h-screen flex-shrink-0">
              {slide.component}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { SLIDES };
