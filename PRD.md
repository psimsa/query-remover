# Planning Guide

A simple, focused utility that strips query strings from URLs and opens the cleaned URL in a new tab.

**Experience Qualities**:
1. **Efficient** - Minimal steps from paste to result, with keyboard shortcuts for power users
2. **Clear** - Immediate visual feedback on URL validation and stripping preview
3. **Friendly** - Approachable design that doesn't intimidate with technical jargon

**Complexity Level**: Micro Tool (single-purpose application)
This is a single-purpose URL manipulation tool with one core function: removing query parameters from URLs. It requires minimal state and no data persistence.

## Essential Features

### URL Input Field
- **Functionality**: Accepts URL text input with real-time validation
- **Purpose**: Primary interface for users to provide URLs
- **Trigger**: User pastes or types a URL
- **Progression**: User focuses input → pastes/types URL → validation runs automatically → visual feedback appears
- **Success criteria**: Valid URLs show success state, invalid URLs show error with helpful message

### Strip & Navigate Button
- **Functionality**: Validates current input, removes query string, opens cleaned URL in new tab
- **Purpose**: Manual control for users who want to review before navigating
- **Trigger**: User clicks button or presses Enter
- **Progression**: User clicks button → URL validates → query string removed → new tab opens with clean URL → success toast appears
- **Success criteria**: New tab opens with correct stripped URL, original input remains for reference

### All-in-One Button
- **Functionality**: Reads clipboard, validates, strips query string, and navigates in one action
- **Purpose**: Ultra-fast workflow for power users who want zero typing
- **Trigger**: User clicks button with keyboard shortcut hint
- **Progression**: User clicks → clipboard reads → URL validates → strips query → new tab opens → success feedback
- **Success criteria**: Entire workflow completes in under 1 second with clear error handling if clipboard is empty or invalid

### URL Preview
- **Functionality**: Shows the cleaned URL before navigation
- **Purpose**: Builds confidence by showing exactly what will open
- **Trigger**: Valid URL entered
- **Progression**: Valid URL detected → stripped version calculated → preview displays with visual distinction
- **Success criteria**: Preview updates in real-time and clearly shows removed portions

## Edge Case Handling

- **Empty Input**: Disable strip button, show placeholder guidance
- **Invalid URL Format**: Show inline error message with example of valid format
- **URL Without Query String**: Allow navigation anyway, show "no changes needed" message
- **Empty Clipboard**: Show toast error explaining clipboard is empty
- **Non-URL Clipboard Content**: Show toast error with validation message
- **Clipboard Permission Denied**: Gracefully fallback with instructional message to paste manually

## Design Direction

The design should feel like a professional developer tool—clean, technical, and efficient. Think of a Swiss Army knife: utilitarian but refined. Use a tech-forward aesthetic with monospace typography for URLs and crisp geometric elements.

## Color Selection

A technical color scheme with high contrast and developer-tool aesthetics.

- **Primary Color**: Deep indigo `oklch(0.35 0.15 265)` - Communicates technical precision and trustworthiness
- **Secondary Colors**: 
  - Slate gray `oklch(0.25 0.01 265)` for subtle backgrounds
  - Cool gray `oklch(0.45 0.02 265)` for muted elements
- **Accent Color**: Electric cyan `oklch(0.70 0.15 195)` - High-tech highlight for CTAs and active states
- **Foreground/Background Pairings**: 
  - Background (Light slate `oklch(0.98 0.005 265)`): Deep slate text `oklch(0.20 0.01 265)` - Ratio 14.2:1 ✓
  - Primary (Deep indigo `oklch(0.35 0.15 265)`): White text `oklch(1 0 0)` - Ratio 8.5:1 ✓
  - Accent (Electric cyan `oklch(0.70 0.15 195)`): Deep slate text `oklch(0.20 0.01 265)` - Ratio 9.1:1 ✓

## Font Selection

Typography should emphasize the technical nature while remaining highly readable—combining a clean geometric sans for UI with a refined monospace for URL display.

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk Bold/32px/tight letter-spacing (-0.02em)
  - Body (Instructions): Space Grotesk Regular/16px/relaxed line-height (1.6)
  - URL Text (Input/Preview): JetBrains Mono Regular/15px/normal letter-spacing
  - Button Labels: Space Grotesk Medium/15px/wide letter-spacing (0.02em)

## Animations

Animations should feel snappy and technical, like toggling switches in a control panel. Use micro-interactions for validation feedback (smooth color transitions on input validation) and a subtle scale-up on button press. The "all-in-one" button should have a special multi-step animation sequence that visualizes the workflow progression.

## Component Selection

- **Components**: 
  - Input (shadcn) with custom monospace styling for URL display
  - Button (shadcn) with variant="default" for Strip button, variant="outline" with accent styling for All-in-One
  - Card (shadcn) for main container with subtle shadow
  - Badge (shadcn) for URL preview label
  - Toast (sonner) for success/error feedback
- **Customizations**: 
  - Custom input styling with monospace font and larger padding
  - Preview section using muted background with border-l accent stripe
  - Split button layout with icon integration
- **States**: 
  - Input: focus ring with accent color, error state with red border and shake animation, success state with green border
  - Buttons: hover with slight scale and brightness increase, active with scale-down, disabled with opacity and no hover
- **Icon Selection**: 
  - Scissors icon for strip action
  - Lightning bolt for all-in-one action
  - Check circle for success states
  - Warning circle for error states
- **Spacing**: 
  - Card padding: p-8
  - Input/button gap: gap-4
  - Section spacing: space-y-6
  - Tight grouping for related elements: gap-2
- **Mobile**: 
  - Stack buttons vertically on mobile (<640px)
  - Reduce card padding to p-6
  - Adjust font sizes: H1 to 24px, body to 15px
  - Full-width buttons for easier touch targets
