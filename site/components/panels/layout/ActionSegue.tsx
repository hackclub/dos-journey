'use client';
// This component represent the buttons at the bottom of adventure segments that can page through an action.

import Icon from "@hackclub/icons";
import { useState } from "react";

export default function ActionSegue() {
  const [ready, setReady] = useState(false);

  return (
    <div className="flex min-w-full justify-between">
      <div className="flex gap-4 text-hc-green text-lg italic items-center">
      <input 
        type="checkbox" 
        onChange={(e) => setReady(e.target.checked)} 
        className="appearance-none checked:bg-hc-green checked:border-transparent !checked:ring-transparent w-8 h-8 rounded-full border-2 border-hc-green focus:outline-none hover:bg-white text-hc-green checked:hover:bg-hc-green focus:ring-0 transition-colors duration-150" 
      />
        Done with this section? Click me to go on!
      </div>
      <button className="flex gap-2 items-center text-hc-primary transition-all hover:gap-4">
        <span className="text-xl">Next Step: Writing your first line of code!</span>
        <Icon glyph="view-forward" size={48}></Icon>
      </button>
    </div>
  )
}