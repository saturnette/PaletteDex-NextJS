import React from "react";
import { InputSkeleton, ButtonSkeleton, PokemonCardSkeleton } from "@/components/global/Skeletons";

interface PokedexSkeletonProps {
  itemsPerPage: number;
}

export const PokedexSkeleton: React.FC<PokedexSkeletonProps> = ({ itemsPerPage }) => {
  return (
    <div className="container mx-auto p-4 bg-neutral-800 rounded-b-lg">
      <div className="flex flex-col md:flex-row gap-4">
        <InputSkeleton />
        <InputSkeleton />
        <ButtonSkeleton />
      </div>
      <hr className="text-white my-6" />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <PokemonCardSkeleton key={index} />
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <InputSkeleton />
      </div>
    </div>
  );
};
