import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function CbsAlertMeshPage() {
  const project = getProjectBySlug("cbs-alert-mesh");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
