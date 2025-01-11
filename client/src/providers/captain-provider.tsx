import { Captain } from "@/types";
import { ReactNode, useEffect, useState } from "react";
import { CaptainContext } from "@/contexts";

export default function CaptainProvider({ children }: { children: ReactNode }) {
  const localCaptain = localStorage.getItem("captain");
  const initialCaptain = localCaptain ? JSON.parse(localCaptain) : null;
  const [captain, setCaptain] = useState<Captain | null>(initialCaptain);

  useEffect(() => {
    if (captain) {
      localStorage.setItem("captain", JSON.stringify(captain));
    } else {
      localStorage.removeItem("captain");
    }
  }, [captain]);

  return (
    <CaptainContext.Provider value={{ captain, setCaptain }}>
      {children}
    </CaptainContext.Provider>
  );
}
