import Logo from "@/assets/icons/logo.png";
import { Link } from "react-router-dom";
import UserAuthForm from "@/components/auth/user-auth-form.tsx";

export default function UserLogin() {
  return (
    <div className=" flex size-full flex-col items-center justify-between gap-y-6 p-8">
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-1">
          <img className="w-20" src={Logo} alt="logo" />
          <h1 className="text-2xl text-gray-800">Continue to login</h1>
        </div>

        <UserAuthForm loginForm />

        <div>
          <p className="text-gray-800">
            Don't have an account?{" "}
            <Link className="text-blue-500" to="/user-signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <Link
          className=" mt-4 w-full rounded-md bg-green-600  px-3 py-2 text-center font-semibold text-white"
          to="/captain-login">
          Login As Captain
        </Link>
      </div>
    </div>
  );
}
