/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: '/guides/portland-roofing-permits-guide',
        destination: '/blog/do-you-need-a-permit-to-replace-a-roof-in-portland/',
        permanent: true,
      },
      {
        source: '/guides/storm-damage-roofing-portland',
        destination: '/guides/storm-damage-roof-insurance-oregon/',
        permanent: true,
      },
      // Cull-and-deepen: combo /service/neighborhood routes are gone.
      // Redirect to the neighborhood market page (which covers all 5 services
      // with bespoke local cost intelligence).
      {
        source: '/:service(roof-replacement|roof-repair|metal-roofing|cedar-shake-roofing|flat-roofing)/:slug',
        destination: '/portland/:slug/',
        permanent: true,
      },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options',           value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options',    value: 'nosniff' },
          { key: 'Referrer-Policy',           value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',        value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
