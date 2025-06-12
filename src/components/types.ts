export interface ImageItem {
    src: string;
    class: string;
    alt: string;
}

export interface ContentSection {
    sectionClass: string;
    containerClass?: string;
    rowClass?: string;
    colClass?: string;
    content: {
        class?: string;
        title: string;
        images?: ImageItem[];
        [key: string]: any;
    };
}

export interface AboutContent {
    sectionClass: string;
    header: {
        title: string;
        class: string;
        bractClass: string;
    };
    content: {
        text: string;
        class: string;
    };
}

export interface Post {
    title: string;
    date?: string;
    author?: string;
    category?: string;
    url: string;
    short_description: string;
    description?: string;
    thumbnail?: string;
}

export interface PostsData {
    total_posts?: number;
    total_pages?: number;
    current_page?: number;
    posts: Post[];
}

export interface HeaderConfig {
    subTitle: string;
    title: string;
    clientCount: string;
    class: string;
    viewAllText: string;
    viewAllLink: string;
    arrowIcon: string;
}

export interface FallbackPost {
    title: string;
    category: string;
    short_description: string;
    thumbnail: string;
    url: string;
}

export interface PostConfig {
    sectionClass: string;
    containerClass: string;
    header: HeaderConfig;
    fallbackPost: FallbackPost;
    noPostsMessage: string;
}
