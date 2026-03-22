<<<<<<< HEAD
# alanjam.es
folio
=======
# Alan James — Portfolio

## Setup

```bash
npm install
```

## Development

```bash
grunt serve
```

This will:
- Compile LESS → CSS (with source maps)
- Autoprefix CSS
- Start a local server at `http://localhost:9001`
- Watch for changes to `.less`, `.html`, and `.js` files
- Live reload the browser on any change

## Production Build

```bash
grunt build
```

This will:
- Clean the `dist/` folder
- Compile and compress LESS
- Copy assets to `dist/`
- Concat and uglify JS
- Concat and minify CSS
- Cache-bust with file revisions
- Update HTML references

Preview the production build:

```bash
grunt dist
```

Serves the `dist/` folder at `http://localhost:9002`.

## Project Structure

```
App/
├── index.html          ← Homepage
├── pages/              ← Case study pages
├── less/
│   ├── main.less       ← Entry point (imports all partials)
│   ├── tokens.less     ← Design system variables
│   ├── mixins.less     ← Reusable patterns
│   ├── base.less       ← Reset & body
│   ├── layout.less     ← Container, grids, sections
│   ├── typography.less ← Type utility classes
│   ├── nav.less        ← Fixed navigation
│   ├── hero.less       ← Homepage header
│   ├── projects.less   ← Project cards
│   ├── approach.less   ← Dark "How I work" section
│   └── components.less ← Career, contact, footer, animations
├── css/                ← Grunt-compiled output (gitignored)
├── js/
│   └── app.js          ← AngularJS app
├── img/                ← Images
└── assets/             ← Other static assets
```
>>>>>>> 6eb224d (initial commit)
