import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogDetails } from '@/components';
import postsData from '@/data/api/posts.json';
import texts from '@/data/blog-details.json';
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
      title: `Not Found | ${defaultMetadata.title?.default ?? ''}`,
      description: texts.postNotFound ?? 'Post not found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = post.title || texts.defaultTitle || 'Blog Post';
  const pageDescription = post.short_description || texts.defaultDescription || '';
  const pageUrl = `https://farhamaghdasi.ir/blog/${post.url}/`;
  const pageImage = post.thumbnail
    ? `https://farhamaghdasi.ir/assets/imgs/uploads/${post.thumbnail}` // Use absolute URL for metadata
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
          alt: post.title || 'Blog Post',
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

  let initialComments: Comment[] = [];
  try {
    const response = await fetch(`https://api.farhamaghdasi.ir/comments?url=${slug}`);
    if (response.ok) {
      initialComments = (await response.json()) as Comment[];
    }
  } catch (err) {
    console.error('Error fetching comments server-side:', err);
  }

  return (
    <Suspense fallback={<div>Loading blog post...</div>}>
      <BlogDetails post={post} posts={posts} searchTerm="" initialComments={initialComments} />
    </Suspense>
  );
}