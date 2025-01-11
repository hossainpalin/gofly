import Logo from "@/assets/icons/logo.png";
import { Link } from "react-router-dom";
import CaptainAuthForm from "@/components/auth/captain-auth-form.tsx";

export default function CaptainSignup() {
  return (
    <div className="flex size-full min-h-fit flex-col items-center justify-between gap-y-6 p-8">
      <div className="flex w-full flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-1">
          <img className="w-20" src={Logo} alt="logo" />
          <h1 className="text-2xl text-gray-800">Create an account</h1>
        </div>

        <CaptainAuthForm loginForm={false} />

        <div>
          <p className="text-gray-800">
            Already have an account?{" "}
            <Link className="text-blue-500" to="/captain-login">
              login
            </Link>
          </p>
        </div>
      </div>

      <div className="flex w-full justify-center">
        <Link
          className=" mt-4 w-full rounded-md bg-green-600  px-3 py-2 text-center font-semibold text-white"
          to="/user-signup">
          Signup As User
        </Link>
      </div>
    </div>
  );
}
