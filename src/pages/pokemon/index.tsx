import React, { useEffect, useState } from "react";
import { Detail, Pokemon } from "../../interface";
import axios from "axios";
import PokemonCollection from "../../components/PokemonCollection";

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loadMore, setLoadMore] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<Detail>({
    id: 0,
    isOpen: false,
  });
  useEffect(() => {
    const getApiPokemon = async () => {
      setLoading(true);
      const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5&offset=1");
      setLoadMore(res.data.next);
      const data = await res.data;
      data.results.forEach(async (pokemon: Pokemon) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
        setPokemons((p) => [...p, poke.data]);
      });
      setLoading(false);
    };
    getApiPokemon();
  }, []);

  const handleLoadMore = async () => {
    setLoading(true);
    let res = await axios.get(loadMore);
    setLoadMore(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemon) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      setPokemons((p) => [...p, poke.data]);
    });
    setLoading(false);
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} detail={detail} setDetail={setDetail} />
        {!detail.isOpen && (
          <button onClick={() => handleLoadMore()} className="button">
            {loading ? <div className="loader"></div> : "Load more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default PokemonPage;
