import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogDetails } from '@/components';
import postsData from '@/data/fa/api/posts.json';
import texts from '@/data/fa/blog-details.json';
import { defaultMetadata } from '@/components/addon/seo';
import { Comment } from '@/components/types';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return postsData.posts.map(post => ({
    slug: post.url,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postsData.posts.find(p => p.url === slug);

  if (!post) {
    console.log(`Post not found for slug: ${slug}`);
    return {
      ...defaultMetadata,
      title: `یافت نشد | ${defaultMetadata.title?.default ?? ''}`,
      description: texts.postNotFound ?? 'مطلب یافت نشد.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = post.title || texts.defaultTitle || 'مطلب بلاگ';
  const pageDescription = post.short_description || texts.defaultDescription || '';
  const pageUrl = `https://farhamaghdasi.ir/fa/blog/${post.url}/`;
  const pageImage = post.thumbnail
    ? `https://farhamaghdasi.ir/assets/imgs/uploads/${post.thumbnail}`
    : defaultMetadata.openGraph?.images?.[0]?.url || '';

  return {
    ...defaultMetadata,
    title: pageTitle,
    description: pageDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: post.title || 'مطلب بلاگ',
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
    alternates: {
      canonical: pageUrl,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = postsData.posts.find(p => p.url === slug);
  const posts = postsData.posts;

  console.log(`Slug: ${slug}, Post found: ${!!post}`);

  if (!post) notFound();

  const initialComments: Comment[] = [];

  return (
    <Suspense fallback={<div>در حال بارگذاری مطلب...</div>}>
      <BlogDetails post={post} posts={posts} searchTerm="" initialComments={initialComments} />
    </Suspense>
  );
}
