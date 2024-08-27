"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(() => console.log(window.electronAPI.node()), [])
  return (
    <main>
      Eletron app niggas
      <br />
      <a href="https://www.google.com">Hey google</a>
    </main>
  );
}
