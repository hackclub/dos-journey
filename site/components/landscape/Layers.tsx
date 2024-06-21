'use client';
import { useState, useEffect, ReactNode, Fragment, useRef } from "react";
import Image from "next/image";
import Action from "./Action";
import { ActionData, Page } from "@/types/Pathways";
import DevelopmentSettings from "@/DEVELOPMENT_SETTINGS";


export default function Layers({ data, children }:{ data: Page | { layers: string[], actions: ActionData[] }, children?: ReactNode }) {
  const { ANIMATE_LAYERS } = DevelopmentSettings;
  const { layers, actions } = data;
  const layerCollectionRef = useRef<HTMLDivElement>(null!);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [divPosition, setDivPosition] = useState({ top: 0, left: 0 });
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  function mapRange(x: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return outMin + (((x - inMin) * (outMax - outMin)) / (inMax - inMin));
  }

  function handleMouseMove(event: MouseEvent) {
    if (!ANIMATE_LAYERS) return;
    const { clientX, clientY } = event;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    setDivPosition({ top: clientY, left: clientX });

    console.log('top:', layerCollectionRef.current?.querySelectorAll('div')[1].getBoundingClientRect().top, '\nbottom:', layerCollectionRef.current?.querySelectorAll('div')[layers.length - 1].getBoundingClientRect().bottom, '\nheight:', getHeight(), '\ndifference:', layerCollectionRef.current?.querySelectorAll('div')[1].getBoundingClientRect().top - layerCollectionRef.current?.querySelectorAll('div')[layers.length - 1].getBoundingClientRect().bottom);
  };

  const colors = ['bg-rose-500', 'bg-orange-500', 'bg-amber-500', 'bg-emerald-500', 'bg-sky-500', 'bg-violet-500', 'bg-zinc-500']

  const getHeight = () => {
    const lastElement = layerCollectionRef.current?.querySelectorAll('div')[layers.length - 1];
    const bottom = lastElement?.getBoundingClientRect().bottom;
    const top = layerCollectionRef.current?.querySelectorAll('div')[1]?.getBoundingClientRect().top;
    // console.log('bottom', bottom, 'top', top)
    return bottom && top ? (bottom - top) : 1024;
  }

  const calculateTop = () => {
    return -mapRange(divPosition.top, 0, 1024, 0, innerHeight) + (innerHeight * (64 / 1024))
  }

  const calculateLeft = () => {
    return -mapRange(divPosition.left, 0, 1440, -(0.05 * innerWidth), 0.05 * innerWidth)
  }


  return (
    <>
    <div className="w-screen h-screen relative top-0 left-0 overflow-hidden" ref={layerCollectionRef}>
      {/* <VignetteOverlay /> */}
      <div className="relative overflow-visible" style={{
      top: Math.min(innerHeight * (32 / 1024), calculateTop())
    }}>
        {
          layers.map((layer, i) => (
            <div className="w-screen h-auto absolute flex justify-center items-center overflow-visible transition-all ease-out pointer-events-none" key={i} style={{
              left: Math.max(calculateLeft() * (1.25 / i), -0.025 * innerWidth),
            }}>
              <Image
                src={layer}
                alt=""
                width={1440}
                height={1024}
                className="w-screen h-auto scale-110"
              />
              {/* <div className={`absolute w-[45vh] h-[32vh] h-4 ${colors[i]}`}></div> */}
            </div>
          ))
        }
      </div>
    </div>
    <div className="w-screen h-screen fixed top-0 overflow-hidden">
      {
        actions.map((action, i) => (
          <Fragment key={i}>
            <Action percentX={action.x} percentY={action.y} title={action.title} route={action.route} follow={{
              src: 2,
              basePosition: {
                //-1 * (divPosition.top * ((layers.length - 1 === 0 ? 0.3 : layers.length - 1) * ((getHeight() || 1024) / window.innerHeight / 1.25)) - 50)
                top: Math.min(innerHeight * (64 / 1024), calculateTop()),
                left: calculateLeft() * (1.25 / (layers.length - 1)),
              }
            }} icon={action.icon}>
              {children}
            </Action>
          </Fragment>
        ))
      }
    </div>
    </>
  )
}

function VignetteOverlay() {
  return (
    <div className="fixed inset-0 z-[999] opacity-50 flex items-center justify-center pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/0 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/0 to-black/80"></div>
    </div>
  )
}