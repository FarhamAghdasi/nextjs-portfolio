"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import postsData from '@/data/api/posts.json';
import postConfig from '@/data/posts-section.json';
import ArrowRightTop from "@/assets/imgs/icons/arrow-top-right.svg"

import type { PostsData, PostConfig, Post } from '@/components/types';

const Blog: React.FC = () => {
  const data: PostsData = postsData;
  const config: PostConfig = postConfig;

  const posts: Post[] = data.posts || [];
  const {
    sectionClass,
    containerClass,
    header,
    fallbackPost,
    noPostsMessage,
  } = config;

  const getThumbnail = (thumbnail?: string) => {
    if (!thumbnail) return fallbackPost.thumbnail;
    if (thumbnail.startsWith('http') || thumbnail.startsWith('/')) return thumbnail;
    return `https://farhamaghdasi.ir/uploads/${thumbnail}`;
  };

  return (
    <section className={sectionClass || 'blog-cst section-padding'}>
      <div className={containerClass || 'container pt-30 bord-thin-top-light'}>
        <div className={header.class || 'sec-head mb-80'}>
          <div className="d-flex">
            <div>
              <span className="sub-head">{header.subTitle || "My Article's"}</span>
            </div>
            <div className="ml-auto">
              <div className="bract">
                {'{'} <span>{header.clientCount || '1+ Clients'}</span> {'}'}
              </div>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-7 offset-lg-3">
              <div>
                <h2
                  dangerouslySetInnerHTML={{
                    __html: header.title || 'Check My Blog <br /> Content in the web world',
                  }}
                />
                <Link href={header.viewAllLink || '/blog'} className="butn-under mt-15">
                    {header.viewAllText || 'View All Posts'}{' '}
                    <span className="icon invert">
                      <Image
                        src={header.arrowIcon || ArrowRightTop}
                        alt="arrow"
                        width={16}
                        height={16}
                      />
                    </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row md-marg">
          {posts.length > 0 ? (
            posts.slice(0, 3).map((post, index) => (
              <div className="col-lg-4" key={index}>
                <div className="item">
                  <div className="img fit-img" style={{ position: 'relative', width: '100%', height: '200px' }}>
                    <Image
                      src={getThumbnail(post.thumbnail)}
                      alt={post.title}
                      layout="fill"
                      objectFit="cover"
                      priority={index < 3}
                    />
                    <Link href={`/blog/${post.url}/`} className="butn">
                        <span className="icon">
                          <Image
                            src={header.arrowIcon || ArrowRightTop}
                            alt="arrow"
                            width={16}
                            height={16}
                          />
                        </span>
                    </Link>
                  </div>
                  <div className="cont mt-30">
                    <h5>
                      <Link href={`/blog/${post.url}/`}>
                        {post.title}
                      </Link>
                    </h5>
                    <span className="main-color">{post.category || fallbackPost.category || 'General'}</span>
                    <p>{post.short_description || fallbackPost.short_description}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-lg-12">
              <p>{noPostsMessage || 'No blog posts available at the moment.'}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
