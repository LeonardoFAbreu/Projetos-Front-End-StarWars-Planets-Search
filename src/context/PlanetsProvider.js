import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetchAPI from '../services/useFetchAPI';

function PlanetsProvider({ children }) {
  const { planetsList, setPlanetsList, getPlanets, listSource } = useFetchAPI();

  const [filterPlanetsByName, setFilterPlanetsByName] = useState([]);

  const [filterColumn, setFilterColumn] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const [filterComparison, setFilterComparison] = useState('maior que');

  const [values, setValues] = useState(0);

  const [filterByNumericValue, setFilterByNumericValue] = useState({
    column: filterColumn[0],
    comparison: 'maior que',
    numericValue: 0,
  });

  // const allFilters = () => {
  //   setFilterByNumericValues(
  //     filterByNumericValues.concat({
  //       column,
  //       comparison,
  //       value: filterValue,
  //     }),
  //   );
  // };

  const [allFilters, setAllFilters] = useState([]);

  const filteredPlanets = filterPlanetsByName.length > 0 ? planetsList
    .filter((planet) => planet.name.includes(filterPlanetsByName)) : planetsList;

  const handlePlanetsByName = useMemo(
    () => (
      { target: { value } },
    ) => setFilterPlanetsByName(value),
    [],
  );

  const handleAllFilters = useMemo(
    () => (
      { target: { name, value } },
    ) => setFilterByNumericValue(
      { ...filterByNumericValue, [name]: value },
    ),
    [filterByNumericValue],
  );

  const memoItems = useMemo(() => ({
    planetsList,
    getPlanets,
    setPlanetsList,
    filterPlanetsByName,
    setFilterPlanetsByName,
    filteredPlanets,
    handlePlanetsByName,
    allFilters,
    setAllFilters,
    filterColumn,
    setFilterColumn,
    filterComparison,
    setFilterComparison,
    values,
    setValues,
    filterByNumericValue,
    setFilterByNumericValue,
    handleAllFilters,
    listSource,
  }
  ), [
    planetsList,
    getPlanets,
    setPlanetsList,
    filterPlanetsByName,
    setFilterPlanetsByName,
    filteredPlanets,
    handlePlanetsByName,
    allFilters,
    setAllFilters,
    filterColumn,
    setFilterColumn,
    filterComparison,
    setFilterComparison,
    values,
    setValues,
    filterByNumericValue,
    setFilterByNumericValue,
    handleAllFilters,
    listSource,
  ]);

  return (
    <MyContext.Provider value={ memoItems }>
      { children }
    </MyContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Refeito

export default PlanetsProvider;
