import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "@/lib/utils.ts";
import LocationList from "@/components/location/location-list.tsx";
import useTripAnimate from "@/hooks/use-trip-animate.ts";

export default function TripForm() {
  const { tripFromExpend, setTripFromExpend } = useTripAnimate();
  const tripPanelRef = useRef(null);

  useGSAP(() => {
    if (tripFromExpend) {
      gsap.to(tripPanelRef.current, {
        height: "68%",
        duration: 0.5,
        ease: "power4.out"
      });
    } else {
      gsap.to(tripPanelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }, [tripFromExpend]);

  return (
    <div
      className={cn(
        "flex size-full flex-col justify-end",
        tripFromExpend && "absolute z-50"
      )}>
      <div className="h-[32%] bg-white p-8">
        <form className="flex w-full flex-col items-start gap-y-4">
          <div className="flex w-full items-start justify-between">
            <h4 className="text-2xl font-semibold text-gray-800">
              Find a trip
            </h4>
            {tripFromExpend && (
              <span
                onClick={() => setTripFromExpend(false)}
                className="flex w-8 items-center justify-center">
                <ChevronDown />
              </span>
            )}
          </div>

          <input
            onClick={() => setTripFromExpend(true)}
            className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700"
            type="text"
            name="pickup"
            id="pickup"
            placeholder="Add a pickup location"
          />
          <input
            onClick={() => setTripFromExpend(true)}
            className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700"
            type="text"
            name="destination"
            id="destination"
            placeholder="Enter your destination"
          />
        </form>
      </div>
      <div ref={tripPanelRef} className="h-0 bg-white">
        {tripFromExpend && <LocationList />}
      </div>
    </div>
  );
}
