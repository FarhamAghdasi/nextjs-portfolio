import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { BlogDetails } from '@/components';
import postsData from '@/data/api/posts.json';
import texts from '@/data/blog-details.json';
import { defaultMetadata } from '@/components/addon/seo';
import { PostDetails } from '@/components/types';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return postsData.posts.map((post: PostDetails) => ({
    slug: post.url,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = postsData.posts.find((p: PostDetails) => p.url === params.slug);

  if (!post) {
    return {
      ...defaultMetadata,
      title: `Not Found | ${defaultMetadata.title.default}`,
      description: texts.postNotFound,
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const pageTitle = post.title || texts.defaultTitle;
  const pageDescription = post.short_description || texts.defaultDescription;
  const pageUrl = `https://farhamaghdasi.ir/blog/${post.url}`;
  const pageImage = post.thumbnail
    ? `https://farhamaghdasi.ir${post.thumbnail}`
    : defaultMetadata.openGraph.images[0].url;

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

export default function BlogPage({ params }: BlogPageProps) {
  const post = postsData.posts.find((p: PostDetails) => p.url === params.slug);
  const posts = postsData.posts;

  if (!post) {
    notFound();
  }

  return <BlogDetails post={post} posts={posts} />;
}