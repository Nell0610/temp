"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useState} from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { db } from "../../config";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [major, setMajor] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        createUserData();
        router.push('/create-join-room');
      }
      else {
        console.error("No user is signed in");
      }
    })
  }

  const createUserData = async () => {
    
    try{const WriteUserData = await addDoc(collection(db, "users"), {
      name: name,
      major: major
      });
      console.log();
    }catch(e){
      console.error("Error storing user data");
    }
  };
  
  return (
    <main className="grow-0 my-auto">
      <div className="h-screen flex flex-row ps-32">
        <div className="basis-1/12"></div>
        <div className="flex flex-col">
          <div className="basis-1/6"></div>
          <Link href="/">
            <Image
              className=""
              src="/backarrow.svg"
              height={30}
              width={30}
              alt="your name"
            ></Image>
          </Link>

          <div className="basis-1/12"></div>
          <div className="text-zinc-50 pb-2">Display Name</div>
          <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your display name"
            value = {name}
            onChange={(e) => setName(e.target.value)}
            required
          ></input>
          <div className="text-zinc-50 pb-2 mt-5">Major</div>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your major"
            value = {major}
            onChange={(e) => setMajor(e.target.value)}
            required
          ></input>
          
          <div className="flex flex-col self-stretch mt-14">
            <button type="submit"
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-5 py-3 mb-5 rounded-2xl"
            >
              Create Account
            </button>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}
function then(arg0: () => void) {
  throw new Error("Function not implemented.");
}

