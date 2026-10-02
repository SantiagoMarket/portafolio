import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function AsistenteIaLocalPage() {
  const project = getProjectBySlug("asistente-ia-local");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
