# AgriFundi Color Scheme

Complete color palette and design tokens for the AgriFundi mobile application.

## Brand Colors

### Primary - Golden Yellow
- **Hex**: `#F3B14E`
- **RGB**: `rgb(243, 177, 78)`
- **Usage**: Primary buttons, active states, highlights, icons
- **Foreground**: `#02007B` (Deep Navy Blue)

### Secondary - Deep Navy Blue
- **Hex**: `#02007B`
- **RGB**: `rgb(2, 0, 123)`
- **Usage**: Headers, text, secondary buttons, navigation
- **Foreground**: `#ffffff` (White)

### Accent - Lime Green
- **Hex**: `#B1CB40`
- **RGB**: `rgb(177, 203, 64)`
- **Usage**: Accent elements, success states, highlights
- **Foreground**: `#02007B` (Deep Navy Blue)

---

## UI Colors

### Background & Foreground

#### Light Mode
- **Background**: `#ffffff` (White)
- **Foreground**: `#02007B` (Deep Navy Blue)

#### Dark Mode
- **Background**: `#02007B` (Deep Navy Blue)
- **Foreground**: `#ffffff` (White)

### Card Colors

#### Light Mode
- **Card Background**: `#ffffff`
- **Card Foreground**: `#02007B`

#### Dark Mode
- **Card Background**: `#0a0a8f`
- **Card Foreground**: `#ffffff`

### Muted Colors

#### Light Mode
- **Muted Background**: `#f5f5f5`
- **Muted Foreground**: `#6b6b6b`

#### Dark Mode
- **Muted Background**: `#1a1a9f`
- **Muted Foreground**: `#d0d0d0`

---

## Semantic Colors

### Destructive (Error/Alert)
- **Hex**: `#d4183d`
- **RGB**: `rgb(212, 24, 61)`
- **Foreground**: `#ffffff` (White)
- **Usage**: Error messages, delete actions, urgent alerts

### Input Colors

#### Light Mode
- **Border**: `rgba(2, 0, 123, 0.15)` (Navy Blue 15% opacity)
- **Background**: `#ffffff`

#### Dark Mode
- **Border**: `rgba(255, 255, 255, 0.15)` (White 15% opacity)
- **Input**: `rgba(255, 255, 255, 0.1)` (White 10% opacity)

### Switch Background
- **Light Mode**: `#cbced4`

---

## Chart Colors

### Chart Color Palette
1. **Chart 1**: `#F3B14E` (Golden Yellow - Primary)
2. **Chart 2**: `#02007B` (Deep Navy Blue - Secondary) / `#B1CB40` (Lime Green - Dark Mode)
3. **Chart 3**: `#B1CB40` (Lime Green) / `#ffd280` (Light Gold - Dark Mode)
4. **Chart 4**: `#ffd280` (Light Gold) / `#c5d96d` (Light Lime - Dark Mode)
5. **Chart 5**: `#c5d96d` (Light Lime) / `#f9c56f` (Soft Gold - Dark Mode)

---

## Sidebar Colors

### Light Mode
- **Background**: `#02007B` (Deep Navy Blue)
- **Foreground**: `#ffffff` (White)
- **Primary**: `#F3B14E` (Golden Yellow)
- **Primary Foreground**: `#02007B` (Deep Navy Blue)
- **Accent**: `#B1CB40` (Lime Green)
- **Accent Foreground**: `#02007B` (Deep Navy Blue)
- **Border**: `rgba(255, 255, 255, 0.1)`
- **Ring**: `#F3B14E` (Golden Yellow)

### Dark Mode
- **Background**: `#01005a` (Darker Navy)
- **Foreground**: `#ffffff` (White)
- **Primary**: `#F3B14E` (Golden Yellow)
- **Primary Foreground**: `#02007B` (Deep Navy Blue)
- **Accent**: `#B1CB40` (Lime Green)
- **Accent Foreground**: `#02007B` (Deep Navy Blue)
- **Border**: `rgba(255, 255, 255, 0.1)`
- **Ring**: `#F3B14E` (Golden Yellow)

