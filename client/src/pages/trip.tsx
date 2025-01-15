import TripForm from "@/components/trip/trip-form.tsx";
import UserAvatar from "@/components/user/user-avatar.tsx";
import BrandLogo from "@/components/common/brand-logo.tsx";
import VehicleList from "@/components/vehicle/vehicle-list.tsx";
import ConfirmRide from "@/components/trip/confirm-ride.tsx";

export default function Trip() {
  return (
    <div
      className="relative size-full overflow-hidden bg-cover bg-top bg-no-repeat"
      style={{
        backgroundImage: "url(/map.gif)"
      }}>
      <BrandLogo className="absolute left-8 top-8 w-20" />
      <UserAvatar />
      <TripForm />
      <VehicleList />
      <ConfirmRide />
    </div>
  );
}
