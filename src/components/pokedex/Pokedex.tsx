"use client";

import { useEffect, useState } from "react";
import { getPokemonData } from "@/services/getPokemonData";
import { PokemonCard } from "@/components/pokedex/PokemonCard";
import { PokemonCardSkeleton } from "@/components/pokedex/PokemonCardSkeleton";
import { IPokemon } from "@/interfaces/IPokemon";

export const Pokedex = ({
  userPokemonCollection,
}: {
  userPokemonCollection: number[];
}) => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonData();
      setPokemon(pokemonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-neutral-800 rounded-lg my-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {Array.from({ length: 15 }).map((_, index) => (
            <PokemonCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-neutral-800 rounded-lg my-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {pokemon.map((poke) => {
          const isOwned = userPokemonCollection.includes(poke.number);
          return <PokemonCard key={poke.number} poke={poke} isOwned={isOwned} />;
        })}
      </div>
    </div>
  );
};