# Disha & Shreshth — Wedding Website

A sample, single-page wedding website inspired by premium wedding-template sites
(e.g. [ShaadiPath](https://www.shaadipath.com/templates)). Royal Indian aesthetic
in maroon, gold, and ivory.

## Features

- **Hero** with names, dates (2–6 July 2026), and "Save the Date" call-to-action
- **Formal invitation** with the families' blessings and lineage
- **Live countdown** to Shubh Vivah (3 July 2026, 7:30 PM IST)
- **Our Story** timeline
- **The Celebrations** — a day-wise ceremony schedule:
  Shubhaarambh (2 Jul), Shubh Vivah (3 Jul), Navjeevan Abhinandan (4 Jul),
  and Karmabhoomi Abhinandan reception (6 Jul)
- **Venues** — WelcomHotel by ITC Hotels, Dwarka (Gateway 2 & 3) and Coral Telecom,
  Noida, each with an embedded map
- **RSVP** form (saves responses to `localStorage` for the demo)
- **Light Indian background music** (sitar/shehnai) with a floating play/pause toggle
- Fully **responsive** with a mobile menu, scroll-reveal animations, and reduced-motion support

## Project structure

```
wedding/
├── index.html      # markup + content
├── css/style.css   # all styling and theme tokens
├── js/script.js    # countdown, scroll reveal, nav, RSVP
└── README.md
```

## Run locally

It's a static site — just open `index.html`, or serve it:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Customising

- **Names / date / venue**: edit the hero, events, venue, and footer in
  `index.html`, and the `weddingDate` in `js/script.js`.
- **Theme colours**: edit the CSS variables under `:root` in `css/style.css`.
- **Music**: the `<audio id="bgMusic">` element in `index.html` streams a sitar &
  shehnai track from the Internet Archive. Swap the `<source>` URL (or drop a local
  `assets/music/*.mp3`) to use your own track.
- **Real RSVP**: swap the `localStorage` logic in `script.js` for a fetch to your
  backend or a form service (Google Forms, Formspree, etc.).

> Note: the background music and the venue map embed need an internet connection.
