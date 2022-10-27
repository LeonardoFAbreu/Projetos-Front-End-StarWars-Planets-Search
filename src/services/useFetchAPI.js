import { useEffect, useState } from 'react';

function useFetchAPI() {
  const [planetsList, setPlanetsList] = useState([]);
  const [listSource, setListSource] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      try {
        const response = await fetch('https://swapi.dev/api/planets');
        const { results } = await response.json();

        const filterPlanets = results.filter((result) => delete result.residents);
        setPlanetsList(filterPlanets);
        setListSource(filterPlanets);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPlanets();
  }, []);

  return { planetsList, setPlanetsList, listSource };
}

export default useFetchAPI;
