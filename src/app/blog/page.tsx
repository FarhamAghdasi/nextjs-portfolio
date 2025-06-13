import React, { useState, useMemo } from 'react';
import {  SEO } from '@/components';
import Image from 'next/image';
import Link from 'next/link';

import postsData from '@/data/api/posts.json';
import texts from '@/data/blog.json';
import Logo from '@/assets/imgs/logo.png'

import { PostBlog } from '@/components/types'

const Bloginfo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const posts: PostBlog[] = postsData.posts;

  const filteredPosts = useMemo(() => {
    if (!searchTerm) return posts;
    const term = searchTerm.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.category.toLowerCase().includes(term) ||
      post.author.toLowerCase().includes(term)
    );
  }, [searchTerm, posts]);

  return (
    <>
      <SEO
        title="Blog"
        description={texts.pageDescription}
        url="https://farhamaghdasi.ir/blog"
      />

      <header className="blog-hed">
        <div className="container section-padding bord-thin-bottom-light">
          <div className="row">
            <div className="col-lg-7">
              <div className="caption md-mb30">
                <h1 className="text-indent">
                  {texts.headerTitle}
                </h1>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 d-flex align-items-end">
              <div className="text">
                <p>
                  {texts.headerText}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-mp section-padding">
        <div className="container">
          <div className="row xlg-marg">
            <div className="col-lg-8">
              <div className="main-blog md-mb80">
                {filteredPosts.length === 0 ? (
                  <p>{texts.noPostsFound}</p>
                ) : (
                  filteredPosts.map(post => (
                    <div className="item mb-80" key={post.id}>
                      <div className="info d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="author-img fit-img">
                              <Image
                                src={post.authorImage || Logo}
                                alt={post.author}
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
                          src={post.thumbnail}
                          alt={post.title}
                          width={1200}
                          height={630}
                          layout="responsive"
                        />
                      </div>
                      <div className="cont mt-30">
                        <span className="sub-color fz-14 text-u mb-15">
                          <Link href="#">
                              <i className="fa-solid fa-tag mr-10 opacity-7" /> {post.category}
                          </Link>
                        </span>
                        <h3>
                          <Link href={`/blog/${post.url}`}>
                            {post.title}
                          </Link>
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
              <div className="sidebar">
                <div className="search-box mb-4">
                  <input
                    type="text"
                    name="search-post"
                    placeholder={texts.searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="form-control"
                  />
                  <span className="icon pe-7s-search" />
                </div>
                <div className="widget catogry mb-4">
                  <h6 className="title-widget">{texts.categoriesTitle}</h6>
                  <ul className="rest">
                    {[...new Set(posts.map(post => post.category))].map(category => (
                      <li key={category}>
                        <Link href="#">
                         {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="widget last-post-thum">
                  <h6 className="title-widget">{texts.latestPostsTitle}</h6>
                  {posts.slice(0, 3).map(post => (
                    <div className="item d-flex align-items-center" key={post.id}>
                      <div>
                        <div className="img">
                          <Link href={`/blog/${post.url}`}>
                              <Image
                                src={post.thumbnail}
                                alt={post.title}
                                width={100}
                                height={70}
                              />
                              <span className="date">
                                <span>{post.date}</span>
                              </span>
                          </Link>
                        </div>
                      </div>
                      <div className="cont">
                        <span className="tag">
                          <Link href="#">
                            {post.category}
                          </Link>
                        </span>
                        <h6>
                          <Link href={`/blog/${post.url}`}>
                            {post.title}
                          </Link>
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
