import { getProjectImages } from "@/lib/data";
import { ArrowForward } from "@nine-thirty-five/material-symbols-react/outlined";
import Image from "next/image";

type Props = {
  index: number;
  id: number;
  role: string;
  ai_generated_percent: number | null;
  tech: string[];
  title: string;
  description: string | null;
  no_image_notice: string;
};

export default async function MainCard({
  index,
  id,
  role,
  ai_generated_percent,
  tech,
  title,
  description,
  no_image_notice,
}: Props) {
  const humanPercentClasses =
    !ai_generated_percent || ai_generated_percent <= 50
      ? "text-foreground"
      : "";
  const aiPercentClasses =
    ai_generated_percent && ai_generated_percent >= 50 ? "text-foreground" : "";
  let articleClasses =
    "group flex flex-col outline outline-accent/0 hover:outline-accent transition-colors duration-500";

  const images = await getProjectImages(id);
  const hasImages = images && images.length > 0;
  const isEvenCard = (index + 1) % 2 === 0;

  if (isEvenCard) {
    articleClasses = `${articleClasses} md:relative md:top-12 md:left-0 md:h-fit md:min-h-full md:w-full`;
  }

  const ProjectCard = (
    <article className={articleClasses}>
      <div className="shrink-0 relative bg-surface h-68 overflow-hidden md:h-84">
        {hasImages && (
          <div className="absolute top-1/2 left-1/2 -translate-1/2 size-[105%] scale-95 group-hover:scale-100 transition-transform duration-500">
            <Image
              src={images[0].url}
              fill
              alt={`Screenshot of ${title}`}
              className="object-cover lg:grayscale-80 group-hover:grayscale-0 transition-[filter] duration-500"
            />
          </div>
        )}
        {!hasImages && (
          <div className="bg-primary-grid-dots absolute top-1/2 left-1/2 -translate-1/2 size-[105%] scale-95 place-content-center group-hover:scale-100 transition-transform duration-500 *:mx-auto text-center space-y-0.5">
            <p className="text-sm font-label font-semibold tracking-widest">
              NO IMAGE
            </p>
            {no_image_notice && (
              <>
                <hr className="w-8 border-accent" />
                <small className="text-xs font-label text-accent font-medium tracking-wider uppercase">
                  {no_image_notice}
                </small>
              </>
            )}
          </div>
        )}
      </div>
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
        <div className={`${hasImages ? "mb-6 " : ""}overflow-x-hidden`}>
          <h2 className="mb-3 overflow-hidden text-ellipsis">{title}</h2>
          {description && <p>{description}</p>}
        </div>
        {hasImages && (
          <button className="mt-auto w-fit flex gap-1.5 items-center cursor-pointer hover:text-accent hover:gap-2.5 transition-[gap]">
            <span className="text-xs font-semibold tracking-wide">
              VIEW LARGER IMAGE
            </span>{" "}
            <ArrowForward className="size-4" />
          </button>
        )}
      </div>
    </article>
  );

  if (isEvenCard) {
    return <div>{ProjectCard}</div>;
  }

  return ProjectCard;
}
