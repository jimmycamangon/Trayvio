import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow fixed top-0 left-0 w-full z-50">
      <div className="text-xl font-bold">
        <Link href="/">
          {" "}
          <Image src="/Logo.png" alt="Trayvio Logo" width={50} height={50} />
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="#home">
          <Button variant="ghost">Home</Button>
        </Link>
        <Link href="#about">
          <Button variant="ghost">About</Button>
        </Link>
        <Link href="#contact">
          <Button variant="ghost">Contact</Button>
        </Link>

        <Button variant="ghost">Login</Button>
      </div>
    </nav>
  );
}
