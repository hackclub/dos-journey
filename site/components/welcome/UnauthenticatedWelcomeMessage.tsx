import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";

export default function UnauthenticatedWelcomeMessage() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Trigger animation after a delay (adjust as needed)
    const animationTimeout = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    // Clear the timeout on unmount to avoid memory leaks
    return () => clearTimeout(animationTimeout);
  }, []); // Only run once after component mount

  return (
    <div className="flex flex-col space-y-5 h-full">
      {/* Transition Group for sequential transitions */}
      <Transition
        show={isOpen}
        enter="transition-opacity ease-out duration-500"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-5xl font-bold">Dear aspiring hacker,</div>
      </Transition>

      <Transition
        show={isOpen}
        enter="transition-opacity ease-out duration-500 delay-1000"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-3xl">within the syntax and logic lies the power to craft solutions, innovate, and shape the future.</div>
      </Transition>

      <Transition
        show={isOpen}
        enter="transition-opacity ease-out duration-500 delay-[1500ms]"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity ease-in duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="text-3xl">Embrace this journey with determination, for each line of code you write is a step towards a world transformed by your intellect and creativity.</div>
      </Transition>
    </div>
  );
}