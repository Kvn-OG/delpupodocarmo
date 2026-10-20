import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const PAGES = ['/', '/politica-de-privacidade/', '/termos-de-uso/']

/**
 * SEO dependente do domínio oficial.
 *
 * Defina VITE_SITE_URL (ex.: no arquivo .env.production) quando o domínio estiver
 * confirmado: VITE_SITE_URL=https://www.seudominio.com.br
 *
 * Com a variável definida, o build injeta canonical, og:url e og:image absolutos
 * e gera um sitemap.xml. Sem ela, essas tags são omitidas para não apontar
 * para um endereço incorreto.
 */
function siteSeo(siteUrl) {
  const base = siteUrl ? siteUrl.replace(/\/+$/, '') : ''

  return {
    name: 'delpupo-site-seo',
    transformIndexHtml(html, ctx) {
      if (!base) return html
      const route = ctx.path.replace(/index\.html$/, '')
      const url = `${base}${route}`
      return html
        .replace('<!-- seo:canonical -->', `<link rel="canonical" href="${url}" />\n    <meta property="og:url" content="${url}" />`)
        .replace(/content="\/og-image\.jpg"/g, `content="${base}/og-image.jpg"`)
    },
    generateBundle() {
      const robots = ['User-agent: *', 'Allow: /']
      if (base) robots.push('', `Sitemap: ${base}/sitemap.xml`)
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: `${robots.join('\n')}\n` })

      if (!base) return
      const today = new Date().toISOString().slice(0, 10)
      const urls = PAGES.map(
        (page) => `  <url>\n    <loc>${base}${page}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`,
      ).join('\n')
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_')

  return {
    plugins: [react(), tailwindcss(), siteSeo(env.VITE_SITE_URL)],
    build: {
      rollupOptions: {
        input: {
          main: resolve(import.meta.dirname, 'index.html'),
          privacidade: resolve(import.meta.dirname, 'politica-de-privacidade/index.html'),
          termos: resolve(import.meta.dirname, 'termos-de-uso/index.html'),
        },
      },
    },
  }
})
