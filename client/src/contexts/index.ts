import { Captain, User } from "@/types";
import { createContext } from "react";

interface UserContextType {
  user: User | null;
  setUser: (user: User) => void;
}

interface CaptainContextType {
  captain: User | null;
  setCaptain: (captain: Captain) => void;
}

interface TripAnimateContextType {
  tripFromExpend: boolean;
  setTripFromExpend: (value: boolean) => void;
  vehicleListOpen: boolean;
  setVehicleListOpen: (value: boolean) => void;
  confirmRideOpen: boolean;
  setConfirmRideOpen: (value: boolean) => void;
}

export const UserContext = createContext<UserContextType | null>(null);
export const CaptainContext = createContext<CaptainContextType | null>(null);
export const TripAnimateContext = createContext<TripAnimateContextType | null>(
  null
);
