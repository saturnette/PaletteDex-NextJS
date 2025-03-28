import Image from "next/image";
import StatItem from "@/components/profile/StatItem";
import { getRandomAnimal } from "@/helpers/getRandomAnimal";
import { IUser } from "@/interfaces/IUser";
import {
  Trophy,
  Coins,
  Gamepad2,
  Cat,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Toaster } from "sonner";
import { ShareButton } from "./ShareButton";

export const UserInfo = ({
  spriteUrl,
  user,
}: {
  spriteUrl: string;
  user: IUser;
}) => {
  const stats = [
    { icon: <Trophy />, label: "ELO", value: user.elo ?? 0 },
    { icon: <Coins />, label: "PokéCoins", value: user.coins ?? 0 },
    {
      icon: <Cat />,
      label: "PokéDex",
      value: `${user.pokemonCollection.length ?? 0} / 151`,
    },
    {
      icon: <Gamepad2 />,
      label: "Games",
      value: (user.winsLadder ?? 0) + (user.lossesLadder ?? 0),
    },
    { icon: <ThumbsUp />, label: "Wins", value: user.winsLadder ?? 0 },
    { icon: <ThumbsDown />, label: "Losses", value: user.lossesLadder ?? 0 },
  ];

  return (
    <>
      <Toaster />
      <div className="bg-neutral-800">
        <div className="container p-4 mx-auto md:flex text-black font-black gap-4">
          <div>
            <Image
              src={spriteUrl}
              alt="Pokemon Sprite"
              width={242}
              height={264}
              className="p-2 rounded-lg mx-auto aspect-square bg-red mb-2"
            />
            <ShareButton userId={user._id} />
          </div>
          <div className="w-full text-white my-4 md:my-0">
            <div className="flex items-center justify-center text-3xl bg-primary p-2 rounded-lg">
              <p>{user?.showdownNick || `${getRandomAnimal()} Anónimo`}</p>
            </div>
            <div className="grid grid-cols-3 gap-6 text-center my-4">
              {stats.map((stat, index) => (
                <StatItem
                  key={index}
                  icon={stat.icon}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-primary border-dashed py-8 pb-4 text-center text-4xl font-black text-white container bg-neutral-800 mx-auto">
        Pokédex
      </div>
    </>
  );
};
