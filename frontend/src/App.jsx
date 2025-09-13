import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Terminal from './pages/Terminal';
import Projects from './pages/Projects';
import Playground from './pages/Playground';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/terminal" element={<Terminal />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </Router>
  );
}

export default App;