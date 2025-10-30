import { useState } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

interface ListItem {
  id: number;
  text: string;
}

export function ListReorder() {
  const [items, setItems] = useState<ListItem[]>([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' },
    { id: 3, text: 'Item 3' },
    { id: 4, text: 'Item 4' },
  ]);

  const moveUp = (index: number) => {
    if (index === 0) return;
    startViewTransition(() => {
      setItems((prev) => {
        const newItems = [...prev];
        [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
        return newItems;
      });
    });
  };

  const moveDown = (index: number) => {
    if (index === items.length - 1) return;
    startViewTransition(() => {
      setItems((prev) => {
        const newItems = [...prev];
        [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
        return newItems;
      });
    });
  };

  const shuffle = () => {
    startViewTransition(() => {
      setItems((prev) => {
        const shuffled = [...prev];
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
      });
    });
  };

  return (
    <div className="page-container">
      <h1>Reorder Animation</h1>
      <p>Anima el reordenamiento de elementos en una lista</p>

      <button onClick={shuffle} className="shuffle-button">
        🔀 Mezclar elementos
      </button>

      <div className="list-container">
        {items.map((item, index) => (
          <ViewTransition18
            key={item.id}
            name={`list-item-${item.id}`}
            className="list-item"
          >
            <div className="list-item-content">
              <span className="list-item-number">{index + 1}</span>
              <span className="list-item-text">{item.text}</span>
            </div>
            <div className="list-item-actions">
              <button
                onClick={() => moveUp(index)}
                disabled={index === 0}
                className="list-button"
              >
                ↑
              </button>
              <button
                onClick={() => moveDown(index)}
                disabled={index === items.length - 1}
                className="list-button"
              >
                ↓
              </button>
            </div>
          </ViewTransition18>
        ))}
      </div>
    </div>
  );
}

