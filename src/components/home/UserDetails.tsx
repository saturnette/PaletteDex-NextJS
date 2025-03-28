import { Trophy, Cat, Gamepad2 } from "lucide-react";
import { IUser } from "@/interfaces/IUser";
import StatItem from "./StatItem";

export default function UserDetails({ user }: { user: IUser }) {
  const totalGames = (user.winsLadder ?? 0) + (user.lossesLadder ?? 0);
  const pokedexCount = `${user.pokemonCollection?.length ?? 0} / 151`;

  const stats = [
    { icon: Trophy, title: "ELO", value: user.elo ?? 0 },
    { icon: Gamepad2, title: "Games", value: totalGames },
    { icon: Cat, title: "PokéDex", value: pokedexCount },
  ];

  return (
    <div className="flex-1 p-4 md:ml-4">
      <div className="grid grid-cols-1 text-lg md:text-2xl font-bold text-center mb-4 bg-neutral-900 text-white rounded-lg truncate px-2">
        {user.showdownNick || ""}
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-1 gap-1 text-sm text-center">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
            iconSize="w-5 h-5"
            layout="horizontal"
          />
        ))}
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid grid-cols-3 gap-4 text-center">
        {stats.map((stat, index) => (
          <StatItem
            key={index}
            icon={stat.icon}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>
    </div>
  );
}
