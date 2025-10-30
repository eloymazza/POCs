# ViewTransition18 - Implementation Documentation

## Overview

ViewTransition18 is a React 18 compatible wrapper component that implements functionality similar to React 19's `<ViewTransition>` component using the native browser View Transitions API.

## Architecture

The implementation consists of two main parts:

1. **`ViewTransition18` Component** - Wraps elements to be animated
2. **`startViewTransition` Hook** - Initiates the transition process

## Core Components

### 1. ViewTransition18 Component

**Location:** `src/components/ViewTransition18.tsx`

```typescript
export function ViewTransition18({ name, className, children }: ViewTransition18Props)
```

#### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | No | Name to match elements between states ("shared element"). If not provided, generates a unique one per instance. |
| `className` | `string` | No | Optional CSS class for the container |
| `children` | `React.ReactNode` | Yes | Child elements to animate |

#### How it works

1. **Name Generation**: If no `name` is provided, generates a unique ID using `useId()`
2. **DOM Assignment**: Uses `useLayoutEffect` to assign `viewTransitionName` to the DOM element
3. **Browser Detection**: Only applies the name if the browser supports View Transitions API
4. **Cleanup**: Removes the `viewTransitionName` when component unmounts

```typescript
// Internal implementation
const vtName = name ?? `vt-${autoId}`;

useLayoutEffect(() => {
  const el = ref.current;
  if (!el) return;

  if ('startViewTransition' in document) {
    el.style.viewTransitionName = vtName;
    return () => {
      el.style.viewTransitionName = '';
    };
  }
}, [vtName]);
```

### 2. startViewTransition Hook

**Location:** `src/hooks/useViewTransition.ts`

```typescript
export function startViewTransition(runUpdate: () => void): ViewTransitionAPI
```

#### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `runUpdate` | `() => void` | Function that executes the state update |

#### Return Value

Returns an object implementing the `ViewTransitionAPI` interface:

```typescript
interface ViewTransitionAPI {
  ready: Promise<void>;           // Resolves when transition is ready to start
  finished: Promise<void>;        // Resolves when transition completes
  updateCallbackDone: Promise<void>; // Resolves when DOM update completes
  skip: () => void;              // Cancels the transition
}
```

#### How it works

1. **Browser Detection**: Checks if `document.startViewTransition` exists
2. **Native API**: If supported, uses the native View Transitions API
3. **Synchronous Update**: Uses `flushSync` to ensure DOM updates happen immediately
4. **Fallback**: If not supported, executes update without animation

```typescript
// Implementation
if (doc.startViewTransition) {
  return doc.startViewTransition(() => {
    flushSync(() => {
      runUpdate();
    });
  });
}

// Fallback without animation
runUpdate();
return {
  ready: Promise.resolve(),
  finished: Promise.resolve(),
  updateCallbackDone: Promise.resolve(),
  skip: () => {},
};
```

## Usage Examples

### Basic Usage

```typescript
import { ViewTransition18 } from './components/ViewTransition18';
import { startViewTransition } from './hooks/useViewTransition';
import { useState } from 'react';

function SimpleExample() {
  const [show, setShow] = useState(false);

  const toggle = () => {
    startViewTransition(() => {
      setShow(prev => !prev);
    });
  };

  return (
    <div>
      <button onClick={toggle}>
        {show ? 'Hide' : 'Show'}
      </button>
      
      {show && (
        <ViewTransition18 name="panel">
          <div>Animated content</div>
        </ViewTransition18>
      )}
    </div>
  );
}
```

### Shared Element Transition

```typescript
function SharedElementExample() {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item) => {
    startViewTransition(() => {
      setSelectedItem(item);
    });
  };

  return (
    <div>
      {!selectedItem ? (
        <ViewTransition18 name="item-1">
          <div onClick={() => selectItem(1)}>Item 1</div>
        </ViewTransition18>
      ) : (
        <ViewTransition18 name="item-1">
          <div>Detail view of item 1</div>
        </ViewTransition18>
      )}
    </div>
  );
}
```

### List Reordering

```typescript
function ListExample() {
  const [items, setItems] = useState([1, 2, 3, 4]);

  const shuffle = () => {
    startViewTransition(() => {
      setItems(prev => [...prev].sort(() => Math.random() - 0.5));
    });
  };

  return (
    <div>
      <button onClick={shuffle}>Shuffle</button>
      {items.map(item => (
        <ViewTransition18 key={item} name={`item-${item}`}>
          <div>Item {item}</div>
        </ViewTransition18>
      ))}
    </div>
  );
}
```

