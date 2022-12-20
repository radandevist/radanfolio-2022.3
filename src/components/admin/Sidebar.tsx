"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

import { useLocalStorage } from "../../hooks/useLocalStorage";

function BoxIcon({ className }: {
  className?: string;
}) {
  return (
    <svg
      className={`shrink-0 h-6 w-6 ${className}`}
      viewBox="0 0 24 24"
    >
      <path
        className="fill-current text-gray-400"
        // :class="page.startsWith('ecommerce-') && 'text-indigo-300'"
        d="M13 15l11-7L11.504.136a1 1 0 00-1.019.007L0 7l13 8z"
      />
      <path
        className="fill-current text-gray-700"
        // :class="page.startsWith('ecommerce-') && '!text-indigo-600'"
        d="M13 15L0 7v9c0 .355.189.685.496.864L13 24v-9z"
      />
      <path
        className="fill-current text-gray-600"
        // :class="page.startsWith('ecommerce-') && 'text-indigo-500'"
        d="M13 15.047V24l10.573-7.181A.999.999 0 0024 16V8l-11 7.047z"
      />
    </svg>
  );
}

const items = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: BoxIcon
  },
  {
    label: "Posts",
    href: "/admin/posts",
    icon: BoxIcon
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: BoxIcon
  },
  {
    label: "Memes",
    href: "/admin/memes",
    icon: BoxIcon
  },
];

type SidebarBackdropProps = {
  sidebarOpen: boolean;
};

function SidebarBackdrop({ sidebarOpen }: SidebarBackdropProps) {
  return (
    <div
      // eslint-disable-next-line max-len
      className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200
      ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      // :className="sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'"
      // aria-hidden="true"
      // x-cloak
    />
  );
}

function SidebarHeader() {
  return (
    <div className="flex justify-between mb-10 pr-3 sm:px-2">
      {/* <!-- Close button --> */}
      <button
        className="lg:hidden text-gray-500 hover:text-gray-400"
      // @click.stop="sidebarOpen = !sidebarOpen"
      // aria-controls="sidebar"
      // :aria-expanded="sidebarOpen"
      >
        <span className="sr-only">Close sidebar</span>
        <svg
          className="w-6 h-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
        </svg>
      </button>

      {/* <!-- Logo --> */}
      <Link className="block" href="/admin">
        <svg width="32" height="32" viewBox="0 0 32 32">
          <defs>
            <linearGradient x1="28.538%" y1="20.229%" x2="100%" y2="108.156%" id="logo-a">
              <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
              <stop stopColor="#A5B4FC" offset="100%" />
            </linearGradient>
            <linearGradient x1="88.638%" y1="29.267%" x2="22.42%" y2="100%" id="logo-b">
              <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
              <stop stopColor="#38BDF8" offset="100%" />
            </linearGradient>
          </defs>
          <rect fill="#6366F1" width="32" height="32" rx="16" />
          <path
            // eslint-disable-next-line max-len
            d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
            fill="#4F46E5"
          />
          <path
            // eslint-disable-next-line max-len
            d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
            fill="url(#logo-a)"
          />
          <path
            // eslint-disable-next-line max-len
            d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
            fill="url(#logo-b)"
          />
        </svg>
      </Link>
    </div>
  );
}

type SidebarItemLinkProps = {
  label: string;
  href: string;
  icon: React.FC<{ className: string }>;
  active: boolean;
};

function SidebarItemLink ({ label, href, icon: Icon, active }: SidebarItemLinkProps) {
  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${active && "bg-gray-900"}`}
      // :class="page === 'dashboard' && 'bg-gray-900'"
    >
      <Link
        href={href}
        className={`block truncate transition duration-150
        ${active ? "text-white hover:text-gray-300" : "text-gray-300 hover:text-white"}`}
        // :class="page === 'dashboard' && 'hover:text-gray-200'"
        // href="index.html"
      >
        <div className="flex items-center">
          <Icon className={`${active && "fill-current text-indigo-600"}`} />
          <span
            // eslint-disable-next-line max-len
            className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200"
          >
            {label}
          </span>
        </div>
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [sidebarExpanded, setSideBarExpanded] = useLocalStorage("sidebar-expanded", true);
  const pathName = usePathname();

  useEffect(() => {
    document.querySelector("body")!.classList.toggle("sidebar-expanded");
  }, [sidebarExpanded]);

  function toggleSideBarOpen() {
    setSidebarOpen(!sidebarOpen);
  }

  function toggleSideBarExpanded() {
    setSideBarExpanded(!sidebarExpanded);
  }

  return (
    <>
      {/* Mobile Only */}
      <SidebarBackdrop sidebarOpen={sidebarOpen}/>

      <div
        id="sidebar"
        // eslint-disable-next-line max-len
        className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-gray-800 p-4 transition-all duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-64"}`}
        // :className="sidebarOpen ? 'translate-x-0' : '-translate-x-64'"
        // @click.outside="sidebarOpen = false"
        // @keydown.escape.window="sidebarOpen = false"
        // x-cloak="lg"
      >
        <SidebarHeader  />

        {/* Links */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
              <span
                className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
              // aria-hidden="true"
              >
              •••
              </span>
              <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">Pages</span>
            </h3>

            <ul className="mt-3">
              {items.map(
                ({ label, href, icon}) => (
                  <SidebarItemLink
                    active={pathName === href}
                    key={v4()}
                    label={label}
                    href={href}
                    icon={icon}
                  />
                )
              )}
            </ul>
          </div>
        </div>

        {/* <!-- Expand / collapse button --> */}
        <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
          <div className="px-3 py-2">
            <button
              onClick={toggleSideBarExpanded}
              // @click="sidebarExpanded = !sidebarExpanded"
            >
              <span className="sr-only">Expand / collapse sidebar</span>
              <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                <path
                  className="text-gray-400"
                  d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                />
                <path className="text-gray-600" d="M3 23H1V1h2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
