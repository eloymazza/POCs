import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { SharedElement } from './pages/SharedElement';
import { ListReorder } from './pages/ListReorder';
import { About } from './pages/About';
import { LoadingExample } from './pages/LoadingExample';
import { CancelExample } from './pages/CancelExample';
import { SequenceExample } from './pages/SequenceExample';
import { BrowserSupportExample } from './pages/BrowserSupportExample';
import { startViewTransition } from './hooks/useViewTransition';
import './App.css';

function Navigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault();
    startViewTransition(() => {
      navigate(path);
    });
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ViewTransition18
        </Link>
        <div className="nav-links">
          <a 
            href="/"
            onClick={(e) => handleNavClick('/', e)}
            className={location.pathname === '/' ? 'active' : ''}
          >
            Home
          </a>
          <a 
            href="/shared"
            onClick={(e) => handleNavClick('/shared', e)}
            className={location.pathname === '/shared' ? 'active' : ''}
          >
            Shared Element
          </a>
          <a 
            href="/reorder"
            onClick={(e) => handleNavClick('/reorder', e)}
            className={location.pathname === '/reorder' ? 'active' : ''}
          >
            List Reorder
          </a>
          <a 
            href="/loading"
            onClick={(e) => handleNavClick('/loading', e)}
            className={location.pathname === '/loading' ? 'active' : ''}
          >
            Loading
          </a>
          <a 
            href="/cancel"
            onClick={(e) => handleNavClick('/cancel', e)}
            className={location.pathname === '/cancel' ? 'active' : ''}
          >
            Cancel
          </a>
          <a 
            href="/sequence"
            onClick={(e) => handleNavClick('/sequence', e)}
            className={location.pathname === '/sequence' ? 'active' : ''}
          >
            Sequence
          </a>
          <a 
            href="/browser-support"
            onClick={(e) => handleNavClick('/browser-support', e)}
            className={location.pathname === '/browser-support' ? 'active' : ''}
          >
            Browser Support
          </a>
          <a 
            href="/about"
            onClick={(e) => handleNavClick('/about', e)}
            className={location.pathname === '/about' ? 'active' : ''}
          >
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shared" element={<SharedElement />} />
            <Route path="/reorder" element={<ListReorder />} />
            <Route path="/loading" element={<LoadingExample />} />
            <Route path="/cancel" element={<CancelExample />} />
            <Route path="/sequence" element={<SequenceExample />} />
            <Route path="/browser-support" element={<BrowserSupportExample />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
