import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useTripAnimate from "@/hooks/use-trip-animate.ts";
import { ChevronDown, MapPin, MapPinCheck, Wallet } from "lucide-react";
import CarIcon from "@/assets/images/car.png";

export default function ConfirmRide() {
  const { confirmRideOpen, setConfirmRideOpen, setVehicleListOpen } =
    useTripAnimate();
  const confirmRidePanelRef = useRef(null);

  useGSAP(() => {
    if (confirmRideOpen) {
      gsap.to(confirmRidePanelRef.current, {
        bottom: "0%",
        duration: 0.5,
        ease: "power4.out"
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        bottom: "-100%",
        duration: 0.5,
        ease: "power4.out"
      });
    }
  }, [confirmRideOpen]);

  return (
    <div
      ref={confirmRidePanelRef}
      className="absolute -bottom-full w-full flex-col items-start gap-y-4 bg-white p-8">
      <div className="flex w-full items-start justify-between">
        <h4 className="text-2xl font-semibold text-gray-800">
          Confirm your ride
        </h4>
        {confirmRideOpen && (
          <span
            onClick={() => {
              setConfirmRideOpen(false);
              setVehicleListOpen(true);
            }}
            className="flex w-8 items-center justify-center">
            <ChevronDown />
          </span>
        )}
      </div>

      <div className="mt-4 flex w-full flex-col items-center justify-start gap-y-4">
        <div className="flex w-full items-center justify-center">
          <img className="w-32" src={CarIcon} alt="car-icon" />
        </div>

        <div className="flex w-full flex-col items-start">
          <div className="flex w-full items-center justify-start gap-x-2 border-b pb-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-gray-100">
              <MapPin size={20} />
            </span>

            <div>
              <p className="font-semibold text-gray-800">109/01 Shibbari</p>
              <p className="text-gray-600">Sherpur Town, sherpur</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-start gap-x-2 border-b pb-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-gray-100">
              <MapPinCheck size={20} />
            </span>

            <div>
              <p className="font-semibold text-gray-800">111/05 Thanar Mor</p>
              <p className="text-gray-600">Sherpur Town, Sherpur</p>
            </div>
          </div>

          <div className="flex w-full items-center justify-start gap-x-2 pt-2">
            <span className="flex size-10 items-center justify-center rounded-full bg-gray-100">
              <Wallet size={20} />
            </span>

            <div>
              <p className="font-semibold text-gray-800">$50.00</p>
              <p className="text-gray-600">Cash payment</p>
            </div>
          </div>
        </div>

        <button className="w-full rounded-lg bg-green-700 py-1.5 font-semibold text-white hover:bg-green-800">
          Confirm
        </button>
      </div>
    </div>
  );
}
