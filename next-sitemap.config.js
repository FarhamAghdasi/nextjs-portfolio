const fs = require('fs');
const path = require('path');

const enTemplateData = require('./src/data/en/api/template.json');
const faTemplateData = require('./src/data/fa/api/template.json');
const enPortfolioData = require('./src/data/en/api/portfolio.json');
const faPortfolioData = require('./src/data/fa/api/portfolio.json');
const enPostsData = require('./src/data/en/api/posts.json');
const faPostsData = require('./src/data/fa/api/posts.json');

function walkOutDir(outDir) {
  const results = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.name === 'index.html') {
        const relative = fullPath
          .replace(outDir, '')
          .replace(/\\/g, '/')
          .replace('/index.html', '') || '/';
        if (
          !relative.includes('404') &&
          !relative.includes('_not-found') &&
          !relative.startsWith('/404')
        ) {
          results.push(relative);
        }
      }
    }
  };
  walk(outDir);
  return results;
}

function filterByLocale(paths, locale) {
  if (locale === 'en') {
    return paths.filter((p) => !p.startsWith('/fa'));
  }
  if (locale === 'fa') {
    return paths.filter((p) => p.startsWith('/fa'));
  }
  return paths;
}

function toUrls(paths, locale) {
  return paths.map((p) => ({
    loc: `https://farhamaghdasi.ir${p}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 0.7,
  }));
}

function wrapSitemap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;
}

module.exports = {
  siteUrl: 'https://farhamaghdasi.ir',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',

  generateSitemaps: async () => {
    return [
      { id: 'en' },
      { id: 'fa' },
      { id: 'en-templates' },
      { id: 'fa-templates' },
      { id: 'en-portfolio' },
      { id: 'fa-portfolio' },
      { id: 'en-posts' },
      { id: 'fa-posts' },
    ];
  },

  getSitemap: async (id) => {
    const outDir = path.resolve(process.cwd(), './out');
    const allPaths = walkOutDir(outDir);
    const now = new Date().toISOString();

    if (id === 'en') {
      return wrapSitemap(toUrls(filterByLocale(allPaths, 'en'), 'en'));
    }

    if (id === 'fa') {
      return wrapSitemap(toUrls(filterByLocale(allPaths, 'fa'), 'fa'));
    }

    if (id === 'en-templates') {
      const urls = (enTemplateData.templates || []).map((t) => ({
        loc: `https://farhamaghdasi.ir/templates/${t.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    if (id === 'fa-templates') {
      const urls = (faTemplateData.templates || []).map((t) => ({
        loc: `https://farhamaghdasi.ir/fa/templates/${t.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    if (id === 'en-portfolio') {
      const urls = (enPortfolioData.portfolio || []).map((p) => ({
        loc: `https://farhamaghdasi.ir/portfolio/${p.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    if (id === 'fa-portfolio') {
      const urls = (faPortfolioData.portfolio || []).map((p) => ({
        loc: `https://farhamaghdasi.ir/fa/portfolio/${p.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    if (id === 'en-posts') {
      const urls = (enPostsData.posts || []).map((p) => ({
        loc: `https://farhamaghdasi.ir/blog/${p.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    if (id === 'fa-posts') {
      const urls = (faPostsData.posts || []).map((p) => ({
        loc: `https://farhamaghdasi.ir/fa/blog/${p.url}/`,
        lastmod: now,
        changefreq: 'daily',
        priority: 0.8,
      }));
      return wrapSitemap(urls);
    }

    return wrapSitemap([]);
  },

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/rtlthemes/', '/rtlthemes/kanter/'],
      },
    ],
    additionalSitemaps: [
      'https://farhamaghdasi.ir/sitemap-index.xml',
    ],
  },
};
