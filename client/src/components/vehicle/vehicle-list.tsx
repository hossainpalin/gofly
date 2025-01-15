import VehicleCard from "@/components/vehicle/vehicle-card.tsx";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useTripAnimate from "@/hooks/use-trip-animate.ts";

export default function VehicleList() {
  const { vehicleListOpen } = useTripAnimate();
  const vehiclePanelRef = useRef(null);

  useGSAP(() => {
    if (vehicleListOpen) {
      gsap.to(vehiclePanelRef.current, {
        bottom: "0%",
        duration: 0.5,
        ease: "power4.out"
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        bottom: "-100%",
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }, [vehicleListOpen]);

  return (
    <div
      ref={vehiclePanelRef}
      className="absolute -bottom-full flex w-full flex-col items-start gap-y-4 bg-white p-8">
      <h1 className="text-2xl font-semibold text-gray-800">Choose a vehicle</h1>

      <div className="mt-4 flex w-full flex-col items-center justify-start gap-y-4">
        <VehicleCard />
        <VehicleCard />
        <VehicleCard />
      </div>
    </div>
  );
}
