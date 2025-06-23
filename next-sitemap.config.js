const templateData = require('./src/data/api/template.json');

module.exports = {
  siteUrl: 'https://farhamaghdasi.ir',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',

  additionalPaths: async (config) => {
    const staticPaths = [
      '/',
      '/about',
      '/blog',
      '/contact',
      '/portfolio',
      '/service',
      '/template',
      '/blog/boost-skills-with-react',
      '/portfolio/khooshesanat-amol',
    ];

    const templatePaths = templateData.templates.map((template) => ({
      loc: `/templates/${template.url}`,
      lastmod: new Date().toISOString(),
    }));

    return [
      ...staticPaths.map((path) => ({
        loc: path,
        lastmod: new Date().toISOString(),
      })),
      ...templatePaths,
    ];
  },
};
