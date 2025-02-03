import { useContext, useState, createContext } from 'react';

type SetValue = (value: any) => void;

type mapOpenInterface = {
  mapIsOpen: any;
  setMapIsOpen: SetValue;
};

export const MapIsOpenContext = createContext<mapOpenInterface>(
  {
    mapIsOpen: false,
    setMapIsOpen: () => {}
  }
);

export default function Island(){
    const { mapIsOpen, setMapIsOpen } = useContext(MapIsOpenContext)
    console.log(mapIsOpen)
    return (
        <MapIsOpenContext.Provider value = {{mapIsOpen: mapIsOpen, setMapIsOpen: setMapIsOpen }}>
              <div className="absolute bottom-[5vh] z-20 flex items-center justify-center w-screen">
                <div className='bg-white p-3 text-xl rounded-full flex gap-3'>
                  <button className="rounded-full pl-2 pr-3 bg-hc-primary font-bold flex items-center text-white gap-1 hover:bg-white hover:text-hc-primary border-[3px] border-transparent hover:border-hc-primary transition" onClick={() => setMapIsOpen(true)}>
                    <img src="https://icons.hackclub.com/api/icons/white/compass" className="size-[32px]" alt="" />
                    Map
                  </button>
                  <button className="rounded-full pl-2 pr-3 bg-hc-primary font-bold flex items-center text-white gap-1 hover:bg-white hover:text-hc-primary border-[3px] border-transparent hover:border-hc-primary transition">
                    <img src="https://icons.hackclub.com/api/icons/white/person" className="size-[32px]" alt="" />
                    My Profile (not yet built)
                  </button>
                </div>
              </div>
            </MapIsOpenContext.Provider>
    )
}