"use client";
import React, {useEffect}from 'react'  
import 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import {initializeApp} from 'firebase/app';
import { serverTimestamp, collection, addDoc, getFirestore} from 'firebase/firestore';
import { useRouter} from 'next/navigation';
import {db} from '../../config';
// import firebaseConfig from './ZotQuest 2/temp/firebaseConfig'



export default function CreateRoom(){
    const [roomName, setRoomName] = React.useState('');
    const [roomId, setRoomId] = React.useState('');
    const [error, setError]= React.useState('');

    const router = useRouter();
    useEffect(()=>{
        if(roomId){
            router.push(`/rooms/${roomId}`)
        }
    },[roomId, router])
    const createRoom = async () => {
        // if(!roomName){
        //     setError("Please enter a room name.");
        //     return;
        // }
        try{
            const roomRef = await addDoc(collection(db, "rooms"), {
                name: roomName
            });
            console.log("Room ID: ", roomRef.id)
            setRoomId(roomRef.id);
        }catch (e){
            console.error("Error creating room: ", e);
            setError("Error creating room")
        }
    };
    return(
        <div className ="text-center max-w-full">
            {error && <p>{error}</p>}
            {/* <input
                type="text"
                value={roomName}
                onChange = {(e)=>setRoomName(e.target.value)}
                placeholder = "Enter Room name"
                className="text-black"
            /> */}
            <button className="text-center" onClick = {createRoom}>Create Room</button>
        </div>
    );
}