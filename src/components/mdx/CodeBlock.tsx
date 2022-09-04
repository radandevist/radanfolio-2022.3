import { FC } from "react";

export const CodeBlock: FC = ({ children }) => (
  <div className="
  bg-brand2-500 rounded-lg
  mx-auto my-5 !mt-0
  ">
    <div className="flex space-x-3 w-full py-5 pl-5">
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-600" />
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-600" />
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-600" />
    </div>
    <div className="
        overflow-x-scroll
        px-5 pb-5
        space-y-5 w-full
        font-mono text-lg md:text-xl
        code-block pre-scrollbar
        ">
      <div>
        <pre>
          {children}
        </pre>
      </div>
    </div>
  </div>
);
