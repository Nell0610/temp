import Image from "next/image";
import Link from "next/link";
export default function Home() {
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
          <div className="text-zinc-50 pb-2">Username</div>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your username"
            required
          ></input>
          <div className="text-zinc-50 pb-2 mt-5">Password</div>
          <input
            type="text"
            className="border-zinc-50 border-2 bg-transparent rounded-2xl py-3 pl-10 pr-20"
            placeholder="Enter your password"
            required
          ></input>

          <div className="flex flex-col self-stretch mt-14">
            <Link
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-5 py-3 mb-5 rounded-2xl"
              href="/login"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
