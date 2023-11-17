"use client"
import React from 'react'
import { useRouter} from 'next/navigation';
export default function(){
    const [roomId, setRoomId] = React.useState('');
    const router = useRouter();
    function handleClick(){
        router.push(`/rooms/${roomId}`)
    }
    return(
        <>
            <input
                type ="text"
                placeholder = "Eg. 123456789"
                onChange = {(e)=>setRoomId(e.target.value)}
            required/>
            <button onClick={handleClick}>
                Submit
                </button>
        </>
        
        
    )
}