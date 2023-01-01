"use client";

import { PropsWithChildren } from "react";
import { Provider as ReduxProvider } from "react-redux";

import { store } from "../redux/store";

type Props = PropsWithChildren<{}>;

function Providers({ children }: Props) {
  return (
    <ReduxProvider store={store}>
      {children}
    </ReduxProvider>
  );
};

export default Providers;
