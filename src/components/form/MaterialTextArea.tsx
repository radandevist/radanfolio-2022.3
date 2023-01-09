type Props = {
  label: string;
  id: string;
  // type: HTMLInputTypeAttribute;
  required?: boolean;
  error?: string;
  rows?: number;
};

export function MaterialTextArea({ label,
  id,
  // type,
  required,
  error,
  rows,
}: Props) {
  return (
    <>
      <div className="relative">
        <textarea
          // type={type}
          id={id}
          required={required}
          rows={rows}
          // eslint-disable-next-line max-len
          className={`block py-2.5 px-0 w-full text-lg text-slate-900 bg-transparent border-0 border-b-2
            appearance-none dark:text-white
            ${error
      ? "dark:border-red-600 border-red-300 focus:border-red-600"
      : "dark:border-slate-600 border-slate-300 focus:border-emerald-600"}
            dark:focus:border-emerald-500
            focus:outline-none focus:ring-0  peer
            scrollbar`}
          placeholder="   "
        />
        {/* eslint-disable-next-line max-len */}
        <label
          htmlFor={id}
          // eslint-disable-next-line max-len
          className={`absolute text-base
            duration-300 transform -translate-y-6 scale-75 top-3 pointer-events-none
            origin-[0] peer-focus:left-0
            ${error
      ? "peer-focus:text-red-600 peer-focus:dark:text-red-500 text-red-500 dark:text-red-400"
      // eslint-disable-next-line max-len
      : "peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 text-slate-500 dark:text-slate-400"}
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
            peer-focus:scale-75 peer-focus:-translate-y-6`}
        >
          {label}{required && "*"}
        </label>
      </div>
      {/* eslint-disable-next-line max-len */}
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">
          {error}
        </p>
      )}
    </>
  );
}
