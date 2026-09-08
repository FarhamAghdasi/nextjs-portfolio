'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from '@/i18n/LocaleLink';
import { useSearchParams, useRouter } from 'next/navigation';
import gsap from 'gsap';
import rawPostsDataEn from '@/data/en/api/posts.json';
import rawPostsDataFa from '@/data/fa/api/posts.json';
import textsEn from '@/data/en/blog.json';
import textsFa from '@/data/fa/blog.json';
const defaultLogo = '/assets/imgs/logo.png';
import { Sidebar } from '@/components';
import { PostBlog } from '@/components/types';
import { useLocaleContext, useLocalizedData } from '@/i18n/LocaleProvider';

const Bloginfo: React.FC = () => {
  const { locale, localizeHref } = useLocaleContext();
  const texts = useLocalizedData(textsEn, textsFa);
  const dateLocale = locale === 'fa' ? 'fa-IR' : undefined;
  const categoryNotFoundText = useLocalizedData(
    (cat: string) => `Category "${cat}" does not exist.`,
    (cat: string) => `دسته‌بندی «${cat}» وجود ندارد.`
  );
  const [searchTerm, setSearchTerm] = useState('');
  const postsRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const category = searchParams.get('category') || '';

  const rawPostsData = useLocalizedData(rawPostsDataEn, rawPostsDataFa);
  const posts: PostBlog[] = useMemo(() => (rawPostsData.posts || []), [rawPostsData]);

  const roleText = (role?: string) => {
    if (!role) return texts.authorRoleFallback;
    if (locale === 'fa') {
      const map: Record<string, string> = {
        'Junior Developer': 'توسعه‌دهنده جونیور',
        'Front-end Developer': 'توسعه‌دهنده فرانت‌اند',
        'Full-Stack Developer': 'توسعه‌دهنده فول‌استک',
      };
      return map[role] || role;
    }
    return role;
  };

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
    router.push(localizeHref('/blog/'));
  };

  return (
    <>
      <header>
        <div className="container section-padding bord-thin-bottom-light">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-7/12">
              <div className="caption max-[992px]:mb-[30px]">
                <h1 className="text-indent text-[55px] max-md:text-[35px] max-md:indent-0">{texts.headerTitle}</h1>
              </div>
            </div>
            <div className="w-full lg:w-4/12 lg:ml-[8.33%] flex items-end">
              <div className="text">
                <p>{texts.headerText}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-[60px]">
            <div className="lg:col-span-8">
              <div className="main-blog max-[992px]:mb-[80px]" ref={postsRef}>
                {!isCategoryValid ? (
                  <p>{categoryNotFoundText(category)}</p>
                ) : filteredPosts.length === 0 ? (
                  <p>{texts.noPostsFound}</p>
                ) : (
                  filteredPosts.map((post) => (
                    <div className="item" key={post.id}>
                       <div className="info flex items-center">
                         <div className="flex items-center">
                           <div>
                             <div className="author-img fit-img w-10 h-10 rounded-full">
                               <Image
                                 src={post.authorImage || defaultLogo}
                                 alt={post.author || 'Author'}
                                 width={50}
                                 height={50}
                                 unoptimized
                               />
                             </div>
                           </div>
                           <div className="author-info ms-[10px] text-[13px] uppercase [&_span]:block [&_span]:leading-[22px]">
                             <span>{post.author}</span>
                             <span className="sub-color capitalize!">{roleText(post.role)}</span>
                           </div>
                         </div>
                         <div className="date me-auto pe-[15px] text-[13px] uppercase [&_span]:block [&_span]:leading-[22px]">
                           <span className="sub-color">
                             <i className="fa-regular fa-clock me-[15px] opacity-70" /> {new Date(post.date).toLocaleDateString(dateLocale)}
                           </span>
                         </div>
                       </div>
                      <div className="img fit-img mt-[30px] rounded-[15px] overflow-hidden h-[350px]">
                        <Image
                          src={post.thumbnail ? `/assets/imgs/uploads/${post.thumbnail}` : '/default-image.jpg'}
                          alt={post.title || 'Blog Post'}
                          width={1200}
                          height={630}
                          style={{ objectFit: 'cover' }}
                          unoptimized
                        />
                      </div>
                      <div className="cont mt-[30px]">
                        <span className="sub-color text-[14px] text-u mb-[15px]">
                          <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>
                            <i className="fa-solid fa-tag mr-[10px] opacity-70" /> {post.category}
                          </Link>
                        </span>
                        <h3>
                          <Link href={`/blog/${post.url}/`}>{post.title}</Link>
                        </h3>
                        <div className="text mt-[25px]">
                          <p>{post.short_description}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="lg:col-span-4">
              <Sidebar posts={posts} onSearch={handleSearch} onReset={handleReset} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloginfo;

