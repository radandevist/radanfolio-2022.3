export const ScrollTopWidget = () => (
  <button
    onClick={() => {
      window.scrollTo({top: 0, behavior: "smooth"});
    }}
    className="z-50 fixed bottom-10 right-5 md:right-10"
    role="button"
    aria-label="scroll-to-top"
    id="scroll-top-widget"
  >
    <div
      className="w-12 h-12 md:w-14 md:h-14 rounded-full
        grid place-items-center text-white
        bg-brand1-contrasted/90 shadow-xl shadow-brand1-500/50"
    >
      <svg
        // xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 11l5-5m0 0l5 5m-5-5v12"
        />
      </svg>
    </div>
  </button>
);
