"use client";

import Header from "@/components/header";
import { store } from "@/store";
import { Provider } from "react-redux";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <div className="flex flex-col">
        <Header />
        <div className="max-w-[1300px] px-4 mx-auto w-full mt-10">
          {children}
        </div>
      </div>
    </Provider>
  );
}
