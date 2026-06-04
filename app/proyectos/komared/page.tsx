import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function KomaredPage() {
  const project = getProjectBySlug("komared");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