## Advanced Usage

### Using Transition States

```typescript
function AdvancedExample() {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggle = () => {
    const transition = startViewTransition(() => {
      setShow(prev => !prev);
    });

    setLoading(true);
    
    transition.ready.then(() => {
      console.log('Animation ready');
    });

    transition.finished.then(() => {
      setLoading(false);
      console.log('Animation complete');
    });
  };

  return (
    <div>
      <button onClick={toggle} disabled={loading}>
        {loading ? 'Animating...' : (show ? 'Hide' : 'Show')}
      </button>
      
      {show && (
        <ViewTransition18 name="advanced-panel">
          <div>Advanced content</div>
        </ViewTransition18>
      )}
    </div>
  );
}
```

### Canceling Transitions

```typescript
function CancelExample() {
  const [items, setItems] = useState([1, 2, 3]);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTransition = useRef(null);

  const shuffle = () => {
    // Cancel previous transition
    if (currentTransition.current) {
      currentTransition.current.skip();
    }

    setIsAnimating(true);
    
    const transition = startViewTransition(() => {
      setItems(prev => [...prev].sort(() => Math.random() - 0.5));
    });

    currentTransition.current = transition;

    transition.finished.finally(() => {
      setIsAnimating(false);
      currentTransition.current = null;
    });
  };

  const cancel = () => {
    if (currentTransition.current) {
      currentTransition.current.skip();
      setIsAnimating(false);
    }
  };

  return (
    <div>
      <button onClick={shuffle} disabled={isAnimating}>
        Shuffle
      </button>
      {isAnimating && <button onClick={cancel}>Cancel</button>}
      
      {items.map(item => (
        <ViewTransition18 key={item} name={`item-${item}`}>
          <div>Item {item}</div>
        </ViewTransition18>
      ))}
    </div>
  );
}
```

## CSS Customization

### Global Transitions

```css
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.5s;
  animation-timing-function: ease-in-out;
}
```

### Named Transitions

```css
/* For elements with name="panel" */
::view-transition-old(panel),
::view-transition-new(panel) {
  animation-duration: 0.3s;
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Custom animations */
::view-transition-old(panel) {
  animation: slide-out 0.3s ease-out;
}

::view-transition-new(panel) {
  animation: slide-in 0.3s ease-in;
}

@keyframes slide-out {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
```

## Browser Compatibility

### Supported Browsers
- Chrome 111+
- Edge 111+
- Opera 97+
- Safari (coming soon)
- Firefox (coming soon)

### Fallback Behavior
In unsupported browsers, the component works normally without animations:
- `startViewTransition` executes the update immediately
- All promises resolve instantly
- `skip()` does nothing
- No visual animations occur

## Key Implementation Details

### 1. flushSync Usage
```typescript
flushSync(() => {
  runUpdate();
});
```
Ensures DOM updates happen synchronously within the View Transition callback, allowing the browser to capture the correct before/after states.

### 2. Name Persistence
```typescript
const vtName = name ?? `vt-${autoId}`;
```
Uses stable names based on item IDs rather than array indices to enable smooth reordering animations.

### 3. Browser Detection
```typescript
if ('startViewTransition' in document) {
  // Apply viewTransitionName
}
```
Only applies View Transition names when the browser supports the API.

### 4. Cleanup
```typescript
return () => {
  el.style.viewTransitionName = '';
};
```
Removes View Transition names when components unmount to prevent memory leaks.

## Best Practices

1. **Use stable names**: Base names on item IDs, not array indices
2. **Wrap state updates**: Always wrap state changes in `startViewTransition`
3. **Handle loading states**: Use `ready` and `finished` promises for UI feedback
4. **Clean up**: Let the component handle cleanup automatically
5. **Test fallbacks**: Ensure your app works without animations in unsupported browsers

## Common Patterns

### Modal/Dialog
```typescript
<ViewTransition18 name="modal">
  <div className="modal">
    <div className="modal-content">Content</div>
  </div>
</ViewTransition18>
```

### Card Transitions
```typescript
<ViewTransition18 name={`card-${item.id}`}>
  <div className="card">
    <h3>{item.title}</h3>
    <p>{item.description}</p>
  </div>
</ViewTransition18>
```

