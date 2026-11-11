# Bloom

A minimal, one-page portfolio for Bloom, a web design and development brand.
Built with React, TypeScript, and Vite. Three sections: hero, selected work, contact.

## Setup

Requires Node.js 20.19 or newer.

Upload the contents of `dist/` to any static host.

## Add your details (one file)

Everything editable lives in **`src/config/site.ts`**:

| Setting | What it does |
| --- | --- |
| `contact.whatsappNumber` | Powers the WhatsApp button (international format, e.g. `254700000000`). |
| `contact.email` | Powers the email button. |
| `contact.whatsappMessage`, `contact.emailSubject` | Pre-filled message and subject. |
| `projects[0].url` | Live website link for Brookwell Harmony School. |
| `projects[0].image` | Optional screenshot (see below). |

Anything left empty is shown as an unavailable button, so no placeholder
details ever reach visitors. Fill in the `TODO` values before publishing.

### Adding a project screenshot

Put an image in `public/` (for example `public/brookwell.jpg`) and set
`image: './brookwell.jpg'`. Without one, a neutral browser-frame preview
carrying only the project name is shown.

### Adding future projects

Add another object to the `projects` array in `src/config/site.ts`. It
appears automatically in Selected work, alternating layout sides. Only add
real projects.

## Hero background (DimensionalField)

The hero uses `src/components/ui/dimensional-field.tsx`, a sandboxed iframe
that renders a Three.js scene. It loads Three.js, GSAP, ScrollTrigger,
Tailwind and Iconify from CDNs at runtime, so it needs internet access and
a page that does not block those hosts with a Content Security Policy. If
they fail to load, the hero simply shows its plain dark backdrop.

Tune the look with props in `src/components/Hero.tsx`: `saturation`,
`brightness` and `hue`. The iframe is decorative (`aria-hidden`, no pointer
events) and shows a single still frame when the visitor prefers reduced motion.

## Structure

```
src/
  config/site.ts        contact details and projects (edit this)
  lib/links.ts          WhatsApp, email, and URL helpers
  components/           Header, Hero, Work, Contact, Footer, ...
  styles/               tokens.css (colours, type), base.css, sections.css
```

Colours and fonts are CSS variables in `src/styles/tokens.css`. Fonts
(Newsreader and Hanken Grotesk) load from Google Fonts in `index.html`, with
system fallbacks.
