import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import postsData from '@/data/api/posts.json';
import type { Post } from '@/components/types';

const BlogPageContent: React.FC = () => {
  const posts: Post[] = postsData.posts || postsData || [];

  const categories = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags || []).filter(Boolean)));

  return (
    <>
      <header className="blog-hed">
        <div className="container section-padding bord-thin-bottom-light">
          <div className="row">
            <div className="col-lg-7">
              <div className="caption md-mb30">
                <h1 className="text-indent">Welcome to Our Blog</h1>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1 d-flex align-items-end">
              <div className="text">
                <p>Explore the latest posts, ideas, and trends shared by our experts.</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="blog-mp section-padding">
        <div className="container">
          <div className="row xlg-marg">
            {/* Main Blog Posts */}
            <div className="col-lg-8">
              <div className="main-blog md-mb80">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div className="item mb-80" key={post.url}>
                      <div className="info d-flex align-items-center">
                        <div className="d-flex align-items-center">
                          <div>
                            <div className="author-img fit-img" style={{ position: 'relative', width: 50, height: 50 }}>
                              {post.authorImage ? (
                                <Image
                                  src={post.authorImage}
                                  alt={post.author || 'Author'}
                                  layout="fill"
                                  objectFit="cover"
                                />
                              ) : (
                                <div style={{ width: 50, height: 50, backgroundColor: '#ccc' }} />
                              )}
                            </div>
                          </div>
                          <div className="author-info ml-10">
                            <span>{post.author || 'Unknown Author'}</span>
                            <span className="sub-color">{post.role || ''}</span>
                          </div>
                        </div>
                        <div className="date ml-auto">
                          <span className="sub-color">
                            <i className="fa-regular fa-clock mr-15 opacity-7" /> {post.date || ''}
                          </span>
                        </div>
                      </div>

                      <div className="img fit-img mt-30" style={{ position: 'relative', width: '100%', height: 300 }}>
                        {post.image ? (
                          <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
                        ) : (
                          <div style={{ width: '100%', height: 300, backgroundColor: '#eee' }} />
                        )}
                      </div>

                      <div className="cont">
                        <span className="sub-color fz-14 text-u mb-15">
                          <Link href="#">
                            <a>
                              <i className="fa-solid fa-tag mr-10 opacity-7" /> {post.category || 'General'}
                            </a>
                          </Link>
                        </span>
                        <h3>
                          <Link href="#">
                            <a>{post.title}</a>
                          </Link>
                        </h3>
                        <div className="text mt-25">
                          <p>{post.short_description || post.description || ''}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No posts found.</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4">
              <div className="sidebar">
                <div className="search-box">
                  <input type="text" name="search-post" placeholder="Search" />
                  <span className="icon pe-7s-search" />
                </div>

                <div className="widget catogry">
                  <h6 className="title-widget">Categories</h6>
                  <ul className="rest">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <li key={category}>
                          <span>
                            <Link href="#">
                              <a>{category}</a>
                            </Link>
                          </span>
                        </li>
                      ))
                    ) : (
                      <li>No categories</li>
                    )}
                  </ul>
                </div>

                <div className="widget last-post-thum">
                  <h6 className="title-widget">Latest Posts</h6>
                  {posts.slice(0, 3).map((post) => (
                    <div className="item d-flex align-items-center" key={`latest-${post.url}`}>
                      <div>
                        <div className="img" style={{ position: 'relative', width: 70, height: 70 }}>
                          {post.image ? (
                            <Link href="#">
                              <a>
                                <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" />
                                <span className="date">
                                  <span>{post.date || ''}</span>
                                </span>
                              </a>
                            </Link>
                          ) : (
                            <div style={{ width: 70, height: 70, backgroundColor: '#ddd' }} />
                          )}
                        </div>
                      </div>
                      <div className="cont">
                        <span className="tag">
                          <Link href="#">
                            <a>{post.category || 'General'}</a>
                          </Link>
                        </span>
                        <h6>
                          <Link href="#">
                            <a>{post.title}</a>
                          </Link>
                        </h6>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="widget tags">
                  <h6 className="title-widget">Tags</h6>
                  <div>
                    {tags.length > 0 ? (
                      tags.map((tag) => (
                        <Link href="#" key={tag}>
                          <a>{tag}</a>
                        </Link>
                      ))
                    ) : (
                      <span>No tags</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPageContent;