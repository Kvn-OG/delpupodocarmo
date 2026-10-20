# Imobiliária Delpupo do Carmo — site institucional

React + Vite + Tailwind CSS v4 + GSAP/ScrollTrigger + Lenis.

```bash
npm install
npm run dev       # desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build localmente
```

## Estrutura

```
index.html                       página inicial (SEO, Open Graph, JSON-LD)
politica-de-privacidade/         página de Política de Privacidade
termos-de-uso/                   página de Termos de Uso
public/images/                   fotos otimizadas (WebP + JPG, várias larguras)
public/media/                    vídeos otimizados (H.264) e posters
src/
  index.css                      tokens da marca (@theme) e estilos globais
  styles/fonts.css               fontes (fallbacks + espaço para as oficiais)
  data/site.js                   contatos, navegação, CRECI
  data/content.js                categorias, serviços, diferenciais, vídeos
  data/properties.js             vitrine de imóveis (começa vazia)
  data/legal.js                  textos de privacidade e termos
  lib/whatsapp.js                links wa.me e mensagens por contexto
  lib/smoothScroll.js            Lenis + navegação por âncora
  lib/animations.js              animações de rolagem (data-animate)
  components/  sections/  pages/
assets/                          arquivos originais da marca (não vão para o build)
```

## Tarefas comuns

**Publicar um imóvel** — adicione um objeto em `src/data/properties.js` (o modelo está
comentado no arquivo) e a foto em `public/images/imoveis/`. Com ao menos um imóvel, a
vitrine troca o estado vazio pelos cards automaticamente.

**Fontes oficiais** — copie os `.woff2` licenciados de Montecatini Pro e Azo Sans para
`src/assets/fonts/` e descomente os `@font-face` em `src/styles/fonts.css`.
Enquanto isso, o site usa Marcellus (títulos) e Jost (textos), hospedadas localmente.

**Novos vídeos de entrega de chaves** — converta para MP4 H.264 (vídeos HEVC/.mov do
iPhone não tocam no Chrome/Windows), coloque em `public/media/` com um poster `.webp`
e registre em `stories` (`src/data/content.js`).

## Variáveis de ambiente (`.env.production`)

| Variável | Efeito |
| --- | --- |
| `VITE_SITE_URL` | Domínio oficial. Ativa canonical, `og:url`, `og:image` absoluto e gera `sitemap.xml`. |
| `VITE_FORM_ENDPOINT` | Opcional. URL que recebe o formulário via POST (JSON). Sem ela, o formulário abre o WhatsApp com a mensagem pronta e nada é enviado sem a confirmação do visitante. |

`robots.txt` é gerado no build (e aponta para o sitemap quando houver domínio).

## Hospedagem

O build é estático (`dist/`), com três páginas HTML reais — não precisa de regra de
reescrita para SPA. Funciona em Netlify, Vercel, Cloudflare Pages, Hostinger etc.
