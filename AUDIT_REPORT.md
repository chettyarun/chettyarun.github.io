# Site Audit Report — chettyarun.com
*Audited: 2026-06-21 | Hugo v0.152.2 | Theme: hugo-blog-awesome v1.21.0*

---

## Executive Summary

chettyarun.com is a clean, well-structured personal blog covering leadership, culture, and AI. The foundation is solid — the hugo-blog-awesome theme provides responsive design, dark mode, canonical tags, Open Graph, and JSON-LD out of the box — but several issues undermine SEO and trust: the site's `baseURL` uses `http://` instead of `https://`, a broken JSON-LD schema (undefined `site.Params.github`), a non-existent JS file referenced in config, and one post carrying a future publish date. Content quality is high but thin in places (4 posts under 350 words), internal cross-linking between related posts is almost entirely absent, and one post is missing its meta description entirely. Fixing the five priority items below would have the highest combined impact on search ranking, structured-data validity, and reader experience.

---

## Findings

### 1. Content

#### 1.1 — Missing meta description on "Leaders need to figure out their AI stack" `High`
The most recent post (2026-05-03) has no `description` field in its front matter. Hugo will fall back to the first 70 characters of body text, which is a poor substitute. This is the site's freshest content and the one most likely to be indexed first by crawlers.

**File:** `content/posts/leaders-ai-stack/index.md`

---

#### 1.2 — Mismatched description on "Asset and liability model" `Medium`
The `description` field reads *"Why should there be a hackathon for business teams too?"* — copied verbatim from the adjacent hackathon post. The actual post is about a manager coaching framework using an asset/liability evaluation model. This broken description appears in search-result snippets and social shares.

**File:** `content/posts/asset-and-liability-model/index.md`

---

#### 1.3 — Typo in "When to promote someone" description `Low`
`description: "Comptency frameworks and when to promote someone at work"` — "Comptency" should be "Competency". Typos in meta descriptions are indexed by Google.

**File:** `content/posts/when-to-promote-someone/index.md`

---

#### 1.4 — Future publish date on "Pulse checks at Razorpay — Part 1" `Medium`
`date: 2025-11-18` is in the future relative to the post's apparent writing period. It is likely a typo for `2024-11-18`. Hugo excludes future-dated posts from some output contexts, and if it renders at all, it can confuse readers and crawlers about publication recency.

**File:** `content/posts/pulse-checks-at-razorpay-part-1/index.md`

---

#### 1.5 — Thin content on four posts `Medium`
Four posts fall under 350 words, which is widely considered thin for SEO:

| Post | Approx. words |
|------|--------------|
| Your first designer | ~220 |
| Hands-on Leadership | ~250 |
| Asset and liability model | ~300 |
| Hackathons for business teams | ~350 |

Short posts aren't inherently bad, but combined with the absence of related-post links or supporting visuals, they offer little reason for a reader (or crawler) to dwell.

---

#### 1.6 — Near-zero internal cross-linking `Medium`
With 13 posts across coherent topic clusters (leadership evaluation, HR systems, AI tools), there are almost no internal links between them. The only internal link found is the Sazed post linking to Introducing Hoid. Posts on evaluating leaders, promotions, and hands-on leadership naturally cross-reference each other but don't. This is lost PageRank distribution and missed reader navigation.

---

#### 1.7 — Bio page title/purpose mismatch `Low`
The page at `/bio/` has `title: "Public Speaking"` but the nav menu labels it "Bio" and its content covers a general speaker biography plus a consulting CTA. The page title should match what users and search engines see as the link label.

**File:** `content/pages/bio.md`

---

#### 1.8 — No "Part 2" for the Pulse Checks series `Low`
The post is titled "Pulse checks at Razorpay - Part 1" but there is no Part 2. Readers following a series expect a continuation. At minimum, a note that Part 2 is forthcoming (or a link if it was published under a different slug) would help.

---

