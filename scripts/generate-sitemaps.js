const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const outDir = path.join(projectRoot, './out');
const enTemplateData = require(path.join(projectRoot, './src/data/en/api/template.json'));
const faTemplateData = require(path.join(projectRoot, './src/data/fa/api/template.json'));
const enPortfolioData = require(path.join(projectRoot, './src/data/en/api/portfolio.json'));
const faPortfolioData = require(path.join(projectRoot, './src/data/fa/api/portfolio.json'));
const enPostsData = require(path.join(projectRoot, './src/data/en/api/posts.json'));
const faPostsData = require(path.join(projectRoot, './src/data/fa/api/posts.json'));

function walk(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walk(fullPath));
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
  return results;
}

function toUrl(loc, lastmod) {
  return `  <url>
    <loc>https://farhamaghdasi.ir${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.7</priority>
  </url>`;
}

function wrap(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
${urls.join('\n')}
</urlset>`;
}

const allPaths = walk(outDir);
const now = new Date().toISOString();

const enStatic = allPaths.filter((p) => !p.startsWith('/fa'));
const faStatic = allPaths.filter((p) => p.startsWith('/fa'));

const enTemplates = (enTemplateData.templates || []).map(
  (t) => toUrl(`/templates/${t.url}/`, now)
);
const faTemplates = (faTemplateData.templates || []).map(
  (t) => toUrl(`/fa/templates/${t.url}/`, now)
);
const enPortfolio = (enPortfolioData.portfolio || []).map(
  (p) => toUrl(`/portfolio/${p.url}/`, now)
);
const faPortfolio = (faPortfolioData.portfolio || []).map(
  (p) => toUrl(`/fa/portfolio/${p.url}/`, now)
);
const enPosts = (enPostsData.posts || []).map(
  (p) => toUrl(`/blog/${p.url}/`, now)
);
const faPosts = (faPostsData.posts || []).map(
  (p) => toUrl(`/fa/blog/${p.url}/`, now)
);

fs.writeFileSync(
  path.join(outDir, 'sitemap-en.xml'),
  wrap(enStatic.map((p) => toUrl(p, now)))
);
fs.writeFileSync(
  path.join(outDir, 'sitemap-fa.xml'),
  wrap(faStatic.map((p) => toUrl(p, now)))
);
fs.writeFileSync(path.join(outDir, 'sitemap-en-templates.xml'), wrap(enTemplates));
fs.writeFileSync(path.join(outDir, 'sitemap-fa-templates.xml'), wrap(faTemplates));
fs.writeFileSync(path.join(outDir, 'sitemap-en-portfolio.xml'), wrap(enPortfolio));
fs.writeFileSync(path.join(outDir, 'sitemap-fa-portfolio.xml'), wrap(faPortfolio));
fs.writeFileSync(path.join(outDir, 'sitemap-en-posts.xml'), wrap(enPosts));
fs.writeFileSync(path.join(outDir, 'sitemap-fa-posts.xml'), wrap(faPosts));

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-en.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-fa.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-en-templates.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-fa-templates.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-en-portfolio.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-fa-portfolio.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-en-posts.xml</loc><lastmod>${now}</lastmod></sitemap>
  <sitemap><loc>https://farhamaghdasi.ir/sitemap-fa-posts.xml</loc><lastmod>${now}</lastmod></sitemap>
</sitemapindex>`;

fs.writeFileSync(path.join(outDir, 'sitemap-index.xml'), sitemapIndex);
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemapIndex);

console.log('✅ Sitemaps generated:');
console.log('  - sitemap-index.xml');
console.log('  - sitemap.xml');
console.log('  - sitemap-en.xml');
console.log('  - sitemap-fa.xml');
console.log('  - sitemap-en-templates.xml');
console.log('  - sitemap-fa-templates.xml');
console.log('  - sitemap-en-portfolio.xml');
console.log('  - sitemap-fa-portfolio.xml');
console.log('  - sitemap-en-posts.xml');
console.log('  - sitemap-fa-posts.xml');
