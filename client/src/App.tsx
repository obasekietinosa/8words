import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Game } from './pages/Game';
import { NotFound } from './components/NotFound';
import { ErrorBoundary } from './components/ErrorBoundary';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/play/:id" element={<Game />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
