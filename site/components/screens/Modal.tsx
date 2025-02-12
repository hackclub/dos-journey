import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export function Loading(){
    const [ message, setMessage ] = useState("")
    const loadingMessages = [
        "Searching for hidden treasure...",
        "Seeking land!",
        "Hunting dragons 🐉",
        "Going overboard 🚢",
        "All aboard!",
        "Searching for gold...",
        "Battling monsters 👹",
        "Discovering secrets..."
    ]
    useEffect(() => {
        setMessage(loadingMessages[Math.floor(Math.random()*loadingMessages.length)])
    }, [])

    return (
        <div className = "bg-black w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-white text-2xl">Loading...</h1>
            <p className="mt-2 text-white text-base">{message}</p>
        </div>
    )
}

export function Unauthenticated({page}: {page: string}){
    const router = useRouter();
    return (
        <div className = "bg-black w-screen h-screen flex flex-col items-center justify-center">
            <h1 className="text-white text-2xl">Not logged in!</h1>
            <p className="mt-2 text-white text-base">Click <a onClick={() => router.push(page)}>here</a> to sail home ⛵</p>
        </div>
    )
}

