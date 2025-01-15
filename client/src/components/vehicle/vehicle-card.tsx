import CarIcon from "@/assets/images/car.png";
import UserIcon from "@/assets/icons/user.svg";
import useTripAnimate from "@/hooks/use-trip-animate";

export default function VehicleCard() {
  const { setVehicleListOpen, setConfirmRideOpen } = useTripAnimate();

  return (
    <div
      onClick={() => {
        setVehicleListOpen(false);
        setConfirmRideOpen(true);
      }}
      className="flex w-full items-center justify-between gap-x-2 rounded-lg border-2 p-2">
      <div className="flex size-12 items-center justify-center">
        <img src={CarIcon} alt="car-icon" />
      </div>

      <div className="flex items-start justify-center gap-x-2">
        <div>
          <div className="flex items-center justify-start gap-x-2">
            <h4 className="text-xl font-semibold text-gray-800">Gofly Car</h4>

            <div className="flex items-center justify-center gap-x-1">
              <img className="w-[12px]" src={UserIcon} alt="user-icon" />
              <p className="font-semibold text-gray-800">4</p>
            </div>
          </div>

          <p className="text-sm font-semibold text-gray-700">2 Mins away</p>
          <p className="text-sm text-gray-500">Affordable compact rides</p>
        </div>

        <div className="">
          <p className="text-xl font-semibold text-gray-800">$50.00</p>
        </div>
      </div>
    </div>
  );
}
