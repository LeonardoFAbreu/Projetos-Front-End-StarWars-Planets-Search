import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const {
    filterPlanetsByName,
    handlePlanetsByName,
    listSource,
    setPlanetsList,
    filterColumn,
    filterByNumericValue,
    setFilterByNumericValue,
    setFilterColumn,
    allFilters,
    setAllFilters,
    handleAllFilters,
  } = useContext(MyContext);

  const eraseFilters = ({ target: { id } }) => {
    setAllFilters(allFilters.filter((option) => option.column !== id));
    setFilterColumn([...filterColumn, id]);
  };

  const eraseAllFilters = () => {
    setAllFilters([]);
    setFilterColumn([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
  };

  useEffect(() => {
    if (!allFilters.length) return setPlanetsList(listSource);
    let filtered = listSource;
    allFilters.forEach((filter) => {
      const { column, comparison, numericValue } = filter;
      if (comparison === 'maior que') {
        filtered = filtered
          .filter((item) => Number(item[column]) > Number(numericValue));
      } if (comparison === 'menor que') {
        filtered = filtered
          .filter((item) => Number(item[column]) < Number(numericValue));
      } if (comparison === 'igual a') {
        filtered = filtered
          .filter((item) => Number(item[column]) === Number(numericValue));
      }
      setPlanetsList(filtered);
    });
  }, [allFilters, listSource, setPlanetsList]);

  const showFilters = () => {
    setAllFilters([...allFilters, filterByNumericValue]);
    setFilterColumn(filterColumn
      .filter((columns) => columns !== filterByNumericValue.column));
    setFilterByNumericValue({
      column: filterColumn[0],
      comparison: 'maior que',
      numericValue: '0',
    });
  };

  // const allFilters = (planets, column, comparison, values) => {
  //   switch (comparison) {
  //   case 'maior que':
  //     return planets.filter((planet) => Number(planet[column]) > Number(values));
  //   case 'menor que':
  //     return planets.filter((planet) => Number(planet[column]) < Number(values));
  //   case 'igual a':
  //     return planets.filter((planet) => Number(planet[column]) === Number(values));
  //   default:
  //     return planets;
  //   }
  // };

  // const handleAllFilters = () => {
  //   let arrayPlanets = [];
  //   arrayPlanets = allFilters(
  //     setPlanetsList,
  //     filterColumn,
  //     filterComparison,
  //     filterValue,
  //   );
  //   setPlanetsList(arrayPlanets);
  // };

  return (
    <main>

      <h1>Star Wars Planets Search</h1>

      <div className="name-filter">
        <input
          data-testid="name-filter"
          id="fame-filter"
          name="name"
          placeholder="Planet name"
          type="text"
          onChange={ handlePlanetsByName }
          value={ filterPlanetsByName }
        />
      </div>

      <header>
        <div className="column-filter">
          Selecione a coluna
          <select
            data-testid="column-filter"
            id="column-filter"
            name="column"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.column }
          >
            {filterColumn.map((columns) => (
              <option value={ columns } key={ columns }>
                {columns}
              </option>
            ))}
          </select>
        </div>

        <div className="comparison-filter">
          Selecione o operador
          <select
            data-testid="comparison-filter"
            id="comparison-filter"
            name="comparison"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.comparison }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </div>

        <div>
          <input
            data-testid="value-filter"
            id="value-filter"
            name="numericValue"
            type="text"
            onChange={ handleAllFilters }
            value={ filterByNumericValue.numericValue }
          />
        </div>

        <div>
          <button
            className="filter"
            data-testid="button-filter"
            id="button-filter"
            onClick={ showFilters }
            type="submit"
          >
            Filtrar
          </button>
        </div>

        {allFilters.length > 0 && allFilters
          .map(({ column, comparison, numericValue }) => (
            <div
              data-testid="filter"
              key={ column }
            >
              <span>{ `${column} ${comparison} ${numericValue}` }</span>
              <button
                type="button"
                id={ column }
                onClick={ eraseFilters }
              >
                X
              </button>
            </div>
          ))}
        <button
          type="button"
          data-testid="button-remove-filters"
          id="button-remove-filters"
          onClick={ eraseAllFilters }
        >
          Remover todos os filtros
        </button>
      </header>
    </main>
  );
}

export default Filters;
