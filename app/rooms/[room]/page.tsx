"use client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import React from "react";
import Room from "../Room";
import Popup from "reactjs-popup";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState, useEffect, useMemo } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useSelf,
  useMutation,
 
} from "@/liveblocks.config";
import "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { useRouter } from "next/router";
import { ClientSideSuspense } from "@liveblocks/react";
import { setLazyProp } from "next/dist/server/api-utils";
import Timer from "../Timer";
import { doc, runTransaction, getDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../config';
 

export default function Page({ params }: { params: { room: string} }) {
  const roomId = params.room;
 
  const [playersData, setPlayersData] = useState<{ [key: string]: PlayerData }>({});
  const [player1tasks, setplayer1tasks] = useState(0);
  const [player2tasks, setplayer2tasks] = useState(0);
  const [player3tasks, setplayer3tasks] = useState(0);
  const [player4tasks, setplayer4tasks] = useState(0);
  const [active, setActive] = React.useState(false);

  interface PlayerData {
    displayName: string;
    color: string;
    playerNumber: number;
    userId: string;
  }
  
  // Assuming the structure of your Firestore room data is something like this:
  interface RoomData {
    players: { [userId: string]: PlayerData };
  }

  // fetching user info for player placement
  useEffect(() => {
    const fetchRoomData = async () => {
      const roomRef = doc(db, 'rooms', roomId);
      const roomSnap = await getDoc(roomRef);

      if (roomSnap.exists()) {
        const roomData = roomSnap.data() as RoomData;
        const fetchedPlayers = roomData.players; // This is the object we received from Firestore
        const playersDataTemp: {[key:string]: PlayerData} = {};

        // Iterate over the fetched players and restructure the data
        Object.entries(fetchedPlayers).forEach(([userId, playerData]) => {
          const playerKey = `player${playerData.playerNumber}`;
          playersDataTemp[playerKey] = {
            ...playerData,
            userId,
          };
        });

        setPlayersData(playersDataTemp);
      } else {
        console.error('Room does not exist');
      }
    };

    fetchRoomData();
    }, [roomId]);

  const player1 = 1;
  const player1key = `player${player1}`;
  const player1name = playersData[player1key]?.displayName;
  console.log("hi")
  const player2 = 2;
  const player2key = `player${player2}`;
  const player2name = playersData[player2key]?.displayName;
  
  const player3 = 3;
  const player3key = `player${player3}`;
  const player3name = playersData[player3key]?.displayName;

  const player4 = 4;
  const player4key = `player${player4}`;
  const player4name = playersData[player4key]?.displayName;


  const toggle = () => {
    setActive((val) => !val);
  };
  
  function Example() {
    
    const [draft, setDraft] = useState("");
    const updateMyPresence = useUpdateMyPresence();
    const todos = useStorage((root) => root.todos);

    const addTodo = useMutation(({ storage }, text) => {
      storage.get("todos").push(new LiveObject({ text }));
    }, []);

    const toggleTodo = useMutation(({ storage }, index) => {
      const todo = storage.get("todos").get(index);
      todo?.set("checked", !todo.get("checked"));
    }, []);

    const deleteTodo = useMutation(({ storage }, index) => {
      setplayer1tasks(player1tasks + 1);
      setplayer2tasks(player2tasks + 1);
      setplayer3tasks(player3tasks + 1);
      setplayer4tasks(player4tasks + 1);
      storage.get("todos").delete(index);
    }, []);
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
      <div className="p-10 flex flex-col">
        <div className="flex flex-row justify-center items-center">
          <Button
            className="text-center bg-transparent border-white border-2 p-3 rounded-2xl text-xl"
            onPress={onOpen}
          >
            Add Task &nbsp; +
          </Button>
          <Modal
            className="bg-zinc-900 w-3/4 h-1/2  text-center rounded-xl"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex text-white flex-col gap-1">
                    Post your Quest
                  </ModalHeader>
                  <ModalBody className="p-1 m-0">
                    <textarea
                      className="text-black h-full bg-white p-2"
                      placeholder="What needs to be done?"
                      value={draft}
                      onChange={(e) => {
                        setDraft(e.target.value);
                        updateMyPresence({ isTyping: true });
                      }}
                      onBlur={() => updateMyPresence({ isTyping: false })}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      color="danger"
                      variant="light"
                      onPress={() => {
                        updateMyPresence({ isTyping: false });

                        addTodo(draft);
                        setDraft("");
                      }}
                    >
                      Add
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </div>
        <div className="flex flex-row flex-wrap mt-10 items-start justify-between">
          {todos.map((todo, index) => {
            return (
              <div className="w-1/5 m-2 bg-violet-800 flex flex-col grow-0 flex-wrap items-start rounded-2xl">
                <div
                  key={index}
                  className="px-5 pt-4 pb-10 max-w-full break-words border-transparent"
                >
                  {todo.text}
                </div>

                <div className="flex flex-row justify-center items-center">
                  <button
                    className="delete_button p-2 mb-4 ml-4 mr-4 bg-black rounded-full"
                    onClick={() => deleteTodo(index)}
                  ></button>
                  <div className="mb-4">Complete Task</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
  function Loading() {
    return (
      <div className="loading">
        <img src="https://liveblocks.io/loading.svg" alt="Loading" />
      </div>
    );
  }
 
  
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex flex-col px-32 bg-black">
        <div className="flex pt-4 h-24 flex-row text-zinc-50 mb-5 justify-between items-end">
          <div className="basis-1/8 p-6">
            <Link href="/">
              <Image
                className=""
                src="/backarrow.svg"
                height={30}
                width={30}
                alt="your name"
              ></Image>
            </Link>
          </div>
          <div className="basis-3/12 flex flex-row bg-logo px-5 py-3 bg-cover border-white border-2 rounded-xl items-center justify-between">
             <div className="font-bold text-2xl px-10 pt-3"><Timer active={active}/></div>

            <button onClick={toggle} className="bg-indigo-600 hover:bg-indigo-500 text-white text-center text-light px-10 text-2xl py-2 rounded-2xl">
              {active? "Stop": "Start"}
            </button>
            
          </div>
          <div className="">Room ID: {roomId}</div>
        </div>
        <div className="bg-logo bg-cover border-white border-2 bg-no-repeat bg-center opacity-100 basis-3/4 rounded-3xl z-0">
          <div className="">
            <RoomProvider
              id={roomId}
              initialPresence={{
                isTyping: false,
              }}
              initialStorage={{ todos: new LiveList() }}
            >
              <ClientSideSuspense fallback={<Loading />}>
                {() => <Example />}
              </ClientSideSuspense>
            </RoomProvider>
          </div>
        </div>
        <div className="flex flex-row p-5 justify-between">
          <div>
            <Image
              className=""
              src="/human1.svg"
              height={30}
              width={30}
              alt="your name"
            ></Image>
            <div className="text-violet-600 text-center font-bold">
              {player1name}
            </div>
          </div>
          <div>
            <Image
              className=""
              src="/human2.svg"
              height={30}
              width={30}
              alt="your name"
            ></Image>
            <div className="text-blue-600 text-center font-bold">
            {player2name}
           
            </div>
          </div>
          <div>
            <Image
              className=""
              src="/human3.svg"
              height={30}
              width={30}
              alt="your name"
            ></Image>
            <div className="text-green-600 text-center font-bold">
              {player3name}
            </div>
          </div>
          <div>
            <Image
              className=""
              src="/human4.svg"
              height={30}
              width={30}
              alt="your name"
            ></Image>
            <div className="text-amber-600 text-center font-bold">
              {player4name}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}