'use client';

import React, { useState, useEffect } from 'react';
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
    if (onSearch && inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleReset = () => {
    setInputValue('');
    if (onReset) {
      onReset();
    }
  };

  useEffect(() => {
    if (!onSearch) return;
    const term = inputValue.trim();
    const delay = setTimeout(() => {
      onSearch(term.length >= 3 ? term : '');
    }, 300);
    return () => clearTimeout(delay);
  }, [inputValue, onSearch]);

  return (
      <div>
      <div className="search-box mb-4 flex gap-2 relative">
        <input
          type="text"
          name="search-post"
          className="text-white p-[15px] pr-[70px] border border-white/40 rounded-[30px] w-full bg-transparent focus:border-white focus:outline-none!"
          placeholder={texts.searchPlaceholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {onSearch && (
          <div className="absolute top-1/2 right-[15px] -translate-y-1/2 flex items-center gap-3">
            <a className="icon fa fa-search cursor-pointer" onClick={handleSearch} />
            {inputValue && (
              <a className="icon fa fa-remove cursor-pointer" onClick={handleReset} />
            )}
          </div>
        )}
      </div>

      <div className="widget catogry mb-4 mt-[50px]">
        <h6 className="title-widget mb-[30px] pt-[5px] border-t border-white/[0.08]">{texts.categoriesTitle}</h6>
        <ul className="rest">
          {availableCategories.map((cat) => (
            <li key={cat} className="flex text-[15px] mb-[7px] py-[10px] px-5 bg-white/[0.02] rounded-[30px]">
              <Link href={`/blog?category=${encodeURIComponent(cat)}`}>{cat}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="widget last-post-thum mt-[50px]">
        <h6 className="title-widget mb-[30px] pt-[5px] border-t border-white/[0.08]">{texts.latestPostsTitle}</h6>
        {posts.slice(0, 3).map((post) => (
          <div
            className="item group flex items-center mb-[30px] last-of-type:mb-[0px]"
            key={post.id}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <div
              className="img w-[90px] h-[100px] shrink-0 rounded-[5px] overflow-hidden"
              style={{ flex: '0 0 90px', height: '100px' }}
            >
              <Link href={`/blog/${post.url}/`} className="w-full h-full relative block">
                <Image
                  src={post.thumbnail ? `/assets/imgs/uploads/${post.thumbnail}` : '/default-image.jpg'}
                  alt={post.title || 'Blog Post'}
                  width={100}
                  height={70}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  unoptimized
                />
              </Link>
            </div>
            <div className="cont flex-1 pl-[25px]" style={{ flex: 1, paddingLeft: 25 }}>
              <span className="tag text-xs py-[5px] px-[15px] rounded-[30px] bg-white/[0.03] mb-[10px]">
                <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                  {post.category}
                </Link>
              </span>
              <h6 className="text-[17px]">
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