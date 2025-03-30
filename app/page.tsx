'use client'

import { useState } from "react";
import Hero from "@/components/hero";
import Example from "@/components/horizontal";
import About from "@/components/about";

export default function Home() {
  const [backgroundColor, setBackgroundColor] = useState<string>("#f3f4f6");

  return (
    <main 
      style={{ backgroundColor, transition: "background-color 0.8s ease-in-out" }}
      className="w-full min-h-screen"
    >
      <Hero setBackgroundColor={setBackgroundColor} />  {/* Ensure Hero accepts this prop */}
      <About setBackgroundColor={setBackgroundColor} /> {/* Ensure About accepts this prop */}
      <Example />
    </main>
  );
}
