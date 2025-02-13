import ACHIEVEMENTS_LIST from "@/app/Achievements";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function Achievements({profileIsOpen}: {profileIsOpen: boolean}){
    const [ achievements, setAchievements ] = useState("")
    const session = useSession();
    async function fetchAchievements(){
        const response = fetch(`/api/achievements`, {
          method: 'GET'
        }).then(r => r.json()).then(data => {setAchievements(  data["message"] ? data["message"]: "" )})
        return response
      }
    
        useEffect(() => {
          if (session.status === "authenticated"){
            fetchAchievements()
          }
        }, [profileIsOpen])

    return (
        <>
        <p className="text-2xl text-hc-primary py-2">You've completed { achievements ? achievements.split(",").length : 0} out of {ACHIEVEMENTS_LIST.length} achievements!</p>

        <div className = "flex flex-col gap-3">
        { (ACHIEVEMENTS_LIST).map((achievement: any, index) => ( // fix types
            <div key={index} className = {`${achievements!.includes(String(achievement.id)) ? "bg-green-400/30" : "bg-gray-200"} border border-gray-400 p-2 rounded-lg flex flex-row gap-2`}>
                <img className = "h-10 my-auto" src = {achievement.icon}/>
                <div>
                    <b>{achievement.title}</b> 
                    <span>
                    <a href = {achievement.link}><img className="inline my-auto h-6" src = "https://icons.hackclub.com/api/icons/hackclub-red/link"/></a>
                </span>
                    <p>{achievement.description}</p>
                    <hr/>
                    <p className = "italic"> { achievements!.includes(String(achievement.id)) ? "Completed!" : "Locked" }</p>
                </div>

                
            </div>
        ))}
        </div>
        </>
    )
}