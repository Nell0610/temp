import React, { useState } from "react";
import { auth } from "../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User created: ", userCredential.user);
      })
      .catch((error)=> {
        console.error("Error creating account:", error);
      });
  }


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
          <div className="text-zinc-50 pb-2">Email</div>
          <input
            type="email"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your email"
            value = {email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
          <div className="text-zinc-50 pb-2 mt-5">Password</div>
          <input
            type="password"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your password"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>

          <div className="flex flex-col self-stretch mt-14">
            <button
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-5 py-3 mb-5 rounded-2xl"
              onClick={handleSignUp}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
