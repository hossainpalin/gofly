import Logo from "@/assets/icons/logo.png";
import UserIcon from "@/assets/icons/user.svg";
import TripForm from "@/components/trip/trip-form.tsx";

export default function Trip() {
  return (
    <div className="size-full bg-red-300">
      <img className="absolute left-8 top-8 w-20" src={Logo} alt="logo" />
      <img
        className="absolute right-8 top-8 w-8 overflow-hidden rounded-full bg-gray-100 p-1.5"
        src={UserIcon}
        alt="user-icon"
      />

      <TripForm />
    </div>
  );
}
