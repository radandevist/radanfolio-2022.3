import React, { MouseEvent } from "react";

import HamburgerIcon from "./icons/HamburgerIcon";

type Props = {
  sidebarOpen: boolean;
  toggleSidebarOpen: () => void;
};

export function Header({
  sidebarOpen,
  toggleSidebarOpen,
}: Props) {
  const handleCloseSidebar = (event: MouseEvent) => {
    event.stopPropagation();
    toggleSidebarOpen();
  };

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">

          {/* Header: Left side */}
          <div className="flex">

            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={handleCloseSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <HamburgerIcon />
            </button>

          </div>

          {/* Header: Right side */}
          <div className="flex items-center space-x-3">
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
