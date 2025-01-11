import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { AlertTriangle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  captainLoginSchema,
  CaptainLoginSchema,
  captainSignupSchema
} from "@/schema/captain.schema.ts";
import { CaptainLoginResponse } from "@/types";
import useCaptain from "@/hooks/use-captain.ts";

interface CaptainAuthFormProps {
  loginForm?: boolean;
}

interface CaptainAuthFormSchema extends CaptainLoginSchema {
  fullName?: string;
  type?: string;
  color?: string;
  numberPlate?: string;
  capacity?: number;
}

export default function CaptainAuthForm({ loginForm }: CaptainAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setCaptain } = useCaptain();

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors }
  } = useForm<CaptainAuthFormSchema>({
    shouldFocusError: false,
    resolver: zodResolver(loginForm ? captainLoginSchema : captainSignupSchema),
    defaultValues: loginForm
      ? {
          email: "",
          password: ""
        }
      : {
          fullName: "",
          email: "",
          password: "",
          type: "car",
          color: "",
          numberPlate: "",
          capacity: 4
        }
  });

  const handleAuthSubmit = async (data: CaptainAuthFormSchema) => {
    try {
      setIsLoading(true);
      if (loginForm) {
        const response = await axios.post("/api/captains/login", data);

        if (response.status === 200) {
          const result = response.data as CaptainLoginResponse;

          const captain = {
            id: result.captain._id,
            email: result.captain.email,
            fullName: result.captain.fullName,
            token: result.token,
            vehicle: {
              type: result.captain.vehicle.type,
              color: result.captain.vehicle.color,
              numberPlate: result.captain.vehicle.numberPlate,
              capacity: result.captain.vehicle.capacity
            },
            location: {
              lat: result.captain.location.lat,
              log: result.captain.location.lon
            },
            status: result.captain.status
          };

          setCaptain(captain);
        }
      } else {
        const newCaptain = {
          fullName: data.fullName,
          email: data.email,
          password: data.password,
          vehicle: {
            type: data.type,
            color: data.color,
            numberPlate: data.numberPlate,
            capacity: data.capacity
          }
        };

        const response = await axios.post("/api/captains/register", newCaptain);

        if (response.status === 201) {
          return navigate("/captain-login");
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

      {!loginForm && (
        <div className="flex w-full flex-col gap-4">
          <p className="mb-1 font-semibold text-gray-800">Vehicle Details</p>

          <div className="flex w-full gap-x-2">
            <div className="flex w-full flex-col gap-1">
              <label className="w-full text-gray-800" htmlFor="type">
                Type
              </label>
              <select
                {...register("type")}
                name="type"
                id="type"
                className={cn(
                  "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700 w-full",
                  errors.type && "ring-1 ring-red-400"
                )}>
                <option value="" disabled hidden>
                  Select type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="motorcycle">Motorcycle</option>
              </select>
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="w-full text-gray-800" htmlFor="color">
                Color
              </label>
              <input
                {...register("color")}
                className={cn(
                  "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700 w-full",
                  errors.color && "ring-1 ring-red-400"
                )}
                type="text"
                id="color"
                name="color"
                placeholder="Red"
              />
            </div>
          </div>
          <div className="flex w-full gap-x-2">
            <div className="flex w-full flex-col gap-1">
              <label className="w-full text-gray-800" htmlFor="numberPlate">
                Number Plate
              </label>
              <input
                {...register("numberPlate")}
                className={cn(
                  "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700 w-full",
                  errors.numberPlate && "ring-1 ring-red-400"
                )}
                type="text"
                id="numberPlate"
                name="numberPlate"
                placeholder="KA-01-MG-1234"
              />
            </div>

            <div className="flex w-full flex-col gap-1">
              <label className="w-full text-gray-800" htmlFor="capacity">
                Capacity
              </label>
              <input
                {...register("capacity")}
                className={cn(
                  "rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700 w-full",
                  errors.capacity && "ring-1 ring-red-400"
                )}
                type="number"
                id="capacity"
                name="capacity"
                placeholder="4"
              />
            </div>
          </div>
        </div>
      )}

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
