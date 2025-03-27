"use client";

import { useEffect, useState } from "react";
import { getPokemonData } from "@/services/getPokemonData";
import { PokemonCard } from "@/components/pokedex/PokemonCard";
import { PokemonCardSkeleton } from "@/components/pokedex/PokemonCardSkeleton";
import { IPokemon } from "@/interfaces/IPokemon";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";
import { Eraser } from "lucide-react";
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
  const [itemsPerPage, setItemsPerPage] = useState(10);

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

  const filteredPokemon = pokemon.filter((poke) => {
    const matchesSearch = poke.name.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? poke.types.includes(typeFilter) : true;
    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage);
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pageNumbers = [];

    pageNumbers.push(1);

    if (currentPage > 3) {
      pageNumbers.push('ellipsis-start');
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    if (currentPage < totalPages - 2) {
      pageNumbers.push('ellipsis-end');
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

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
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/3 bg-white"
        />
        <Select 
          onValueChange={(value) => {
            setTypeFilter(value);
            setCurrentPage(1);
          }} 
          value={typeFilter}
        >
          <SelectTrigger className="w-full md:w-1/3 bg-white">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="fire">Fuego</SelectItem>
            <SelectItem value="water">Agua</SelectItem>
            <SelectItem value="grass">Planta</SelectItem>
            <SelectItem value="electric">Eléctrico</SelectItem>
          </SelectContent>
        </Select>
        <Eraser />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {paginatedPokemon.map((poke) => {
          const isOwned = userPokemonCollection.includes(poke.number);
          return <PokemonCard key={poke.number} poke={poke} isOwned={isOwned} />;
        })}
      </div>

      {/* Siempre mostrar el espacio de paginación */}
      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationContent className="gap-1">
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                isActive={currentPage > 1}
                className="p-1.5 px-2 bg-white text-black font-black"
              />
            </PaginationItem>
            
            {totalPages > 1 && getPageNumbers().map((page, index) => {
              if (page === 'ellipsis-start' || page === 'ellipsis-end') {
                return (
                  <PaginationItem key={`ellipsis-${index}`}>
                    <PaginationEllipsis className="w-6 p-0 justify-center" />
                  </PaginationItem>
                );
              }
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(page as number);
                    }}
                    isActive={currentPage === page}
                    className="p-1.5 px-2 w-8 justify-center transition duration-300 "
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                isActive={currentPage < totalPages}
                className="p-1.5 px-2 bg-white text-black font-black"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};