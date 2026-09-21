import React from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Work } from "@/components/Work";
import { Skills } from "@/components/Skills";
import { Process } from "@/components/Process";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Experience />
      <Education />
      <Work />
      <Skills />
      <Process />
      <Contact />
    </div>
  );
}
