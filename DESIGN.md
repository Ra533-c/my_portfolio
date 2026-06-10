---
name: Cyber-Minimalist Developer Portfolio
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1b1b1b'
  surface-container: '#1f1f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e2e2e2'
  on-surface-variant: '#b9ccb5'
  inverse-surface: '#e2e2e2'
  inverse-on-surface: '#303030'
  outline: '#849581'
  outline-variant: '#3b4b3a'
  surface-tint: '#00e55b'
  primary: '#edffe8'
  on-primary: '#003911'
  primary-container: '#00ff66'
  on-primary-container: '#007128'
  inverse-primary: '#006e27'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ecffea'
  on-tertiary: '#063919'
  tertiary-container: '#b6eabc'
  on-tertiary-container: '#3c6b46'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6bff83'
  primary-fixed-dim: '#00e55b'
  on-primary-fixed: '#002107'
  on-primary-fixed-variant: '#00531b'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#bbefc1'
  tertiary-fixed-dim: '#a0d3a6'
  on-tertiary-fixed: '#00210b'
  on-tertiary-fixed-variant: '#21502e'
  background: '#131313'
  on-background: '#e2e2e2'
  surface-variant: '#353535'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
  code:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system establishes a premium, high-performance visual language tailored for elite full-stack software engineering. It blends the clinical precision of minimalist architecture with the high-energy aesthetics of futuristic technology. The brand personality is authoritative yet innovative, evoking a sense of "digital luxury" through deep blacks and hyper-vibrant accents.

The design style is **Cyber-Minimalist**. It utilizes heavy whitespace (or "blackspace") to allow content to breathe, punctuated by sharp, emerald-green light sources. Key characteristics include:
- **Optical Precision:** Ultra-thin borders and refined type scales.
- **Atmospheric Depth:** Using glow and glassmorphism rather than traditional shadows to create a multi-layered interface.
- **Industrial Sophistication:** A focus on technical excellence and clean code-like execution in every layout.

## Colors

The palette is intentionally restricted to maximize visual impact and maintain a "premium dark" atmosphere. 

- **The Void (#000000):** The primary canvas. This pitch-black base ensures absolute contrast for the emerald accents.
- **Emerald Pulse (#00FF66):** Used sparingly for primary actions, status indicators, and critical highlights. This color should appear to "emit light."
- **Surface Layer (#1A1A1A):** A secondary neutral used for card backgrounds and container strokes to provide subtle separation from the background.
- **Deep Emerald (#003314):** A low-luminance variant used for hover states and subtle glass backgrounds.

All interactive elements must leverage the Emerald Pulse to guide the user's eye through the technical hierarchy.

## Typography

Typography in this design system is treated as a structural element. **Plus Jakarta Sans** provides a bold, geometric presence for headings, creating a high-end editorial feel. **Inter** is utilized for body text to ensure maximum legibility at small sizes, maintaining a clean, utilitarian aesthetic.

- **Metallic Effect:** For large Display titles, apply a subtle linear gradient (from #FFFFFF to #A1A1A1) to simulate a brushed metal appearance.
- **Hierarchy:** Use dramatic size differences between headings and body text to create clear entry points.
- **Labeling:** Small, uppercase labels with increased letter spacing should be used for technical metadata and categories.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** model for desktop to maintain a curated, portfolio-style presentation, transitioning to a fluid model for mobile devices.

- **The 12-Column System:** Content is aligned to a 12-column grid with a 24px gutter.
- **Sectioning:** Generous vertical spacing (120px+) is used to separate distinct projects or content blocks, reinforcing the minimalist aesthetic.
- **Alignment:** Use a mix of centered hero sections and left-aligned body content to create a dynamic reading rhythm.
- **Safe Zones:** High-contrast borders should never feel cramped; maintain at least 40px of internal padding within glass containers.

## Elevation & Depth

This design system eschews traditional drop shadows in favor of **Luminous Depth**. 

1.  **Glassmorphism:** Secondary surfaces use a backdrop-blur (12px to 20px) with a semi-transparent dark fill (rgba(0,0,0,0.6)). 
2.  **Emerald Glow:** Interactive elements or active states utilize an outer glow (box-shadow: 0 0 20px rgba(0, 255, 102, 0.3)) to suggest energy and focus.
3.  **Thin Strokes:** Layers are separated by 1px borders. Use a low-opacity white (rgba(255,255,255,0.1)) for standard borders and the primary Emerald for active/hover states.
4.  **Z-Index Strategy:** The capsule navbar always sits at the highest elevation with a heavy blur, appearing to float above the content.

## Shapes

The shape language is a hybrid of **precise rectangles** and **perfect capsules**.

- **Cards/Containers:** Use a `rounded-lg` (1rem) setting to soften the technical edges without losing the structural integrity.
- **Interactive Elements:** Buttons and Navigation items use a `pill` (rounded-full) shape to create a distinct "touchable" feel that contrasts against the grid-based layout.
- **Icons:** Use linear, 2px stroke icons that match the typography's weight. Avoid filled icons to maintain the "lightweight" cyber aesthetic.

## Components

### Navigation
- **Capsule Navbar:** A floating, pill-shaped bar at the top or bottom. It features a dark glass background, a subtle 1px border, and emerald text for active states.

### Buttons
- **Primary:** Solid Emerald Pulse background with black text. On hover, increase the outer glow.
- **Secondary:** Transparent background with a 1px Emerald stroke and Emerald text.

### Cards
- **Project Cards:** Deep black surfaces with a 1px `Surface Layer` border. On hover, the border transitions to Emerald, and a subtle green glow emanates from the bottom.
- **Glass Inlay:** Used for technical tags or chips inside cards, utilizing a heavy backdrop blur.

### Vertical Timeline
- A 1px vertical line in `Deep Emerald`. 
- **Milestones:** Small 8px circles that glow bright Emerald when they reach the center of the viewport.

### Input Fields
- Underlined or fully outlined with 1px `Surface Layer` strokes. The label should use the `label-caps` typography style. On focus, the stroke turns Emerald with a soft inner glow.