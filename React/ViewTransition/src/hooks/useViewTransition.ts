import { flushSync } from 'react-dom';

interface ViewTransitionAPI {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
  skip: () => void;
}

interface DocumentWithViewTransition extends Document {
  startViewTransition?: (cb: () => void) => ViewTransitionAPI;
}

/**
 * Executes a state update within document.startViewTransition (if available).
 * Returns an object compatible with the Web API to access .finished/.ready/.skip.
 * 
 * @param runUpdate - Function that executes the state update
 * @returns Object with promises and transition control methods
 */
export function startViewTransition(runUpdate: () => void): ViewTransitionAPI {
  const doc = document as DocumentWithViewTransition;

  if (doc.startViewTransition) {
    // Ensures that the snapshot and update occur in the correct "frame"
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
}

