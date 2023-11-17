"use client";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";
import Room from "./Room";
import Popup from "reactjs-popup";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { useState, useMemo } from "react";
import { Button, useDisclosure } from "@nextui-org/react";
import {
  RoomProvider,
  useOthers,
  useUpdateMyPresence,
  useStorage,
  useMutation,
} from "@/liveblocks.config";
import "@liveblocks/react";
import { LiveList, LiveObject } from "@liveblocks/client";
import { useRouter } from "next/router";
import { ClientSideSuspense } from "@liveblocks/react";
function Quest() {
  return <div className="bg-white rounded-lg mr-5 basis-1/5">AAA</div>;
}
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
    storage.get("todos").delete(index);
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="p-10 flex flex-col">
      <div className="flex flex-row justify-center items-center">
        <Button className="text-center font-bold text-3xl" onPress={onOpen}>
          +
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
            <div className="w-1/5 m-2 bg-rose-300 flex flex-col items-start rounded-2xl">
              <div key={index}>
                <div className=" px-5 pb-10 break-words border-transparent">
                  {todo.text}
                </div>
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
export default function Page() {
  const roomId = "1111";
  const [player1tasks, setplayer1tasks] = useState("");
  const [player2tasks, setplayer2tasks] = useState("");
  const [player3tasks, setplayer3tasks] = useState("");
  const [player4tasks, setplayer4tasks] = useState("");
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex flex-col px-32 bg-black">
        <div className="flex pt-4 flex-row text-zinc-50 justify-between">
          <div>
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
          <div>Username's Room</div>
        </div>

        <div className="bg-slate-900 bg-logo bg-contain bg-no-repeat bg-center opacity-100 basis-3/4 rounded-3xl z-0">
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
            <div className="bg-white">hey</div>
          </div>

          <Image
            className=""
            src="/human2.svg"
            height={30}
            width={30}
            alt="your name"
          ></Image>
          <Image
            className=""
            src="/human3.svg"
            height={30}
            width={30}
            alt="your name"
          ></Image>
          <Image
            className=""
            src="/human4.svg"
            height={30}
            width={30}
            alt="your name"
          ></Image>
        </div>
      </div>
    </main>
  );
}
/*
export default function Home() {
  
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex flex-col px-32 bg-gradient-to-r from-black via-purple-600 to-purple-700">
        <div className="flex pt-4 flex-row text-zinc-50 justify-between">
          <div>
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

          <div>Username's Room</div>
        </div>

        <div className="bg-slate-900 basis-3/4 rounded-3xl z-0">
          <div className="flex flex-row flex-wrap items-center justify-around">
            <div className="flex flex-col">
              <Quest></Quest>
              <Quest></Quest>
            </div>
            <div className="flex flex-col">
              <Quest></Quest>
              <Quest></Quest>
            </div>
            <div className="flex flex-col">
              <Quest></Quest>
              <Quest></Quest>
            </div>
            <div className="flex flex-col">
              <Quest></Quest>
              <Quest></Quest>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
*/
