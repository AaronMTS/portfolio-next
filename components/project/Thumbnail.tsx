import { getProjectImages } from "@/lib/data";
import Image from "next/image";

type Props = {
  projectId: number;
  projectTitle: string;
  noImageNotice: string;
};

export default async function Thumbnail({
  projectId,
  projectTitle,
  noImageNotice,
}: Props) {
  const images = await getProjectImages(projectId);
  const hasImages = images && images.length > 0;

  return (
    <div className="shrink-0 relative bg-surface h-68 overflow-hidden md:h-84">
      {hasImages && (
        <div className="absolute top-1/2 left-1/2 -translate-1/2 size-[105%] scale-95 group-hover:scale-100 transition-transform duration-500">
          <Image
            src={images[0].url}
            fill
            alt={`Screenshot of ${projectTitle}`}
            className="object-cover lg:grayscale-80 group-hover:grayscale-0 transition-[filter] duration-500"
          />
        </div>
      )}
      {!hasImages && (
        <div className="bg-primary-grid-dots absolute top-1/2 left-1/2 -translate-1/2 size-[105%] scale-95 place-content-center group-hover:scale-100 transition-transform duration-500 *:mx-auto text-center space-y-0.5">
          <p className="text-sm font-label font-semibold tracking-widest">
            NO IMAGE
          </p>
          {noImageNotice && (
            <>
              <hr className="w-8 border-accent" />
              <small className="text-xs font-label text-accent font-medium tracking-wider uppercase">
                {noImageNotice}
              </small>
            </>
          )}
        </div>
      )}
    </div>
  );
}
