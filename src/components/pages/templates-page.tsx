'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import Link from 'next/link';
import { Inner } from '@/components';
import { Pagination } from '@/components';
import templateData from '@/data/api/template.json';
import { Template } from '@/components/types';

gsap.registerPlugin(ScrollTrigger);

export default function HtmlTemplates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'date' | 'price' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const itemsPerPage = 5;
  const templatesRef = useRef<HTMLDivElement>(null);

  const templates = (templateData.templates || []) as Template[];
  const sortedTemplates = [...templates].sort((a, b) => {
    if (!sortBy) return 0;
    if (sortBy === 'price') {
      return sortOrder === 'asc'
        ? Number(a.price) - Number(b.price)
        : Number(b.price) - Number(a.price);
    }
    if (sortBy === 'date') {
      return sortOrder === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = sortedTemplates.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (templatesRef.current) {
      templatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const cards = gsap.utils.toArray<HTMLElement>('.cards .card-item');
    if (!cards.length) return;

    const triggers: ScrollTrigger[] = [];

    // Set initial state for cards
    gsap.set(cards, { opacity: 1, border: '2px solid rgba(255,255,255,0)' });

    const lastCardST = ScrollTrigger.create({
      trigger: cards[cards.length - 1],
      start: 'bottom bottom',
    });

    cards.forEach((card, index) => {
      const scale = 1 - (cards.length - index - 1) * 0.025; // Adjusted to ensure top card is full scale
      const isTopCard = index === cards.length - 1; // Last card is topmost
      const scaleDown = gsap.to(card, {
        scale: scale,
        border: isTopCard ? '2px solid rgba(255, 255, 255, 0.9)' : '2px solid rgba(255,255,255,0)',
        transformOrigin: `50% ${lastCardST.start}`,
        ease: 'power3.out',
        duration: 0.8,
      });

      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: 'center center',
          end: () => lastCardST.start,
          pin: true,
          pinSpacing: false,
          animation: scaleDown,
          scrub: 1,
          toggleActions: 'restart none none reverse',
          onEnter: () => {
            if (index === cards.length - 1) {
              gsap.to(card, {
                border: '2px solid rgba(255, 255, 255, 0.9)',
                duration: 0.3,
                ease: 'power3.out',
              });
            }
          },
          onLeaveBack: () => {
            if (index === cards.length - 1) {
              gsap.to(card, {
                border: '2px solid rgba(255,255,255,0)',
                duration: 0.3,
                ease: 'power3.out',
              });
            }
          },
        })
      );
    });

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((t) => t.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.globalTimeline.clear();
    };
  }, [currentPage, paginatedTemplates]);

  return (
    <>
      <Inner title="HTML Templates" first="Home" secend="Templates" />

      <section className="section-padding pt-[0px]">
        <div className="container">
          <div ref={templatesRef}>
            <div className="filters mb-4">
              <div className="filters mb-4 flex gap-3 flex-wrap justify-center mt-[5px]">
                <div className="select-wrapper relative">
                  <select
                    className="select-custom"
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | null)}
                    defaultValue=""
                    aria-label="Sort by"
                  >
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="date">Date</option>
                  </select>
                  <i className="fa fa-chevron-down select-icon"></i>
                </div>
                <div className="select-wrapper relative">
                  <select
                    className="select-custom"
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    defaultValue="asc"
                    aria-label="Sort order"
                  >
                    {sortBy === 'price' ? (
                      <>
                        <option value="asc">Price: Low to High ↑</option>
                        <option value="desc">Price: High to Low ↓</option>
                      </>
                    ) : sortBy === 'date' ? (
                      <>
                        <option value="asc">Date: Oldest to Newest ↑</option>
                        <option value="desc">Date: Newest to Oldest ↓</option>
                      </>
                    ) : (
                      <>
                        <option value="asc">Low to High ↑</option>
                        <option value="desc">High to Low ↓</option>
                      </>
                    )}
                  </select>
                  <i className="fa fa-chevron-down select-icon"></i>
                </div>
              </div>
              <div className="flex justify-center">
                <p>Total {templates.length}</p>
              </div>
            </div>
            <div
              className="cards"
              style={{ minHeight: '100vh', paddingBottom: '150px', position: 'relative' }}
              ref={templatesRef}
            >
              {paginatedTemplates.length > 0 ? (
                paginatedTemplates.map((template, index) => (
                  <div
                    className="card-item rounded-[15px] py-[30px] px-10 bg-[#181616] max-md:mb-[30px]"
                    key={index}
                    style={{
                      border: '2px solid rgba(255,255,255,0)',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      marginBottom: '30px',
                      position: 'relative',
                      zIndex: index + 1,
                    }}
                  >
               <div className="flex flex-col items-start lg:flex-row lg:items-end mt-4">
                       <div>
                         <div className="tags [&_a]:text-[#ccc] [&_a]:text-sm [&_a]:pt-[10px] [&_a]:px-5 [&_a]:pb-2 [&_a]:rounded-[30px] [&_a]:border [&_a]:border-white/30 [&_a]:mb-[15px] [&_a]:inline-block">
                          {template.category ? (
                            <Link href={`/templates?category=${encodeURIComponent(template.category)}`}>
                              {template.category}
                            </Link>
                          ) : (
                            <span>No category</span>
                          )}
                        </div>
                        <h3 className="title max-md:mb-[30px]">
                          <Link href={`/templates/${template.url}/`}>{template.title}</Link>
                        </h3>
                      </div>
                     <div className="ml-auto max-md:ml-[0px]! max-md:mt-[5px]">
                         <a
                           href={template.buyLink || '#'}
                           className="mr-3 butn butn-md butn-bord butn-rounded hover-scale"
                           target="_blank"
                           rel="noopener noreferrer"
                         >
                           <div className="flex items-center">
                             <span>Buy Now</span>
                             <span className="icon invert ml-[10px]">
                               <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized />
                             </span>
                           </div>
                         </a>
                         <Link
                           href={`/templates/${template.url}/`}
                           className="mr-3 butn butn-md butn-bord butn-rounded hover-scale"
                         >
                           <div className="flex items-center">
                             <span>View Template</span>
                             <span className="icon invert ml-[10px]">
                               <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized />
                             </span>
                           </div>
                         </Link>
                       </div>
                    </div>
                    <div className="img fit-img mt-[30px] relative h-[450px] max-md:h-[400px] rounded-[15px] overflow-hidden">
                      <Image
                        src={template.thumbnail ? template.thumbnail : '/default-image.jpg'}
                        alt={template.title || 'Template Image'}
                        width={800}
                        height={500}
                        className="w-full h-full rounded-[15px]"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data-message relative w-full z-[999999] text-white">No templates found.</p>
              )}
            </div>

            <Pagination
              totalItems={templates.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}
