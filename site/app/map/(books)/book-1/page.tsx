import { promises as fs } from 'fs';
import Layers from "@/components/landscape/Layers";

export default async function GettingStartedPreview() {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  return (
    <div className="w-screen h-screen flex">
      <div className="absolute z-0 w-screen h-screen bg-sky-300">
        
      </div>
    </div>
  )
}