import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
export type Profile = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  orderStatus: boolean;
  newsletter: boolean;
};
export const empty: Profile = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  orderStatus: false,
  newsletter: false,
};
export const valid = (p: Profile) =>
  p.firstName.trim().length > 0 &&
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email.trim());
const C = createContext<{
  profile: Profile | null;
  loading: boolean;
  save: (p: Profile) => Promise<void>;
  logout: () => Promise<void>;
}>({
  profile: null,
  loading: true,
  save: async () => {},
  logout: async () => {},
});
export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem("little-lemon-profile")
      .then((v) => {
        if (v) {
          try {
            const p = JSON.parse(v);
            if (valid(p)) setProfile({ ...empty, ...p });
          } catch {}
        }
      })
      .finally(() => setLoading(false));
  }, []);
  return (
    <C.Provider
      value={{
        profile,
        loading,
        save: async (p) => {
          const value = {
            ...p,
            firstName: p.firstName.trim(),
            email: p.email.trim(),
          };
          await AsyncStorage.setItem(
            "little-lemon-profile",
            JSON.stringify(value),
          );
          setProfile(value);
        },
        logout: async () => {
          await AsyncStorage.removeItem("little-lemon-profile");
          setProfile(null);
        },
      }}
    >
      {children}
    </C.Provider>
  );
}
export const useProfile = () => useContext(C);
