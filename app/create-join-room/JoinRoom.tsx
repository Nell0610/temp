"use client"
import React from 'react'
import { useRouter} from 'next/navigation';
export default function Home(){
    const [roomId, setRoomId] = React.useState('');
    const router = useRouter();
    function handleClick(){
        router.push(`/rooms/${roomId}`)
    }
    return(
        <>
            <div className="grid">
                <input
                    className="col-span-12 text-center max-w-full"
                    type ="text"
                    placeholder = "Eg. 123456789"
                    onChange = {(e)=>setRoomId(e.target.value)}
                required/>
                <button className= "col-span-12" onClick={handleClick}>
                    Join Room
                </button>
            </div>
        </>
        
        
    )
}