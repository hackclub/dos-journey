import Layers from "@/components/landscape/Layers"
import WelcomeModal from "@/components/welcome/WelcomeModal"

export default async function Index() {
  // const session = await auth()

  return (
    <main className="w-screen h-[200vh] relative flex flex-col justify-center items-center bg-sky-300">
      <div className="w-screen h-screen fixed top-0 left-0 z-[0] overflow-hidden">
        <Layers
        // example layers, will have updated art in the long run
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
          {/* hero section, check auth for ongoing session and this will say continue hacking instead of start, otherwise you'll have to scroll to the bottom to start hacking (or something like that) */}
          <h1 className="text-7xl font-bold text-hc-blue drop-shadow">A Girl's STEM Journey at Hack Club</h1>
          <WelcomeModal />
        </div>
        <div className="w-screen h-screen bg-hc-secondary">
          {/* to do: a blurb about days of service, think something like the counter from the gwynne shotwell site: https://gwynne.hackclub.dev */}
        </div>
      </div>
    </main>
  )
}

