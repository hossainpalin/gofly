import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useUser from "@/hooks/use-user.ts";
import UserAvatar from "@/components/user/user-avatar.tsx";
import BrandLogo from "@/components/common/brand-logo.tsx";

export default function Home() {
  const { user } = useUser();

  return (
    <div className="flex size-full flex-col justify-between bg-[url('./assets/images/gofly-bg.jpg')] bg-cover bg-center">
      <BrandLogo className="ml-8 mt-8 w-20" />
      {user && <UserAvatar />}

      <div className="flex flex-col gap-4 bg-white p-8">
        {user ? (
          <h1 className="text-2xl font-semibold">
            Welcome back, <br /> {user.fullName}
          </h1>
        ) : (
          <h1 className="text-2xl font-semibold">Get Started with Gofly</h1>
        )}

        <Link
          to={user ? "/trip" : "/user-login"}
          className="relative w-full rounded-md bg-black py-3 text-center text-white">
          {user ? "Create a Trip" : "Continue"}
          <ArrowRight className="absolute right-4 inline" />
        </Link>
      </div>
    </div>
  );
}
