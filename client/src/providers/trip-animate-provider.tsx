import { TripAnimateContext } from "@/contexts";
import { ReactNode, useState } from "react";

export default function TripAnimateProvider({
  children
}: {
  children: ReactNode;
}) {
  const [tripFromExpend, setTripFromExpend] = useState(false);
  const [vehicleListOpen, setVehicleListOpen] = useState(false);
  const [confirmRideOpen, setConfirmRideOpen] = useState(false);

  return (
    <TripAnimateContext.Provider
      value={{
        tripFromExpend,
        setTripFromExpend,
        vehicleListOpen,
        setVehicleListOpen,
        confirmRideOpen,
        setConfirmRideOpen
      }}>
      {children}
    </TripAnimateContext.Provider>
  );
}
