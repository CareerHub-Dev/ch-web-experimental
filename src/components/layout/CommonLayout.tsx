import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Background } from "./Background";

export function CommonLayout(props: { children: ReactNode }) {
  return (
    <>
      <main className="flex flex-col h-screen">
        <div className="grow">
          <Navbar />
          {props.children}
        </div>
        <Footer />
      </main>
      <Background />
    </>
  );
}
