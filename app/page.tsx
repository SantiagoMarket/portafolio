import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Stack from "@/components/sections/Stack";
import Projects from "@/components/sections/Projects";
import Hackathons from "@/components/sections/Hackathons";
import Contact from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Experience />
        <Education />
        <Stack />
        <Projects />
        <Hackathons />
        <Contact />
      </main>
    </>
  );
}
