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


export interface FormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface ApiResponse {
    success: boolean;
    [key: string]: any;
}

export interface InnerProps {
    title: string;
    first: string;
    secend: string;
    paragraph?: string;
    links?: string;
    contact?: boolean;
    cpage?: React.ReactNode;
    noimage?: boolean;
}

export interface Template {
    title: string;
    date: string;
    author: string;
    category: string;
    accordionTitle: string;
    accordionContent: string;
    serviceTitle1: string;
    serviceTitle2: string;
    serviceTitle3: string;
    price: string;
    buyLink: string;
    siteName: string;
    url: string;
    Shortdescription: string;
    description: string;
    thumbnail: string;
}

export interface Service {
    id: number;
    number: string;
    title: string;
    description: string;
}

export interface ServiceTitle {
    title: string;
    tags: string[];
    image: string;
}

export interface ShareButtonsProps {
    currentUrl: string;
    currentTitle: string;
}
export interface Skill {
    name: string;
    level: string;
    image: string;
}
export interface NumberItem {
    count: string;
    label: string;
    link?: string;
}
export interface ExperienceItem {
    title: string;
    desc: string;
}

export interface PortfolioItem {
    title: string;
    date: string;
    author: string;
    category?: string;
    accordionTitle?: string;
    accordionContent?: string;
    serviceTitle1?: string;
    serviceTitle2?: string;
    serviceTitle3?: string;
    Previewurl?: string;
    url: string;
    description?: string;
    Shortdescription: string;
    thumbnail: string;
}

export interface TemplateItem {
    title: string;
    date: string;
    author: string;
    category?: string;
    accordionTitle?: string;
    accordionContent?: string;
    serviceTitle1?: string;
    serviceTitle2?: string;
    serviceTitle3?: string;
    price?: string;
    buyLink?: string;
    siteName?: string;
    url: string;
    Shortdescription: string;
    description?: string;
    thumbnail: string;
}