import type { NextConfig } from "next";

// El sitio se publica en el dominio propio https://onboarding.mbc-latam.com,
// donde el artefacto se sirve desde la RAIZ.
//
// Antes vivia en nelson2206.github.io/mbc-onboarding y por eso llevaba
// basePath/assetPrefix "/mbc-onboarding". Al migrar al dominio no se quitaron,
// asi que el HTML seguia pidiendo /mbc-onboarding/_next/... — que en el dominio
// da 404 — y la pagina salia en blanco.
//
// Si algun dia vuelve a servirse desde una subcarpeta, hay que reponer
// basePath y assetPrefix Y revisar los enlaces absolutos a /kit/ de
// resources/page.tsx y cv/page.tsx, que tambien dan por hecho la raiz.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
