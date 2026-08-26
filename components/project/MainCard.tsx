import { Suspense } from "react";

import Thumbnail from "./Thumbnail";
import { ArrowForward } from "@nine-thirty-five/material-symbols-react/outlined";
import ThumbnailSkeleton from "../ui/skeletons/projectCard/ThumbnailSkeleton";

type Props = {
  index: number;
  id: number;
  role: string;
  ai_generated_percent: number | null;
  tech: string[];
  title: string;
  description: string | null;
  no_image_notice: string;
  live_url: string | null;
};

export default function MainCard({
  index,
  id,
  role,
  ai_generated_percent,
  tech,
  title,
  description,
  no_image_notice,
  live_url,
}: Props) {
  const humanPercentClasses =
    !ai_generated_percent || ai_generated_percent <= 50
      ? "text-foreground"
      : "";
  const aiPercentClasses =
    ai_generated_percent && ai_generated_percent >= 50 ? "text-foreground" : "";
  let articleClasses =
    "group flex flex-col outline outline-accent/0 hover:outline-accent transition-colors duration-500";
  const isEvenCard = (index + 1) % 2 === 0;

  if (isEvenCard) {
    articleClasses = `${articleClasses} md:relative md:top-12 md:left-0 md:h-fit md:min-h-full md:w-full`;
  }

  const ProjectCard = (
    <article className={articleClasses}>
      <Suspense fallback={<ThumbnailSkeleton />}>
        <Thumbnail
          projectId={id}
          projectTitle={title}
          noImageNotice={no_image_notice}
        />
      </Suspense>
      <div className="relative grow flex flex-col gap-6 bg-lighterBg p-10">
        <hr className="absolute top-0 left-0 w-full border-t-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="space-y-5">
          <div className="flex gap-3 justify-between items-center">
            <p className="bg-accent text-surfaceLowest py-0.5 px-3 text-xs font-semibold tracking-wider">
              {role}
            </p>
            <p className="flex text-xxs text-muted py-0.5 px-3 border border-borderColor/30 md:text-xs lg:text-sm">
              <span className="text-nowrap">
                <span className={humanPercentClasses}>
                  HUMAN: {100 - (ai_generated_percent || 0)}%
                </span>
                <span className="text-muted-foreground">&nbsp;|&nbsp;</span>
              </span>
              <span className={`text-nowrap ${aiPercentClasses}`}>
                AI: {ai_generated_percent || 0}%
              </span>
            </p>
          </div>
          <ul className="flex gap-3 flex-wrap">
            {tech.map((item) => (
              <li
                key={item}
                className="bg-surfaceLower py-1 px-3 text-xs md:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${live_url ? "mb-6 " : ""}overflow-x-hidden`}>
          <h2 className="mb-3 overflow-hidden text-ellipsis">{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {live_url && (
          <a
            href={live_url}
            target="_blank"
            className="mt-auto w-fit flex gap-1.5 items-center cursor-pointer hover:text-accent hover:gap-2.5 transition-[gap]"
          >
            <span className="text-xs font-semibold tracking-wide">
              VISIT WEBSITE
            </span>{" "}
            <ArrowForward className="size-4" />
          </a>
        )}
      </div>
    </article>
  );

  if (isEvenCard) {
    return <div>{ProjectCard}</div>;
  }

  return ProjectCard;
}
