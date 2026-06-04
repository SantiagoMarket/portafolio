import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function CotizadorPage() {
  const project = getProjectBySlug("cotizador");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
