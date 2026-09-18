# Next.js Portfolio

A modern, responsive, bilingual (English/Persian) portfolio website built with **Next.js 16.3.5** and **React 19**, showcasing projects, blog posts, services, and HTML templates. The project leverages **Static Site Generation (SSG)** via `output: 'export'` for optimal performance and SEO, featuring dynamic routes, client-side interactivity, particle animations, and RTL support for Persian content. Developed by **Farham Aghdasi**, this portfolio highlights expertise in front-end development, SEO, full-stack solutions, and internationalization.

## Description

This portfolio is the personal website of **Farham Aghdasi**, a Junior Front-end Developer from Amol, Iran, specializing in web development and programming. Key features include:

- **Static Site Generation (SSG)**: Built with `next build` and `next export` for fast, pre-rendered pages optimized for deployment.
- **Multi-Language Support (i18n)**: Full English (LTR) and Persian (RTL) localization with dedicated route segments (`/` and `/fa/`).
- **RTL Support**: Conditional classes and `dir` attributes for proper Persian layout, including the IRANYekan font.
- **Dynamic Routing**: Supports blog posts, portfolio items, and templates via dynamic routes (`[slug].tsx`) for both locales.
- **SEO Optimization**: Implements `generateMetadata`, `next-sitemap`, and a custom `scripts/generate-sitemaps.js` for multi-locale sitemap generation with hreflang alternates.
- **Interactive Components**: Includes a blog with search and category filtering (`BloginfoClient`), a particle animation background (`ParticleCanvas`), GSAP-powered animations, `TextSplitter` with ScrollTrigger, and social sharing.
- **Responsive Design**: Uses Tailwind CSS v4, custom CSS, PostCSS, PurgeCSS, and responsive layouts for a seamless experience across devices.
- **TypeScript**: Uses the `react-jsx` transform for type safety and maintainability across the codebase.
- **Data-Driven Content**: Content is managed via JSON files in `src/data/en/` and `src/data/fa/` for easy localization and updates.
- **Custom Styling**: Incorporates custom fonts (Outfit, IRANYekan), FontAwesome icons, CSS animations, and Tailwind utilities for a polished look.

