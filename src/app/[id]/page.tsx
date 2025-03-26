import { getUserData } from "@/lib/getUserData";
import { getPokemonSprite } from "@/lib/getPokemonSprite";
import { getRandomAnimal } from "@/helpers/getRandomAnimal";
import StatItem from "@/components/StatItem";
import Image from "next/image";
import {
  Trophy,
  Coins,
  Gamepad2,
  Cat,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const profilePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await getUserData(id);
  const spriteUrl = await getPokemonSprite(
    user?.companionPokemon?.number || user?.pokemonCollection[0]?.number || 1
  );

  const totalGames = user?.winsLadder + user?.lossesLadder;

  const favoriteColorClass =
    user?.favoriteColor === "blue"
      ? "bg-8F87F1"
      : user?.favoriteColor === "red"
      ? "bg-[#f51e78]"
      : "bg-gray-700";

  return (
    <div className="bg-neutral-800">
      <div className="container p-4 mx-auto md:flex text-black font-black gap-4 ">
        <Image
          src={spriteUrl}
          alt="Pokemon Sprite"
          width={242}
          height={264}
          className={`p-2 rounded-lg mx-auto aspect-square ${favoriteColorClass}`}
        />
        <div className="w-full text-white my-4 md:my-0">
          <div className="flex items-center justify-center text-3xl bg-primary p-2 rounded-lg">
            <p>{user?.showdownNick || `${getRandomAnimal()} Anónimo`}</p>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center my-4">
            <StatItem icon={<Trophy />} label="ELO" value={user?.elo} />
            <StatItem icon={<Coins />} label="PokéCoins" value={user?.coins} />
            <StatItem
              icon={<Cat />}
              label="PokéDex"
              value={`${user?.pokemonCollection.length} / 151`}
            />
            <StatItem icon={<Gamepad2 />} label="Games" value={totalGames} />
            <StatItem
              icon={<ThumbsUp />}
              label="Wins"
              value={user?.winsLadder}
            />
            <StatItem
              icon={<ThumbsDown />}
              label="Losses"
              value={user?.lossesLadder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default profilePage;
