import React, { useId, useLayoutEffect, useRef } from 'react';

type ViewTransition18Props = {
  /**
   * Name to match elements between states ("shared element").
   * If not provided, we generate a unique one per instance.
   */
  readonly name?: string;
  /** Optional container class */
  readonly className?: string;
  /** Child elements to animate */
  readonly children: React.ReactNode;
};

/**
 * Assigns viewTransitionName to the node so the browser animates it
 * when you wrap the update in startViewTransition(...).
 * 
 * Compatible with React 18 and the native View Transitions API of the browser.
 */
export function ViewTransition18({ name, className, children }: ViewTransition18Props) {
  const ref = useRef<HTMLDivElement>(null);
  const autoId = useId();
  const vtName = name ?? `vt-${autoId}`;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if ('startViewTransition' in document) {
      // @ts-expect-error: CSS Typed OM 
      el.style.viewTransitionName = vtName;
      return () => {
        // @ts-expect-error: CSS Typed OM 
        el.style.viewTransitionName = '';
      };
    }
  }, [vtName]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

