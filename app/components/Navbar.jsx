"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { NAVBAR } from "../utils/constantes";
const Navbar = ({ page }) => {
  const router = useRouter();

  return (
    <div className="flex gap-[10px] fixed w-full h-[72px] items-center justify-evenly bottom-0 bg-white">
      {NAVBAR.map(
        ({ page: pageIcon, icon: Icon, activeIcon: ActiveIcon }, index) => (
          <button
            onClick={() => router.push(pageIcon.toLocaleLowerCase())}
            key={index}
            type="button"
            className="active:bg-[#00000010] transition-all w-[60px] p-2 rounded flex flex-col items-center "
          >
            {page === pageIcon ? (
              <>
                <ActiveIcon className="text-azulMarino" size={"25px"} />
                <p className="text-[10px]">{pageIcon}</p>
              </>
            ) : (
              <>
                <Icon className="text-azulMarino" size={"25px"} />

                <p className="text-[10px]">{pageIcon}</p>
              </>
            )}
          </button>
        )
      )}
    </div>
  );
};

export default Navbar;
