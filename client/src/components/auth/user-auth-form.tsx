import useUser from "@/hooks/use-user";
import { cn } from "@/lib/utils";
import {
  UserLoginSchema,
  userLoginSchema,
  userSignupSchema
} from "@/schema/user.schema";
import { UserLoginResponse } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface UserAuthFormProps {
  loginForm?: boolean;
}

interface UserAuthFormSchema extends UserLoginSchema {
  fullName?: string;
}

export default function UserAuthForm({ loginForm }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
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
    try {
      setIsLoading(true);
      if (loginForm) {
        const response = await axios.post("api/users/login", data);

        if (response.status === 200) {
          const result = response.data as UserLoginResponse;

          const user = {
            id: result.user._id,
            email: result.user.email,
            fullName: result.user.fullName,
            token: result.token
          };

          setUser(user);
        }
      } else {
        const response = await axios.post("api/users/register", data);

        if (response.status === 201) {
          return navigate("/user-login");
        }
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError("root", {
          type: "manual",
          message: error?.response?.data.error
        });
      } else if (error instanceof Error) {
        setError("root", {
          type: "manual",
          message: error.message
        });
      } else {
        setError("root", {
          type: "manual",
          message: "An error occurred. Please try again."
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => {
        clearErrors();
        handleSubmit(handleAuthSubmit)(e);
      }}
      className="flex w-full flex-col gap-4 py-6">
      {errors.root && (
        <p className="flex w-full items-center justify-start gap-2 rounded-md bg-red-400/40 px-3 py-2 text-red-700">
          <span className="inline-block">
            <AlertTriangle className="size-6" />
          </span>
          <span className="inline-block">{errors.root.message}</span>
        </p>
      )}

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
        disabled={isLoading}
        className="mt-4 rounded-md bg-black px-3 py-2 text-white"
        type="submit">
        {loginForm
          ? isLoading
            ? "Processing..."
            : "Login"
          : isLoading
            ? "Processing..."
            : "Create Account"}
      </button>
    </form>
  );
}
