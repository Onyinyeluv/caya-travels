# Component Library — Caya Express Travels

This document enumerates the initial set of UI components, props, variants, accessibility notes and example usage. Use this as the single source of truth when building UI components.

## 1) Button
- **Purpose**: primary CTA, form submit, inline actions.
- **Props**:
  - `children: ReactNode`
  - `variant?: 'primary' | 'ghost' | 'outline'`
  - `size?: 'sm' | 'md' | 'lg'`
  - `disabled?: boolean`
  - `onClick?: () => void`
- **Visuals**: `primary` uses `--color-primary` background with dark text; `ghost` is transparent.
- **Accessibility**: use `button` element, set `aria-disabled` when disabled, ensure focus-visible styles.

## 2) Input / Textarea
- **Purpose**: form inputs, with label and help text.
- **Props**: `id`, `label`, `value`, `onChange`, `placeholder`, `helpText`, `error`.
- **Accessibility**: connect `label` to input via `htmlFor`/`id`, show `aria-invalid` and `aria-describedby` when help/error exists.

## 3) Select / MultiSelect
- **Props**: `options: { value, label }[]`, `value`, `onChange`, `placeholder`.
- **Accessibility**: keyboard navigation, ARIA roles if using custom UI.

## 4) Card / ListingCard
- **Purpose**: display listing summary in list/grid.
- **Props**: `title`, `subtitle`, `image`, `priceCents`, `type`, `onClick`.
- **Variants**: compact (grid), detailed (list with excerpt).

## 5) ListingForm
- **Purpose**: create/edit listing and program details.
- **Props**: `initial?`, `onSaved?`.
- **Subcomponents used**: `Input`, `Select`, `FileUploader`, `Button`.

## 6) FileUploader
- **Purpose**: upload images and program documents to Supabase.
- **Props**: `accept`, `multiple`, `onUploadComplete`.
- **UX**: show progress, file size warnings, preview for images.

## 7) Modal (Dialog)
- **Purpose**: confirm actions, show forms.
- **Accessibility**: trap focus while open, return focus to trigger on close, `role='dialog'` and `aria-modal='true'`.

## 8) Toast / Notification
- **Purpose**: transient feedback after actions.
- **Props**: `message`, `type` (`success|error|info`), `duration`.
- **Accessibility**: use `aria-live='polite'`.

## 9) Map & MapWithMarkers
- **Purpose**: display geospatial results; used on search & listing pages.
- **Props**: `markers: { id, lat, lng, title }[]`, `center`, `zoom`.

## 10) Nav / Header / Footer
- **Header**: brand/logo, global nav, search shortcut, sign-in.
- **Footer**: links, contact, social.

## 11) Hero (page top)
- **Purpose**: large marketing hero with CTA.
- **Props**: `title`, `subtitle`, `ctaText`, `ctaHref`, `image?`.

## 12) Badge / Tag
- **Purpose**: highlight listing type (Program / Travel), price badges, intake labels.

## 13) Avatar / PartnerCard
- **Purpose**: show partner/owner details.

## 14) Pagination / InfiniteScroll
- **Purpose**: navigate result sets; include accessible controls.

---

## Accessibility notes (general)
- **Keyboard first**: every interactive component should be reachable by keyboard and have visible focus states.
- **Semantic HTML**: prefer native controls where possible.
- **Contrast**: ensure text over gold background is dark enough (use `#0F172A` / near-black on gold backgrounds).

## Developer notes
- Keep components small and composable. Use Tailwind utility classes with tokens from `style-guide.md`.
- Create stories in Storybook (recommended) for each component and include example states.
