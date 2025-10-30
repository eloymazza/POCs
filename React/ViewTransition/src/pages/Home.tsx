import { useState } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

export function Home() {
  const [showPanel, setShowPanel] = useState(false);

  const togglePanel = () => {
    startViewTransition(() => {
      setShowPanel((prev) => !prev);
    });
  };

  return (
    <div className="page-container">
      <h1>ViewTransition18 - Ejemplo Básico</h1>
      <p>Ejemplo de entrada/salida de elementos con View Transitions</p>
      
      <button onClick={togglePanel} className="toggle-button">
        {showPanel ? '➖ Ocultar Panel' : '➕ Mostrar Panel'}
      </button>

      {showPanel ? (
        <ViewTransition18 name="panel" className="panel">
          <div className="panel-content">
            <h2>Panel Animado</h2>
            <p>Este panel aparece y desaparece con una animación suave usando View Transitions.</p>
          </div>
        </ViewTransition18>
      ) : null}
    </div>
  );
}

