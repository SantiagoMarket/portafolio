import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function AgenteRagPacientesPage() {
  const project = getProjectBySlug("agente-rag-pacientes");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
