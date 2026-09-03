'use client'; // Indicates this is a Client Component in Next.js 13+

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // GSAP plugin for scroll-based animations

import postsData from '@/data/api/posts.json'; // Import blog posts data
import postConfig from '@/data/posts-section.json'; // Import section configuration (styles, text, etc.)
const ArrowRightTop = '/assets/imgs/icons/arrow-top-right.svg'; // Arrow icon for links
import type { PostsData, PostConfig, Post } from '@/components/types'; // TypeScript type definitions

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Blog: React.FC = () => {
  // Assign imported data to typed variables
  const data: PostsData = postsData;
  const config: PostConfig = postConfig;

  // Extract posts array and configuration values
  const posts: Post[] = data.posts || [];
  const { sectionClass, containerClass, header, fallbackPost, noPostsMessage } = config;

  // Refs for the section and individual post items (for animations)
  const sectionRef = useRef<HTMLElement>(null);
  const postItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Helper function to get the correct thumbnail path
  const getThumbnail = (thumbnail?: string) => {
    if (!thumbnail) return fallbackPost.thumbnail; // Use fallback if no thumbnail
    if (thumbnail.startsWith('http') || thumbnail.startsWith('/')) return thumbnail; // Use full URL or absolute path
    return `/assets/imgs/uploads/${thumbnail}`; // Prepend the uploads directory path
  };

  // Animation setup using GSAP and ScrollTrigger
  useEffect(() => {
    // Exit if refs are not ready
    if (!sectionRef.current || !postItemsRef.current.length) return;

    // Create a GSAP context for easier cleanup
    const ctx = gsap.context(() => {
      // Animate each post item (fade in + slide up)
      postItemsRef.current.forEach((el, index) => {
        if (el) {
          gsap.fromTo(
            el,
            { opacity: 0, y: 50 }, // Start state: invisible, shifted down
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              delay: index * 0.3, // Staggered animation delay
              scrollTrigger: {
                trigger: el, // Element that triggers the animation
                start: 'top 85%', // Animation starts when element top is 85% from viewport top
                toggleActions: 'play none none none', // Play animation once on enter
                markers: false, // Set to true for debugging ScrollTrigger positions
              },
            }
          );
        }
      });
    }, sectionRef);

    // Refresh ScrollTrigger calculations after a short delay
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Cleanup function: revert animations and ScrollTrigger instances
    return () => {
      ctx.revert();
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className={sectionClass} ref={sectionRef}>
      <div className={containerClass}>
        {/* Header Section */}
        <div className={header.class}>
          <div className="flex">
            <div>
              <span className="sub-head">{header.subTitle}</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {'{'} <span>{header.clientCount}</span> {'}'}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mt-[30px]">
            <div className="w-full lg:w-7/12 lg:ml-[25%]">
              <div>
                {/* Dynamically set inner HTML for title (allowing HTML formatting) */}
                <h2
                  dangerouslySetInnerHTML={{
                    __html: header.title,
                  }}
                />
                {/* "View All" link */}
                <Link href={header.viewAllLink} className="butn-under mt-[15px]">
                  {header.viewAllText}{' '}
                  <span className="icon invert">
                    <Image src={ArrowRightTop} alt="arrow" width={16} height={16} unoptimized />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {posts.length > 0 ? (
            // Render first 3 posts
            posts.slice(0, 3).map((post, index) => (
              <div
                className="col-span-1"
                key={index}
                ref={(el) => {
                  // Store ref for each post item for animation
                  postItemsRef.current[index] = el;
                }}
              >
                  <div className="item group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 post-card-border-loop">
                    {/* Post Thumbnail */}
                    <div className="relative aspect-[4/3] shrink-0 overflow-hidden md:aspect-auto md:h-[300px]">
                      <Image
                        src={getThumbnail(post.thumbnail)}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority={index < 3}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute left-3 top-3 z-10">
                        <span className="rounded-md border border-white/20 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/80 backdrop-blur-md">
                          {post.category || fallbackPost.category}
                        </span>
                      </div>
                    </div>
                    {/* Post Content */}
                    <div className="flex flex-1 flex-col p-6">
                      <h5 className="mb-2">
                        <Link href={`/blog/${post.url}/`} className="post-title-link text-xl font-bold leading-tight text-white transition-colors hover:text-white">
                          {post.title}
                        </Link>
                      </h5>
                      <span className="main-color mb-3 text-sm text-white/70">{post.category || fallbackPost.category}</span>
                      <p className="line-clamp-3 text-sm leading-relaxed text-white/55">{post.short_description || fallbackPost.short_description}</p>
                      <div className="mt-auto pt-4">
                        <Link href={`/blog/${post.url}/`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-all hover:gap-2.5">
                          <span>Read More</span>
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
              </div>
            ))
          ) : (
            // Show message if no posts exist
            <div className="col-span-full">
              <p>{noPostsMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;