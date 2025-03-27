import { BotMessageSquare, Menu } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="bg-primary z-50 sticky top-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="cursor-pointer flex items-center text-white">
          <BotMessageSquare size={40} />
          <p className="pl-2 font-black text-xl md:text-4xl">Palette-Dex</p>
        </Link>

        <Menu size={40} className="text-white font-black cursor-pointer" />
      </div>
    </div>
  );
}
