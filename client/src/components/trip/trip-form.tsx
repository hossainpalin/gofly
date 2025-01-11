import { cn } from "@/lib/utils.ts";
import { useState } from "react";

export default function TripForm() {
  const [expendForm, setExpendForm] = useState(false);

  return (
    <form
      className={cn(
        "absolute flex w-full flex-col items-start gap-y-4 bg-white p-8",
        expendForm ? "animate-expand z-50 top-0 h-full" : "bottom-0"
      )}>
      <h4 className="text-2xl font-semibold text-gray-800">Find a trip</h4>

      <input
        onClick={() => setExpendForm(true)}
        className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700"
        type="text"
        name="pickup"
        id="pickup"
        placeholder="Add a pickup location"
      />
      <input
        onClick={() => setExpendForm(true)}
        className="w-full rounded-md bg-gray-100 px-3 py-2 text-gray-800 focus:outline-none  focus:ring-1 focus:ring-gray-700"
        type="text"
        name="destination"
        id="destination"
        placeholder="Enter your destination"
      />
    </form>
  );
}
