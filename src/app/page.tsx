import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";
import Link from "next/link";

async function getUserNicks() {
  try {
    await connectMongoDB();

    const users = await User.find({}, 'showdownNick _id');
    return users.map(user => ({ showdownNick: user.showdownNick, id: user._id }));
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [];
  }
}

export default async function Home() {
  const users = await getUserNicks();
  console.log(users);
  return (
    <div>
      <h1>Usuarios Showdown</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <Link href={`/${user.id}`}>
                {user.showdownNick}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </div>
  );
}