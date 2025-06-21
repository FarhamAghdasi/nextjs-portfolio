'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface SmoothScrollProps {
    children: React.ReactNode;
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const content = contentRef.current;
        if (!content) return;

        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';

        const scrollTween = gsap.to(content, {
            y: () => -(content.scrollHeight - window.innerHeight),
            ease: 'power1.out',
            scrollTrigger: {
                trigger: document.body,
                start: 'top top',
                end: () => `+=${content.scrollHeight - window.innerHeight}`,
                scrub: 0.3,
                invalidateOnRefresh: true, 
            },
        });

        const handleResize = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
            window.removeEventListener('resize', handleResize);
            document.body.style.height = '';
            document.body.style.overflow = '';
            if (content) content.style.transform = '';
        };
    }, []);

    return (
        <div ref={contentRef} data-smooth-scroll style={{ willChange: 'transform', position: 'relative' }}>
            {children}
        </div>
    );
};

export default SmoothScroll;