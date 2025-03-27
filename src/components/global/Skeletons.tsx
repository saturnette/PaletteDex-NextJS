import React from 'react';

export const PokemonCardSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-lg p-2 flex flex-col items-center justify-center w-full max-w-xs">
      <div className="w-full h-36 md:h-48 bg-gray-400 rounded-md mb-2 animate-pulse"></div>
      <div className="h-2 bg-gray-400 rounded w-3/4 mb-1 animate-pulse"></div>
    </div>
  );
};

export const InputSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-md p-2 flex items-center justify-center w-full">
      <div className="w-full h-5 bg-gray-400 rounded-md animate-pulse"></div>
    </div>
  );
}

export const ButtonSkeleton = () => {
  return (
    <div className="bg-gray-100 rounded-sm p-2 flex items-center justify-center w-full md:w-[188px]">
      <div className="w-full h-5 bg-gray-400 rounded-md animate-pulse"></div>
    </div>
  );
}
