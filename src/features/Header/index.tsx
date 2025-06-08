import { LocalStorageKeys } from "@/shared/constants/localStorageKeys";
import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Header = () => {
  const isUserLoggedIn = useMemo(
    () => !!localStorage.getItem(LocalStorageKeys.ACCESS_TOKEN),
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const toggleBounty = () => {
    setIsOpen((p) => !p);
  };
  return isUserLoggedIn ? (
    <div className="p-2 flex gap-2">
      <Link to="/" className="[&.active]:font-bold">
        Home
      </Link>
      <div>
        <div>
          <Link to="/bounty" className="[&.active]:font-bold">
            Bounty
          </Link>
          <span className="cursor-pointer ml-[4px]" onClick={toggleBounty}>
            +
          </span>
        </div>

        {isOpen && (
          <div className="cursor-pointer">
            <Link to="/bounty/create" className="[&.active]:font-bold">
              Create Bounty
            </Link>
          </div>
        )}
      </div>
    </div>
  ) : null;
};
