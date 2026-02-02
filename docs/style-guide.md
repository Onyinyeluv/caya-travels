# Caya Express Travels — Style Guide (starter)

Brand
- Name: Caya Express Travels
- Primary color (Gold): `#D4AF37`
- Neutral dark: `#0F172A` (near-black for text)
- Neutral light: `#F8FAFC` (page background)

Color tokens
- `--color-primary`: #D4AF37
- `--color-primary-700`: #B8872A
- `--color-text`: #0F172A
- `--color-muted`: #6B7280
- `--color-bg`: #FFFFFF or #F8FAFC for soft backgrounds

Typography
- Primary stack: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial
- H1: 36px / 44px
- H2: 28px / 36px
- Body: 16px / 24px

Spacing scale (4pt base)
- xs: 4px  sm: 8px  md: 16px  lg: 24px  xl: 32px

Buttons (variants)
- Primary (gold background): background `--color-primary`, color `#0F172A`, rounded-md, padding `px-4 py-2`.
- Ghost: transparent background, border `1px solid var(--color-muted)`, text `var(--color-text)`.

Forms
- Inputs: subtle border `#E6E9EE`, focus ring `--color-primary-700` with 2px ring.
- File inputs: styled button that opens native file picker; show uploaded filenames and size.

Cards & Listing items
- Card background: `#fff`, border-radius: 8px, shadow: `0 6px 18px rgba(12, 17, 31, 0.06)`.
- Price badge: use primary color for price highlight on travel; for program, use primary for Apply CTA.

Accessibility
- Contrast: ensure text on gold backgrounds uses dark text `#0F172A` for WCAG AA where possible.
- Use semantic HTML, aria-labels for interactive elements, and keyboard focus states.

Usage notes for gold
- Use gold for primary CTAs, small accents, and icons. Avoid large gold blocks to reduce visual fatigue; pair with ample whitespace and neutral surfaces.

Integration notes
- Tailwind starter config will include `--color-primary` and font-family. Add `@tailwind base; @tailwind components; @tailwind utilities` to global CSS.
