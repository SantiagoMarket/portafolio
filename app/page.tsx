import Nav from "@/components/layout/Nav";
import Hero from "@/components/sections/Hero";
import Metrics from "@/components/sections/Metrics";
import Hackathons from "@/components/sections/Hackathons";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

/**
 * El trabajo va antes que la biografía: tras el hero y las cifras vienen los
 * proyectos, y sólo después quién los hizo. El orden es la jerarquía.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Metrics />
        <Hackathons />
        <Projects />
        <About />
        <Experience />
        <Education />
        <Stack />
        <Contact />
      </main>
    </>
  );
}
