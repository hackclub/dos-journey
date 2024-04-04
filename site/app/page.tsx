import Layers from "@/components/landscape/Layers"
import WelcomeModal from "@/components/welcome/WelcomeModal"

export default async function Index() {
  // const session = await auth()

  return (
    <main className="w-screen h-[200vh] relative flex flex-col justify-center items-center bg-sky-300">
      <div className="w-screen h-screen fixed top-0 left-0 z-[0] overflow-hidden">
        <Layers
          data={{
            layers: [
              "https://cloud-kog6p90nc-hack-club-bot.vercel.app/1book1-0.svg",
              "https://cloud-kog6p90nc-hack-club-bot.vercel.app/2book1-1.svg",
              "https://cloud-kog6p90nc-hack-club-bot.vercel.app/0book1-2.svg",
              "https://cloud-kog6p90nc-hack-club-bot.vercel.app/3book1-3.svg",
              "https://cloud-kog6p90nc-hack-club-bot.vercel.app/4book1-4.svg"
            ],
            actions: [],
          }}
        ></Layers>
      </div>
      <div className="relative z-10">
        <div className="flex flex-col w-screen h-screen justify-center items-center gap-6">
          <h1 className="text-7xl font-bold text-hc-blue drop-shadow">A Girl's STEM Journey at Hack Club</h1>
          <WelcomeModal />
        </div>
        <div className="w-screen h-screen bg-hc-secondary"></div>
      </div>
      <div className="absolute z-0 w-screen h-screen pointer-events-none">
        {/* will fetch content from a layers.json file in lib to in order, stack each on top of each other using z-indices and offset each other by a threshold to create the navigation effect */}
      </div>
    </main>
  )
}

