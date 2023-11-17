import React from 'react'
import CreateRoom from "./CreateRoom"
import JoinRoom from "./JoinRoom"
export default function Home(){
    return(
        <div className="w-457 h-433">
            <JoinRoom/>
            <CreateRoom/>
            {/* <div className ="max-w-full">
                <JoinRoom/>
            </div>
            <div className ="max-w-full">
                <CreateRoom/>
            </div> */}
        </div>
    )
}