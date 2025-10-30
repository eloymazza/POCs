# ViewTransition18

A React 18 compatible wrapper component that implements functionality similar to React 19's `<ViewTransition>` component (Canary), using the native browser View Transitions API.

## 🚀 Features

- ✅ Compatible with React 18
- ✅ Uses native browser View Transitions API
- ✅ Automatic fallback in unsupported browsers
- ✅ Support for shared element transitions
- ✅ Animates enter, exit and update element changes
- ✅ Full TypeScript support
- ✅ React Router integration

## 📋 Requirements

- React 18+
- Browser with View Transitions API support:
  - Chrome 111+
  - Edge 111+
  - Opera 97+
  - Safari (coming soon)
  - Firefox (coming soon)

> **Note:** In unsupported browsers, the component works normally without animations.


## 📖 Usage

### `startViewTransition` Hook

Wrap state updates in `startViewTransition` to trigger animations:

```typescript
import { startViewTransition } from './hooks/useViewTransition';
import { useState } from 'react';

function MyComponent() {
  const [show, setShow] = useState(false);
  
  const toggle = () => {
    startViewTransition(() => {
      setShow(prev => !prev);
    });
  };
  
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      {show && (
        <ViewTransition18 name="panel">
          <div>Animated content</div>
        </ViewTransition18>
      )}
    </>
  );
}
```

### `ViewTransition18` Component

Wrap elements you want to animate:

```typescript
import { ViewTransition18 } from './components/ViewTransition18';

<ViewTransition18 name="my-element" className="custom-class">
  <div>Content</div>
</ViewTransition18>
```

#### Props

- `name?: string` - Name to match elements between states (shared element transitions)
- `className?: string` - Optional CSS class for the container
- `children: React.ReactNode` - Elements to animate

### Examples

The project includes several examples in the pages:

1. **Home** - Basic enter/exit example
2. **Shared Element** - Shared transitions between list and detail
3. **List Reorder** - List reordering animation
4. **Loading** - Loading states with transitions
5. **Cancel** - Animation cancellation
6. **Sequence** - Chained animations
7. **Browser Support** - Browser compatibility detection
8. **About** - Documentation and details

## 🎨 Customization

You can customize animations using CSS with View Transitions pseudo-classes:

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
```


## 📚 Documentation

- [Implementation Details](./docs/IMPLEMENTATION.md) - Complete technical documentation
- [Simple Example](./docs/SIMPLE_EXAMPLE.md) - Minimal usage example
- [Flow Diagram](./docs/FLOW_DIAGRAM.md) - Implementation flow diagram

## 📚 References

- [View Transitions API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API)
- [React 19 ViewTransition (Canary)](https://react.dev/reference/react/ViewTransition)

## 📝 License

MIT
