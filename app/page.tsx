import Image from "next/image";
import Link from "next/link";
export default function Home() {
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
            <Link
              className="bg-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 py-3 mb-5 rounded-2xl"
              href="/login"
            >
              Log in
            </Link>

            <Link
              className="border-indigo-600 hover:bg-indigo-500 basis-full text-white text-center text-light px-10 border-2 py-3 mb-5 rounded-2xl"
              href="/login"
            >
              Create Account
            </Link>
          </div>
          <div></div>
        </div>
      </div>
    </main>
  );
}
