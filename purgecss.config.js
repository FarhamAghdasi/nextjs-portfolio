const purgecss = require('@fullhuman/postcss-purgecss')({
    content: [
      './app/**/*.{js,ts,jsx,tsx}',
      './components/**/*.{js,ts,jsx,tsx}',
      './data/**/*.{js,ts,jsx,tsx,json}',
    ],
    defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  });
  
  module.exports = {
    plugins: [
      require('postcss-import'),
      require('autoprefixer'),
      ...(process.env.NODE_ENV === 'production' ? [purgecss] : []),
    ],
  };
  