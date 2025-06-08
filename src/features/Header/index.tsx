import { LocalStorageKeys } from "@/shared/constants/localStorageKeys";
import { Link } from "@tanstack/react-router";
import { useMemo } from "react";

export const Header = () => {
  const isUserLoggedIn = useMemo(
    () => !!localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
    []
  );
  console.log(isUserLoggedIn);
  return isUserLoggedIn ? (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <Link to="/bounty" className="[&.active]:font-bold">
        Bounty
      </Link>
    </div>
  ) : null;
};
