import { ReactNode } from "react";

export default function Layer3D({ children, position, offset }: { children: ReactNode, position: { left: number, top: number}, offset: { left: number, top: number } | number}) {
  return (
    <div className="w-screen h-screen scale-125 absolute flex justify-center items-center overflow-hidden transition-all ease-out pointer-events-none" style={{
      top: position.top * (typeof offset === 'number' ? offset : offset.top),
      left: position.left * (typeof offset === 'number' ? offset : offset.left),
    }}>
      {children}
    </div>
  )
}