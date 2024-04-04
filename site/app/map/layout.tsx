import Sidebar from "@/components/map/Map";
import { ReactNode } from "react";
import { promises as fs } from 'fs';
import Layers from "@/components/landscape/Layers";

export default async function NavigationLayout({ children } : { children: ReactNode }) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <main className="w-screen h-screen flex">
      {children}
    </main>
  )
}