### 2. SEO

#### 2.1 — `baseURL` uses `http://` not `https://` `High`
In `hugo.toml`:
```toml
baseURL = 'http://chettyarun.com/'
```
Hugo uses this to generate all canonical URLs, Open Graph `og:url`, sitemap entries, and RSS `<link>` elements. Every canonical tag on the site currently points to the insecure HTTP origin. Since the actual site serves HTTPS, this creates a mismatch between the canonical URL and the real URL — a crawl signal Google weighs negatively.

**File:** `hugo.toml` line 1

---

#### 2.2 — JSON-LD structured data is broken `High`
The theme's `meta/post.html` partial generates Article schema markup, but the author field references `site.Params.github`, which is not defined in `hugo.toml`. The output will be an empty string or `null`, producing invalid JSON-LD that fails Google's Rich Results Test. No structured data is better than malformed structured data.

**Partial:** `themes/hugo-blog-awesome-backup/layouts/partials/meta/post.html`

Fix options:
- Define `github` in `[params]` (e.g. `github = "chettyarun"`), or
- Override the partial in `layouts/partials/meta/post.html` to use `site.Params.author.name` for the author value.

---

#### 2.3 — Sitemap and robots.txt `Low`
Hugo auto-generates `/sitemap.xml` and a default `/robots.txt` at build time — both are present. No issues found. The sitemap includes all published posts with `<lastmod>` dates from git commit history.

*Note:* Once `baseURL` is corrected to HTTPS (item 2.1), all sitemap URLs will automatically become correct.

---

#### 2.4 — No image defined for Open Graph / Twitter cards on most posts `Medium`
The theme uses `site.Params.ogimage` as a fallback OG image when individual posts don't define one. This param is not set in `hugo.toml`, so posts without a `featured_image` field will render `og:image` as blank. Facebook, LinkedIn, and iMessage previews will show no image for 8 of 13 posts.

---

#### 2.5 — Title tag length and uniqueness `Low`
All page titles follow the pattern `{Post Title} | Chetty Arun`, which is clean and unique. Lengths are within Google's ~60-character display limit for most titles. No duplicate titles detected. The homepage title is simply "Chetty Arun" — adding a brief tagline (e.g. "Chetty Arun | Leadership, Culture & AI") would improve CTR in SERPs.

---

#### 2.6 — Header hierarchy not enforced by theme `Low`
The hugo-blog-awesome theme renders post body content as-is from Markdown. If any post's body begins with `##` (H2) without a preceding `#` (H1) from the template, the H1 → H2 hierarchy is fine since the theme inserts the post title as `<h1>`. Spot-checking the longer posts confirms a reasonable H2/H3 structure. No critical hierarchy violations detected, but posts like "Evaluating leaders at a startup" use bold text (`**text**`) where H3 subheadings would be more semantically appropriate.

---

#### 2.7 — Canonical tags present and correct `Low`
`<link rel="canonical" href="...">` is present on all pages via the theme. After fixing `baseURL` (item 2.1), these will be fully correct.

---

#### 2.8 — URL slugs are clean and consistent `Low`
All post URLs follow lowercase-kebab-case naming (e.g. `/posts/hands-on-leadership/`). No numeric IDs, no uppercase letters, no special characters. Good.

---

### 3. Performance

#### 3.1 — Non-existent JS file referenced in config `High`
`hugo.toml` includes:
```toml
additionalScripts = ['js/custom.js', 'js/custom-2.js']
```
`custom.js` exists (though it is empty). `custom-2.js` does not exist anywhere in the repository. Depending on how the theme's `scriptsBodyEnd.html` handles a missing asset, this may either cause a silent 404 on every page load or a Hugo build error. Either way it is deadweight in the config.

**File:** `hugo.toml` → `[params]` → `additionalScripts`

---

#### 3.2 — Unoptimized images `Medium`
Several images are served in formats or at sizes that should be reduced:

