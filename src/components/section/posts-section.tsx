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
          <div className="d-flex">
            <div>
              <span className="sub-head">{header.subTitle}</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {'{'} <span>{header.clientCount}</span> {'}'}
              </div>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-7 offset-lg-3">
              <div>
                {/* Dynamically set inner HTML for title (allowing HTML formatting) */}
                <h2
                  dangerouslySetInnerHTML={{
                    __html: header.title,
                  }}
                />
                {/* "View All" link */}
                <Link href={header.viewAllLink} className="butn-under mt-15">
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
        <div className="row md-marg">
          {posts.length > 0 ? (
            // Render first 3 posts
            posts.slice(0, 3).map((post, index) => (
              <div
                className="col-lg-4"
                key={index}
                ref={(el) => {
                  // Store ref for each post item for animation
                  postItemsRef.current[index] = el;
                }}
              >
                <div className="item">
                  {/* Post Thumbnail */}
                  <div className="img fit-img" style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image
                      src={getThumbnail(post.thumbnail)}
                      alt={post.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index < 3} // Load first 3 images with priority
                      unoptimized // Bypass Next.js image optimization (if using external or non-optimized images)
                    />
                    {/* Link overlay on image */}
                    <Link href={`/blog/${post.url}/`} className="butn">
                      <span className="icon">
                        <Image src={ArrowRightTop} alt="arrow" width={16} height={16} unoptimized />
                      </span>
                    </Link>
                  </div>
                  {/* Post Content */}
                  <div className="cont mt-30">
                    <h5>
                      <Link href={`/blog/${post.url}/`}>{post.title}</Link>
                    </h5>
                    <span className="main-color">{post.category || fallbackPost.category}</span>
                    <p>{post.short_description || fallbackPost.short_description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Show message if no posts exist
            <div className="col-lg-12">
              <p>{noPostsMessage}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;