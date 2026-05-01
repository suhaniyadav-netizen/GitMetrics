import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-primary text-accent font-sans">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;