import { TypeColors } from "@/documents/TypeColors";
import { IPokemon } from "@/interfaces/IPokemon";
import Image from "next/image";

export const PokemonCard = ({
  poke,
  isOwned,
}: {
  poke: IPokemon;
  isOwned: boolean;
}) => {
  return (
    <div
      key={poke.number}
      className={`${
        isOwned
          ? `${TypeColors[poke.types[0]]} bg-${poke.types[0]}`
          : "bg-white"
      } relative rounded-lg shadow-md flex flex-col`}
    >
      <div className="relative z-10">
        <div className="absolute inset-0 opacity-10"></div>
        <Image
          src={poke.spriteUrl}
          alt={isOwned ? poke.name : "???"}
          width={200}
          height={200}
          className={`aspect-square mx-auto p-2 relative z-20 ${
            !isOwned ? "filter brightness-0 opacity-20" : ""
          }`}
        />
      </div>
      <div className="absolute top-0 right-0 bg-white text-black text-sm font-bold p-1 rounded-bl-lg rounded-tr-lg z-0">
        #{poke.number.toString().padStart(3, "0")}
      </div>
      <p className="text-center text-lg font-bold capitalize bg-white rounded-b-lg">
        {isOwned ? poke.name : "???"}
      </p>
    </div>
  );
};