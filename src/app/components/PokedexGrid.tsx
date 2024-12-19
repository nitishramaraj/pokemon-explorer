"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import SkeletonCard from "./SkeletonCard";
import PokemonCard from "./PokemonCard";
import PokemonTypeFilter from "./PokemonTypeFilter";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

type SortBy = "id" | "name" | "type";

interface PokemonType {
  type: {
    name: string;
  };
}

const PokedexGrid = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortBy, setSortBy] = useState<"name" | "id" | "type">("id");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const skeletonCount = 10;

  const availableTypes = Array.from(
    new Set(pokemonList.flatMap((pokemon) => pokemon.types))
  );

  const fetchPokemon = async (pageNumber: number) => {
    setLoading(true);
    try {
      const limit = 10;
      const offset = (pageNumber - 1) * limit;

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const data = response.data;

      const pokemonData = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const detailsResponse = await axios.get(pokemon.url);
          const details = detailsResponse.data;
          return {
            id: details.id,
            name: details.name,
            types: details.types.map((t: PokemonType) => t.type.name),
            sprite: details.sprites.front_default,
          };
        })
      );

      setPokemonList((prev) => [...prev, ...pokemonData]);
    } catch (error) {
      console.error("Error fetching Pokémon:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPokemon(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight - 75 && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading]);

  const filteredPokemon = pokemonList
    .filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedTypes.length === 0 ||
          pokemon.types.some((type) => selectedTypes.includes(type)))
    )
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "id") return a.id - b.id;
      return a.types[0].localeCompare(b.types[0]);
    });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md text-black"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="border p-2 rounded-md text-black"
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
          <option value="type">Sort by Type</option>
        </select>
        <button
          onClick={() => setViewType(viewType === "grid" ? "list" : "grid")}
          className="p-2 rounded-md bg-blue-500 text-white"
        >
          {viewType === "grid" ? "Switch to List View" : "Switch to Grid View"}
        </button>
      </div>

      <PokemonTypeFilter
        availableTypes={availableTypes}
        selectedTypes={selectedTypes}
        onTypeSelect={setSelectedTypes}
      />

      <div
        className={`grid ${
          viewType === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            : "flex flex-col items-center space-y-4"
        }`}
      >
        {filteredPokemon.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            types={pokemon.types}
            sprite={pokemon.sprite}
          />
        ))}

        {loading &&
          Array.from({ length: skeletonCount }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
      </div>
    </div>
  );
};

export default PokedexGrid;
