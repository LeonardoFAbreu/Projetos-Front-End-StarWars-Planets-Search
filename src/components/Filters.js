import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    filterNamePlanets,
    handleNamePlanets,
    handleValue,
    handleComparison,
    handleColumn,
    planetsList,
    setPlanetsList,
    filterColumn,
    filterComparison,
    filterValue,
  } = useContext(MyContext);

  const columns = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const allFilters = (planets, column, comparison, values) => {
    switch (comparison) {
    case 'maior que':
      return planets.filter((planet) => Number(planet[column]) > Number(values));
    case 'menor que':
      return planets.filter((planet) => Number(planet[column]) < Number(values));
    case 'igual a':
      return planets.filter((planet) => Number(planet[column]) === Number(values));
    default:
      return planets;
    }
  };

  const handleAllFilters = () => {
    let arrayPlanets = [];
    arrayPlanets = allFilters(
      planetsList,
      filterColumn,
      filterComparison,
      filterValue,
    );
    setPlanetsList(arrayPlanets);
  };

  return (
    <main>

      <h1>Star Wars Planets Search</h1>

      <input
        data-testid="name-filter"
        id="filterPlanets"
        name="filterPlanets"
        onChange={ handleNamePlanets }
        placeholder="Planet name"
        type="text"
        value={ filterNamePlanets }
      />

      <header>
        <div className="column-filter">
          Selecione a coluna
          <select
            data-testid="column-filter"
            onChange={ handleColumn }
            value={ filterColumn }
          >
            {columns.map((column) => (
              <option value={ column } key={ column }>
                {column}
              </option>
            ))}
          </select>
        </div>

        <div className="comparison-filter">
          Selecione o operador
          <select
            data-testid="comparison-filter"
            value={ filterComparison }
            onChange={ handleComparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>

        <div>
          <input
            data-testid="value-filter"
            name="value-filter"
            type="text"
            value={ filterValue }
            onChange={ handleValue }
          />
        </div>

        <div>
          <button
            className="filter"
            data-testid="button-filter"
            onClick={ handleAllFilters }
            type="submit"
          >
            Filtrar
          </button>
        </div>
      </header>
    </main>
  );
}

export default Filters;
