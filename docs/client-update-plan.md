# Royal Hotel Gympie — Client Update Plan (May 2026)

Working notes for integrating the client's emails + supplied photos into the live site.
Companion to `site-analysis.md` (current-state) and `image-sources.md` (stock images to retire).

## 1. The core repositioning

The current site is built as a **daily pub/bistro/bar destination** that books via **Booking.com**.
The client's emails make clear the business is now something different:

- It is primarily an **accommodation** business (modern, refurbished rooms).
- **Booking.com is OFF** — they cannot get listed. Bookings are **by phone or email only**.
- The **bar and entertainment areas are no longer open to the public daily** — available for
  **private bookings by appointment** (functions, conferences, gatherings).
- It has a **rich 140+ year heritage** story the client wants told.

So the site's centre of gravity must shift from "eat & drink" to "stay", with history and
functions as supporting stories. This is the single most important change.

## 2. Verified facts from the client emails

### Contact / identity
- Managers: **Gary & Joanne Churchill** (on-site managers).
- Address: **188–190 Mary Street, Gympie QLD 4570** (current site says "190" only).
- Phone: **0431 295 126** (mobile — matches the new street sign & entrance signage).
  - Current site uses landline `07 5483 7857`. Confirm whether to keep landline at all.
- Email: client did not supply one in these emails. Current site uses
  `admin@royalgympie.com.au` — keep unless told otherwise.
- New street sign is up and includes the website address.

### Rooms & rates
- Room types: **king single, double, queen**.
- Nightly: **$130 king single**, **$150 double/queen**.
- Overnight range quoted elsewhere as **$110–$150 per room**.
- Weekly: **$600 flat weekly rate (7 days)**; weekly stays **serviced once a week**.
- Discounted rates for weekly stays.

### In-room features (all rooms)
- Air conditioning
- Kitchenette — fridge/freezer, microwave, kettle/jug
- Ensuite bathroom
- Free WiFi
- Smart TV
- **Continental breakfast available**

### On-site / shared facilities
- **2 on-site guest kitchens**
- On-site **laundry**
- Small **gym**
- **Library**
- Large **lounge area** to relax
- On-site managers

### Location selling points
- Central; short walk to shops, cafes, restaurants, art galleries, businesses,
  the **bus station**, and the **Qld rail connection bus**.

### History (full copy supplied; also in `assets/img/Royal History.pdf`)
"A Colourful Past" — Exchange Hotel & Varieties Theatre (1868) → 1875 cyclone + floods →
rebuilt as Varieties Hotel & Theatre → renamed **Royal Hotel (1885)** → Theatre Royal (1910)
→ 1935 fire → **1938 Bulimba Brewery Art Deco rebuild** (the current facade) → repeated floods,
always reopened → recent refurbishment → now accommodation + private functions by appointment.

### Functions
- Bar/entertainment areas available for **private bookings by appointment** — functions,
  conferences, special gatherings.

## 3. BRAND FINDING — needs a decision

`assets/img/image001.png` is the **official logo + brand palette**:
- Gold `#f8cc23`
- Royal Purple `#3f1954`
- Rich Black `#130c0e`

`assets/img/Long r.jpeg` is a purple/gold "THE ROYAL — 0431 295 126" banner.

The current site uses an unrelated **cream/tan/brown/amber** hospitality palette and a plain
text logo. The real brand is **purple + gold + black**. Options:
1. Keep current warm theme, just add the logo. (cheapest, but off-brand)
2. Re-theme the CSS variables to the official purple/gold/black palette. (on-brand, larger job)
→ Ask the client/Matt which they want before doing the big rewrite.

## 4. Global changes (every HTML page)

- Remove **all Booking.com** links/CTAs. Replace "Book Accommodation" →
  **"Call to Book" (tel:)** + email. New CTA target: `tel:+61431295126`.
- Phone → **0431 295 126** (`tel:+61431295126`), update footer, contact, schema.
- Address → **188–190 Mary Street, Gympie QLD 4570** (header schema + footers + contact + map).
- Remove "Open daily 10am to late" framing (the venue is not a daily public bar). Replace with
  **reception/check-in** guidance + "functions by appointment".
- JSON-LD: drop the Booking.com `ReserveAction`; add real rooms/amenities where useful;
  fix `streetAddress` and `telephone`.
- Nav: see restructure below.
- Swap stock images for real venue photos site-wide.

## 5. Per-page plan

### Home (`index.html`)
- Hero: real exterior (`The royal.jpg`). Headline shifts to **stay / heritage / central Gympie**.
- Hero meta chips → "Call to book 0431 295 126", "Central Gympie", "Heritage Art Deco hotel".
- Feature cards → Accommodation (primary), Facilities, Our Story (history), Functions, Contact.
- Replace bistro/bar split sections with **Accommodation** + **Facilities** highlights.
- Replace Booking.com CTA band with **Call/Email to book** band + rate snapshot.

### Accommodation (`accommodation/index.html`) — now the flagship page
- Hero: `room 5.jpg` or `room5-a.jpg`.
- Room types + **rates table** ($130 king single, $150 double/queen, $600/week serviced weekly).
- In-room features list (aircon, kitchenette, ensuite, WiFi, smart TV, continental breakfast).
- "How to book" = phone/email (no Booking.com). FAQ rewritten accordingly.
- Photos: room5, room5-a, room 11, room3-a / room 11-1 (kitchenette), 20230426_143616.

