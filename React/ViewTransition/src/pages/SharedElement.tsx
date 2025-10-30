import { useState } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

interface Item {
  id: number;
  title: string;
  description: string;
}

const items: Item[] = [
  { id: 1, title: 'Card 1', description: 'Descripción del primer elemento' },
  { id: 2, title: 'Card 2', description: 'Descripción del segundo elemento' },
  { id: 3, title: 'Card 3', description: 'Descripción del tercer elemento' },
];

export function SharedElement() {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const selectItem = (item: Item) => {
    startViewTransition(() => {
      setSelectedItem(item);
    });
  };

  const closeDetail = () => {
    startViewTransition(() => {
      setSelectedItem(null);
    });
  };

  return (
    <div className="page-container">
      <h1>Shared Element Transition</h1>
      <p>Transiciones compartidas entre lista y detalle</p>

      {selectedItem ? (
        <div className="detail-container">
          <ViewTransition18 name={`item-${selectedItem.id}`} className="detail-card">
            <button onClick={closeDetail} className="close-button">
              ✕
            </button>
            <h2>{selectedItem.title}</h2>
            <p>{selectedItem.description}</p>
            <p>Detalles adicionales del elemento {selectedItem.id}</p>
          </ViewTransition18>
        </div>
      ) : (
        <div className="grid">
          {items.map((item) => (
            <ViewTransition18
              key={item.id}
              name={`item-${item.id}`}
              className="card"
            >
              <div onClick={() => selectItem(item)} style={{ cursor: 'pointer' }}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <button 
                  className="card-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectItem(item);
                  }}
                >
                  Ver detalles
                </button>
              </div>
            </ViewTransition18>
          ))}
        </div>
      )}
    </div>
  );
}

