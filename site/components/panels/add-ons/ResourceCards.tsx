'use client';
import Icon from "@hackclub/icons"
import { useRouter } from "next/navigation";
import { ReactNode } from "react"

export function ResourceCard({ image, name, description, link, options }:{ image: string, name: string, description: string, link: string, options?: {
  backgroundColor: string,
} }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(link);
  }
  return (
    <div className="not-prose max-w-sm w-full group lg:max-w-full lg:flex hover:scale-105 transition shadow-md relative cursor-pointer" title={`Programming Resource at ${link}`}>
      <div className="h-auto w-32 flex-none bg-cover rounded-l-lg text-center overflow-hidden" style={{backgroundImage: `url(${image})`}}>
      </div>
      <div className="rounded-r-lg p-4 flex flex-col justify-between leading-normal" style={{
        backgroundColor: options?.backgroundColor || '#FFF',
      }}>
        <div className="absolute top-0 right-0 p-4">
          <span className="transition group-hover:translate-x-6 group-hover:translate-y-6">
            <img src="https://icons.hackclub.com/api/icons/hackclub-red/external" className="size-[32px]" alt="" />
          </span>
        </div>
        <div>
          <div className="text-gray-900 font-bold text-xl">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
      </div>
    </div>
  )
}

export function ResourceSection({ children }:{ children: ReactNode }) {
  return (
    <div>
      <div className="text-2xl text-hc-primary font-bold mb-2">Resources</div>
      <div className="grid grid-cols-2 gap-4">
        {children}
      </div>
    </div>
  )
}