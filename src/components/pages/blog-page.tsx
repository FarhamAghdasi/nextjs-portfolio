'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import postsData from '@/data/api/posts.json';
import texts from '@/data/blog.json';
import Logo from '@/assets/imgs/logo.png';
import { PostBlog } from '@/components/types';

const Bloginfo: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const postsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') || '';

  const posts: PostBlog[] = postsData.posts || [];
  const availableCategories = [...new Set(posts.map((post) => post.category))];
  const isCategoryValid = category ? availableCategories.includes(category) : true;

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
        postsRef.current.children,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }
      );
    }, postsRef);

    return () => ctx.revert();
  }, [filteredPosts]);

  const handleSearch = () => {
    setSearchTerm(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setInputValue('');
    setSearchTerm('');
    router.push('/blog'); // Reset both search and category
  };

  return (
    <>
      {/* Blog header section */}
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

      {/* Main blog content section */}
      <div className="blog-mp section-padding">
        <div className="container">
          <div className="row xlg-marg">
            <div className="col-lg-8">
              <div className="main-blog md-mb80" ref={postsRef}>
                {!isCategoryValid ? (
                  <p>Category "{category}" does not exist.</p>
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
                          src={`https://farhamaghdasi.ir${post.thumbnail}` || '/default-image.jpg'}
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

            {/* Sidebar section */}
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="search-box mb-4 d-flex gap-2">
                  <input
                    type="text"
                    name="search-post"
                    placeholder={texts.searchPlaceholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="form-control"
                  />
                    <a type="button" className="icon fa fa-search pr-20" onClick={handleSearch} />
                    <a type="button" className="icon fa fa-remove mr-4" onClick={handleReset} />
                </div>

                <div className="widget catogry mb-4">
                  <h6 className="title-widget">{texts.categoriesTitle}</h6>
                  <ul className="rest">
                    {availableCategories.map((cat) => (
                      <li key={cat} className={category === cat ? 'active' : ''}>
                        <Link href={`/blog?category=${encodeURIComponent(cat)}`}>{cat}</Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="widget last-post-thum">
                  <h6 className="title-widget">{texts.latestPostsTitle}</h6>
                  {posts.slice(0, 3).map((post) => (
                    <div className="item d-flex align-items-center" key={post.id}>
                      <div>
                        <div className="img">
                          <Link href={`/blog/${post.url}`}>
                            <Image
                              src={`https://farhamaghdasi.ir${post.thumbnail}` || '/default-image.jpg'}
                              alt={post.title || 'Blog Post'}
                              width={100}
                              height={70}
                              style={{ objectFit: 'cover' }}
                            />
                            <span className="date">
                              <span>{post.date}</span>
                            </span>
                          </Link>
                        </div>
                      </div>
                      <div className="cont">
                        <span className="tag">
                          <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                            {post.category}
                          </Link>
                        </span>
                        <h6>
                          <Link href={`/blog/${post.url}`}>{post.title}</Link>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloginfo;
