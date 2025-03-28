import Link from "next/link";
import Image from "next/image";
import { getPositionIcon } from "@/helpers/getPositionIcon";
import UserDetails from "./UserDetails";
import { IUser } from "@/interfaces/IUser";

export default function UserCard({ user }: { user: IUser }) {
  const positionIcon = getPositionIcon(user.position);

  return (
    <Link
      key={user._id}
      href={`/profile/${user._id}`}
      className="relative flex items-center rounded-xl bg-white"
    >
      {/* Position Badge */}
      <div className="w-10 md:w-24 bg-neutral-900 rounded-l-lg flex flex-col items-center justify-center py-4 h-full">
        {positionIcon && <positionIcon.Icon className={positionIcon.className} />}
        <span className="text-xl md:text-2xl font-bold text-white mt-2">
          #{user.position}
        </span>
      </div>

      {/* Pokemon Sprite */}
      <div className="w-24 md:w-40 h-24 md:h-40 flex items-center justify-center">
        <Image
          src={user.spriteUrl || ""}
          alt="Pokemon Sprite"
          width={160}
          height={160}
          className={`ml-2 md:ml-10 bg-${user.favoriteColor} rounded-full`}
        />
      </div>

      {/* User Details */}
      <UserDetails user={user} />
    </Link>
  );
}
