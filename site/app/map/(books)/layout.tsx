import { ReactNode } from "react";

export default function Layout({ children }:{ children: ReactNode }) {
  return (
    <>
      <button className="absolute px-8 py-4 bg-hc-primary rounded-full text-3xl font-bold text-white bottom-[5vh] left-[5vh] z-50">Map</button>
      {children}
    </>
  )
}