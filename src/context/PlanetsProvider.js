/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';
import useFetchAPI from '../services/useFetchAPI';

function PlanetsProvider({ children }) {
  const { planetsList, setPlanetsList, getPlanets } = useFetchAPI();

  const [filterPlanetsByName, setFilterPlanetsByName] = useState('');

  const [filterColumn, setFilterColumn] = useState('population');

  const [filterComparison, setFilterComparison] = useState('maior que');

  const [filterValue, setFilterValue] = useState(0);

  const [filterByNumericValues, setFilterByNumericValues] = useState([]);

  const allFilters = () => {
    setFilterByNumericValues(
      filterByNumericValues.concat({
        column,
        comparison,
        value: filterValue,
      }),
    );
  };

  const filteredPlanets = filterPlanetsByName.length > 0 ? planetsList
    .filter((planet) => planet.name.includes(filterPlanetsByName)) : planetsList;

  const handleNamePlanets = ({ target: { value } }) => {
    setFilterPlanetsByName(value);
  };

  const handleColumn = ({ target: { value } }) => {
    setFilterColumn(value);
  };

  const handleComparison = ({ target: { value } }) => {
    setFilterComparison(value);
  };

  const handleValue = ({ target: { value } }) => {
    setFilterValue(value);
  };

  const context = {
    planetsList,
    getPlanets,
    setPlanetsList,
    filterPlanetsByName,
    setFilterPlanetsByName,
    filteredPlanets,
    handleNamePlanets,
    allFilters,
    filterColumn,
    handleColumn,
    filterComparison,
    handleComparison,
    filterValue,
    handleValue,
    filterByNumericValues,
    setFilterByNumericValues,
  };

  return (
    <MyContext.Provider value={ context }>
      { children }
    </MyContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
