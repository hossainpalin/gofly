import { cn } from "@/lib/utils";
import {
  UserLoginSchema,
  userLoginSchema,
  userSignupSchema
} from "@/schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UserAuthFormProps {
  loginForm?: boolean;
}

interface UserAuthFormSchema extends UserLoginSchema {
  fullName?: string;
}

export default function UserAuthForm({ loginForm }: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors }
  } = useForm<UserAuthFormSchema>({
    shouldFocusError: false,
    resolver: zodResolver(loginForm ? userLoginSchema : userSignupSchema),
    defaultValues: loginForm
      ? {
          email: "",
          password: ""
        }
      : {
          fullName: "",
          email: "",
          password: ""
        }
  });

  const handleAuthSubmit = async (data: UserAuthFormSchema) => {
    console.log(data);
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(handleAuthSubmit)(e);
      }}
      className="flex w-full flex-col gap-4 py-6">
      {!loginForm && (
        <div className="flex flex-col gap-1">
          <label className="text-gray-800" htmlFor="fullName">
            Full Name
          </label>
          <input
            {...register("fullName")}
            className={cn(
              "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700",
              errors.fullName && "ring-1 ring-red-400"
            )}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-400">{errors.fullName.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <label className="text-gray-800" htmlFor="email">
          Email
        </label>
        <input
          {...register("email")}
          className={cn(
            "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700",
            errors.email && "ring-1 ring-red-400"
          )}
          type="email"
          id="email"
          name="email"
          placeholder="email@example.com"
        />

        {errors.email && <p className="text-red-400">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-gray-800" htmlFor="password">
          Password
        </label>
        <input
          {...register("password")}
          className={cn(
            "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700",
            errors.password && "ring-1 ring-red-400"
          )}
          type="password"
          id="password"
          name="password"
          placeholder="******"
        />

        {errors.password && (
          <p className="text-red-400">{errors.password.message}</p>
        )}
      </div>

      <button
        className="mt-4 rounded-md bg-black px-3 py-2 text-white"
        type="submit">
        {loginForm ? "Login" : "Create Account"}
      </button>
    </form>
  );
}
