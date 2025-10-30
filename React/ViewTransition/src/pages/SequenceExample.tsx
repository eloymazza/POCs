import { useState } from 'react';
import { ViewTransition18 } from '../components/ViewTransition18';
import { startViewTransition } from '../hooks/useViewTransition';
import '../styles/examples.css';

export function SequenceExample() {
  const [step, setStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const steps = [
    { id: 1, title: 'Paso 1', description: 'Inicialización' },
    { id: 2, title: 'Paso 2', description: 'Procesamiento' },
    { id: 3, title: 'Paso 3', description: 'Validación' },
    { id: 4, title: 'Paso 4', description: 'Finalización' },
  ];

  const runSequence = async () => {
    setIsRunning(true);
    
    try {
      for (let i = 0; i < steps.length; i++) {
        console.log(`Iniciando paso ${i + 1}`);
        
        const transition = startViewTransition(() => {
          setStep(i);
        });

        // Esperar a que termine cada animación
        await transition.finished;
        console.log(`Paso ${i + 1} completado`);
        
        // Pausa entre pasos
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      console.log('Secuencia completa');
    } catch (error) {
      console.error('Error en la secuencia:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetSequence = () => {
    setStep(0);
  };

  return (
    <div className="page-container">
      <h1>Animation Sequence Example</h1>
      <p>Ejemplo de secuencia de animaciones encadenadas</p>
      
      <div className="button-group">
        <button 
          onClick={runSequence} 
          className="sequence-button" 
          disabled={isRunning}
        >
          {isRunning ? '⏳ Ejecutando...' : '▶️ Ejecutar Secuencia'}
        </button>
        
        <button onClick={resetSequence} className="reset-button">
          🔄 Reiniciar
        </button>
      </div>

      <div className="sequence-container">
        {steps.map((stepData, index) => (
          <ViewTransition18
            key={stepData.id}
            name={`sequence-step-${stepData.id}`}
            className={`sequence-step ${index === step ? 'active' : ''}`}
          >
            <div className="step-content">
              <div className="step-number">{index + 1}</div>
              <div className="step-info">
                <h3>{stepData.title}</h3>
                <p>{stepData.description}</p>
              </div>
              {index === step && <div className="step-indicator">▶️</div>}
            </div>
          </ViewTransition18>
        ))}
      </div>
    </div>
  );
}
