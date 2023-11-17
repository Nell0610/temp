import Image from "next/image";
import Link from "next/link";
import React from "react";
export default function Home() {
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col  justify-center">
          <div className="text-zinc-50 text-left pb-2">RoomID</div>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl text-center py-3 px-10"
            placeholder="Enter room ID"
            required
          ></input>
          <div className="flex flex-col self-stretch mt-14">
            <Link
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 py-3 mb-5 rounded-2xl"
              href="/rooms?slug=1111"
            >
              Join Room
            </Link>

            <Link
              className="border-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 border-2 py-3 mb-5 rounded-2xl"
              href="/login"
            >
              Create Room
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
