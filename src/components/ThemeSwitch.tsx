import React, { FC } from "react";

export type SwitchProps = {
  label: string;
  onToggle: () => void;
  checked: boolean;
};

export const ThemeSwitch: FC<SwitchProps> = ({ label, checked, onToggle }) => (
  <label className="relative inline-flex justify-between
    items-center group p-2 text-sm md:text-md lg:text-lg
    switch-toggler"
  >
    <span className="text-label">{label}</span>
    <input
      type="checkbox"
      className="absolute left-1/2 -translate-x-1/2
        w-full h-full peer appearance-none rounded-md
        cursor-pointer"
      checked={checked}
      onClick={onToggle}
      onChange={() => {}}
      // defaultChecked={false}
    />
    <span
      className="w-12 h-[1.875rem] flex items-center
        flex-shrink-0 ml-4 p-1 bg-gray-300 rounded-full
        duration-300 ease-in-out peer-checked:bg-brand1-400
        after:w-6 after:h-6 after:bg-white after:rounded-full
        after:shadow-md after:duration-300
        peer-checked:after:translate-x-4
        group-hover:after:translate-x-1
        cursor-pointer"
    >
    </span>
  </label>
);

type SwitchV3Props = {
  onToggle: () => void;
  isDark: boolean;
  className?: string;
};

export const ThemeSwitchV3: FC<SwitchV3Props> = ({ onToggle, isDark, className }) => (
  <button className={className} onClick={onToggle}>
    {(!isDark)
      ? (
        <span className="dark:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7"
          >
            <path
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              className="stroke-slate-700 dark:stroke-slate-500">
            </path>
            <path
            // eslint-disable-next-line max-len
              d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
              className="stroke-slate-700 dark:stroke-slate-500"
            >
            </path>
          </svg>
        </span>
      ) : (
        <span className="hidden dark:inline">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-7 h-7"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
              className="fill-sky-400/20"
            >
            </path>
            <path
              // eslint-disable-next-line max-len
              d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.99L8.706 5.08C5.397 6.094 3 9.201 3 12.867h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
              className="fill-brand1-500"></path>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              // eslint-disable-next-line max-len
              d="M17 3a1 1 0 0 1 1 1 2 2 0 0 0 2 2 1 1 0 1 1 0 2 2 2 0 0 0-2 2 1 1 0 1 1-2 0 2 2 0 0 0-2-2 1 1 0 1 1 0-2 2 2 0 0 0 2-2 1 1 0 0 1 1-1Z"
              className="fill-brand1-500"
            ></path>
          </svg>
        </span>
      )}
  </button>
);