| Image | Size | Format | Issue |
|-------|------|--------|-------|
| `content/pages/chettyarun.jpg` | 270 KB | JPEG | No Hugo processing; could be 30–50 KB as WebP |
| `assets/icons/android-chrome-512x512.png` | 172 KB | PNG | Icon asset; reasonable for 512px but could be compressed |
| `content/posts/…/razor-pulse.png` | 177 KB | PNG | Blog inline image; WebP conversion would halve this |
| `content/posts/…/sazed-conversation-example.jpg` | 110 KB | JPEG | Acceptable but worth a WebP pass |
| `content/posts/…/sazed-graph-view.jpg` | 84 KB | JPEG | Same |
| `assets/avatar.jpg` | 133 KB | JPEG | Theme resizes to 100×100 WebP via `Fill`; source is fine |

The avatar is processed by Hugo's image pipeline and output as WebP — that's correct. The bio page image and inline PNG post images bypass Hugo's pipeline and are served raw.

---

#### 3.3 — Google Fonts loaded via CSS `@import` `Medium`
`assets/css/custom.css` starts with:
```css
@import url('https://fonts.googleapis.com/css2?family=Google+Sans...');
```
`@import` inside a CSS file is render-blocking: the browser must finish loading and parsing the stylesheet before it can request the font. This delays the Largest Contentful Paint (LCP). A `<link rel="preconnect">` plus a `<link rel="stylesheet">` in `<head>` is faster.

---

#### 3.4 — `custom.js` is empty but still loaded `Low`
The file `/assets/js/custom.js` contains only a comment. It is fingerprinted, minified, and injected on every page via Hugo's pipeline, adding a pointless HTTP request. Remove it from `additionalScripts` until it has real content.

---

#### 3.5 — Hugo build already minifies HTML/CSS/JS `Low`
The CI workflow builds with `hugo --minify`, so HTML, CSS, and JS are minified in production. No action needed here.

---

### 4. Accessibility

#### 4.1 — Bio page image missing alt text `Medium`
The speaker bio image is embedded as:
```markdown
![ChettyArun](../chettyarun.jpg)
```
The alt text `ChettyArun` is present but a single word name provides minimal context. It should describe the image content for screen readers — e.g. `"Chetty Arun speaking at a leadership event"` or `"Headshot of Chetty Arun"`.

**File:** `content/pages/bio.md`

---

#### 4.2 — External links open in new tab without warning `Medium`
The custom link renderer (`layouts/_markup/render-link.html`) adds `target="_blank"` to all external links, but without a visual or ARIA indicator. Screen reader users and keyboard users are not warned that a new tab will open, which is a WCAG 2.1 failure (Success Criterion 3.2.2). Adding `aria-label="... (opens in new tab)"` or a consistent icon (many accessible sites append an SVG arrow) resolves this.

**File:** `layouts/_markup/render-link.html`

---

#### 4.3 — External links missing `rel="noopener noreferrer"` `Medium`
The same custom link renderer does not add `rel="noopener noreferrer"` to `target="_blank"` links. This is a security vulnerability: the linked page gains access to `window.opener`, enabling potential tab-napping attacks. This is especially relevant for a public-facing blog that links to third-party sites.

**File:** `layouts/_markup/render-link.html`

---

#### 4.4 — Image alt text coverage is generally good `Low`
Post images in the Sazed journaling post, Talk About Your Work, and Hackathons post all have descriptive alt text. Coverage is approximately 85–90%. The main gap is the bio page (covered in item 4.1).

---

#### 4.5 — Color contrast not directly audited `Low`
The theme's light mode uses `#434648` text on white — this passes WCAG AA (4.5:1 ratio). Dark mode uses `#babdc4` on `#1d1f27` — also passes. Custom link pill styling (`#F2F2F2` background with `#003fff` text) passes at most sizes. No critical contrast failures expected, but a full automated check with axe or Lighthouse would confirm.

