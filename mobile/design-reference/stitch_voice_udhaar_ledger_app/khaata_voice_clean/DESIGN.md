---
name: Khaata Voice Clean
colors:
  surface: '#f9f9ff'
  surface-dim: '#d3daef'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f3ff'
  surface-container: '#e9edff'
  surface-container-high: '#e1e8fd'
  surface-container-highest: '#dce2f7'
  on-surface: '#141b2b'
  on-surface-variant: '#3d4a44'
  inverse-surface: '#293040'
  inverse-on-surface: '#edf0ff'
  outline: '#6d7a73'
  outline-variant: '#bccac2'
  surface-tint: '#006c52'
  primary: '#006950'
  on-primary: '#ffffff'
  primary-container: '#008466'
  on-primary-container: '#f5fff8'
  inverse-primary: '#61dbb4'
  secondary: '#53615e'
  on-secondary: '#ffffff'
  secondary-container: '#d7e6e1'
  on-secondary-container: '#596764'
  tertiary: '#b1212d'
  on-tertiary: '#ffffff'
  tertiary-container: '#d43c42'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#7ff8cf'
  primary-fixed-dim: '#61dbb4'
  on-primary-fixed: '#002117'
  on-primary-fixed-variant: '#00513d'
  secondary-fixed: '#d7e6e1'
  secondary-fixed-dim: '#bbcac5'
  on-secondary-fixed: '#111e1b'
  on-secondary-fixed-variant: '#3c4a46'
  tertiary-fixed: '#ffdad8'
  tertiary-fixed-dim: '#ffb3b0'
  on-tertiary-fixed: '#410006'
  on-tertiary-fixed-variant: '#92011a'
  background: '#f9f9ff'
  on-background: '#141b2b'
  surface-variant: '#dce2f7'
typography:
  headline-hero:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-hero-mobile:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system is engineered for micro-merchants and high-street shopkeepers across Pakistan who require effortless credit (`udhaar`) and installment tracking. Merging the tactile, friction-free clarity of Apple Wallet with the modern minimalism of next-generation fintech (such as SadaPay), the design aesthetic strips away visual noise in favor of maximum legibility, immediate trust, and swift voice interactions.

The visual tone is restrained, premium, and welcoming. Because users operate in hurried counter settings under direct sunlight and high ambient noise, the interface prioritizes immediate comprehension over dense decoration. Interaction is anchored by a high-contrast layout, generous tap areas, and a signature voice-first recording mechanic.

Key brand traits:
- **Trustworthy & Dependable:** Crisp structures, clean monetary values, and transparent ledgers eliminate ambiguity.
- **Effortlessly Accessible:** Designed for dual literacy (English/Roman Urdu alongside Noto Urdu scripts) with no cognitive overload.
- **Voice-Native:** An unmistakable floating microphone affordance anchors the interface, reducing multi-step data entry to a single conversational utterance.

## Colors

The color palette is strictly light-mode, engineered for exceptional outdoor legibility and calm authority. Color is deployed functionally rather than decoratively to signal credit states, voice capture status, and financial resolution.

- **Primary (`#10A37F`):** Fresh soft emerald green. Communicates positive settlements, safe ledgers, primary confirmations, and the signature voice action button.
- **Accent Soft Tint (`#E8F7F2`):** Used for low-friction pill badges, interactive chips in an active state, and container backgrounds indicating settled debts or positive credit.
- **Alert / Overdue (`#E5484D`):** Soft, urgent red signaling delinquent installments, overdue accounts, or payment reversals.
- **Alert Tint (`#FDECEC`):** Muted background fill for overdue ledger cards and warning statuses.
- **Surfaces & Backgrounds:**
  - Base canvas: `#FFFFFF` (Pure white for maximum luminous contrast).
  - Cards & Input Containers: `#F7F8FA` (Soft neutral grey separating card layers from the base screen without visual heaviness).
- **Text & Hierarchy:**
  - Primary text: `#111827` (Deep neutral slate, meeting AAA contrast requirements).
  - Secondary / Supporting text: `#6B7280` (Balanced grey for dates, Roman Urdu subheadings, and status metadata).
- **Dividers & Outlines:** `#E5E7EB` (Subtle 1px border for structural containment).

## Typography

The type system prioritizes high-speed scanability. All English figures and labels utilize `Inter`, paired in application logic with a font fallback sequence to `Noto Sans Arabic` or `Noto Nastaliq Urdu` for Urdu script equivalents.

### Numeric Formatting & Currency Standards
- Ledger figures and monetary amounts must strictly format using the standardized prefix: `Rs 20,000` (non-breaking space between the currency code and comma-separated digits).
- Negative or owed balances must never be formatted with isolated mathematical symbols; use visual context (`Rs 4,500 Udhaar`) paired with the alert hue.
- Minimum legible body size across the system is fixed at 16px to accommodate varied eyesight conditions among shopkeepers.

### Bilingual Label Stacking
When presenting bilingual strings, the Latin/English descriptor occupies the primary line, paired directly with a smaller supporting Urdu subtitle (e.g., "Add Credit" on line 1 in `label-lg`, "ادھار شامل کریں" on line 2 in `label-sm`), ensuring clear cross-literacy comprehension.

## Layout & Spacing

Layout geometry follows a clean, single-column fluid mobile canvas optimized for thumb-driven one-handed operation. 

