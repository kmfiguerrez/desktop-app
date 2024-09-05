"use client"

import { useEffect } from "react";

import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()

  // useEffect(() => console.log(window.electronAPI.node()), [])


  return (
    <main>
      Welcome to using Next UI
      <br />
      <Button
        onPress={() => router.push("/login")}
        className="block mx-auto"
      >
        Login
      </Button>
    </main>
  );
}