### About (`about/index.html`)
- Expand into the **heritage story** (use the supplied "A Colourful Past" copy, trimmed).
- Add managers Gary & Joanne; refurbishment; resilience-through-floods angle.
- Historical photo strip (see image plan). Link to Accommodation + Functions.

### Eat & Drink (`eat-drink/index.html`) → repurpose
- The public daily bistro/bar no longer exists. **Rename/repurpose** to
  **"Functions & Facilities"** (or split: Functions page + facilities on Accommodation).
- Content: bar/entertainment by **private appointment**; guest facilities (2 kitchens, laundry,
  gym, library, lounge); continental breakfast. Remove the fake "Sample Menu".
- Decision needed: rename nav item "Eat & Drink" → "Functions" (or "Facilities").

### Gallery (`gallery/index.html`)
- Replace all 6 stock tiles with real photos across rooms / facilities / exterior / history.
- Keep lightbox markup + data attributes intact (don't break `data-full/alt/caption`).

### Contact (`contact/index.html`)
- Address 188–190 Mary St; phone 0431 295 126; reception/check-in info.
- Replace 7-day "10am to late" table with reception hours / "by appointment" note (confirm hours).
- Keep map iframe (update query to 188–190). Hero: `entrance.jpg`.

## 6. Image placement plan

Legend: ★ = strongest pick. Several photos are phone shots rotated 90° — note for CSS/cropping.

### Exterior (modern)
| File | Best use |
| --- | --- |
| `The royal.jpg` ★ | Home hero / OG image (clean blue-sky corner facade) |
| `285202405.jpg` | Alt hero / About / gallery (clean daytime wide) |
| `20230426_182603.jpg` | Gallery — evening "NOW OPEN" facade |
| `20230426_182943.jpg` | Gallery — night lit facade |
| `20230427_175427.jpg` | Contact/Accommodation — dusk + accommodation entrance signage |
| `20231009_141817[1098].jpg` | Gallery — Art Deco detail |
| `front street view.jpg` | About/Contact — street context |
| `entrance.jpg` ★ | Contact hero / Accommodation "how to check in" (phone sign visible) |

### Rooms
| File | Best use |
| --- | --- |
| `room 5.jpg` ★ | Accommodation hero (kitchenette + TV + desk, bright) |
| `room5-a.jpg` ★ | Accommodation feature / Home accommodation block (made queen bed) |
| `room 11.jpg` | Accommodation room-type / gallery |
| `room3-a.jpg` | Accommodation "kitchenette" amenity shot |
| `room 11-1.jpg` | Accommodation amenity (fridge/wardrobe/ensuite door) |
| `20230426_143616.jpg` | Accommodation / gallery (kitchenette + desk) |
| `room 3.jpg` (rotated) | Gallery if rotation handled |
| `20230605_124504/124613.jpg` (rotated) | Gallery reserve |

### Facilities / common areas
| File | Best use |
| --- | --- |
| `fire place.jpg` ★ | Facilities / Home — "large lounge area" feature |
| `foyer.jpg` | Facilities / Contact — reception & foyer |
| `gym.jpg` | Facilities — "small gym" |
| `upstairs kitchen.jpg` | Facilities — "2 guest kitchens" |
| `20230428_184321.jpg` (rotated) | Gallery — corridor / room numbering |

### History / resilience (About / Our Story)
| File | Best use |
| --- | --- |
| `53-1955-atlantic-hotel-cnr-monkland-and-mary-streets.webp` ★ | History hero — 1955 Mary St flood, boat, Royal visible |
| `1000006744.jpg` ★ | History — 1800s Royal Hotel (S. Ryan, Billiards) |
| `1000006748.jpg` | History — early flood, period building |
| `1000006754.jpg` / `1000006755.jpg` | History — modern flood, Art Deco Royal submerged |
| `2cc85b80734cc7f4467c908654173d47.jfif` | History — retro colour flood at the Royal |
| `2022.jpg` / `13  YEARS.jpg` / `FLOOD TEN YEARS AGO.jpg` | History — resilience montage |
| `1000006751.jpg` | History reserve (low clarity) |
| `5bf2004f8b7d703bcc1925080d43c1b5.jfif` | Optional — pre-refurb interior storm damage |

### Brand assets
| File | Best use |
| --- | --- |
| `image001.png` ★ | Site logo (header) + source of brand palette |
| `Long r.jpeg` | Footer / contact banner with phone |

### Skip / low quality
- `fLOOD.PNG` (255px), `_hotel_royalhotelgympieqld.html_PHOTO7.jpg` (tiny) — too small.
- Stock images in `image-sources.md` — retire once real photos are wired in.

## 7. Open questions for Matt / client
1. **Brand palette**: re-theme to official purple/gold/black, or keep current warm theme + add logo?
2. **Nav**: rename "Eat & Drink" → "Functions"/"Facilities"? Add a dedicated "Our Story" history page?
3. **Phone**: use mobile 0431 295 126 only, or keep the landline too?
4. **Email address**: confirm `admin@royalgympie.com.au` is still correct.
5. **Reception / check-in hours** to publish on Contact (client gave none).
6. Timeline estimate the client asked for (they want it for printing pamphlets/cards).
