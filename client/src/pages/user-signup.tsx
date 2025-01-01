import Logo from "@/assets/icons/logo.png";
import UserAuthForm from "@/components/auth/user-auth-form";
import { Link } from "react-router-dom";

export default function UserSignup() {
  return (
    <div className=" flex size-full flex-col items-center justify-between gap-y-6 p-8">
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-1">
          <img className="w-20" src={Logo} alt="logo" />
          <h1 className="text-2xl text-gray-800">Create an account</h1>
        </div>

        <UserAuthForm loginForm={false} />

        <div>
          <p className="text-gray-800">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/login">
              login
            </Link>
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <Link
          className=" mt-4 w-full rounded-md bg-green-600  px-3 py-2 text-center font-semibold text-white"
          to="/captain-signup">
          Signup As Captain
        </Link>
      </div>
    </div>
  );
}
