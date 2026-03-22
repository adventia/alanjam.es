# CLAUDE.md — Project Context for Alan James Portfolio

## About Alan

Alan James is an award-winning product and interaction designer based in Sydney, Australia. 30+ years of continuous experience in design and development. Dual Australian/British nationality. Currently Senior Product Designer at Qantas Loyalty and Co-founder of loadin.com.

### Working style & personality (in Alan's own words)

- Expert stakeholder engager on high-profile, flagship projects
- Facilitator and negotiator — great at getting people to "buy what I'm selling"
- Relaxed operator who works with people by fundamentally getting on with them first, bringing them on the journey at all times
- Core philosophy: **the art of making the complex simple**
- Works at the **junction of design and development** — designs it AND builds it
- Themes: strong, confident, relaxed, collaborative

### Key career highlights

- **Qantas Loyalty** (2024–now): Senior Product Designer & Experimentation Practice Lead. 2× conversion uplift on Credit Card Selector. Leads experimentation across Financial Services tribe.
- **Loadin.com** (2017–now): Co-founder. Festival production platform. Good Design Award Gold 2024. Powers SXSW, Reading & Leeds, 82 of Hottest 100 acts. Zero advertising — all organic growth.
- **Service NSW via Pragmateam** (2020–2023): Design Principal. Built universal booking platform for NSW government. Led all design across the consultancy.
- **Qantas Ventures** (2019–2020): $1.02m first-year EBIT from 12 CRO experiments (target was $0.5m). 10,700 new leads.
- **Westpac** (2014–2018): 290% increase in Approval in Principle applications. Form completion 1.67% → 9.25%. Built HTML prototyping practice.
- **Thomson Reuters** (2010–2014): UX Lead for Checkpoint and Westlaw platforms.
- **Expedia AU/NZ** (2006–2008): Senior Developer / Experience Designer.

### Key testimonials (use in case studies)

> "Alan's superpower is making ideas real. Before you know it, he has already done a beautiful, fully working prototype that you can use to test the validity of the idea and quickly of course correct accordingly. He's such a powerful catalyst for real innovation."
> — **Peter Löfgren**, Director of Customer Centred Design, Westpac Bank

> "I've only worked with two real 'UX Unicorns'... Cameron Adams at Canva... and Alan James."
> — **Russ Weakley**, IxDA Sydney

> "Alan is simply a gun. He's a consummate professional who just gets design on all levels."
> — **Craig Mackie**, Senior Manager, Qantas Ventures

> "Alan is a self-proclaimed 'unicorn' and he lives up to the title."
> — **Bruce Stewart**, Product Owner, Westpac

---

## Design Direction

### Philosophy: "Relaxed Confidence"

The design translates Alan's working style directly:

- **"Relaxed confidence"** = not trying too hard, no flashy tricks, but every detail is considered
- **"Making the complex simple"** = clean hierarchy, generous space, information that breathes
- **"Design + dev junction"** = technical fluency shown naturally, not as a gimmick
- **"Bringing people on the journey"** = warm, inviting, approachable — never cold or corporate
- **"Strong but confident"** = assertive typography paired with a friendly tone

### Typography

- **Display:** Fraunces (variable serif with warmth and character — relaxed confidence in type form)
- **Body:** Manrope (clean geometric sans with warmth)
- **Mono:** JetBrains Mono (technical accents — dates, tags, footer)

### Colour

- **Background:** #F8F6F1 (warm cream)
- **Surface:** #FFFFFF
- **Heading:** #2A2824 (deep warm slate)
- **Body text:** #5C584F
- **Muted:** #9B9690
- **Border:** #E6E2DB
- **Accent:** #1B7A5A (confident teal-green — calm and assertive)
- **Accent light:** #E8F4EF
- **Dark section:** #2A2824 with #33312C surface

### Project accent colours

- Qantas Loyalty: #1B7A5A
- Loadin: #B85C38
- Service NSW: #2B5EA7
- Qantas Ventures: #7B4BAA
- Westpac: #C17A28

### Interaction style

- Subtle scroll-reveal animations (IntersectionObserver, CSS transitions)
- Expandable project cards (click to show "Approach" section)
- Smooth but understated — nothing flashy, everything considered
- Nav background transitions on scroll

### What to avoid

