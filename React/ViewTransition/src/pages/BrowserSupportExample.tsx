import { useState, useEffect } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

export function BrowserSupportExample() {
  const [showPanel, setShowPanel] = useState(false);
  const [browserSupport, setBrowserSupport] = useState<'checking' | 'supported' | 'not-supported'>('checking');

  useEffect(() => {
    // Verificar soporte del navegador
    const hasSupport = 'startViewTransition' in document;
    setBrowserSupport(hasSupport ? 'supported' : 'not-supported');
  }, []);

  const handleClick = () => {
    const transition = startViewTransition(() => {
      setShowPanel(prev => !prev);
    });

    // Detectar si el navegador soporta View Transitions
    const isSupported = transition.ready !== Promise.resolve();
    
    if (isSupported) {
      console.log('✅ Navegador compatible - Con animaciones');
      
      transition.ready.then(() => {
        console.log('🎬 Animación iniciada');
      });
      
      transition.finished.then(() => {
        console.log('✨ Animación completada');
      });
    } else {
      console.log('❌ Navegador no compatible - Sin animaciones');
    }
  };

  const getSupportMessage = () => {
    switch (browserSupport) {
      case 'checking':
        return '🔍 Verificando compatibilidad...';
      case 'supported':
        return '✅ Tu navegador soporta View Transitions';
      case 'not-supported':
        return '❌ Tu navegador no soporta View Transitions';
      default:
        return '';
    }
  };

  const getSupportIcon = () => {
    switch (browserSupport) {
      case 'checking':
        return '⏳';
      case 'supported':
        return '🎬';
      case 'not-supported':
        return '📱';
      default:
        return '';
    }
  };

  return (
    <div className="page-container">
      <h1>Browser Support Example</h1>
      <p>Ejemplo de detección de soporte del navegador</p>
      
      <div className="support-info">
        <div className={`support-badge ${browserSupport}`}>
          {getSupportIcon()} {getSupportMessage()}
        </div>
      </div>

      <button onClick={handleClick} className="toggle-button">
        {showPanel ? '➖ Ocultar Panel' : '➕ Mostrar Panel'}
      </button>

      {showPanel ? (
        <ViewTransition18 name="support-panel" className="panel">
          <div className="panel-content">
            <h2>Panel de Prueba</h2>
            <p>
              {browserSupport === 'supported' 
                ? 'Este panel debería animarse suavemente.' 
                : 'Este panel aparecerá sin animación (navegador no compatible).'
              }
            </p>
            <div className="browser-info">
              <p><strong>User Agent:</strong> {navigator.userAgent}</p>
              <p><strong>Soporte:</strong> {browserSupport === 'supported' ? 'Sí' : 'No'}</p>
            </div>
          </div>
        </ViewTransition18>
      ) : null}
    </div>
  );
}
