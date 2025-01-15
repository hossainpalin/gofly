import UserIcon from "@/assets/icons/user.svg";

export default function UserAvatar() {
  return (
    <img
      className="absolute right-8 top-8 w-8 overflow-hidden rounded-full bg-gray-100 p-1.5"
      src={UserIcon}
      alt="user-icon"
    />
  );
}
