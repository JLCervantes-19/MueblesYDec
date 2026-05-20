# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MueblesYDec is a static HTML website for a Colombian furniture and decoration business ("Muebles Y Dec"). It was adapted from the free **TRAVELER** HTML template (htmlcodex.com) — many unused template pages (blog.html, destination.html, package.html) still contain travel-themed placeholder content from the original template and have not been fully customized.

## No Build System

This is a plain HTML/CSS/JS static site with no package manager, bundler, or task runner. There are no build, lint, or test commands. To preview locally, open any `.html` file directly in a browser, or serve with any static HTTP server (e.g. `python3 -m http.server`).

The site is deployed to a **Jakarta EE servlet container** (Tomcat), configured via:
- `WEB-INF/web.xml` — 30-minute session timeout
- `META-INF/context.xml` — context path `/MueblesyDec/index.html`

## Architecture

### Pages
- `index.html` — Home page; the most customized page with brand-specific content (about section, work gallery, testimonials)
- `contact.html` — Contact form; still uses the original template `<title>` tag
- `about.html`, `guide.html` — Partially customized
- `blog.html`, `destination.html`, `package.html` — Retain original travel template content

### CSS
`css/style.css` (9770 lines) has two distinct sections:
1. **Lines 1–9453**: Bootstrap 4.5.3 theming — the full Bootstrap CSS with the brand color overridden via CSS variables
2. **Lines 9454+** (`/********** Custom CSS ************/`): All project-specific styles

Edits to site appearance should go in the Custom CSS section unless overriding Bootstrap variables. `css/style.min.css` is a minified copy of `style.css` that must be kept in sync manually when changes are made.

### Brand Color
Primary brand color is `#7AB730` (green), set as `--primary` in the Bootstrap `:root` block at the top of `style.css`.

### JavaScript
`js/main.js` — All site behavior: navbar hover dropdowns, back-to-top button, date/time pickers (Tempus Dominus), and the testimonials Owl Carousel.

### Contact Form
`mail/contact.js` handles form submission via jQuery AJAX to `mail/contact.php`. The PHP script requires a server-side PHP environment. **The recipient email in `mail/contact.php` line 13 is still the template placeholder `info@example.com`** and needs to be updated.

### External Dependencies (CDN)
All loaded from CDN — no local copies:
- jQuery 3.4.1
- Bootstrap 4.4.1
- Font Awesome 5.10.0
- Google Fonts (Poppins)

### Local Libraries (`lib/`)
- `lib/owlcarousel/` — Owl Carousel 2 (testimonials slider)
- `lib/tempusdominus/` — Tempus Dominus date/time picker + Moment.js
- `lib/easing/` — jQuery easing for back-to-top animation

## Key Conventions

- **Navigation**: Most nav links from the original template are commented out in all pages. Only "Inicio" (`index.html`) is active. Uncomment and update links when adding pages to the navigation.
- **Images**: Custom business images are named with prefixes `trabajo-` (work gallery) and `aboutMY-`/`aboutMY` (about section). Template stock images remain for unused sections.
- **Language**: The live site content is in Spanish. Template placeholder text not yet replaced is in English.
- **Commented-out sections**: Social media links (Facebook, Twitter, LinkedIn, YouTube) are commented out in `index.html`'s topbar; only Instagram is active.
