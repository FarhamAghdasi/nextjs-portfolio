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
          <>
            <a className="icon fa fa-search pr-[5%] absolute top-1/2 right-[15px] -translate-y-1/2 cursor-pointer" onClick={handleSearch} />
            <a className="icon fa fa-remove absolute top-1/2 right-[45px] -translate-y-1/2 cursor-pointer" onClick={handleReset} />
          </>
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
          <div className="item group flex items-center mb-[30px] last-of-type:mb-[0px]" key={post.id}>
            <div>
              <div className="img w-[90px] h-[100px] rounded-[5px] overflow-hidden">
                <Link href={`/blog/${post.url}/`} className="w-full h-full relative block">
                  <Image
                    src={post.thumbnail ? `/assets/imgs/uploads/${post.thumbnail}` : '/default-image.jpg'}
                    alt={post.title || 'Blog Post'}
                    width={100}
                    height={70}
                    style={{ objectFit: 'cover' }}
                    unoptimized
                  />
                  <span className="date absolute top-1/2 left-1/2 text-sm w-[50px] h-[50px] text-center bg-black/10 backdrop-blur-[10px] rounded-full -translate-x-1/2 -translate-y-1/2 z-[3] opacity-0 transition-all duration-400 group-hover:opacity-100">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none">{post.date}</span>
                  </span>
                </Link>
              </div>
            </div>
            <div className="cont pl-[25px]">
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