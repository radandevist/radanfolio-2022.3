"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { v4 } from "uuid";

import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useClickOutside } from "../../hooks/useClickOutside";
import { PATH_NAMES } from "../../constants/pathNames";
import { BoxIcon } from "../../components/admin/icons/BoxIcon";
import { ArrowLeftIcon } from "../../components/admin/icons/ArrowLeftIcon";
import { MosaicLogo } from "../../components/admin/icons/MosaicLogo";
import { ExitIcon } from "../../components/admin/icons/ExitIcon";

const sidebarMenuItems = [
  {
    label: "Dashboard",
    href: PATH_NAMES.admin.home,
    icon: BoxIcon,
  },
  {
    label: "Posts",
    href: PATH_NAMES.admin.posts,
    icon: BoxIcon,
  },
  {
    label: "Projects",
    href: PATH_NAMES.admin.projects,
    icon: BoxIcon,
  },
  {
    label: "Memes",
    href: PATH_NAMES.admin.memes,
    icon: BoxIcon,
  },
];

type Props = {
  sidebarOpen: boolean;
  toggleSidebarOpen: () => void;
};

export function Sidebar({
  sidebarOpen,
  toggleSidebarOpen,
}: Props) {
  const [sidebarExpanded, setSidebarExpanded] = useLocalStorage("sidebar-expanded", true);
  const pathName = usePathname();

  useEffect(() => {
    // TODO: move this logic to a React context (like we do with dark and light themes)
    document.querySelector("body")!.classList.toggle("sidebar-expanded");
  }, [sidebarExpanded]);

  function toggleSidebarExpanded() {
    setSidebarExpanded(!sidebarExpanded);
  }

  const trigger = useRef(null);
  const { node: sidebar } = useClickOutside<HTMLDivElement>({ // close on click outside
    onClickOutside() {
      if (sidebarOpen) {
        toggleSidebarOpen();
      }
    },
  });

  return (
    <div>
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-slate-900 bg-opacity-30 z-40 lg:hidden lg:z-auto
          transition-opacity duration-200
          ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto
          lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto 
          no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0
          bg-slate-800 p-4 transition-all duration-200 ease-in-out 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-slate-500 hover:text-slate-400"
            onClick={toggleSidebarOpen}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <ArrowLeftIcon />
          </button>
          {/* Logo */}
          <Link href="/admin" className="block">
            <MosaicLogo />
          </Link>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <h3 className="text-bo-xs uppercase text-slate-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                aria-hidden="true"
              >
                •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>

            <ul className="mt-3">
              {sidebarMenuItems.map(({
                label,
                href,
                icon: Icon,
              // eslint-disable-next-line arrow-body-style
              }) => {
                // const active = !!pathName?.includes(href) && pathName.startsWith(href);
                // const active = pathName?.startsWith(href);
                // const active = pathName?.slice(1).include(href.slice(1));
                const active = (href === PATH_NAMES.admin.home)
                  ? pathName === PATH_NAMES.admin.home
                  : pathName?.startsWith(href);

                return (
                  <li
                    key={v4()}
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0
                      ${active && "bg-slate-900"}`}
                  >
                    <Link
                      // end
                      href={href}
                      className={`block text-slate-200 hover:text-white truncate transition
                        duration-150 ${active && "hover:text-slate-200"}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <Icon className={`${active && "fill-current text-indigo-600"}`} />
                          <span
                            className="text-bo-sm font-medium ml-3 lg:opacity-0
                              lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
                          >
                            {label}
                          </span>
                        </div>
                        {/* Badge */}
                        {/* <div className="flex flex-shrink-0 ml-2">
                          <span
                            className="inline-flex items-center justify-center h-5 text-bo-xs
                              font-medium text-white bg-indigo-500 px-2 rounded"
                          >
                            4
                          </span>
                        </div> */}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Expand / collapse button */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button onClick={toggleSidebarExpanded}>
              <span className="sr-only">Expand / collapse sidebar</span>
              <ExitIcon className="sidebar-expanded:rotate-180"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
