'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import texts from '@/data/blog.json';
import { PostBlog } from '@/components/types';

interface SidebarProps {
  posts: PostBlog[];
  onSearch?: (term: string) => void;
  onReset?: () => void;
  initialSearch?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ posts, onSearch, onReset, initialSearch = '' }) => {
  const [inputValue, setInputValue] = useState(initialSearch);

  const availableCategories = [...new Set(posts.map((post) => post.category))];

  const handleSearch = () => {
    if (inputValue.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(inputValue.trim())}`;
      if (onSearch) {
        onSearch(inputValue);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      window.location.href = `/blog?search=${encodeURIComponent(inputValue.trim())}`;
      if (onSearch) {
        onSearch(inputValue);
      }
    }
  };

  const handleReset = () => {
    setInputValue('');
    window.location.href = '/blog/';
    if (onReset) {
      onReset();
    }
  };

  return (
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
        {onSearch && (
          <>
            <a className="icon fa fa-search pr-20" onClick={handleSearch} />
            <a className="icon fa fa-remove mr-4" onClick={handleReset} />
          </>
        )}
      </div>

      <div className="widget catogry mb-4">
        <h6 className="title-widget">{texts.categoriesTitle}</h6>
        <ul className="rest">
          {availableCategories.map((cat) => (
            <li key={cat}>
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
                <Link href={`/blog/${post.url}/`}>
                  <Image
                    src={post.thumbnail ? `/assets/imgs/uploads/${post.thumbnail}` : '/default-image.jpg'}
                    alt={post.title || 'Blog Post'}
                    width={100}
                    height={70}
                    style={{ objectFit: 'cover' }}
                    unoptimized
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
                <Link href={`/blog/${post.url}/`}>{post.title}</Link>
              </h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;