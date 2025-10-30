# Simple Example - ViewTransition18

## Minimal Working Example

Here's the simplest possible implementation of ViewTransition18:

### 1. Basic Component

```typescript
import { useState } from 'react';
import { ViewTransition18 } from './components/ViewTransition18';
import { startViewTransition } from './hooks/useViewTransition';

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
        <ViewTransition18 name="simple-panel">
          <div style={{ padding: '20px', background: '#f0f0f0', margin: '10px 0' }}>
            <h3>Hello World!</h3>
            <p>This panel appears and disappears with a smooth animation.</p>
          </div>
        </ViewTransition18>
      )}
    </div>
  );
}

export default SimpleExample;
```

### 2. What happens step by step:

1. **User clicks button** → `toggle()` function is called
2. **`startViewTransition()` is called** → Browser captures current state
3. **`setShow(prev => !prev)` executes** → React updates state
4. **`flushSync()` ensures immediate DOM update** → New state is applied
5. **Browser animates the change** → Smooth transition between states
6. **`ViewTransition18` with `name="simple-panel"`** → Element gets animated

### 3. Key Points:

- **Always wrap state updates** in `startViewTransition()`
- **Use meaningful names** for the `name` prop
- **The component handles everything else** automatically
- **Works in all browsers** (with or without animations)

### 4. CSS (Optional)

Add this to your CSS for custom animations:

```css
/* Custom animation for the simple-panel */
::view-transition-old(simple-panel),
::view-transition-new(simple-panel) {
  animation-duration: 0.4s;
  animation-timing-function: ease-in-out;
}

/* Fade effect */
::view-transition-old(simple-panel) {
  animation: fade-out 0.4s ease-out;
}

::view-transition-new(simple-panel) {
  animation: fade-in 0.4s ease-in;
}

@keyframes fade-out {
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
}

@keyframes fade-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
```

### 5. Complete File Structure

```
src/
├── components/
│   └── ViewTransition18.tsx    # The wrapper component
├── hooks/
│   └── useViewTransition.ts    # The transition hook
└── SimpleExample.tsx           # Your component
```

### 6. That's it!

This is the minimal implementation. The ViewTransition18 component and startViewTransition hook handle all the complex View Transitions API integration for you.

**No complex setup, no configuration needed** - just wrap your state updates and your elements, and you get smooth animations!
