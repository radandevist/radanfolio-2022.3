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
      defaultChecked={false}
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
)
;
