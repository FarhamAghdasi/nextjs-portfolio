'use client';
import React, { useRef, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import portfoliosData from '@/data/api/portfolio.json';
import templatesData from '@/data/api/template.json';
import { PortfolioItem, TemplateItem } from '../types';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type UnifiedItem = {
  key: string;
  title: string;
  shortDescription: string;
  category: string;
  categorySlug: string;
  date: string;
  year: string;
  thumbnail: string;
  href: string;
  isTemplate: boolean;
  technologies: string[];
};

const CATEGORY_MAP: Record<string, string> = {
  'web application': 'Web Application',
  'web applications': 'Web Application',
  'website with dashboard': 'Web Application',
  'website': 'Web Application',
  'security tool': 'Security Tool',
  'web security and anti-ripping tool': 'Security Tool',
  'security': 'Security Tool',
  'html template': 'HTML Template',
  'html templates': 'HTML Template',
  'template': 'HTML Template',
  'dashboard': 'Dashboard',
  'dashboards': 'Dashboard',
};

function resolveCategory(category?: string): string {
  if (!category) return 'Web Application';
  const key = category.toLowerCase();
  if (CATEGORY_MAP[key]) return CATEGORY_MAP[key];
  for (const k of Object.keys(CATEGORY_MAP)) {
    if (key.includes(k)) return CATEGORY_MAP[k];
  }
  return 'Web Application';
}

function parseTechnologies(raw: string | { title: string; content: string }[] | undefined, fallback: string): string[] {
  if (!raw) return fallback.split(/[,\s]+/).filter(Boolean).slice(0, 5);
  if (typeof raw === 'string') {
    return raw.split(/[,\s]+/).map((s) => s.trim()).filter(Boolean).slice(0, 5);
  }
  const techs: string[] = [];
  for (const item of raw) {
    if (item && typeof item.content === 'string') {
      for (const t of item.content.split(/[,\s]+/)) {
        const v = t.trim();
        if (v && !techs.includes(v)) techs.push(v);
        if (techs.length >= 5) break;
      }
    }
    if (techs.length >= 5) break;
  }
  return techs.length ? techs : fallback.split(/[,\s]+/).filter(Boolean).slice(0, 5);
}

const Work: React.FC = () => {
  const portfolios: PortfolioItem[] = portfoliosData.portfolio || [];
  const htmlTemplates: TemplateItem[] = templatesData.templates || [];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const items: UnifiedItem[] = useMemo(() => {
    const list: UnifiedItem[] = [];
    for (const p of portfolios) {
      list.push({
        key: `portfolio-${p.url}`,
        title: p.title,
        shortDescription: p.Shortdescription,
        category: resolveCategory(p.category),
        categorySlug: (p.category || 'web-application').toLowerCase().includes('security')
          ? 'security'
          : (p.category || '').toLowerCase().includes('dashboard')
            ? 'dashboard'
            : 'web',
        date: p.date,
        year: p.date ? new Date(p.date).getFullYear().toString() : '2024',
        thumbnail: p.thumbnail ? `/assets/imgs/uploads/${p.thumbnail}` : '/default-image.jpg',
        href: `/portfolio/${p.url}/`,
        isTemplate: false,
        technologies: parseTechnologies(p.accordionContent, 'HTML CSS JS'),
      });
    }
    for (const t of htmlTemplates) {
      list.push({
        key: `template-${t.url}`,
        title: t.title,
        shortDescription: t.Shortdescription,
        category: resolveCategory(t.category),
        categorySlug: (t.category || '').toLowerCase().includes('dashboard')
          ? 'dashboard'
          : 'template',
        date: t.date,
        year: t.date ? new Date(t.date).getFullYear().toString() : '2024',
        thumbnail: t.thumbnail || '/default-image.jpg',
        href: `/templates/${t.url}/`,
        isTemplate: true,
        technologies: parseTechnologies(t.accordionContent, 'HTML CSS JS'),
      });
    }
    return list;
  }, [portfolios, htmlTemplates]);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return items;
    if (activeFilter === 'web') return items.filter((i) => i.categorySlug === 'web' && !i.isTemplate);
    if (activeFilter === 'security') return items.filter((i) => i.categorySlug === 'security');
    if (activeFilter === 'template') return items.filter((i) => i.isTemplate);
    if (activeFilter === 'dashboard') return items.filter((i) => i.categorySlug === 'dashboard');
    return items;
  }, [items, activeFilter]);

  const visible = filtered.slice(0, 6);

  const viewAllHref = useMemo(() => {
    if (activeFilter === 'template') return '/templates';
    if (activeFilter === 'web') return '/portfolio';
    if (activeFilter === 'security') return '/portfolio';
    if (activeFilter === 'dashboard') return '/portfolio';
    return '/portfolio';
  }, [activeFilter]);

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, visible.length);
  }, [visible.length]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const previous = grid.querySelectorAll('article');

    const ctx = gsap.context(() => {
      gsap.to(previous, {
        opacity: 0,
        y: -16,
        duration: 0.25,
        ease: 'power2.in',
        stagger: 0.04,
        onComplete: () => {
          gsap.set(previous, { clearProps: 'all' });
        },
      });

      cards.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: 'power3.out',
            delay: 0.2 + i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, grid);

    return () => ctx.revert();
  }, [activeFilter]);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const triggers: ScrollTrigger[] = [];
    cards.forEach((el, index) => {
      const t = gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          delay: (index % 2) * 0.1,
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        }
      );
      const st = (t as unknown as { scrollTrigger?: ScrollTrigger }).scrollTrigger;
      if (st) triggers.push(st);
    });
    ScrollTrigger.refresh();
    return () => {
      triggers.forEach((t) => t.kill());
      gsap.killTweensOf(cards);
    };
  }, [activeFilter]);

  const filters: { key: string; label: string }[] = [
    { key: 'all', label: 'All Projects' },
    { key: 'web', label: 'Web Applications' },
    { key: 'security', label: 'Security Tools' },
    { key: 'template', label: 'HTML Templates' },
    { key: 'dashboard', label: 'Dashboards' },
  ];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28 lg:py-36"
    >
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute -top-40 left-1/2 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-white/10 blur-[140px]" />
        <div className="absolute bottom-0 -right-40 h-[400px] w-[400px] rounded-full bg-white/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-14 text-center md:mb-20">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]">
            <span>Portfolio</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="flex items-center justify-center gap-4">
            <div className="hidden h-px w-16 bg-gradient-to-r from-transparent to-white/60 md:block" />
            <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_white]" />
            <div className="hidden h-px w-16 bg-gradient-to-l from-transparent to-white/60 md:block" />
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            <span className="text-white">{'{'}</span>{' '}
            <span className="text-white">Website Templates</span>{' '}
            <span className="text-white">{'}'}</span>
          </h2>
          <h2 className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
            My Projects
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            Here are some of my selected projects and HTML templates.
            <br className="hidden md:block" />
            {' '}Each one is built with passion, precision, and performance in mind.
          </p>
        </div>

        <div className="mb-10 flex justify-center md:mb-12">
          <div className="inline-flex max-w-full overflow-x-auto rounded-full border border-white/10 bg-white/[0.03] p-1.5 backdrop-blur-sm [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((f) => {
              const active = activeFilter === f.key;
              return (
                <button
                  key={f.key}
                  type="button"
                  onClick={() => setActiveFilter(f.key)}
                  className={[
                    'whitespace-nowrap rounded-full px-5 py-2 text-sm font-medium transition-all duration-300',
                    active
                       ? 'bg-white/10 text-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]'
                      : 'text-white/60 hover:text-white',
                  ].join(' ')}
                >
                  {f.label}
                </button>
              );
            })}
          </div>
        </div>

        {visible.length > 0 ? (
          <div ref={gridRef} className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:gap-8">
            {visible.map((item, index) => (
              <article
                key={item.key}
                ref={(el) => {
                  cardRefs.current[index] = el as HTMLDivElement | null;
                }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-white/60 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] md:flex-row"
              >
                <div className="relative aspect-[4/3] shrink-0 overflow-hidden md:aspect-auto md:w-[45%] md:min-h-[300px]">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 45vw"
                    style={{ objectFit: 'cover' }}
                    unoptimized
                    className="transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 z-10">
                    <span className="rounded-md border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                      {item.year}
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
                    {item.category}
                  </div>

                  <h3 className="mb-2 text-xl font-bold leading-tight text-white md:text-2xl">
                     <Link href={item.href} className="post-title-link transition-colors hover:text-white">
                      {item.title}
                    </Link>
                  </h3>

                  <p className="mb-5 line-clamp-3 text-sm leading-relaxed text-white/55">
                    {item.shortDescription}
                  </p>

                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {item.technologies.map((tech, i) => (
                      <span
                        key={`${item.key}-tech-${i}`}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] font-medium text-white/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all hover:gap-2.5"
                    >
                      <span>{item.isTemplate ? 'View Template' : 'View Project'}</span>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center text-white/50">No projects available in this category.</div>
        )}

        {filtered.length > 6 && (
          <div className="mt-10 flex justify-center">
            <Link
              href={viewAllHref}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-2.5 text-sm font-semibold text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <span>View All</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        )}

        <div className="mt-16 md:mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-6 backdrop-blur-sm md:p-8">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/20 blur-[80px]" />
            <div className="relative flex flex-col items-center gap-6 md:flex-row md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10 shadow-[0_0_20px_-5px_rgba(255,255,255,0.4)]">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="1.8" strokeLinejoin="round" fill="white" fillOpacity="0.2" />
                  </svg>
                </div>
                <div>
                  <h4 className="mb-1 text-lg font-bold text-white md:text-xl">Have a project in mind?</h4>
                  <p className="text-sm text-white/60 md:text-base">Let&apos;s work together and bring your ideas to life.</p>
                </div>
              </div>
              <Link
                href="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-[0_0_30px_-5px_rgba(255,255,255,0.6)] transition-all duration-300 hover:bg-[#e0ff8a] hover:shadow-[0_0_40px_-5px_rgba(255,255,255,0.7)]"
              >
                <span>Start a Project</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="pointer-events-none mt-20 flex items-center justify-center gap-2 opacity-50">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/40" />
          <div className="h-1 w-1 rounded-full bg-white/60" />
          <div className="h-1 w-1 rounded-full bg-white/30" />
          <div className="h-1 w-1 rounded-full bg-white/60" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/40" />
        </div>
      </div>
    </section>
  );
};

export default Work;
