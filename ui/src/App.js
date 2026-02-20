import React, { useState } from 'react';
import './App.css';
import WorkflowUI from './components/WorkflowUI';

function App() {
  return (
    <div className="App">
      {/* Matrix rain background effect */}
      <div className="matrix-bg">
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
        <div className="matrix-column"></div>
      </div>
      
      <header className="App-header">
        <h1>Playwright AI Framework</h1>
        <p>From requirements to results — intelligently automated.</p>
      </header>
      <main className="App-main">
        <WorkflowUI />
      </main>
      <footer className="App-footer">
        <p>© 2026 Ascendion | Powered by QE Studio, Jira, TestRail & Playwright</p>
      </footer>
    </div>
  );
}

export default App;
