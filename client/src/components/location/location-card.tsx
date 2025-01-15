import { MapPin } from "lucide-react";
import useTripAnimate from "@/hooks/use-trip-animate.ts";

export default function LocationCard() {
  const { setVehicleListOpen, setTripFromExpend } = useTripAnimate();

  return (
    <div
      onClick={() => {
        setVehicleListOpen(true);
        setTripFromExpend(false);
      }}
      className="flex w-full items-center justify-between gap-x-2">
      <span className="flex size-10 items-center justify-center rounded-full bg-gray-100">
        <MapPin size={20} />
      </span>

      <p className="font-semibold text-gray-800">
        Nagpara, Sherpur, Dhaka, Bangladesh
      </p>
    </div>
  );
}
