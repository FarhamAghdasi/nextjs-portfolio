'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import Link from 'next/link';
import { Inner } from '@/components';
import { Pagination } from '@/components'; // make sure you move Pagination into its own file
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

    gsap.set(cards, { y: 100, opacity: 0, scale: 0.95 });

    cards.forEach((card, index) => {
      const activeShadow = '0 10px 30px rgba(0,0,0,0.2)';
      const activeBorderColor = 'rgba(255, 255, 255, 0.8)';
      const inactiveShadow = '0 0 0 rgba(0,0,0,0)';
      const inactiveBorderColor = 'rgba(255, 255, 255, 0)';

      triggers.push(
        ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          end: 'top 20%',
          scrub: 0.5,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            gsap.to(card, {
              y: -20 * index,
              opacity: 1,
              scale: 1 - index * 0.02,
              boxShadow: activeShadow,
              borderColor: activeBorderColor,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
          onLeave: () => {
            gsap.to(card, {
              opacity: 0,
              boxShadow: inactiveShadow,
              borderColor: inactiveBorderColor,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
          onEnterBack: () => {
            gsap.to(card, {
              opacity: 1,
              boxShadow: activeShadow,
              borderColor: activeBorderColor,
              duration: 0.5,
              ease: 'power2.out',
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              y: 100,
              opacity: 0,
              scale: 0.95,
              boxShadow: inactiveShadow,
              borderColor: inactiveBorderColor,
              duration: 0.5,
              ease: 'power2.out',
            });
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

      <section className="work-card section-padding pt-0">
        <div className="container">
          <div className="templatesContainer" ref={templatesRef}>
            <div className="filters mb-4">
              <div className="filters mb-4 d-flex gap-3 flex-wrap justify-content-center mt-5">
                <div className="select-wrapper position-relative">
                  <select
                    className="select-custom"
                    onChange={(e) => setSortBy(e.target.value as 'date' | 'price' | null)}
                    defaultValue=""
                  >
                    <option value="">Sort By</option>
                    <option value="price">Price</option>
                    <option value="date">Date</option>
                  </select>
                  <i className="fa fa-chevron-down select-icon"></i>
                </div>
                <div className="select-wrapper position-relative">
                  <select
                    className="select-custom"
                    onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                    defaultValue="asc"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                  <i className="fa fa-chevron-down select-icon"></i>
                </div>
              </div>
              <div className='d-flex justify-content-center'>
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
                    className="card-item rounded-xl"
                    key={index}
                    style={{
                      borderColor: '2px solid rgba(255,255,255,0)',
                      transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
                      marginBottom: '20px',
                      position: 'relative',
                      zIndex: paginatedTemplates.length - index,
                    }}
                  >
                    <div className="d-lg-flex align-items-end mt-4">
                      <div>
                        <div className="tags">
                          {template.category ? (
                            <Link href={`/templates?category=${encodeURIComponent(template.category)}`}>
                              {template.category}
                            </Link>
                          ) : (
                            <span>No category</span>
                          )}
                        </div>
                        <h3 className="title">
                          <Link href={`/templates/${template.url}`}>{template.title}</Link>
                        </h3>
                      </div>
                      <div className="ml-auto">
                        <a
                          href={template.buyLink || '#'}
                          className="mr-3 butn butn-md butn-bord butn-rounded"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="d-flex align-items-center">
                            <span>Buy Now</span>
                            <span className="icon invert ml-10 n">
                              <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized />
                            </span>
                          </div>
                        </a>
                        <Link
                          href={`/templates/${template.url}`}
                          className="mr-3 butn butn-md butn-bord butn-rounded"
                        >
                          <div className="d-flex align-items-center">
                            <span>View Template</span>
                            <span className="icon invert ml-10 n">
                              <Image src={arrowTopRight} alt="Arrow Icon" width={16} height={16} unoptimized />
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                    <div className="img fit-img mt-30">
                      <Image
                        src={template.thumbnail ? template.thumbnail : '/default-image.jpg'}
                        alt={template.title || 'Template Image'}
                        width={800}
                        height={500}
                        className="w-full rounded-xl"
                        style={{ objectFit: 'cover' }}
                        unoptimized
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="no-data-message">No templates found.</p>
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
