import Logo from "@/assets/icons/logo.png";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex size-full flex-col justify-between bg-[url('./assets/images/gofly-bg.jpg')] bg-cover bg-center">
      <img className="ml-8 mt-8 w-20" src={Logo} alt="logo" />
      <div className="flex flex-col gap-4 bg-white p-8">
        <h1 className="text-2xl font-semibold">Get Started with Gofly</h1>
        <Link
          to="/login"
          className="relative w-full rounded-md bg-black py-3 text-center text-white">
          Continue
          <ArrowRight className="absolute right-4 inline" />
        </Link>
      </div>
    </div>
  );
}
