import { useContext } from "react";
import { TripAnimateContext } from "@/contexts";

export default function useTripAnimate() {
  const tripAnimate = useContext(TripAnimateContext);

  if (!tripAnimate) {
    throw new Error("useTripAnimate must be used within a TripAnimateProvider");
  }

  return tripAnimate;
}
