import { getPersonalProjects, getWorks } from "@/lib/data";
import Card from "./Card";

const CONTENT = {
    works: getWorks,
    projects: getPersonalProjects
}

export default async function WorksAndProjectsWrapper({
    content,
}: {
    content: keyof typeof CONTENT;
}) {
    let worksAndProjects;

    if (content === "projects") worksAndProjects = await CONTENT.projects();
    else if (content === "works") worksAndProjects = await CONTENT.works();

    return (
        <div className="space-y-12">
            {worksAndProjects?.map((work, index) => (
                <Card key={`${work.id}${work.title}`} index={index} {...work} />
            ))}
        </div>
    );
}
