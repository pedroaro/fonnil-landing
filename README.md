# Fonnil — Landing Page

A static recreation of the **Fonnil Healthcare Tech Solutions** landing page,
matching the design in `../fonnil page.pdf`.

## Structure
```
fonnil-landing/
├── index.html    # page markup (all sections)
├── styles.css    # design system + layout
├── script.js     # mobile nav + header scroll
└── assets/       # (reserved for images)
```

## Run
Open `index.html` directly in a browser, or serve it:

```bash
cd fonnil-landing
python3 -m http.server 8080
# then open http://localhost:8080
```

## Design notes
- **Fonts:** Space Grotesk (display) + Inter (body), loaded from Google Fonts.
- **Palette:** warm cream background, deep forest-green primary (`#1f5c3b`),
  sage accents, and a near-black dark section — sampled from the source PDF.
- Fully responsive (desktop → tablet → mobile) with a collapsible nav.
- Sections: header, hero + pipeline board, roles band, feature cards,
  dark "Fonnil Talent" section, platform roadmap, about/stats, CTA, footer,
  and a floating "Chat with us" button.

Body copy that was too low-resolution to read in the source PDF has been
reconstructed to match the meaning and tone of each section.
