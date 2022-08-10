import { FC } from "react";

export const CodeBlock: FC = ({ children }) => (
  <div className="flex overflow-hidden relative flex-col
      p-5 mx-auto my-5 space-y-5 w-full font-mono
      text-lg md:text-xl
      rounded-lg bg-brand2
      !mt-0">
    {/* text-2xl md:text-3xl font-light first-letter:text-4xl */}
    <div className="flex space-x-3 w-full">
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-red-600" />
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-yellow-600" />
      <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-green-600" />
    </div>
    <div>
      <div className="new-rehype-code-title"></div>
      <pre>
        {children}
      </pre>
    </div>
  </div>
);
