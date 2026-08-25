import MainCard from "@/components/project/MainCard";
import { getPersonalProjects } from "@/lib/data";

export default async function Projects() {
  const works = await getPersonalProjects();

  return (
    <section className="space-y-12">
      <header className="space-y-4">
        <h1 className="leading-[1.1]">Personal Projects</h1>
        <hr className="w-24 border-t-4 border-accent" />
      </header>
      <div className="grid gap-12 grid-cols-1 md:grid-cols-2 md:mb-24">
        {works?.map((work, index) => (
          <MainCard key={`${work.id}${work.title}`} index={index} {...work} />
        ))}
      </div>
    </section>
  );
}
