import { CaptainContext } from "@/contexts";
import { useContext } from "react";

export default function useCaptain() {
  const captain = useContext(CaptainContext);

  if (!captain) {
    throw new Error("useCaptain must be used within a CaptainProvider");
  }

  return captain;
}
