"use client";

import { useEffect, useState } from "react";
import { getPokemonData } from "@/services/getPokemonData";
import { PokemonCard } from "@/components/pokedex/PokemonCard";
import { IPokemon } from "@/interfaces/IPokemon";
import { SearchFilter } from "@/components/pokedex/SearchFilter";
import { PaginationControls } from "@/components/pokedex/PaginationControls";
import { PokedexSkeleton } from "./PokedexSkeleton";

export const Pokedex = ({
  userPokemonCollection,
}: {
  userPokemonCollection: number[];
}) => {
  const [pokemon, setPokemon] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      const pokemonData = await getPokemonData();
      setPokemon(pokemonData);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setItemsPerPage(15);
      } else if (width >= 768) {
        setItemsPerPage(12);
      } else if (width >= 640) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(10);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("");
    setCurrentPage(1);
  };

  const filteredPokemon = pokemon.filter((poke) => {
    const matchesSearch = poke.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesType = typeFilter ? poke.types.includes(typeFilter) : true;
    return matchesSearch && matchesType;
  });

  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return loading ? (
    <PokedexSkeleton itemsPerPage={itemsPerPage} />
  ) : (
    <div className="container mx-auto p-4 bg-neutral-800 rounded-b-lg">
      <SearchFilter
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        resetFilters={resetFilters}
        setCurrentPage={setCurrentPage}
      />

      <hr className="text-white my-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginatedPokemon.map((poke) => {
          const isOwned = userPokemonCollection.includes(poke.number);
          return (
            <PokemonCard key={poke.number} poke={poke} isOwned={isOwned} />
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <PaginationControls
          currentPage={currentPage}
          totalItems={filteredPokemon.length}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};
