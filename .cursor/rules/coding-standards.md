# Coding Standards

*A comprehensive guide for building production-ready Next.js applications*

---

# Philosophy

When writing code, prioritize the following (highest priority first):

1. Correctness
2. Readability
3. Maintainability
4. Simplicity
5. Performance
6. Developer Experience
7. Minimize client-side JavaScript

Always optimize for code that another engineer can understand within a few minutes.

Avoid writing code that is clever but difficult to read.

---

# General Principles

## Keep Files Small

Aim for:

- Components: under 200 lines
- Hooks: under 150 lines
- Utility files: under 300 lines
- API routes: one responsibility only

If a file starts becoming difficult to navigate, split it.

---

## Single Responsibility Principle

Every function, component, hook, and module should have one responsibility.

Good:

- Button renders a button
- Modal controls modal behavior
- API function fetches data
- Validation function validates

Bad:

- Component fetching data
- Component transforming data
- Component validating forms
- Component managing unrelated UI state

---

## Prefer Simplicity

Always choose the simpler solution unless complexity provides significant benefit.

Avoid:

- unnecessary abstractions
- premature optimization
- overusing generics
- deeply nested callbacks
- unnecessary design patterns

---

## Prefer Native Browser Capabilities

Before introducing a JavaScript solution, consider whether the browser already provides the capability.

Priority:

1. HTML
2. CSS (Tailwind)
3. React
4. Motion
5. Additional libraries

Avoid solving problems in JavaScript that can be solved declaratively with HTML or CSS.

---

# Project Structure

Use the following structure whenever possible.

```
src/
│
├── app/
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── shared/
│   └── feature-name/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── profile/
│   └── ...
│
├── hooks/
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── db/
│   ├── utils/
│   └── validations/
│
├── services/
│
├── types/
│
├── constants/
│
├── providers/
│
├── store/
│
├── styles/
│
└── middleware.ts

```

Group by feature whenever possible instead of by file type.

---

# Next.js Guidelines

## Prefer Server Components

Use Server Components by default.

Only use `"use client"` when required.

Examples:

- useState
- useEffect
- event handlers
- browser APIs
- client-side libraries

Everything else should remain a Server Component.

---

## Data Fetching

Fetch data on the server whenever possible.

Avoid:

```
useEffect(() => {
    fetch(...)
})

```

unless the data truly depends on client interaction.

---

## Server Actions

Prefer Server Actions for:

- forms
- mutations
- authenticated actions

Avoid unnecessary API routes.

---

## Route Handlers

Use Route Handlers only when:

- webhooks
- third-party integrations
- REST API
- external consumers

Do not create Route Handlers just because data is being fetched.

---

## Layouts

Keep layouts lightweight.

Do not fetch large amounts of unrelated data inside layouts.

---

## Metadata

Always use the Metadata API.

Every page should have:

- title
- description

Whenever applicable include:

- Open Graph
- Twitter metadata
- robots
- canonical URL

---

# React Standards

## Components

Prefer function declarations.

Good

```tsx
export function UserCard() {}

```

Avoid

```tsx
const UserCard = () => {}

```

unless necessary.

---

## Component Size

If a component has multiple logical sections, split them.

Example

```
Dashboard

├── DashboardHeader
├── DashboardStats
├── DashboardTable
├── DashboardFilters

```

---

## Props

Keep props small.

Instead of:

```tsx
<UserCard
    user={user}
    posts={posts}
    comments={comments}
    permissions={permissions}
/>

```

Prefer splitting responsibilities.

---

## Avoid Prop Drilling

After 2–3 levels of prop drilling, consider:

- Context
- Server Components
- URL state
- Zustand (if global)

---

## Hooks

Custom hooks should:

- begin with "use"
- encapsulate one concern
- avoid hidden side effects

---

# State Management

Priority:

1. Server state
2. URL state
3. Local component state
4. Context
5. Global store

Do not use global state unless truly global.

Examples:

Good

- theme
- authentication
- sidebar state

Bad

- modal visibility
- form input
- hover state

---

# TypeScript

## Never use

```
any

```

Instead use

- unknown
- generics
- proper interfaces
- type narrowing

---

## Prefer Interfaces

For objects

```ts
interface User {}

```

Use type for:

- unions
- mapped types
- utility types

---

## Explicit Return Types

Always specify exported function return types.

```ts
export function getUser(): Promise<User>

```

---

## Avoid Type Assertions

Avoid

```
as any

```

```
as unknown

```

Only use assertions when unavoidable.

---

# Naming

Use descriptive names.

Good

```
calculateCartTotal

```

Bad

```
calc

```

---

Boolean variables

```
isOpen
hasPermission
canEdit
shouldFetch

```

---

Handlers

```
handleSubmit
handleClick
handleDelete

```

---

Async

```
fetchUser
createInvoice
updateProfile

```

---

Constants

```
MAX_UPLOAD_SIZE
DEFAULT_PAGE_SIZE

```

---

# Functions

Prefer functions under 30 lines.

Avoid functions doing multiple unrelated tasks.

Extract logic early.

---

# Error Handling

Never silently ignore errors.

Bad

```ts
catch {}

```

Good

```ts
catch (error) {
    console.error(error)
}

```

Return meaningful errors.

---

# Validation

Always validate:

- route params
- search params
- form input
- environment variables
- API payloads

Prefer Zod.

---

# Environment Variables

Never access

```
process.env

```

throughout the app.

Create

```
lib/env.ts

```

Validate everything.

---

# Styling

Use Tailwind CSS.

Rules:

Prefer utility classes.

Avoid inline styles.

Avoid arbitrary values unless necessary.

Good

```
p-4
rounded-lg
max-w-xl

```

Avoid

```
w-[397px]

```

unless unavoidable.

---

Use

```
cn()

```

utility for conditional classes.

---

# Animation Standards

## Animation Library

The project uses **Motion** (`motion` package) as the primary JavaScript animation library.

However, **do not automatically use Motion for every animation**. Many animations can and should be implemented using CSS through Tailwind.

Always choose the simplest solution that meets the requirements.

Priority:

1. Tailwind CSS animations
2. Motion
3. Custom CSS keyframes (only when necessary)

---

## Use Tailwind When

Prefer Tailwind whenever the animation:

- uses `hover`
- uses `focus`
- uses `active`
- uses `group-hover`
- uses `peer`
- uses CSS transitions
- fades
- slightly scales
- slightly rotates
- slightly translates
- changes colors
- changes opacity
- changes shadows
- changes borders
- uses simple keyframe animations
- does not depend on React state
- does not require animation orchestration

Examples:

- Button hover
- Card hover
- Icon rotation on hover
- Link underline
- Dropdown arrow rotation
- Focus rings
- Loading pulse
- Skeleton loaders
- Simple bouncing indicators

Good

```tsx
<button className="transition-colors hover:bg-blue-600">

```

```tsx
<div className="transition-transform duration-300 hover:scale-105">

```

Avoid introducing Motion for these scenarios.

---

## Use Motion When

Use Motion whenever the animation depends on application state or requires animation features that CSS alone cannot provide cleanly.

Examples include:

- Mount/unmount animations
- Page transitions
- Shared layout transitions
- Layout animations
- Drag interactions
- Reordering lists
- Gesture animations
- Scroll-driven animations
- Viewport-triggered animations
- Sequential animations
- Staggered animations
- Interruptible animations
- Physics-based animations
- Spring animations
- Animated modals
- Animated drawers
- Animated sidebars
- Toast animations
- Accordions with dynamic height
- Complex loading sequences

Examples

```tsx
<AnimatePresence>

```

```tsx
<motion.div layout>

```

```tsx
<motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
>

```

These are appropriate uses of Motion.

---

## Avoid Motion When

Do not use Motion for animations that CSS already handles efficiently.

Avoid patterns such as:

- Wrapping every component in `motion.div`
- Using Motion solely for hover effects
- Using Motion solely for color transitions
- Using Motion solely for opacity transitions
- Using Motion solely for simple scaling
- Using Motion solely for button interactions

Bad

```tsx
<motion.button
    whileHover={{ scale: 1.03 }}
>

```

Prefer

```tsx
<button className="transition-transform hover:scale-105">

```

---

## Performance Guidelines

Only import Motion inside Client Components.

Never convert an entire page into a Client Component solely to animate one element.

Instead:

- Keep the page as a Server Component.
- Extract the animated section into a small Client Component.
- Animate only what needs to be animated.

Example

```
page.tsx (Server Component)

    HeroAnimation.tsx (Client Component using Motion)

```

This minimizes the client-side JavaScript bundle.

---

## Respect Reduced Motion

Whenever using Motion, respect the user's operating system accessibility preferences.

Use Motion's reduced-motion support for large or non-essential animations.

Decorative animations should be disabled when users prefer reduced motion.

---

## Animation Philosophy

Animations should improve usability rather than distract from it.

Animations should:

- communicate state changes
- guide the user's attention
- provide visual continuity
- make interactions feel responsive
- improve perceived performance

Avoid animations that exist purely for decoration.

If an animation does not improve the user experience, do not include it.

---

## Animation Duration Guidelines

Use consistent durations throughout the application.

Recommended durations:

- 100–150ms → Immediate feedback
- 150–250ms → Buttons and small UI interactions
- 250–350ms → Cards, menus, dropdowns
- 300–500ms → Modals and sidebars
- 500ms+ → Only for deliberate onboarding or storytelling experiences

Avoid animations longer than necessary.

The interface should always feel responsive.

---

## Cursor-Specific Animation Instructions

When generating animations:

- Default to Tailwind transitions for simple UI interactions.
- Introduce Motion only when its capabilities provide clear benefits.
- Never replace simple CSS animations with Motion unnecessarily.
- Keep Motion components isolated to the smallest possible Client Component.
- Avoid unnecessary re-renders caused by animation logic.
- Use spring animations sparingly and only where they improve the interaction.
- Favor subtle animations over dramatic ones.
- Ensure animations remain smooth on lower-powered devices.
- Respect accessibility and reduced-motion preferences by default.

---

# Tailwind Organization

Class order

```
Layout

Flex/Grid

Spacing

Sizing

Typography

Background

Border

Effects

Animation

State

```

Example

```tsx
className="
flex
items-center
gap-2
p-4
text-sm
font-medium
bg-white
rounded-lg
border
shadow
hover:bg-gray-100
"

```

---

# Accessibility

Always include

- alt text
- labels
- keyboard support
- focus styles
- semantic HTML

Prefer

```
button

```

instead of clickable divs.

---

# Forms

Use

- React Hook Form
- Zod

Never manually manage dozens of inputs with useState.

---

# Data Fetching

Cache where appropriate.

Use

```
revalidate

```

or

```
cache()

```

when beneficial.

Avoid duplicate fetches.

---

# Performance

Avoid unnecessary

```
useEffect

```

Avoid unnecessary

```
useMemo

```

Avoid unnecessary

```
useCallback

```

Only optimize after identifying an actual bottleneck.

---

Lazy load:

- large charts
- editors
- heavy client libraries

---

Optimize images using Next Image.

---

Fonts should use next/font.

---

# Imports

Order

1. React
2. Next
3. External packages
4. Internal aliases
5. Relative imports
6. Types

Separate groups with blank lines.

---

Use absolute imports

```
@/components

```

instead of

```
../../../

```

---

# Comments

Code should explain itself.

Only comment

- why
- business rules
- unusual behavior

Do not comment obvious code.

Bad

```ts
// increment counter
counter++

```

---

# Logging

Never leave debugging logs.

Remove

```
console.log

```

Keep

```
console.error
console.warn

```

only when meaningful.

---

# Security

Never trust user input.

Always:

- sanitize
- validate
- authorize

Never expose secrets.

Never expose stack traces.

---

# Database

Keep database logic inside

```
lib/db

```

or feature services.

Never query directly inside UI components.

---

# API Design

Responses should be consistent.

Example

Success

```json
{
  "data": {}
}

```

Error

```json
{
  "error": {
    "message": "",
    "code": ""
  }
}

```

---

# Folder Co-location

Feature-specific code should stay together.

Example

```
features/

    dashboard/

        components/

        hooks/

        actions/

        types/

        validations/

        utils/

```

Avoid dumping everything into shared folders.

---

# Reusability

Extract shared logic only after it has been used at least twice.

Avoid premature abstraction.

---

# Testing Mindset

Write code that is easy to test.

Avoid hidden dependencies.

Prefer pure functions.

---

# Before Writing New Code

Always ask:

- Does this already exist?
- Can this be reused?
- Is this the simplest implementation?
- Can this remain a Server Component?
- Does this improve readability?

---

# Before Finishing a Task

Verify:

- No TypeScript errors
- No ESLint warnings
- No duplicated logic
- No dead code
- No unused imports
- No unnecessary Client Components
- No unnecessary re-renders
- Accessible markup
- Responsive layout
- Proper loading state
- Proper error state
- Proper empty state
- Mobile-friendly
- Proper TypeScript types
- Environment variables validated
- Input validated
- Folder structure remains organized

---

# Cursor-Specific Instructions

When generating code:

- Prefer production-ready implementations over quick prototypes.
- Explain architectural decisions when introducing a new pattern.
- Reuse existing project utilities instead of duplicating logic.
- Do not introduce a new dependency unless it provides substantial value.
- Preserve existing coding style unless explicitly instructed to refactor.
- Suggest refactoring when a file becomes too large or a component has multiple responsibilities.
- Prefer composition over inheritance.
- Use App Router best practices and avoid Pages Router patterns.
- Keep imports clean and remove unused code.
- Generate self-documenting code with clear names rather than relying on comments.
- If multiple approaches exist, choose the one recommended by the current Next.js documentation unless project requirements indicate otherwise.