The project is live at [https://farhamaghdasi.ir](https://farhamaghdasi.ir) and hosted on GitHub at [https://github.com/FarhamAghdasi/nextjs-portfolio](https://github.com/FarhamAghdasi/nextjs-portfolio).

## Project Structure

```
├── scripts/
│   └── generate-sitemaps.js        # Multi-locale sitemap generation
├── src/
│   ├── app/
│   │   ├── [locale]/               # Locale-based dynamic routes (en/fa)
│   │   │   ├── about/              # About page
│   │   │   ├── blog/               # Blog page and dynamic blog post routes
│   │   │   ├── contact/            # Contact page
│   │   │   ├── portfolio/          # Portfolio page and dynamic portfolio routes
│   │   │   ├── services/           # Services page
│   │   │   ├── templates/          # Templates page and dynamic template routes
│   │   │   ├── layout.tsx          # Root layout with global styles and components
│   │   │   └── page.tsx            # Home page
│   │   ├── error.tsx               # Error page
│   │   ├── not-found.tsx           # 404 page
│   │   ├── layout.tsx              # Root layout (default locale)
│   │   └── page.tsx                # Home page (default locale)
│   ├── assets/
│   │   ├── css/                    # Custom CSS, Tailwind, FontAwesome fonts
│   │   └── fonts/                  # Custom fonts (Outfit, IRANYekan)
│   ├── components/
│   │   ├── addon/                  # Utility components (ParticleCanvas, SEO, TextSplitter, etc.)
│   │   ├── pages/                  # Page-specific components (HomePage, BloginfoClient, etc.)
│   │   ├── section/                # Reusable sections (PortfolioSection, SkillsSection, etc.)
│   │   ├── footer.tsx              # Footer component
│   │   ├── header.tsx              # Header/navigation component
│   │   ├── hero.tsx                # Hero section
│   │   ├── types.ts                # TypeScript interfaces
│   ├── data/
│   │   ├── en/                     # English content (about, blog, portfolio, skills, etc.)
│   │   ├── fa/                     # Persian content (about, blog, portfolio, skills, etc.)
│   │   └── api/                    # API data (portfolio.json, posts.json, template.json)
│   ├── public/
│   │   └── assets/                 # Static assets (images, uploads)
├── next.config.ts                  # Next.js configuration (static export, images)
├── next-sitemap.config.js          # Sitemap generation configuration
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration (react-jsx, path aliases)
├── postcss.config.mjs              # PostCSS configuration
├── purgecss.config.js              # PurgeCSS configuration
└── README.md                       # Project documentation
```

## Installation

To run the project locally, follow these steps:

### Prerequisites
- Node.js (v18 or later)
- npm or yarn

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/FarhamAghdasi/nextjs-portfolio.git
   cd nextjs-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3001](http://localhost:3001) in your browser.

4. Build for production (SSG):
   ```bash
   npm run build
   ```
   Generates static files in the `out` directory for deployment.

5. Generate sitemaps (after build):
   ```bash
   npm run postbuild
   ```
   Generates multi-locale sitemaps in the `out` directory.

## Scripts

- `npm run dev`: Starts the development server on port 3001.
- `npm run build`: Builds the project for static export.
- `npm run start`: Starts a production server on port 3001 for testing builds locally.
- `npm run postbuild`: Runs `next-sitemap` and `node scripts/generate-sitemaps.js` for sitemap generation.

## Technologies Used

- **Next.js 16.3.5**: React framework for SSG, dynamic routing, App Router, and static export.
- **React 19**: For building interactive UI components.
- **TypeScript**: For type-safe development with `react-jsx` transform.
- **Tailwind CSS v4**: Utility-first CSS framework.
- **PostCSS**: CSS processing with Autoprefixer and import support.
- **PurgeCSS**: Removes unused CSS for optimized bundle size.
- **GSAP & ScrollTrigger**: For smooth animations and scroll-based effects.
- **FontAwesome**: For icons in navigation and social links.
- **Custom CSS**: For styling, including animations and responsive design.
- **Canvas API**: For particle animations in `ParticleCanvas`.
- **ESLint**: For code linting and maintaining code quality.
- **next-sitemap**: For XML sitemap generation.
- **Outfit & IRANYekan Fonts**: Custom typography for English and Persian content.
- **Express Session, Mongoose, MySQL2**: Backend dependencies for potential API and database integration.

## Features

- **Home Page**: Hero section with typewriter effect for roles and social links.
- **Blog**: Filterable blog posts with client-side search and category navigation, fetching comments via API.
- **Portfolio**: Showcases projects like "Khooshesanat Amol" with full-stack development details.
- **Templates**: Displays HTML templates like "NewVilla" with purchase links.
- **Services**: Highlights skills in front-end, SEO, back-end, and editing.
- **About**: Details Farham's journey, skills, and achievements (e.g., National Youth Skills Competition medal).
- **Contact**: Form for inquiries with social media links and social media card components.
- **Animations**: GSAP-powered transitions, TextSplitter with ScrollTrigger, particle effects, and wow-animation for visual appeal.
- **SEO**: Optimized metadata for all pages, multi-locale sitemaps with hreflang alternates, improving discoverability.
- **Multi-Language**: Full English and Persian (RTL) support with locale-aware routing.
- **FAQ & Accordion**: Interactive FAQ section with expandable accordion components.
- **Pagination**: Client-side pagination for blog posts and portfolio items.

## Routing & Localization

- Default locale: English at root (`/`, `/about`, `/blog`...)
- Persian locale: Served under `/fa` (`/fa/about`, `/fa/blog`...)
- Automatic RTL direction switching for Persian pages
- Data files organized in `src/data/en/` and `src/data/fa/` for locale-specific content

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Ensure your code adheres to ESLint rules and TypeScript conventions. Report issues via [GitHub Issues](https://github.com/FarhamAghdasi/nextjs-portfolio/issues).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Tags

- Next.js
- Portfolio
- Static Site Generation
- TypeScript
- React
- Tailwind CSS
- GSAP
- SEO
- Responsive Design
- Blog
- HTML Templates
- Canvas Animation
- Web Development
- Front-end Development
- Full-stack Development
- i18n
- RTL
- Persian
- Multi-language

## Contact

For questions or feedback:
- Email: [farhamaghdasi08@gmail.com](mailto:farhamaghdasi08@gmail.com)
- Telegram: [t.me/farhamaghdasi](https://t.me/farhamaghdasi)
- GitHub: [FarhamAghdasi](https://github.com/FarhamAghdasi)
- Visit: [https://farhamaghdasi.ir](https://farhamaghdasi.ir)
