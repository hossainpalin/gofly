import { UserContext } from "@/contexts";
import { User } from "@/types";
import { ReactNode, useEffect, useState } from "react";

export default function UserProvider({ children }: { children: ReactNode }) {
  const localUser = localStorage.getItem("user");
  const initialUser = localUser ? JSON.parse(localUser) : null;
  const [user, setUser] = useState<User | null>(initialUser);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
