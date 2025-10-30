# ViewTransition18 - Flow Diagram

## How ViewTransition18 Works

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interaction                        │
│                    (Button Click, etc.)                        │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    startViewTransition()                       │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Check browser support:                              │   │
│  │    'startViewTransition' in document                   │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Browser Support?                            │
│  ┌─────────────────┐              ┌─────────────────────────┐  │
│  │       YES       │              │          NO             │  │
│  │                 │              │                         │  │
│  │ 2. Capture      │              │ 2. Execute update       │  │
│  │    snapshot     │              │    immediately          │  │
│  │                 │              │                         │  │
│  │ 3. Execute      │              │ 3. Return mock          │  │
│  │    callback     │              │    promises             │  │
│  └─────────────────┘              └─────────────────────────┘  │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    flushSync()                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Force synchronous DOM update                        │   │
│  │ 2. setState() executes immediately                     │   │
│  │ 3. React re-renders components                         │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ViewTransition18                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. useLayoutEffect runs                                │   │
│  │ 2. Assign viewTransitionName to DOM element            │   │
│  │ 3. Browser detects name change                         │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Browser Animation                           │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Compare old vs new DOM state                        │   │
│  │ 2. Find elements with same viewTransitionName          │   │
│  │ 3. Animate between positions/sizes                     │   │
│  │ 4. Apply CSS transitions                               │   │
│  └─────────────────────┬───────────────────────────────────┘   │
└─────────────────────┬───────────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Promise Resolution                          │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. ready: Animation is ready to start                  │   │
│  │ 2. updateCallbackDone: DOM update complete             │   │
│  │ 3. finished: Animation complete                        │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Lifecycle

```
┌─────────────────────────────────────────────────────────────────┐
│                    ViewTransition18 Mount                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Generate unique name (if not provided)              │   │
│  │ 2. useLayoutEffect runs                                │   │
│  │ 3. Check browser support                               │   │
│  │ 4. Assign viewTransitionName to DOM                    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    State Update                                │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. startViewTransition() called                        │   │
│  │ 2. Browser captures snapshot                           │   │
│  │ 3. flushSync() forces immediate update                 │   │
│  │ 4. Component re-renders with new state                 │   │
│  │ 5. viewTransitionName persists on element              │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Animation                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. Browser compares old vs new DOM                     │   │
│  │ 2. Finds elements with matching names                  │   │
│  │ 3. Calculates position/size changes                    │   │
│  │ 4. Applies smooth transition                           │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    ViewTransition18 Unmount                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ 1. useLayoutEffect cleanup runs                        │   │
│  │ 2. Remove viewTransitionName from DOM                  │   │
│  │ 3. Prevent memory leaks                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Key Implementation Points

### 1. Name Persistence
```
Element with name="item-1" in position A
         ↓ (state change)
Element with name="item-1" in position B
         ↓ (browser detects)
Smooth animation from A to B
```

### 2. Browser Fallback
```
Unsupported Browser:
startViewTransition() → Execute update → Return mock promises

Supported Browser:
startViewTransition() → Capture snapshot → Execute update → Animate
```

### 3. React Integration
```
React State Change → flushSync() → DOM Update → Browser Animation
```

## CSS Integration

```
::view-transition-old(name) → Old element snapshot
::view-transition-new(name) → New element snapshot
         ↓
Browser applies transition between snapshots
```

This flow ensures smooth, performant animations while maintaining compatibility with React 18 and providing fallbacks for unsupported browsers.
