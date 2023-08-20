import React, { useEffect, useState, useContext } from "react";
import PokemonCard from "./PokemonCard";
import usePokeType from "../Hooks/usePokeType";
import SearchContext from "../Context/SearchContext";
import GeneracionContext from "../Context/GeneracionContext";
import { generacionData } from "../generacionData";


const PokemonCardComponent = ({
  id,
  name,
  urlImg,
  typeIndex,
  types,
  statM,
  statKg,
}) => (
  <PokemonCard
    key={id}
    id={id}
    name={name}
    urlImg={urlImg}
    typeIndex={typeIndex}
    type={types}
    statM={statM}
    statKg={statKg}
  />
);

function Main() {
  const { type } = usePokeType();
  const { valueSearch, setValueSearch } = useContext(SearchContext);
  const [pokemonsData, setPokemonData] = useState([]);
  const {generacion, setGeneracion} = useContext(GeneracionContext)

  async function fetchPokemonData(id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const dataResult = await response.json();
    return dataResult;
  }

  async function fetchAllPokemonData() {
    const fetchedPokemons = [];

    for (let i = generacionData[generacion].inicio; i <= generacionData[generacion].fin; i++) {
      const dataResult = await fetchPokemonData(i);
      fetchedPokemons.push(dataResult);
    }

    setPokemonData(fetchedPokemons);
  }

  useEffect(() => {
    fetchAllPokemonData();
  }, [generacion]);

  function renderPokemons(filteredPokemons) {
    return filteredPokemons.map((pokemon, key) => (
      <PokemonCardComponent
        key={key}
        {...pokemon}
        urlImg={pokemon.sprites.other["official-artwork"].front_default}
        typeIndex={pokemon.types.length}
        statM={pokemon.stats[0].base_stat}
        statKg={pokemon.weight}
      />
    ));
  }

  let displayedPokemons = [];

  if (valueSearch !== "") {
    const filteredPokemons = pokemonsData.filter((pokemon) =>
      pokemon.name.includes(valueSearch)
    );
    displayedPokemons = renderPokemons(filteredPokemons);
  } else if (type === "ver-todos") {
    displayedPokemons = renderPokemons(pokemonsData);
  } else {
    const filteredPokemons = pokemonsData.filter((pokemon) =>
      pokemon.types.some((pokemonType) => pokemonType.type.name.includes(type))
    );
    displayedPokemons = renderPokemons(filteredPokemons);
  }

  return (
    <main>
      <div className="todos">
        <div className="pokemon-todos" id="listaPokemon">
          {displayedPokemons}
        </div>
      </div>
    </main>
  );
}

export default Main;