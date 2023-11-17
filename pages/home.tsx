import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState} from "react";
import { auth, provider } from "../config";
import { signInWithPopup } from "firebase/auth";

export default function Home() {

  const handleSignIn = () => {
    signInWithPopup(auth, provider).then((data)=>{
      const email = data.user.email;
      if (email){
        localStorage.setItem("email", email);
      }
    }).catch((error) => {
      console.error("Error during sign in:", error);
    });
  };


  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-zinc-50 italic text-4xl font-extrabold text-center">
            quest
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
              onClick={handleSignIn}
            >
              Log in with Google
            </button>
           
            <Link href="/login">
              <a className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 py-3 mb-5 rounded-2xl">
                Create Account
              </a>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

