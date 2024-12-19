import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  id,
  name,
  types,
  sprite,
}) => {
  return (
    <div
      className="relative max-w-l w-full p-4 bg-gradient-to-br from-gray-50 to-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-700 transform hover:scale-100
      text-center flex flex-col items-center group border-2 border-transparent bg-origin-border
      before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-transparent before:animate-border before:blur-sm before:opacity-75"
    >
      <div className="absolute top-3 left-3 bg-yellow-400 text-white text-xs uppercase px-3 py-1 rounded-full shadow">
        #{id}
      </div>

      <div className="relative mb-4">
        <img
          src={sprite}
          alt={`${name} sprite`}
          className="w-32 h-32 object-contain transition-transform duration-300 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-white opacity-0 group-hover:opacity-75 
        rounded-full transition-opacity duration-700"
        ></div>
      </div>

      <h2 className="text-lg font-bold text-gray-800 capitalize mb-1 group-hover:text-gray-900 transition-colors">
        {name}
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        {types.map((type) => (
          <span
            key={type}
            className="px-3 py-1 text-xs font-semibold uppercase rounded-full shadow-md"
            style={{
              backgroundColor: getTypeColor(type),
              color: "#fff",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.4)",
            }}
          >
            {type}
          </span>
        ))}
      </div>
    </div>
  );
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    normal: "#A8A77A",
    fire: "#EE8130",
    water: "#6390F0",
    electric: "#F7D02C",
    grass: "#7AC74C",
    ice: "#96D9D6",
    fighting: "#C22E28",
    poison: "#A33EA1",
    ground: "#E2BF65",
    flying: "#A98FF3",
    psychic: "#F95587",
    bug: "#A6B91A",
    rock: "#B6A136",
    ghost: "#735797",
    dragon: "#6F35FC",
    dark: "#705746",
    steel: "#B7B7CE",
    fairy: "#D685AD",
  };
  return colors[type.toLowerCase()] || "#777";
};

export default PokemonCard;
