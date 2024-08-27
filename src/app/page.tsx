"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => console.log(window.electronAPI.node()), [])
  return (
    <main>
      Welcome to using Next UI
      <br />
    </main>
  );
}
