"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState} from "react";
import { auth, provider, db } from "../config";
import { signInWithPopup } from "firebase/auth";
import { collection } from "firebase/firestore";
import firebase from 'firebase/app';

export default function Home() {

  const signInWithGoogle = async () => {
  {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      window.location.href = '/login'
      console.log(user);
      }catch (error) {
      console.error("Error signing in with Google:", error);
      }
    }
  }
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row text-zinc-50 italic text-4xl font-extrabold text-center">
            CompetiTask
             <Image
              className="ml-2"
              src="/biglogo.svg"
              height={40}
              width={40}
              alt="your name"
            ></Image>
          </div>

          <div className="text-zinc-50 italic mt-5 text-center px-12">
            Challenge,Compete,Conquer
          </div>
          <div className="text-zinc-50 items-center italic text-center px-12">
            Who will rise to the top?
          </div>

          <div className="flex flex-col self-stretch mt-14">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 py-3 mb-5 rounded-2xl"
              onClick={signInWithGoogle}
            >
              Login with Google
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
