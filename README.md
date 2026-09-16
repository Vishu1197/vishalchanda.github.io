# VishOmics

Personal and professional site for **Vishal Chanda**, computational biologist and doctoral
researcher in biotechnology at REVA University, Bengaluru.

Live at **https://vishu1197.github.io/vishalchanda.github.io/**

---

## What this is

A six page static site covering research, publications, open source software and contact details.
No framework, no build step, no package manager. Plain HTML, CSS and vanilla JavaScript, served
directly by GitHub Pages.

## Pages

| File | Contents |
|------|----------|
| `index.html` | Hero, animated statistics, three research pillars, featured software, latest publications |
| `about.html` | Professional summary, experience, education, full skills matrix, certifications and awards |
| `research.html` | The three research strands in depth, a live 3D structure viewer, the method pipeline |
| `publications.html` | Filterable and searchable publication record driven by one data file |
| `software.html` | Eight open source research tools with stacks and repository links |
| `contact.html` | Email, WhatsApp, LinkedIn, GitHub, ORCID, Google Scholar, ResearchGate |
| `404.html` | Fallback page |

## Layout

```
.
├── index.html
├── about.html
├── research.html
├── publications.html
├── software.html
├── contact.html
├── 404.html
├── .nojekyll
├── README.md
├── PUSH_GUIDE.md
└── assets/
    ├── css/
    │   └── styles.css        design tokens and every component
    └── js/
        ├── particles.js      canvas background network
        ├── publications.js   the publication data, edit this to add a paper
        └── main.js           navigation, reveals, counters, filters, 3D viewer
```

## Adding a publication

Open `assets/js/publications.js`, copy one of the existing blocks, edit the fields and save.
Nothing else needs touching. The filter chips recount themselves and the search picks it up.

Recognised values for `kind` are `article`, `chapter`, `patent` and `conference`.
`doi`, `url`, `award` and `tags` are all optional.

```js
{
  kind: 'article',
  year: 2027,
  title: 'Title of the paper',
  authors: ['Chanda, V.', 'Someone, E.'],
  venue: 'Journal Name, 12(3), 456',
  doi: '10.0000/example',
  url: 'https://doi.org/10.0000/example',
  tags: ['Dengue', 'Docking']
}
```

The author string `Chanda, V.` is highlighted automatically, so keep that exact spelling.

## Changing the colours

Every colour lives in the `:root` block at the top of `assets/css/styles.css`. Change the token
and the whole site follows.

## External dependencies

Only two, both loaded from a CDN:

- **Google Fonts** for Space Grotesk, Inter and JetBrains Mono
- **3Dmol.js 2.5.5** on the research page, for the molecular structure viewer

The structure viewer pulls coordinates live from the RCSB Protein Data Bank. If a visitor is
offline the viewer shows a message and the rest of the page is unaffected.

## Accessibility and performance

- Every animation is disabled under `prefers-reduced-motion`, including the canvas background
- Keyboard navigable, with a skip link and visible focus rings
- No images, no web fonts beyond the three families, no JavaScript framework
- Layout tested at 1440px, 768px and 375px

## Licence

Site code is free to reuse. The research content, publication record and personal details are not.

---

Built September 2026.
