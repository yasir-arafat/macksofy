# Macksofy.com — Deployment Guide

**Package:** `macksofy-new-deploy.zip` (~7.5 MB)
**Stack:** Next.js 16.2.4 (App Router) · React 19 · Tailwind 4 · MDX
**Target domain:** `https://www.macksofy.com`

---

## 1. Prerequisites

- **Node.js** ≥ 20.x (Next.js 16 requires it)
- **npm** ≥ 10 (lockfile is npm — do not switch to pnpm/yarn without regenerating it)
- ~1.5 GB free disk for `node_modules` + `.next` build output

## 2. Local verification (do this first, on a staging box)

```bash
unzip macksofy-new-deploy.zip -d macksofy-new
cd macksofy-new
npm install              # ~700 MB; takes 1–3 min
npm run lint             # should be clean
npm run build            # production build; ~30–60 s
npm run start            # serves on http://localhost:3000
```

If `npm run build` succeeds and `npm run start` boots without errors, the package is healthy. Continue to deployment.

## 3. Environment variables

`.env.local` is bundled in the zip with active keys for:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Transactional email for `/api/contact` and `/api/lead-magnet` |
| `CONTACT_TO_EMAIL` | Where contact-form submissions land |
| `CONTACT_FROM_EMAIL` | Verified sender address (must be a Resend-verified domain) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key (CAPTCHA on forms) |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile server-side validation key |

**On the production host**, set these as platform-level env vars (Vercel → Project Settings → Environment Variables; Cloudflare Pages → Settings → Environment variables; self-host → systemd unit / Docker env). **Do not commit `.env.local`** to the team's git repo.

If any key is unset, the app falls back gracefully:
- Resend → contact submissions log to console (no email sent)
- Turnstile → uses Cloudflare's "always pass" test keys (no real CAPTCHA)

## 4. Production hosting (pick one)

### Option A — Vercel (simplest, recommended)

1. Push the unzipped folder to a fresh GitHub repo.
2. In Vercel, "Import Project" from the repo. Auto-detects Next.js 16.
3. Add the 5 env vars from §3.
4. Deploy. Add `www.macksofy.com` as the production domain in Vercel → Domains.

### Option B — Cloudflare Pages

1. Push to GitHub.
2. Cloudflare Pages → Create project → connect repo.
3. Build command: `npm run build`. Output directory: `.next`. Framework preset: Next.js.
4. Add env vars. Deploy.
5. Wire `www.macksofy.com` in Cloudflare DNS → CNAME to the Pages app.

### Option C — Self-host (VPS / Docker)

```bash
npm ci --omit=dev
npm run build
npm run start -- -p 3000
```

Sit it behind nginx/Caddy with HTTPS termination. Example nginx upstream block:

```nginx
upstream nextjs { server 127.0.0.1:3000; }
server {
  listen 443 ssl http2;
  server_name www.macksofy.com;
  location / { proxy_pass http://nextjs; proxy_set_header Host $host; }
}
```

Use `pm2` or a systemd unit to keep `npm run start` alive on reboot.

## 5. DNS + canonical host

Macksofy.com canonicalizes to **`https://www.macksofy.com`**. Configure at the hosting layer:

1. **`macksofy.com` → `www.macksofy.com`** (301).
   - Vercel: add both domains, set `www.macksofy.com` as primary; Vercel auto-301s the apex.
   - Cloudflare Pages: same — set `www` as primary.
   - Self-host: nginx `return 301 https://www.macksofy.com$request_uri;` on the apex server block.
2. **`http://` → `https://`** (301).
   - Vercel + Cloudflare Pages: automatic.
   - Self-host: standard nginx HTTP→HTTPS redirect block.

End result — only one canonical host serves content. Every other variant 301s to it.

## 6. Built-in legacy redirects (no extra config needed)

The PHP→Next.js migration map is wired into the app itself:

- **15 × 301** redirects in `next.config.ts` (driven by `lib/legacy-redirects.ts`).
- **14 × 410 Gone** responses via `middleware.ts` for out-of-scope legacy pages (graphic design, SMM, etc. — signals Google to deindex).

Nothing for the dev team to configure here. After cutover, hitting `https://www.macksofy.com/about-us.php` will 301 to `/about` automatically.

## 7. Post-deployment checklist

Run these from any browser / terminal once the site is live on `www.macksofy.com`:

```bash
# Homepage
curl -sI https://www.macksofy.com/ | head -3

# Sample 301 (legacy PHP page)
curl -sI https://www.macksofy.com/about-us.php | grep -E 'HTTP|Location'

# Sample 410 (out-of-scope legacy page)
curl -sI https://www.macksofy.com/best-graphic-designing-company-in-mumbai.php | head -1

# OG image (must NOT 404)
curl -sI https://www.macksofy.com/og-default.png | head -1

# Sitemap + RSS + robots
curl -sI https://www.macksofy.com/sitemap.xml | head -1
curl -sI https://www.macksofy.com/feed.xml    | head -1
curl -sI https://www.macksofy.com/robots.txt  | head -1
```

Expected: `200` for assets, `301` for `/about-us.php`, `410` for graphic-design page.

## 8. Search Console actions (SEO team will handle, FYI)

After cutover, the SEO team will:
- Submit `https://www.macksofy.com/sitemap.xml` to Google Search Console + Bing Webmaster Tools.
- Submit a "change of address" if migrating from the old PHP host.
- Request URL inspection / recrawl on the legacy PHP URLs so Google flushes them faster.

## 9. Caveats / things to know

- **`AGENTS.md`** in the repo root warns: Next.js 16 has breaking changes vs older docs; if the team needs to write new Next-specific code, consult `node_modules/next/dist/docs/` or the official Next.js 16 release notes — not StackOverflow answers, which are mostly v14/15.
- **`react@19`** is required by Next 16. Don't downgrade.
- **Tailwind 4** uses the new CSS-first config (`@import "tailwindcss"` in `globals.css`); there is no `tailwind.config.ts`.
- **Turnstile keys** are scoped to a domain in the Cloudflare dashboard. If the prod domain differs from what the keys were issued for, regenerate them.
- **Resend** requires the `CONTACT_FROM_EMAIL` domain to be verified (DKIM/SPF) in the Resend dashboard before mail will deliver.

## 10. Support

For deploy questions: yasir@macksofy.com.
Source-of-truth issues (legacy redirects, slug map, content): see commit `1d80a09` and `f75285d` in `git log` once the team initialises the repo.
