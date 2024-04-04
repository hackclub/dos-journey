import { promises as fs } from 'fs';
import Layers from "@/components/landscape/Layers";
import Icon from '@hackclub/icons';

export default async function Map({ searchParams }: { searchParams: { stage?: number } }) {
  const file = await fs.readFile(process.cwd() + '/app/data.json', 'utf8');
  const data = JSON.parse(file);

  const Content = await import(`@/mdx-content/book-${searchParams.stage}/GettingStarted.mdx`);


  return (
<>
    {searchParams.stage && (
      <div className="block w-screen h-screen" style={{
        backgroundColor: data[`book-${searchParams.stage}`].options.bgColor || 'white',
      }}> 
        <Layers data={data[`book-${searchParams.stage}`]}>
          <Content />
        </Layers>
        <div className="absolute bottom-[5vh] z-20 flex items-center justify-center w-screen">
          <div className='bg-white p-3 text-xl rounded-full flex gap-3'>
            <button className="rounded-full h-10 w-10 bg-white border-[3px] border-hc-primary hover:border-transparent hover:bg-hc-primary hover:text-white flex items-center justify-center text-hc-primary transition">
              <Icon glyph="view-forward" size={32} />
            </button>
            <button className="rounded-full pl-2 pr-3 bg-hc-primary font-bold flex items-center text-white gap-1 hover:bg-white hover:text-hc-primary border-[3px] border-transparent hover:border-hc-primary transition">
              <Icon glyph="compass" size={32} />
              Map
            </button>
          </div>
        </div>
      </div>
    )}

    {!searchParams.stage && (
      <div className="block w-screen h-screen">

      </div>
    )}
</>

  )
}