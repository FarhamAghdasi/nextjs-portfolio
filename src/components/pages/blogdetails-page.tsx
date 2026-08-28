'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Share, Captcha, Comments, Sidebar } from '@/components';
const authorImage = '/assets/imgs/logo.png';
import texts from '@/data/blog-details.json';
import { BlogInfoProps, FormData, Comment } from '@/components/types';
import { useSearchParams } from 'next/navigation';

interface ExtendedBlogInfoProps extends BlogInfoProps {
  searchTerm?: string;
  initialComments?: Comment[];
}

const BlogInfo: React.FC<ExtendedBlogInfoProps> = ({ post, posts, initialComments = [] }) => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('search') || '';
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    captcha: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = (term: string) => {
    window.location.href = `/blog?search=${encodeURIComponent(term)}`;
  };

  const handleReset = () => {
    window.location.href = '/blog';
  };

  const handleCaptchaChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      captcha: value,
    }));
  };

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.captcha.trim()) {
      alert(texts.captchaError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.farhamaghdasi.ir/setcomments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          url: post?.url ?? '',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || texts.commentFailed);
        return;
      }

      setFormData({ name: '', email: '', message: '', captcha: '' });
      alert(texts.commentSuccess);
    } catch (err) {
      console.error('Error posting comment:', err);
      alert(texts.commentError);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!post) {
    return <div>{texts.postNotFound}</div>;
  }

  const currentUrl = `https://farhamaghdasi.ir/blog/${post.url}/`;
  const currentTitle = post.title || texts.defaultTitle;

  return (
    <>
      <header className="post-header pt-20">
        <div
          className="out bg-img mt-80 max-w-[1400px] mx-auto"
          data-overlay-dark="4"
          style={{ backgroundImage: `url(/assets/imgs/uploads/${post.thumbnail})` }}
        >
           <div className="flex flex-wrap">
             <div className="w-full lg:w-12/12">
               <div className="caption">
                <div className="tags fz-14">
                  <Link href={`/blog?category=${encodeURIComponent(post.category)}`}>{post.category}</Link>
                </div>
                <h1 className="fz-55 mt-30">{post.title || texts.defaultTitle}</h1>
              </div>
              <div className="info flex mt-40 items-center">
                <div className="left-info sm-mb30">
                  <div className="flex items-center">
                    <div className="author-info">
                  <div className="flex items-center">
                    <Link href="#" className="circle-60">
                      <Image
                        src={authorImage}
                        alt={texts.authorAlt}
                        className="circle-img"
                        width={60}
                        height={60}
                        unoptimized
                      />
                    </Link>
                    <Link href="#" className="ml-20">
                          <span className="opacity-7 mb-5">{texts.authorLabel}</span>
                          <h6 className="fz-16">{post.author || texts.unknownAuthor}</h6>
                        </Link>
                      </div>
                    </div>
                    <div className="date ml-50">
                      <Link href="#">
                        <span className="opacity-7 mb-5">{texts.publishedLabel}</span>
                        <h6 className="fz-16">{new Date(post.date).toLocaleDateString()}</h6>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="right-info ml-auto">
                  <div>
                    <span className="icon ti-comment fz-18 mr-10" />
                    <span className="opacity-7">{post.comments?.length || 0} {texts.commentsLabel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

       <section className="blog section-padding">
         <div className="container">
           <div className="flex flex-wrap xlg-marg">
             <div className="w-full lg:w-8/12">
              <div className="main-post">
                <div className="item pb-60">
                  <article>
                    <div className="text" dangerouslySetInnerHTML={{ __html: post.description || '' }} />
                  </article>
                </div>
                <div className="info-area flex pt-50 bord-thin-top">
                  <div>
                    <div className="tags flex">
                      <div className="valign">
                        <span>{texts.tagsLabel} :</span>
                      </div>
                      <div>
                        {post.tags.map((tag) => (
                          <Link href={`/blog?category=${encodeURIComponent(tag)}`} key={tag}>
                            {tag}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div className="share-icon flex">
                      <div className="valign">
                        <span>{texts.shareLabel} :</span>
                      </div>
                      <Suspense fallback={<div>Loading share buttons...</div>}>
                        <Share currentUrl={currentUrl} currentTitle={currentTitle} />
                      </Suspense>
                    </div>
                  </div>
                </div>
                <div className="author-area mt-50 bord-thin-bottom">
                  <div className="flex">
                    <div className="author-img mr-30">
                      <div className="img">
                        <Image
                          src={authorImage}
                          alt={texts.authorAlt}
                          className="circle-img"
                          width={60}
                          height={60}
                        />
                      </div>
                    </div>
                    <div className="cont valign">
                      <div className="full-width">
                        <h6 className="fw-600 mb-10">{post.author || texts.authorName}</h6>
                        <p>{post.role || texts.authorRole}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="comments-from mt-80 md-mb80">
                  <div className="mb-60">
                    <h3>{texts.leaveComment}</h3>
                  </div>
                  <form onSubmit={submitComment}>
                    <div className="controls flex flex-wrap">
                      <div className="w-full lg:w-6/12">
                        <div className="form-group mb-30">
                          <input
                            id="form_name"
                            type="text"
                            name="name"
                            placeholder={texts.namePlaceholder}
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full lg:w-6/12">
                        <div className="form-group mb-30">
                          <input
                            id="form_email"
                            type="email"
                            name="email"
                            placeholder={texts.emailPlaceholder}
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <div className="form-group">
                          <textarea
                            id="form_message"
                            name="message"
                            placeholder={texts.messagePlaceholder}
                            rows={4}
                            value={formData.message}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <Suspense fallback={<div>Loading captcha...</div>}>
                        <Captcha onCaptchaChange={handleCaptchaChange} />
                      </Suspense>
                      <div className="text-center">
                        <button type="submit" className="mt-30" disabled={isSubmitting}>
                          {isSubmitting ? texts.submitting : texts.postComment}
                        </button>
                      </div>
                    </div>
                  </form>
                  <Suspense fallback={<div>Loading comments...</div>}>
                    <Comments url={post.url} initialComments={initialComments} />
                  </Suspense>
                </div>
              </div>
            </div>
             <div className="w-full lg:w-4/12">
              <Suspense fallback={<div>Loading sidebar...</div>}>
                <Sidebar posts={posts} onSearch={handleSearch} onReset={handleReset} initialSearch={searchTerm} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      <div className="blog-mp">
        <div className="container section-padding bord-thin-top-light">
          <div className="sec-head mb-80">
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12">
                <h2>{texts.recentNews}</h2>
              </div>
              <div className="w-full lg:w-6/12">
                <div className="flex">
                  <Link
                    href="/blog"
                    className="butn butn-md butn-bord butn-rounded ml-auto"
                  >
                   <div className="flex items-center">
                      <span>{texts.allArticles}</span>
                      <span className="icon ml-20">
                        <i className="fa-solid fa-chevron-right" />
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
    <div className="flex flex-wrap xlg-marg">
              {posts.slice(0, 3).map((p) => (
                <div key={p.id} className="w-full lg:w-4/12 bord">
                <div className="item">
                    <div className="info flex items-center">
                      <div className="flex items-center">
                      <div>
                        <div className="author-img fit-img">
                          <Image
                            src={authorImage}
                            alt={p.author || texts.authorAlt}
                            width={60}
                            height={60}
                          />
                        </div>
                      </div>
                      <div className="author-info ml-10">
                        <span>{p.author || texts.unknownAuthor}</span>
                        <span className="sub-color">{p.role || texts.authorRole}</span>
                      </div>
                    </div>
                    <div className="date ml-auto">
                      <span className="sub-color">
                        <i className="fa-regular fa-clock mr-15 opacity-7" />
                        {new Date(p.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="img fit-img mt-30">
                    <Link href={`/blog/${p.url}/`}>
                      <Image
                        src={p.thumbnail ? `/assets/imgs/uploads/${p.thumbnail}` : '/default-image.jpg'}
                        alt={p.title || 'Blog Post'}
                        width={400}
                        height={300}
                        style={{ objectFit: 'cover' }}
                      />
                    </Link>
                  </div>
                  <div className="cont mt-30">
                    <h6>
                      <Link href={`/blog/${p.url}/`}>
                        {p.title || texts.defaultTitle}
                      </Link>
                    </h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogInfo;