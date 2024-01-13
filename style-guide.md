# Styling Conventions

This document outlines the convention for this project as well as generally good practices.

## General

- Use arrow functions over the `function` keyword (except for React components).
- Use `async`/`await` over `.then()` for promises (data fetching, etc...).

## CSS

- Use Tailwind utility classes over custom CSS. If you find yourself writing a lot of raw CSS, you're probably doing something wrong.
- Keep margins and padding consistent. e.g. I like `p-2` and `m-2` for most things, but `p-4` and `m-4` for larger things like cards.
- Prefer flexboxes. You can do almost everything with them and margins/padding/gaps! If there was a single thing I could make you do during this project period, it's [Flexbox Froggy](https://flexboxfroggy.com/).

## `prisma` (Schema stuff)

All models should be in `PascalCase`. All field names should be in `camelCase`. All enums should be in `UPPER_SNAKE_CASE`.

Timestamp-related fields should be named `createdAt` and `updatedAt`. If you need to add a `deletedAt` field, it should be a `DateTime?` field.

Fields that reference a user should be named `createdBy` and `updatedBy`. If you need to add a `deletedBy` field, it should be a `String?` field.

## `src/` (Next.JS stuff)

- All file and folder names are in `kebab-case`. Avoid multiple word api endpoints where possible. Favour creating extra folders.
- Use functional components over class components. They should be defined using `function` and should be exported as `default`. Use `(arrow) => functions()` everywhere else.

```tsx
// DO THIS
export default function MyComponent() {
  return <div>My Component</div>;
}

// NOT THIS
export default class MyComponent extends React.Component {
  render() {
    return <div>My Component</div>;
  }
}
```

```tsx
// DO THIS
export default function MyComponent() {
  return <div>My Component</div>;
}

// NOT THIS
const MyComponent = () => {
  return <div>My Component</div>;
};
export default MyComponent;
```

### `src/components/`

- Try to reuse components as much as possible. If you find yourself copying and pasting code, it's probably time to refactor. If you didn't make the component, make sure to let them know or ask them for help.
- All file and folder names here should be `kebab-case.tsx`. Exported component names should be in `<PascalCase />`.

> If you need to break a component into smaller components, create a folder with the same name as the component and create the smaller components in there. For example, if you have a component called `my-component.tsx` and you need to break it into smaller components, create a folder called `MyComponent` and create the smaller components in there. The main component should be called `index.tsx` (still exported as `MyComponent`).

## `tests/`

To enforce style, please mirror the structure of the `src/pages` directory here.
