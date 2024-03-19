"use client"

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  
  const {data: session} = useSession();
  const router = useRouter();
  useEffect(() => {
    if(session?.user.id){
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [])

  return (
    <main className="flex flex-col justify-center items-center bg-black text-white h-screen w-screen">
      <h1 className="font-bold text-7xl">Welcome to HMS 👋</h1>
    </main>
  );
}

