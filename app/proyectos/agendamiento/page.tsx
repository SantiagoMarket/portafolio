import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function AgendamientoPage() {
  const project = getProjectBySlug("agendamiento");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
