import Hero from "@/components/sections/Hero";
import ProjectGroups from "@/components/sections/ProjectGroups";
import About from "@/components/sections/About";
import Stack from "@/components/sections/Stack";
import Contact from "@/components/sections/Contact";

/**
 * El mapa abre la home y el trabajo va antes que la biografía: tras el hero
 * vienen las líneas (proyectos), y sólo después quién las trazó. El orden es la
 * jerarquía. El hero trae su propia barra y el contacto cierra como pie.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <main>
        <ProjectGroups />
        <About />
        <Stack />
      </main>
      <Contact />
    </>
  );
}
