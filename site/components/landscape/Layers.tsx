'use client';
import { useState, useEffect, ReactNode, Fragment } from "react";
import Layer3D from "./Layer3D";
import Image from "next/image";
import Action from "./Action";

interface Layer {
  book: 1 | 2 | 3 | 4,
  image: string;
  
}

interface ActionData {
  title: string,
  link: `/${string}`,
  x: number,
  y: number
}

interface BookData {
  layers: string[],
  actions: ActionData[],
}

export default function Layers({ data, children }:{ data: BookData, children: ReactNode }) {
  const { layers, actions } = data;

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [divPosition, setDivPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  function handleMouseMove(event: MouseEvent) {
    const { clientX, clientY } = event;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // Calculate position relative to the center of the viewport
    const relativeX = clientX - centerX;
    const relativeY = clientY - centerY;
    
    setMousePosition({ x: relativeX, y: relativeY });

    const movementX = relativeX / 10;
    const movementY = relativeY / 10;

    // Calculate new position of the div
    const newTop = viewportHeight / 2 + movementY - (window.innerHeight / 2);
    const newLeft = viewportWidth / 2 + movementX - (window.innerWidth / 2);
    
    setDivPosition({ top: newTop, left: newLeft });
  };

  return (
    <>
      {
        layers.map((layer, i) => (
          <div className="w-screen h-screen scale-125 absolute flex justify-center items-center overflow-hidden transition-all ease-out pointer-events-none" key={i} style={{
            top: -1 * (divPosition.top * ((i === 0 ? 0.8 : i) * 0.5) + 0.3),
            left: -1 * (divPosition.left * ((i === 0 ? 0.8 : i) * 0.5) + 0.3),
          }}>
            <Image
              src={layer}
              alt=""
              width={1728}
              height={1117}
              className="w-screen h-auto"
            />
          </div>
        ))
      }
      {
        actions.map((action, i) => (
          <Fragment key={i}>
            <Action percentX={action.x} percentY={action.y} variant="side-panel" title={action.title} link={action.link} follow={{
              src: 2,
              basePosition: {
                top: -1 * (divPosition.top + 0.3),
                left: -1 * (divPosition.left + 0.3)
              }
            }}>
              {children}
            </Action>
          </Fragment>
        ))
      }
    </>
  )
}