import '../styles/examples.css';

export function About() {
  return (
    <div className="page-container">
      <h1>Acerca de ViewTransition18</h1>
      <div className="about-content">
        <section>
          <h2>¿Qué es?</h2>
          <p>
            ViewTransition18 es un componente wrapper compatible con React 18 que implementa
            funcionalidad similar al componente <code>&lt;ViewTransition&gt;</code> de React 19 (Canary).
          </p>
        </section>

        <section>
          <h2>Características</h2>
          <ul>
            <li>✅ Compatible con React 18</li>
            <li>✅ Usa la API nativa de View Transitions del navegador</li>
            <li>✅ Fallback automático en navegadores sin soporte</li>
            <li>✅ Soporte para shared element transitions</li>
            <li>✅ Anima entradas, salidas y actualizaciones</li>
          </ul>
        </section>

        <section>
          <h2>Uso Básico</h2>
          <pre className="code-block">
{`import { ViewTransition18 } from './components/ViewTransition18';
import { startViewTransition } from './hooks/useViewTransition';

function MyComponent() {
  const [show, setShow] = useState(false);
  
  const toggle = () => {
    startViewTransition(() => {
      setShow(prev => !prev);
    });
  };
  
  return (
    <>
      <button onClick={toggle}>Toggle</button>
      {show && (
        <ViewTransition18 name="panel">
          <div>Contenido animado</div>
        </ViewTransition18>
      )}
    </>
  );
}`}
          </pre>
        </section>

        <section>
          <h2>Compatibilidad</h2>
          <p>
            Requiere un navegador que soporte la API de View Transitions:
          </p>
          <ul>
            <li>Chrome 111+</li>
            <li>Edge 111+</li>
            <li>Opera 97+</li>
            <li>Safari (próximamente)</li>
            <li>Firefox (próximamente)</li>
          </ul>
          <p>
            En navegadores sin soporte, el componente funciona normalmente sin animaciones.
          </p>
        </section>
      </div>
    </div>
  );
}

