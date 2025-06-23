# Next.js Portfolio

A modern, responsive portfolio website built with **Next.js 15.2.4**, showcasing projects, blog posts, services, and HTML templates. The project leverages **Static Site Generation (SSG)** for optimal performance and SEO, featuring dynamic routes, client-side interactivity, and a particle animation canvas for a visually engaging experience. Developed by **Farham Aghdasi**, this portfolio highlights expertise in front-end development, SEO, and full-stack solutions.

## Description

This portfolio is the personal website of **Farham Aghdasi**, a Junior Front-end Developer from Amol, Iran, specializing in web development and programming. Key features include:

- **Static Site Generation (SSG)**: Built with `next export` for fast, pre-rendered pages optimized for deployment.
- **Dynamic Routing**: Supports blog posts, portfolio items, and templates via dynamic routes (`[slug].tsx`).
- **SEO Optimization**: Implements `generateMetadata` for page-specific metadata, improving search engine visibility.
- **Interactive Components**: Includes a blog with search and category filtering (`Bloginfo`), a particle animation background (`ParticleCanvas`), and GSAP-powered animations.
- **Responsive Design**: Uses Bootstrap, custom CSS, and responsive layouts for a seamless experience across devices.
- **TypeScript**: Ensures type safety and maintainability across the codebase.
- **Data-Driven Content**: Content is managed via JSON files (`portfolio.json`, `posts.json`, `template.json`) for easy updates.
- **External API Integration**: Fetches comments for blog posts from `https://api.farhamaghdasi.ir/comments`.
- **Custom Styling**: Incorporates custom fonts (Outfit), FontAwesome icons, and CSS animations for a polished look.

The project is live at [https://farhamaghdasi.ir](https://farhamaghdasi.ir) and hosted on GitHub at [https://github.com/FarhamAghdasi/nextjs-portfolio](https://github.com/FarhamAghdasi/nextjs-portfolio).

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── about/              # About page
│   │   ├── blog/               # Blog page and dynamic blog post routes
│   │   ├── contact/            # Contact page
│   │   ├── portfolio/          # Portfolio page and dynamic portfolio routes
│   │   ├── services/           # Services page
│   │   ├── templates/          # Templates page and dynamic template routes
│   │   ├── error.tsx           # Error page
│   │   ├── layout.tsx          # Root layout with global styles and components
│   │   ├── not-found.tsx       # 404 page
│   │   ├── page.tsx            # Home page
│   ├── assets/
│   │   ├── css/                # Custom CSS and FontAwesome fonts
│   │   ├── fonts/              # Custom font (Outfit)
│   ├── components/
│   │   ├── addon/              # Utility components (e.g., ParticleCanvas, SEO)
│   │   ├── pages/              # Page-specific components (e.g., HomePage, BloginfoClient)
│   │   ├── section/            # Reusable sections (e.g., PortfolioSection, SkillsSection)
│   │   ├── footer.tsx          # Footer component
│   │   ├── header.tsx          # Header/navigation component
│   │   ├── hero.tsx            # Hero section
│   │   ├── types.ts            # TypeScript interfaces
│   ├── data/
│   │   ├── api/                # Content data (portfolio.json, posts.json, template.json)
│   │   ├── *.json              # Configuration and content files (e.g., blog.json, skills.json)
├── public/
│   ├── assets/                 # Static assets (images, uploads)
├── next.config.mjs             # Next.js configuration
├── package.json                # Dependencies and scripts
└── README.md                   # Project documentation
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
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Build for production (SSG):
   ```bash
   npm run build:ssg
   ```
   Generates static files in the `out` directory for deployment.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build:ssg`: Builds the project for static export (`next build && next export`).
- `npm run start`: Starts a production server for testing builds locally.

## Technologies Used

- **Next.js 15.2.4**: React framework for SSG, dynamic routing, and app router.
- **TypeScript**: For type-safe development.
- **React**: For building interactive UI components.
- **GSAP & ScrollTrigger**: For smooth animations and scroll-based effects.
- **Bootstrap 5**: For responsive layouts and components.
- **FontAwesome**: For icons in navigation and social links.
- **Custom CSS**: For styling, including animations and responsive design.
- **Canvas API**: For particle animations in `ParticleCanvas`.
- **ESLint**: For code linting and maintaining code quality.
- **Outfit Font**: Custom typography for a modern look.

## Features

- **Home Page**: Hero section with typewriter effect for roles and social links.
- **Blog**: Filterable blog posts with client-side search and category navigation, fetching comments via API.
- **Portfolio**: Showcases projects like "Khooshesanat Amol" with full-stack development details.
- **Templates**: Displays HTML templates like "NewVilla" with purchase links.
- **Services**: Highlights skills in front-end, SEO, back-end, and editing.
- **About**: Details Farham's journey, skills, and achievements (e.g., National Youth Skills Competition medal).
- **Contact**: Form for inquiries with social media links.
- **Animations**: GSAP-powered transitions and particle effects for visual appeal.
- **SEO**: Optimized metadata for all pages, improving discoverability.

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
- GSAP
- SEO
- Responsive Design
- Blog
- HTML Templates
- Canvas Animation
- Web Development
- Front-end Development
- Full-stack Development

## Contact

For questions or feedback:
- Email: [farhamaghdasi08@gmail.com](mailto:farhamaghdasi08@gmail.com)
- Telegram: [t.me/farhamaghdasi](https://t.me/farhamaghdasi)
- GitHub: [FarhamAghdasi](https://github.com/FarhamAghdasi)
- Visit: [https://farhamaghdasi.ir](https://farhamaghdasi.ir)