import WelcomeModal from "@/components/welcome/WelcomeModal"

export default async function Index() {
  // const session = await auth()

  return (
    <main className="w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-sky-300">
      <div className="flex flex-col justify-center items-center gap-6">
        <h1 className="text-6xl font-bold text-hc-blue drop-shadow drop-shadow-white">A Girl's STEM Journey at Hack Club</h1>
        <WelcomeModal />
      </div>
      <div className="absolute z-0 w-screen h-screen pointer-events-none">
        {/* will fetch content from a layers.json file in lib to in order, stack each on top of each other using z-indices and offset each other by a threshold to create the navigation effect */}
      </div>
    </main>
  )
}