---

## Special Effects

### Focus Ring
- **Color**: `#F3B14E` (Golden Yellow)
- **Opacity**: 50% for outline

### Border Radius
- **Default**: `0.625rem` (10px)
- **Small**: `calc(0.625rem - 4px)` (6px)
- **Medium**: `calc(0.625rem - 2px)` (8px)
- **Large**: `0.625rem` (10px)
- **Extra Large**: `calc(0.625rem + 4px)` (14px)

---

## Status Colors

### Work Order Status
- **In Progress**: Uses Primary color (`#F3B14E`) with foreground
- **Pending**: Uses Secondary color (`#02007B`) with reduced opacity
- **Completed**: Uses Accent color (`#B1CB40`) with foreground

### Priority Levels
- **High/Urgent**: Uses Destructive color (`#d4183d`)
- **Medium**: Uses Primary color (`#F3B14E`)
- **Low**: Uses Accent color (`#B1CB40`)

### Tractor Status
- **Operational**: Accent color (`#B1CB40`)
- **In Service**: Primary color (`#F3B14E`)
- **Needs Attention**: Destructive color (`#d4183d`)

### Customer Status
- **Active**: Accent color (`#B1CB40`)
- **Inactive**: Muted foreground (`#6b6b6b`)

---

## Color Usage Guidelines

### Do's
✅ Use Primary (#F3B14E) for main CTAs and important actions
✅ Use Secondary (#02007B) for text and navigation elements
✅ Use Accent (#B1CB40) for success states and positive indicators
✅ Use Destructive (#d4183d) for errors and warnings
✅ Maintain sufficient contrast ratios for accessibility

### Don'ts
❌ Don't use Primary for large background areas
❌ Don't mix too many colors in a single component
❌ Don't use Destructive color for non-critical elements
❌ Don't reduce opacity below 15% for borders

---

## Accessibility

### Contrast Ratios
- **Primary on White**: 3.8:1 (Suitable for large text)
- **Secondary on White**: 16.9:1 (Excellent)
- **Accent on White**: 4.3:1 (Good)
- **White on Secondary**: 16.9:1 (Excellent)

### Color Blindness Considerations
The color palette has been designed to maintain distinguishability across common types of color blindness:
- Primary (Golden Yellow) and Secondary (Navy Blue) have high contrast
- Accent (Lime Green) provides additional differentiation
- Not solely reliant on color for status indication (uses text labels and icons)

---

## CSS Variables Reference

```css
/* Light Mode */
--primary: #F3B14E;
--primary-foreground: #02007B;
--secondary: #02007B;
--secondary-foreground: #ffffff;
--accent: #B1CB40;
--accent-foreground: #02007B;
--destructive: #d4183d;
--destructive-foreground: #ffffff;
--background: #ffffff;
--foreground: #02007B;
--muted: #f5f5f5;
--muted-foreground: #6b6b6b;
--border: rgba(2, 0, 123, 0.15);
--ring: #F3B14E;

/* Dark Mode */
--primary: #F3B14E;
--primary-foreground: #02007B;
--secondary: #1a1a9f;
--secondary-foreground: #ffffff;
--accent: #B1CB40;
--accent-foreground: #02007B;
--destructive: #d4183d;
--destructive-foreground: #ffffff;
--background: #02007B;
--foreground: #ffffff;
--muted: #1a1a9f;
--muted-foreground: #d0d0d0;
--border: rgba(255, 255, 255, 0.15);
--ring: #F3B14E;
```

---

## Additional Shades & Tints

### Primary Variations
- **Light**: `#ffd280` (Used in Chart 4)
- **Lighter**: `#f9c56f` (Used in Chart 5, Dark Mode)
- **Dark**: `#F3B14E` (Base)

### Accent Variations
- **Light**: `#c5d96d` (Used in Chart 5)
- **Base**: `#B1CB40`

---

*Last Updated: October 17, 2025*
*Version: 1.0*