- **Canvas Margins:** Fixed outer margins of `1.25rem` (20px) ensure edge items never collide with modern mobile hardware bezels.
- **Vertical Rhythm:** 
  - Standard spacing between ledger entries is `0.75rem` (12px) to keep lists cohesive yet individually distinct.
  - Spacing between disparate functional zones is `1.5rem` (24px).
  - Generous bottom-padding (`5rem` / 80px) is applied globally to prevent content from slipping behind the docked navigation bar and the floating mic FAB.
- **Touch Ergonomics:** All interactive buttons, cards, and input fields carry a mandatory minimum height of `56px`. This accommodates rapid, inaccurate taps during busy storefront transactions.

## Elevation & Depth

This design system avoids heavy shadows, dark drop-casts, and complex multi-layered skeuomorphism. Instead, it relies on soft tonal separation complemented by an ultra-light, diffused ambient shadow to lift primary interactive objects.

- **Base Elevation (Flat / Canvas):** Surface is pure white (`#FFFFFF`) with no shadow.
- **Card & Tile Elevation:** Surface sits at `#F7F8FA` bordered by a 1px solid hairline (`#E5E7EB`). Cards cast an ambient shadow: `box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.04)`.
- **Floating Action Elevation (Voice Trigger):** The 80px emerald voice action button floats above the bottom navigation canvas with a lifted emerald-tinted ambient glow: `box-shadow: 0px 8px 24px rgba(16, 163, 127, 0.24)`.
- **Active Listening Modal:** When voice recording is engaged, the background dims under a sheer wash (`rgba(17, 24, 39, 0.4)`), while the voice transcription container elevates with a crisp, low-diffusion ambient envelope: `box-shadow: 0px 12px 32px rgba(0, 0, 0, 0.08)`.

## Shapes

The shape hierarchy is intentionally balanced: structured envelopes for data containers, contrasted against organic pills for interaction targets.

- **Cards & Data Modules:** Explicitly set to `20px` corner radii. This creates the friendly, soft feel reminiscent of modern card-based digital wallets while preserving internal rectangular alignment for lists and tables.
- **Buttons, Badges, & Chips:** Styled as full capsules (`border-radius: 9999px`). Buttons, filter tags, and state pills convey immediate tap affordance through rounded ends.
- **Voice Floating Action Button (FAB):** Completely circular (`80px × 80px`, `50%` radius), visually distinct from rectangular cards and oblong pills.

## Components

### 1. The Signature Voice FAB
- **Dimension:** Fixed at `80px × 80px` circular floating button.
- **Styling:** Emerald green background (`#10A37F`), centered white microphone icon (32px glyph size), elevated with a soft green ambient shadow.
- **Positioning:** Centered at the bottom edge, elevated 16px above the system safe area, docked overlapping or directly above the primary tab navigation.
- **Behavior:** Long-press or tap initiates active listening state. Pulse animation expands a concentric wave in `#E8F7F2` at 60fps.

### 2. Buttons
- **Primary Button:** Full width or pinned bottom; minimum height `56px`; fully rounded (`9999px`); solid `#10A37F` background with `#FFFFFF` text (`label-lg`). Single primary action per screen.
- **Secondary / Ghost Button:** Minimum height `56px`; fully rounded; `#F7F8FA` background or transparent with 1px `#E5E7EB` border; text `#111827`.
- **Destructive / Overdue Action Button:** Muted `#FDECEC` background with `#E5484D` text.

### 3. Ledger & Udhaar Cards
- **Card Body:** Background `#F7F8FA`, border 1px solid `#E5E7EB`, border-radius `20px`, padding `16px`.
- **Card Header:** Customer name in `body-lg` (bold, `#111827`), secondary contact or Roman Urdu nickname below in `label-sm` (`#6B7280`).
- **Card Metric:** Outstanding balance aligned to the right. Green (`#10A37F`) for advance payments/settled, Red (`#E5484D`) for credit owed/udhaar. Font formatted in `headline-md`.
- **Installment Sub-badge:** Embedded pill with `border-radius: 9999px`, background `#FFFFFF`, subtle border, displaying installment count (e.g., "Kisht 2 of 4").

### 4. Chips & Status Badges
- **Active Filter Chip:** Capsule shape, background `#E8F7F2`, text `#10A37F` (`label-md`), 1px solid `#10A37F`.
- **Inactive Filter Chip:** Capsule shape, background `#FFFFFF`, text `#6B7280`, 1px solid `#E5E7EB`.
- **Overdue Badge:** Capsule shape, background `#FDECEC`, text `#E5484D`, font `label-sm` with leading red dot indicator.

### 5. Input Fields
- **Container:** Height `56px`, border-radius `16px` (or full pill `9999px` for search bars), background `#F7F8FA`, border 1px solid `#E5E7EB`.
- **State Changes:** On focus, border transitions to 1.5px solid `#10A37F` with a soft emerald background tint.
- **Bilingual Placeholders:** Placeholder labels provide simultaneous Roman Urdu and Urdu context (e.g., "Enter amount / رقم لکھیں").

### 6. Voice Waveform Confirmation Drawer
- Bottom sheet surfacing parsed voice input (e.g., "Tariq Bhai - Rs 1,500 Udhaar").
- Displays parsed values cleanly inside an editable card before final submission, requiring a single tap on the primary button ("Record Entry / اندراج کریں") to commit to the ledger.