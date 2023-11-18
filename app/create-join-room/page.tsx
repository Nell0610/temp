"use client";

import { useRouter} from 'next/navigation';
import { getAuth } from 'firebase/auth';
import { doc, runTransaction, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {db} from '../../config';
import React, { useState } from "react";
import { error } from 'console';

const colors = ['violet', 'blue', 'green', 'amber'];


export default function Home() {
    const [roomId, setRoomId] = React.useState('');
    const router = useRouter();
    const auth = getAuth();

    const createRoom = async () => {
      const user = auth.currentUser;
      
      try{
          const userDisplayName = user?.displayName || user?.email;
          const userRef = doc(db, "users", user.uid)
          const playerCount = 1;
          const playerColor = colors[playerCount - 1];
          const roomRef = await addDoc(collection(db, "rooms"), {
              number: roomId,
              createdBy: user?.uid,
              playerCount: playerCount,
              players: {
                [user.uid]: {
                  displayName: userDisplayName,
                  playerNumber: playerCount, 
                  color: playerColor,
                }
              },
          });
          router.push(`/rooms/${roomRef.id}`)
          console.log("Room ID: ", roomRef.id)
          setRoomId(roomRef.id);
        }catch (e){
          console.error("Error creating room: ", e);
        }
    };

    const joinRoom = async (roomId) => {
      const user = auth.currentUser;
      const roomRef = doc(db, 'rooms', roomId);
      try{
        await runTransaction(db, async (transaction) => {
          const roomDoc = await transaction.get(roomRef);

          if (!roomDoc.exists()) {
            throw new Error('Room does not exist');
          }

          const roomData = roomDoc.data();
          const newPlayerNumber = roomData.playerCount + 1;
          const playerColor = colors[(newPlayerNumber - 1) % colors.length];
          const userDisplayName = user?.displayName || user?.email;

          const newPlayerData = {
            name: userDisplayName,
            playerNumber: newPlayerNumber,
            color: playerColor,
          };

          transaction.update(roomRef, {
            [`players.${user.uid}`]: newPlayerData,
            playerCount: newPlayerNumber
          });
        });

        router.push(`/rooms/${roomId}`)
      } catch (error) {
        console.error("Error joining room: ", error);
        throw error;
      }
    };


  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col  justify-center">
          <div className="text-zinc-50 text-left pb-2">Enter Room Code</div>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl text-center py-3 px-10"
            placeholder="Enter room code"
            required
            onChange = {(e)=>setRoomId(e.target.value)}
          ></input>
          <div className="flex flex-col self-stretch mt-14">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 py-3 mb-5 rounded-2xl"
               onClick={() => joinRoom(roomId)}
            >
              join room
            </button>

            <button
              className="border-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 border-2 py-3 mb-5 rounded-2xl"
               onClick={createRoom}
            >
              Create Room
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
