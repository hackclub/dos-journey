import Layers from "@/components/landscape/Layers";
import MapModal from '@/components/map/Modal';
import dynamic from 'next/dynamic';
import MDXStyleProvider from '@/components/panels/layout/styling/MDXStyleProvider';
import { AdventureChapter } from '@/types/Pathways';
import { notFound } from 'next/navigation';
import STAGE_CONFIG from '@/app/StageConfig';

export default async function Stage({ params }: { params: { path: AdventureChapter, stage: string } }) {
  const { path, stage } = params;

  const data = STAGE_CONFIG;
  const currentStage = data[path].find(p => p.id === stage);

  if (!data[path] || !currentStage) {
    notFound();
  }
  
  const SidePanelContent = dynamic(() => import(`@/mdx-content/${path}/${stage}/index.mdx`));
  
  return (
    <main className="block w-screen h-screen" style={{
      backgroundColor: currentStage!.options?.bgColor || 'white',
    }}> 
      <Layers data={currentStage!}>
        <MDXStyleProvider><SidePanelContent /></MDXStyleProvider>
      </Layers>
      <MapModal /> {/* both the button and the map modals are under MapModal */}
    </main>
  )
}