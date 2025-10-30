import { useState, useRef } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

export function CancelExample() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [isAnimating, setIsAnimating] = useState(false);
  const currentTransitionRef = useRef<any>(null);

  const shuffleItems = () => {
    // Cancelar animación anterior si existe
    if (currentTransitionRef.current) {
      currentTransitionRef.current.skip();
      console.log('Animación anterior cancelada');
    }

    setIsAnimating(true);

    const transition = startViewTransition(() => {
      setItems(prev => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    });

    currentTransitionRef.current = transition;

    transition.finished.finally(() => {
      setIsAnimating(false);
      currentTransitionRef.current = null;
    });
  };

  const cancelAnimation = () => {
    if (currentTransitionRef.current) {
      currentTransitionRef.current.skip();
      setIsAnimating(false);
      currentTransitionRef.current = null;
    }
  };

  return (
    <div className="page-container">
      <h1>Cancel Animation Example</h1>
      <p>Ejemplo de cancelación de animaciones en progreso</p>
      
      <div className="button-group">
        <button onClick={shuffleItems} className="shuffle-button" disabled={isAnimating}>
          {isAnimating ? '⏳ Mezclando...' : '🔀 Mezclar elementos'}
        </button>
        
        {isAnimating && (
          <button onClick={cancelAnimation} className="cancel-button">
            ❌ Cancelar animación
          </button>
        )}
      </div>

      <div className="list-container">
        {items.map((item, index) => (
          <ViewTransition18
            key={item}
            name={`cancel-item-${item}`}
            className="list-item"
          >
            <div className="list-item-content">
              <span className="list-item-number">{index + 1}</span>
              <span className="list-item-text">Item {item}</span>
            </div>
          </ViewTransition18>
        ))}
      </div>
    </div>
  );
}
