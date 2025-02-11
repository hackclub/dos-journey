'use client';
import Background from "@/components/landscape/Background";
import MapMenu from "@/components/map/MapMenu";
import { useState } from "react";

export default function Map() {
  // api calls for progress go here
  const [module, setModule] = useState("Start Hacking");
  return (
    <div className="w-screen h-screen">
      <MapMenu module={module} setModule={setModule}>
        
      </MapMenu>
    </div>
  )
}