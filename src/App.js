import React from 'react';
import Home from './components/Home';
import { ThemeProvider } from './styles/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <Home />
      </div>
    </ThemeProvider>
  );
}

export default App;
