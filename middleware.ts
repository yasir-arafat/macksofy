import { NextResponse, type NextRequest } from "next/server";
import { PHP_GONE_SET } from "./lib/legacy-redirects";

/**
 * Known AI / LLM crawler User-Agent fingerprints. Same operators we
 * explicitly Allow in app/robots.ts — keep the two lists in sync.
 *
 * Each entry maps a regex to a canonical label that lands in logs.
 * Vercel runtime logs grep on `[ai-crawler]` to surface hits.
 */
const AI_BOT_PATTERNS: { name: string; re: RegExp }[] = [
  // OpenAI
  { name: "GPTBot", re: /\bGPTBot\b/i },
  { name: "OAI-SearchBot", re: /\bOAI-SearchBot\b/i },
  { name: "ChatGPT-User", re: /\bChatGPT-User\b/i },
  // Anthropic
  { name: "ClaudeBot", re: /\bClaudeBot\b/i },
  { name: "Claude-Web", re: /\bClaude-Web\b/i },
  { name: "anthropic-ai", re: /\banthropic-ai\b/i },
  // Google Gemini
  { name: "Google-Extended", re: /\bGoogle-Extended\b/i },
  // Apple Intelligence
  { name: "Applebot-Extended", re: /\bApplebot-Extended\b/i },
  // Perplexity
  { name: "PerplexityBot", re: /\bPerplexityBot\b/i },
  { name: "Perplexity-User", re: /\bPerplexity-User\b/i },
  // ByteDance / TikTok
  { name: "Bytespider", re: /\bBytespider\b/i },
  // Common Crawl
  { name: "CCBot", re: /\bCCBot\b/i },
  // Amazon (Alexa / Q)
  { name: "Amazonbot", re: /\bAmazonbot\b/i },
  // Meta (Llama)
  { name: "FacebookBot", re: /\bFacebookBot\b/i },
  { name: "Meta-ExternalAgent", re: /\bMeta-ExternalAgent\b/i },
  // DuckDuckGo / DuckAssist
  { name: "DuckAssistBot", re: /\bDuckAssistBot\b/i },
  // Cohere
  { name: "cohere-ai", re: /\bcohere-ai\b/i },
  // Mistral
  { name: "mistralai-User", re: /\bmistralai-User\b/i },
  // Other AI-focused crawlers
  { name: "Diffbot", re: /\bDiffbot\b/i },
  { name: "Omgilibot", re: /\bOmgili(bot)?\b/i },
  { name: "YouBot", re: /\bYouBot\b/i },
];

function detectAiBot(ua: string | null): string | null {
  if (!ua) return null;
  for (const bot of AI_BOT_PATTERNS) {
    if (bot.re.test(ua)) return bot.name;
  }
  return null;
}

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // ── Canonical host: 301 non-www → www ─────────────────────────────
  // Both the apex (macksofy.com) and www resolve to this app on Vercel.
  // Without this redirect they serve duplicate 200s, splitting crawl and
  // indexing signals across two hosts. The whole site canonicalises to
  // https://www.macksofy.com (SITE.url, every <link rel=canonical>, the
  // sitemap, and robots Host), so send the apex there — preserving path +
  // query. EXACT hostname match (not a regex) so www never matches itself
  // → no redirect loop. Localhost / preview hosts are untouched.
  const host = req.headers.get("host");
  if (host === "macksofy.com") {
    const dest = new URL(path + req.nextUrl.search, "https://www.macksofy.com");
    return NextResponse.redirect(dest, 301);
  }

  // ── AI crawler hit logging ────────────────────────────────────────
  // Runs on every matched path. Structured log line goes to Vercel
  // runtime logs. View in Vercel dashboard → Logs → filter
  // "[ai-crawler]" to see which AI assistants are crawling what.
  // Adds ~0.1ms per request; safe to leave on permanently.
  const ua = req.headers.get("user-agent");
  const bot = detectAiBot(ua);
  if (bot) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "-";
    const referer = req.headers.get("referer") ?? "-";
    const payload = {
      ua: bot,
      path,
      ip,
      referer,
      ts: new Date().toISOString(),
    };
    // Single-line JSON after the [ai-crawler] tag = greppable + parseable.
    console.log(`[ai-crawler] ${JSON.stringify(payload)}`);
  }

  // ── Legacy PHP-gone responses (unchanged) ─────────────────────────
  if (PHP_GONE_SET.has(path)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  return NextResponse.next();
}

/**
 * Matcher: every request EXCEPT static assets + Next internals.
 * - Keeps PHP-gone behaviour on /:path*.php (caught by the broader rule below).
 * - Catches sitemap.xml / llms.txt / llms-full.txt / robots.txt
 *   so AI crawler hits on those discovery files are logged too.
 * - Skips /_next/static, /_next/image, /favicon.ico, /api/* (no value).
 */
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/).*)",
  ],
};
