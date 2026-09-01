'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
const arrowTopRight = '/assets/imgs/icons/arrow-top-right.svg';
import Link from 'next/link';
import { Inner } from '@/components';
import { Pagination } from '@/components';
import templateData from '@/data/api/template.json';
import { Template } from '@/components/types';

const TemplateActions = ({ template }: { template: Template }) => {
  const [hoveredSeg, setHoveredSeg] = useState<'buy' | 'view'>('buy');

  return (
    <div
      className="relative flex items-stretch rounded-[30px] overflow-hidden border border-white/30 text-sm font-semibold"
      onMouseLeave={() => setHoveredSeg('buy')}
    >
      <span
        className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-white transition-transform duration-300 ease-out ${
          hoveredSeg === 'view' ? 'translate-x-full' : 'translate-x-0'
        }`}
      />
      <a
        href={template.buyLink || '#'}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHoveredSeg('buy')}
        className={`group/btn relative z-[1] flex-1 inline-flex items-center justify-center gap-2 py-2 px-4 transition-colors duration-300 ${
          hoveredSeg === 'view' ? 'text-white' : 'text-black'
        }`}
      >
        <span>Buy Now</span>
        <span
          className={`transition-transform duration-300 group-hover/btn:translate-x-[3px] ${
            hoveredSeg === 'view' ? '[filter:brightness(0)_invert(1)]' : ''
          }`}
        >
          <Image src={arrowTopRight} alt="Arrow" width={16} height={16} unoptimized />
        </span>
      </a>
      <Link
        href={`/templates/${template.url}/`}
        onMouseEnter={() => setHoveredSeg('view')}
        className={`group/btn relative z-[1] flex-1 inline-flex items-center justify-center border-l border-white/30 py-2 px-4 transition-colors duration-300 ${
          hoveredSeg === 'view' ? 'text-black' : 'text-white'
        }`}
      >
        <span>View</span>
      </Link>
    </div>
  );
};

export default function HtmlTemplates() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'price' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const itemsPerPage = 6;
  const templatesRef = useRef<HTMLDivElement>(null);

  const templates = (templateData.templates || []) as Template[];
  const categories = Array.from(
    new Set(templates.map((t) => t.category).filter((c): c is string => Boolean(c)))
  );

  const filtered = templates.filter((t) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || (t.title || '').toLowerCase().includes(q);
    const matchCat = activeCategory === 'all' || t.category === activeCategory;
    return matchSearch && matchCat;
  });

  const sorted = [...filtered].sort((a, b) => {
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
  const paginatedTemplates = sorted.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, activeCategory, sortBy, sortOrder]);

  const handleImageLoad = (url: string) => {
    setLoadedImages(prev => ({ ...prev, [url]: true }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (templatesRef.current) {
      templatesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <Inner title="HTML Templates" first="Home" secend="Templates" />

      <section className="section-padding pt-[0px]">
        <div className="container">
          <div className="flex flex-col-reverse lg:flex-row gap-[40px] items-start">
            {/* ============ Templates (left) ============ */}
            <div className="w-full lg:w-9/12" ref={templatesRef}>
              <div className="flex items-center justify-between mb-[30px]">
                <p className="text-white/70">
                  Showing <span className="text-white">{paginatedTemplates.length}</span> of{' '}
                  <span className="text-white">{filtered.length}</span> templates
                </p>
              </div>

              {paginatedTemplates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
                  {paginatedTemplates.map((template) => (
                    <div
                      key={template.url}
                      className="tem-card group rounded-[15px] overflow-hidden bg-[#181616] border border-white/10 transition-all duration-300 hover:border-white/30 hover:shadow-2xl"
                    >
                      <div className="img fit-img relative h-[220px] overflow-hidden">
                        {!loadedImages[template.url] && (
                          <div className="absolute inset-0 animate-shimmer" />
                        )}
                        <Image
                          src={template.thumbnail ? template.thumbnail : '/default-image.jpg'}
                          alt={template.title || 'Template Image'}
                          width={600}
                          height={400}
                          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${loadedImages[template.url] ? 'opacity-100' : 'opacity-0'}`}
                          style={{ objectFit: 'cover' }}
                          unoptimized
                          onLoadingComplete={() => handleImageLoad(template.url)}
                        />
                      </div>
                      <div className="p-[25px]">
                        <div className="flex items-center justify-between mb-[15px]">
                          <span className="text-[#ccc] text-sm border border-white/30 rounded-[30px] px-5 py-2 inline-block">
                            {template.category || 'No category'}
                          </span>
                          {template.price ? (
                            <span className="text-white font-semibold">
                              {Number(template.price).toLocaleString()} T
                            </span>
                          ) : null}
                        </div>
                        <h3 className="title text-[22px] mb-[20px]">
                          <Link href={`/templates/${template.url}/`}>{template.title}</Link>
                        </h3>
                        <TemplateActions template={template} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-data-message text-white">No templates found.</p>
              )}

              {filtered.length > 0 && (
                <div className="mt-[40px]">
                  <Pagination
                    totalItems={filtered.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>

            {/* ============ Sidebar (right) ============ */}
            <aside className="w-full lg:w-3/12">
              <div className="sidebar-panel rounded-[15px] bg-[#181616] border border-white/10 p-[30px]">
                <div className="search-box mb-[30px] relative">
                  <i className="fa fa-search absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search templates..."
                    aria-label="Search templates"
                    className="w-full bg-[#0f0f0f] border border-white/10 rounded-[10px] pl-9 pr-9 py-2 text-sm text-white outline-none transition-colors focus:border-white"
                  />
                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                    >
                      <i className="fa fa-times" />
                    </button>
                  )}
                </div>

                <div className="filter-block mb-[30px]">
                  <h4 className="sidebar-title mb-[15px]">Categories</h4>
                  <ul className="flex flex-col gap-2">
                    <li>
                      <button
                        type="button"
                        onClick={() => setActiveCategory('all')}
                        className={`text-left transition-colors ${
                          activeCategory === 'all'
                            ? 'text-white font-semibold'
                            : 'text-white/70 hover:text-white'
                        }`}
                      >
                        All
                      </button>
                    </li>
                    {categories.map((cat) => (
                      <li key={cat}>
                        <button
                          type="button"
                          onClick={() => setActiveCategory(cat)}
                          className={`text-left text-sm transition-colors ${
                            activeCategory === cat
                              ? 'text-white font-semibold'
                              : 'text-white/70 hover:text-white'
                          }`}
                        >
                          {cat}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="filter-block">
                  <h4 className="sidebar-title mb-[15px]">Sort By</h4>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <label className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          className="sort-check"
                          checked={sortBy === 'price'}
                          onChange={() => setSortBy(sortBy === 'price' ? null : 'price')}
                        />
                        <span>Price</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          className="sort-check"
                          checked={sortBy === 'date'}
                          onChange={() => setSortBy(sortBy === 'date' ? null : 'date')}
                        />
                        <span>Date</span>
                      </label>
                    </li>
                    <li>
                      <label className="flex items-center gap-3 cursor-pointer text-white/70 hover:text-white transition-colors">
                        <input
                          type="checkbox"
                          className="sort-check"
                          checked={sortOrder === 'desc'}
                          onChange={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                        />
                        <span>High to Low</span>
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
