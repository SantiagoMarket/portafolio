import { getProjectBySlug } from "@/lib/projects";
import ProjectLayout from "@/components/layout/ProjectLayout";
import { notFound } from "next/navigation";

export default function CrmWhatsappPage() {
  const project = getProjectBySlug("crm-whatsapp");
  if (!project) notFound();
  return <ProjectLayout project={project} />;
}
