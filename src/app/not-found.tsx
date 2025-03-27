import Image from "next/image";
import Link from "next/link";
import { Rocket } from "lucide-react";

const NotFound = () => {
  return (
    <div className="bg-neutral-800 h-screen flex justify-center pt-10">
      <div className="text-center text-white">
        <div className="md:flex flex-col items-center justify-center space-y-4 md:space-y-0 md:flex-row">
          <h1 className="text-9xl text-yellow-500">404</h1>

          <Image
            src="/images/404.png"
            alt="404"
            width={200}
            height={200}
            className="md:w-[300px] md:h-[300px] mx-auto md:mx-0"
          />
        </div>
        <p className="text-2xl md:text-5xl font-black mt-4">
          Te has salido de la órbita...
        </p>

        <Link href="/">
          <div className="mt-6 bg-primary rounded-lg flex items-center justify-center text-xl md:text-3xl hover:bg-white hover:text-neutral-800 transition duration-300 ease-in-out cursor-pointer px-6 py-3">
            <Rocket />
            <p className="pl-2">Volver a la tierra</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;