import React from 'react';
import './App.css';
import PlanetsProvider from './context/PlanetsProvider';
import TablePlanets from './components/TablePlanets';
import Filters from './components/Filters';

function App() {
  return (
    <PlanetsProvider>
      <main className="App">
        <Filters />
        <TablePlanets />
      </main>
    </PlanetsProvider>
  );
}

export default App;
