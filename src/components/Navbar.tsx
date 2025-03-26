import { BotMessageSquare, Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="bg-primary z-50 ">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="cursor-pointer flex items-center text-white">
          <BotMessageSquare size={40} />
          <p className="pl-2 font-black text-4xl">Palette-Dex</p>
        </Link>

        <Search className="text-white font-black"/>
      </div>
    </div>
  );
}
