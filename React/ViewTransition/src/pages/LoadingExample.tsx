import { useState } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

export function LoadingExample() {
  const [showPanel, setShowPanel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    const transition = startViewTransition(() => {
      setShowPanel(prev => !prev);
    });

    // Mostrar loading mientras anima
    setIsLoading(true);
    
    transition.ready.then(() => {
      console.log('Animación lista para empezar');
    });

    transition.finished.then(() => {
      setIsLoading(false);
      console.log('Animación completada');
    });
  };

  return (
    <div className="page-container">
      <h1>Loading States Example</h1>
      <p>Ejemplo de control básico con estados de loading</p>
      
      <button onClick={handleClick} className="toggle-button" disabled={isLoading}>
        {isLoading ? '⏳ Animando...' : (showPanel ? '➖ Ocultar Panel' : '➕ Mostrar Panel')}
      </button>

      {isLoading && (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <span>Animando...</span>
        </div>
      )}

      {showPanel ? (
        <ViewTransition18 name="loading-panel" className="panel">
          <div className="panel-content">
            <h2>Panel con Loading</h2>
            <p>Este panel aparece con un indicador de loading durante la animación.</p>
          </div>
        </ViewTransition18>
      ) : null}
    </div>
  );
}
