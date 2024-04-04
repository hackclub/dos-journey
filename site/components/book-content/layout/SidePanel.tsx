import Icon from "@hackclub/icons";
import { Transition, Dialog } from "@headlessui/react";
import { Dispatch, Fragment, ReactNode, SetStateAction } from "react";
import SidePanelBackground from "./SidePanelBackground";

export default function SidePanel({
  openPanel, setOpenPanel, title, children
}:{ openPanel: boolean, setOpenPanel: Dispatch<SetStateAction<boolean>>, title: string, children: ReactNode }) {
  
  return (
    <Transition show={openPanel} as={Fragment}>
      <Dialog as={'div'} className="fixed z-40" onClose={() => setOpenPanel(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 z-[1]" />
        </Transition.Child>

        <div className="fixed inset-0 z-[2] overflow-y-auto overflow-x-clip">
          <div className="flex min-h-full items-center justify-end">
            <Transition.Child
              as={Fragment}
              enter="transition-opacity duration-200 delay-[500ms]"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-200 delay-50"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Panel className="h-screen w-[70vw] translate-x-0 overflow-hidden bg-hc-secondary p-4 text-left align-middle shadow-xl">
                <SidePanelBackground>
                  <div className="flex items-center gap-4">
                    <Icon glyph="expand" className="text-hc-primary stroke-4" size={72}></Icon>
                    <Dialog.Title
                      as="h2"
                      className="text-6xl font-bold leading-6 text-hc-primary whitespace-nowrap"
                    >
                      {title}
                    </Dialog.Title>

                    <div className="w-full h-3 bg-hc-primary"></div>
                  </div>
                  <div className="mt-2 prose lg:prose-xl">
                    {children}
                  </div>

                  <div className="mt-4">
                    {/* <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setOpenPanel(false)}
                    >
                      Close
                    </button> */}
                  </div>
                </SidePanelBackground>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}