---

### 5. Theme and Design

#### 5.1 — Theme version is current `Low`
hugo-blog-awesome v1.21.0 is the version in use (per `go.sum`). The theme is actively maintained. No known critical bugs at this version.

---

#### 5.2 — Backup theme directory committed to history `Low`
`/themes/hugo-blog-awesome-backup/` is listed in `.gitignore` and won't be pushed, but it exists locally. It is used as a reference when customizing partials. This is a reasonable workflow; no action required.

---

#### 5.3 — Custom CSS overrides are well-scoped `Low`
The 123 lines in `assets/css/custom.css` cleanly customize layout (left-aligned author section), link pill styling, and font (Google Sans headings) without fighting the theme. Dark mode equivalents are present. No specificity wars or `!important` abuse detected.

---

#### 5.4 — Mobile responsiveness `Low`
The hugo-blog-awesome theme is built on a responsive grid. Custom CSS overrides use percentage-based widths and `@media` queries where needed. No mobile-specific breakage detected from static analysis.

---

#### 5.5 — `goToTop` button enabled, TOC disabled `Low`
Both are deliberate config choices. TOC globally disabled (`toc = false`) is fine for short posts but could be valuable for the longer AI-stack and Pulse Checks posts (1000–1500 words). Consider per-post opt-in via front matter (`toc: true`).

---

### 6. Broken Links and Missing Assets

#### 6.1 — `custom-2.js` referenced but missing `High`
*(Covered in depth under Performance item 3.1)*

---

#### 6.2 — JSON-LD author field resolves to undefined `High`
*(Covered in depth under SEO item 2.2)*

---

#### 6.3 — Bio page relative image path is fragile `Low`
`bio.md` references `../chettyarun.jpg` — a path relative to the content file. Hugo's image processing works best with page-bundle images (image in the same directory as the content file) or paths relative to `content/`. The `..` traversal works but breaks if the content file is ever moved.

**Fix:** Move `chettyarun.jpg` into `content/pages/` alongside `bio.md` and reference it as `chettyarun.jpg` directly.

---

## Prioritized Action List

### Top 5 Fixes (Highest Impact First)

| Priority | Fix | Category | Impact |
|----------|-----|----------|--------|
| **1** | Change `baseURL` in `hugo.toml` from `http://` to `https://` | SEO | High |
| **2** | Fix broken JSON-LD: add `github = "chettyarun"` to `[params]` or override the author field in a custom `layouts/partials/meta/post.html` | SEO | High |
| **3** | Remove `'js/custom-2.js'` from `additionalScripts` in `hugo.toml` (file doesn't exist) | Performance | High |
| **4** | Add `description` to the AI stack post; fix the copy-pasted description on the asset/liability post | SEO / Content | High |
| **5** | Add `rel="noopener noreferrer"` to the external link renderer, and a new-tab warning (icon or aria-label) | Security / Accessibility | Medium |

### Next 5 Fixes (Medium Impact)

| Priority | Fix | Category | Impact |
|----------|-----|----------|--------|
| **6** | Correct the future date on "Pulse checks at Razorpay" (`2025-11-18` → `2024-11-18`) | Content | Medium |
| **7** | Define a global fallback OG image in `hugo.toml` (`ogimage = "/og-default.png"`) and create the image | SEO | Medium |
| **8** | Move Google Fonts `@import` out of CSS and into `<head>` as `<link rel="preconnect">` + `<link rel="stylesheet">` | Performance | Medium |
| **9** | Convert `content/pages/chettyarun.jpg` (270 KB) and `razor-pulse.png` (177 KB) to WebP; use Hugo's image pipeline via page bundles | Performance | Medium |
| **10** | Add internal cross-links between topically related posts (e.g. evaluating leaders ↔ when to promote ↔ hands-on leadership) | Content / SEO | Medium |

---

*End of report. No changes were made to the site during this audit.*
