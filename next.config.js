const { createSecureHeaders } = require('next-secure-headers');

// const env = process.env.NODE_ENV;
// const excludeConsole = env === 'production' ? ['error'] : ['error', 'log'];

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  swcMinify: true,
  async headers() {
    return [{ source: '/(.*)', headers: createSecureHeaders() }];
  },
  output: 'standalone',
  // removeConsole: { exclude: excludeConsole },
  async redirects() {
    return [
      {
        source: '/:slug*',
        destination: 'https://taradjam.vercel.app/:slug*',
        permanent: true,
      },
    ];
  },
};
