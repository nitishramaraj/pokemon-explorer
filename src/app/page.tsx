"use client";

import { useState, useEffect, useRef } from "react";
import PokedexGrid from "./components/PokedexGrid";

export default function Home() {
  const [currentFact, setCurrentFact] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const pokemonFacts = [
    "Pikachu is an Electric-type Pokémon.",
    "Charizard is weak to Water and Electric types.",
    "Bulbasaur evolves into Ivysaur at level 16.",
    "There are currently 1010 Pokémon species!",
    "Pokémon was created by Satoshi Tajiri.",
    "Arceus is known as the Pokémon God.",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % pokemonFacts.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [pokemonFacts.length]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(audioRef.current.muted);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-black">
      <div className="max-w-7xl mx-auto text-white">
        <h1 className="text-5xl font-extrabold text-center mb-10 drop-shadow-lg">
          Pokemon Explorer
        </h1>

        <audio ref={audioRef} autoPlay loop>
          <source src="/pokemon-theme.mp3" type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>

        <button
          onClick={toggleMute}
          className="absolute top-5 right-5 bg-gray-800 p-3 rounded-full text-white"
        >
          {isMuted ? "Unmute" : "Mute"}
        </button>

        <p className="text-lg text-center text-gray-300 font-medium mb-10">
          {pokemonFacts[currentFact]}
        </p>

        <PokedexGrid />

        <footer className="mt-16 text-sm text-gray-300 text-center">
          <p>
            © 2024 Pokemon Explorer by{" "}
            <span className="font-semibold">Nitish Ramaraj</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
