import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function TinoPage() {
  const project = getProjectBySlug("tino");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
