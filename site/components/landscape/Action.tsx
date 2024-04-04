'use client';
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, ReactNode, useEffect, useState } from "react";
import SidePanel from "../book-content/layout/SidePanel";
import Icon from "@hackclub/icons";

interface MapTransitionProps {
  variant: 'map-transition';
  destination: `/${string}`;
  link: string;
}

interface SidePanelProps {
  variant: 'side-panel';
  title: string
  link: string;
  children: ReactNode
}

type ActionProps = (MapTransitionProps | SidePanelProps) & {
  
  /**
   * Enables following of a specific layer in mouse movement
   */
  follow?: {
    src: number,
    basePosition: {
      top: number,
      left: number,
    },
  };
  percentX: number;
  percentY: number;
}

export default function Action(props: ActionProps) {
  const router = useRouter();
  const { variant, percentX, percentY, follow } = props;
  const [followData, setFollowData] = useState(follow);
  const [isHovered, setIsHovered] = useState(false);
  const [openPanel, setOpenPanel] = useState(false);

  

  const handleClick = () => {
    switch (variant) {
      case "map-transition": {
        router.push(props.destination)
      }
      case "side-panel": {
        setTimeout(() => {
          setOpenPanel(true);
        }, 0);
      }
    }
  }

  useEffect(() => {
    setFollowData(follow);
  }, [follow]);

  const handleMovement = () => {
    console.log('moved')
  };
  return (
    <>
    <button 
      className="h-16 w-16 rounded-full border-4 border-white bg-hc-primary absolute z-[30] transition-[width] hover:w-52 delay-300 px-2 pointer-events-auto flex justify-center gap-1 items-center hover:cursor-pointer overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      style={{
        top: followData ? `calc(${percentY}% + ${followData.basePosition.top}px)` : `${percentY}%`,
        left: followData ? `calc(${percentY}% + ${followData.basePosition.left}px)` : `${percentX}%`,
      }}
    >
      <span className="font-bold text-white whitespace-nowrap">
        <Icon glyph="rep" size={48} />
      </span>
      <Transition
        show={isHovered}
        enter="transition-all overflow-hidden duration-100 delay-[750ms]"
        enterFrom="opacity-0 w-0"
        enterTo="opacity-100 w-fit"
        leave="transition-all overflow-hidden duration-100"
        leaveFrom="opacity-100 w-fit"
        leaveTo="opacity-0 w-0"
      >
        <span className="font-bold text-white whitespace-nowrap text-2xl">Get Started</span>
      </Transition>
    </button>
    { variant === 'side-panel' && (
      <SidePanel
        openPanel={openPanel} setOpenPanel={setOpenPanel}
        title={props.title}
      >
        {props.children}
      </SidePanel>
    )}
    </>

  )
}