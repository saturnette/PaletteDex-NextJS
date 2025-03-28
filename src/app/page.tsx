import { getTopUsers } from "@/services/getTopUsers";
import { getUsersSprites } from "@/services/getUserSprites";
import UserCard from "@/components/home/UserCard";

export default async function Home() {
  const topUsers = await getTopUsers();
  const usersWithSprites = await getUsersSprites(topUsers);

  return (
    <div className="mb-10">
      <div className="text-2xl md:text-4xl text-center text-white font-black bg-neutral-800 py-10">
        <h1>Top Competitive Players</h1>
        <p className="text-xs md:text-sm font-bold">
          Selecciona un jugador para ver su perfil y estadísticas.
        </p>
      </div>
      <div className="container bg-neutral-800 p-4 mx-auto border-t-2 border-dashed border-primary rounded-b-lg py-6">
        {usersWithSprites.length > 0 ? (
          <div className="grid gap-4 md:gap-6">
            {usersWithSprites.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No users found.</p>
        )}
      </div>
    </div>
  );
}

export const revalidate = 60;