- Nothing cold or corporate
- No flashy animations or gimmicks
- No code-as-decoration (monospace hints at technical fluency, doesn't shout it)
- No generic AI aesthetics (Inter, purple gradients, cookie-cutter layouts)

---

## Technical Setup

### Stack

- **HTML** with **AngularJS 1.8.3** for dynamic bits (scroll reveals, card expand/collapse, nav state)
- **LESS** for styles (modular partials)
- **Grunt** for task running (LESS compilation, livereload, production build)
- **Node 11.15.0** — all dependencies MUST be compatible with this version. No optional chaining (?.), no nullish coalescing (??), no modern ES syntax in dependencies.

### Commands

```bash
grunt serve    # Dev: compile LESS, start server at localhost:9001, watch + livereload
grunt build    # Production: clean, compile, copy, concat, uglify, cssmin, rev, usemin
grunt dist     # Preview production build at localhost:9002
```

### Project structure

```
portfolio-grunt/
├── Gruntfile.js
├── package.json
├── App/
│   ├── index.html          ← Homepage (AngularJS app)
│   ├── pages/              ← Case study pages (to be built)
│   ├── less/
│   │   ├── main.less       ← Entry point (imports all partials)
│   │   ├── tokens.less     ← Design system variables (single source of truth)
│   │   ├── mixins.less     ← Reusable .font-display(), .card(), .transition() etc.
│   │   ├── base.less       ← Reset & body
│   │   ├── layout.less     ← Container, grids, sections
│   │   ├── typography.less ← .t-display, .t-body, .t-mono utility classes
│   │   ├── nav.less        ← Fixed nav with scroll state
│   │   ├── hero.less       ← Homepage header
│   │   ├── projects.less   ← Expandable project cards + tags + stat cards
│   │   ├── approach.less   ← Dark "How I work" section + junction panel
│   │   └── components.less ← Career, contact, footer, scroll reveal animations
│   ├── css/                ← Grunt-compiled output (gitignored)
│   ├── js/
│   │   └── app.js          ← AngularJS controller + directives
│   ├── img/
│   └── assets/
└── dist/                   ← Production build output
```

### AngularJS architecture

- `ng-app="portfolio"` on `<html>`
- `PortfolioCtrl as vm` — manages nav scroll state and project card expand/collapse
- `reveal` directive — IntersectionObserver-based scroll animation (adds `reveal--visible` class)
- `smooth-scroll` directive — anchor link navigation
- Cards toggle via `vm.toggle('project-id')` and `vm.isExpanded('project-id')`

### LESS architecture

- `tokens.less` is the single source of truth — change colours/fonts here and it cascades everywhere via mixins
- Mixins include: `.font-display()`, `.font-body()`, `.font-mono()`, `.font-label()`, `.container()`, `.grid()`, `.card()`, `.card-hover()`, `.reveal-base()`, `.transition()`
- Animation easing: `cubic-bezier(0.22, 1, 0.36, 1)` stored as `@ease-out`
- Stagger delays via `.reveal-d1` through `.reveal-d5` classes

### Key dependency versions (Node 11 compatible)

```json
"grunt": "1.4.1",
"grunt-contrib-less": "1.4.1",
"grunt-contrib-uglify": "4.0.1",
"grunt-contrib-connect": "2.1.0",
"grunt-contrib-watch": "1.1.0",
"grunt-contrib-clean": "2.0.0",
"grunt-contrib-copy": "1.0.0",
"grunt-contrib-concat": "1.0.1",
"grunt-contrib-cssmin": "3.0.0",
"grunt-autoprefixer": "3.0.4",
"grunt-rev": "0.1.0",
"grunt-usemin": "3.1.1",
"connect-livereload": "0.5.4"
```

---

## Content Status

### Case studies (revised content in `/case-studies-v2-revised.md`)

7 case studies written and ready to be built into HTML pages:

1. **Qantas Loyalty — Credit Card Selector** (2× conversion uplift)
2. **Loadin.com — Festival Production Platform** (Good Design Gold, global adoption)
3. **Service NSW — Universal Booking Platform** (state-wide launch)
4. **Qantas Ventures — Health Insurance CRO** ($1.02m EBIT)
5. **Westpac — Redesigning Wonder** (290% application uplift)
6. **Loadin — Good Design Awards 2024** (NEW — award-specific case study)
7. **Qantas Loyalty — Experimentation Practice** (NEW — leadership story)

### What still needs building

- [ ] Case study page HTML template
- [ ] Individual case study pages with content
- [ ] About page
- [ ] Responsive testing and refinement
- [ ] Image assets integration
- [ ] Production deployment setup

### Content principles

- First person, relaxed but confident voice
- Each case study: headline impact → situation → approach → outcome → what it demonstrates
- Testimonial quotes placed after results for maximum impact
- Big metrics rendered as visual callouts (large type), not buried in paragraphs
- "What this demonstrates" sections are short punchlines connecting back to core positioning

---

## Working with Alan

- Alan's background is AngularJS — he uses it for prototyping and for loadin.com
- He prefers working in HTML/CSS/JS directly, not frameworks like React
- He has strong opinions on design quality and attention to detail
- He uses Grunt for task running (same setup as loadin.com)
- He's on Node 11.15.0 — all code must be compatible with this
- He values maintainability — he'll be adding case studies and updating content himself
- The portfolio needs to sell him as a complete all-round Product Designer with deep coding knowledge
