'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import rawPostsData from '@/data/api/posts.json';
import texts from '@/data/blog.json';
import Logo from '@/assets/imgs/logo.png';
import { Sidebar } from '@/components';
import { PostBlog } from '@/components/types';

const Bloginfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const postsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') || '';

  const posts: PostBlog[] = useMemo(() => rawPostsData.posts || [], []);

  const isCategoryValid = category
    ? [...new Set(posts.map((post) => post.category))].includes(category)
    : true;

  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (category && isCategoryValid) {
      filtered = filtered.filter((post) => post.category === category);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term) ||
          post.author.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [searchTerm, category, posts, isCategoryValid]);

  useEffect(() => {
    if (!postsRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        postsRef.current!.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
      );
    }, postsRef);

    return () => ctx.revert();
  }, [filteredPosts]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleReset = () => {
    setSearchTerm('');
    router.push('/blog');
  };

  return (
    <>
      <header className="blog-hed">
        <div className="container section-padding bord-thin-bottom-light">
          <div className="row">
            <div className="col-lg-7">
              <div className="caption md-mb30">
                <h1 className="text-indent">{texts.headerTitle}</h1>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 d-flex align-items-end">
              <div className="text">
                <p>{texts.headerText}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-mp section-padding">
        <div className="container">
          <div className="row xlg-marg">
            <div className="col-lg-8">
              <div className="main-blog md-mb80" ref={postsRef}>
                {!isCategoryValid ? (
                  <p>
                    Category &quot;{category}&quot; does not exist.
                  </p>
                ) : filteredPosts.length === 0 ? (
                  <p>{texts.noPostsFound}</p>
                ) : (
                  filteredPosts.map((post) => (
                    <div className="item mb-80" key={post.id}>
                      <div className="info d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="author-img fit-img">
                              <Image
                                src={post.authorImage || Logo}
                                alt={post.author || 'Author'}
                                width={50}
                                height={50}
                              />
                            </div>
                          </div>
                          <div className="author-info ml-10">
                            <span>{post.author}</span>
                            <span className="sub-color">{post.role || texts.authorRoleFallback}</span>
                          </div>
                        </div>
                        <div className="date ml-auto">
                          <span className="sub-color">
                            <i className="fa-regular fa-clock mr-15 opacity-7" /> {post.date}
                          </span>
                        </div>
                      </div>
                      <div className="img fit-img mt-30">
                        <Image
                          src={post.thumbnail ? `https://farhamaghdasi.ir${post.thumbnail}` : '/default-image.jpg'}
                          alt={post.title || 'Blog Post'}
                          width={1200}
                          height={630}
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                      <div className="cont mt-30">
                        <span className="sub-color fz-14 text-u mb-15">
                          <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                            <i className="fa-solid fa-tag mr-10 opacity-7" /> {post.category}
                          </Link>
                        </span>
                        <h3>
                          <Link href={`/blog/${post.url}`}>{post.title}</Link>
                        </h3>
                        <div className="text mt-25">
                          <p>{post.short_description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="col-lg-4">
              <Sidebar posts={posts} onSearch={handleSearch} onReset={handleReset} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloginfo;
