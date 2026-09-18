import { Suspense } from "react";
import WorksAndProjectsWrapper from "@/components/works-and-projects/WorksAndProjectsWrapper";
import ProjectsPageSkeleton from "@/components/ui/skeletons/ProjectsPageSkeleton";

export default async function Work() {
  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h1 className="leading-[1.1]">Selected Works</h1>
        <hr className="w-24 border-t-4 border-accent" />
      </header>
      <Suspense fallback={<ProjectsPageSkeleton projectQuantity={2} />}>
        <WorksAndProjectsWrapper content="works" />
      </Suspense>
    </section>
  );
}
