/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // Cull-and-deepen: combo /service/neighborhood routes are gone.
      // Redirect to the neighborhood market page (which covers all 5 services
      // with bespoke local cost intelligence).
      {
        source: '/:service(roof-replacement|roof-repair|metal-roofing|cedar-shake-roofing|flat-roofing)/:slug',
        destination: '/portland/:slug',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
