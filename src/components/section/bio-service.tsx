'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import bioData from '@/data/bio-service.json';
import { ContentSection } from '@/components/types';

import img1 from '@/assets/imgs/intro/1.webp';
import img2 from '@/assets/imgs/intro/2.webp';

gsap.registerPlugin(ScrollTrigger);

export default function Bio() {
  const { sectionClass, containerClass, rowClass, colClass, content } = bioData as ContentSection;
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    imageRefs.current.forEach((ref, index) => {
      if (!ref) return; // بررسی null بودن ref

      gsap.fromTo(
        ref,
        { x: index % 2 === 0 ? -50 : 50, opacity: 0 }, // اصلاح شرط به عدد
        {
          x: 0,
          opacity: 1,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 90%',
            end: 'bottom 70%',
            scrub: 0.3,
          },
          duration: 1.5,
        }
      );
    });
  }, []);

  const images = [img1, img2];

  return (
    <section className={sectionClass}>
      <div className={containerClass}>
        <div className={rowClass}>
          <div className={colClass}>
            <div className={content.class}>
              <h2 dangerouslySetInnerHTML={{ __html: content.title }} />
              {content.images?.map((image, index) => (
                <div
                  key={index}
                  className={image.class}
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                >
                  <Image
                    src={images[index] ?? '/fallback-image.webp'}
                    alt={image.alt}
                    width={400}
                    height={300}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}