import React from 'react'
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
export default function Home(){
    return(
        <>
            <div className="w-457 h-433">
                <div className ="w-full">
                    <CreateRoom/>
                </div>
                <div className ="w-full">
                    <JoinRoom/>
                </div>
                
            </div>
        </>
    )
}