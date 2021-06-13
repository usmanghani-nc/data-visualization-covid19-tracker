const withTM = require('next-transpile-modules')([
  '@amcharts/amcharts4/core',
  '@amcharts/amcharts4/charts',
  '@amcharts/amcharts4/themes/animated',
]); // pass the modules you would like to see transpiled

module.exports = {
  async rewrites() {
    withTM();
    return [
      {
        source: '/api/:path*',
        destination: 'https://data-visualization-covid19-tracker.vercel.app/:path*',
      },
    ];
  },
};
