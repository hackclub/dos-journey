import { StageConfiguration } from '@/types/Pathways';

/* ACTION TEMPLATE --

actions: [
  {
    title: string (appears on hover, is also the title of the side panel)
    route: "side-panel" or a link (either opens a side panel or a link to another route on the map)
    x: number,
    y: number,
  }
]
*/

const STAGE_CONFIG: StageConfiguration = {
  discovery: [
    {
      title: "Becoming Technical: Where to Start?",
      id: "getting-started",
      options: {
        bgColor: "#85DAFF"
      },
      layers: [
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/0untitled19_20240601213653.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/1untitled19_20240601213657.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/2untitled19_20240601213707.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/3untitled19_20240601213710.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/4untitled19_20240601213727.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/5untitled19_20240601213731.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/6untitled19_20240601213733.png"
      ],
      actions: [
        {
          title: "Get Started",
          route: "side-panel",
          x: 80.5,
          y: 60.2
        },
        {
          title: "Next: First Line of Code",
          route: "/code/writing-your-first-line",
          icon: "external",
          x: 25,
          y: 57.7
        }
      ]
    }
  ],
  'your-first-repo': [
    {
      title: "Becoming Technical: Where to Start?",
      id: "getting-started",
      options: {
        bgColor: "#85DAFF"
      },
      layers: [
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/0untitled19_20240601213653.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/1untitled19_20240601213657.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/2untitled19_20240601213707.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/3untitled19_20240601213710.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/4untitled19_20240601213727.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/5untitled19_20240601213731.png",
        "https://cloud-d22eiu842-hack-club-bot.vercel.app/6untitled19_20240601213733.png"
      ],
      actions: [
        {
          title: "Get Started",
          route: "side-panel",
          x: 80.5,
          y: 60.2
        },
        {
          title: "Next: First Line of Code",
          route: "/code/writing-your-first-line",
          icon: "external",
          x: 25,
          y: 57.7
        }
      ]
    }
  ],
  code: [
    {
      title: "Writing Your First Line of Code",
      id: "writing-your-first-line",
      options: {
        bgColor: "#85DAFF"
      },
      layers: [
        "https://cloud-kog6p90nc-hack-club-bot.vercel.app/1book1-0.svg",
        "https://cloud-kog6p90nc-hack-club-bot.vercel.app/2book1-1.svg",
        "https://cloud-kog6p90nc-hack-club-bot.vercel.app/0book1-2.svg",
        "https://cloud-kog6p90nc-hack-club-bot.vercel.app/3book1-3.svg",
        "https://cloud-kog6p90nc-hack-club-bot.vercel.app/4book1-4.svg"
      ],
      actions: [
        {
          title: "Write Your First Line",
          route: "side-panel",
          x: 80.5,
          y: 60.2
        },
      ]
    }
  ],

};

export default STAGE_CONFIG;
