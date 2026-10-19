/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // A raiz leva para a página de vagas. O Next repassa a query string
      // (ex.: /?categoria=professor -> /carreiras?categoria=professor),
      // então links compartilhados com filtros não perdem o filtro.
      { source: "/", destination: "/carreiras", permanent: false },
    ];
  },
};

module.exports = nextConfig;
