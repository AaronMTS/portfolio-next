import {
  ArrowForward,
  NorthEast,
} from "@nine-thirty-five/material-symbols-react/outlined";
import {
  getCurrentFocus,
  getProfileIntro,
  getProfileLinks,
  getTechnologies,
} from "@/lib/data";

export default async function Home() {
  const data = await getProfileIntro();
  const techs = await getTechnologies();
  const currentFocus = await getCurrentFocus();
  const links = await getProfileLinks();
  const linksArr = Object.entries(links[0]);

  return (
    <section className="flex flex-col gap-16 p-5 md:flex-row">
      <div className="space-y-10 md:w-2/3">
        <h2 className="text-5xl text-primary mb-2">Hi</h2>
        <p className="whitespace-pre-line">{data[0].intro}</p>
        <div className="flex gap-6">
          <button className="flex gap-2 items-center bg-primary px-3 py-2.5 text-surface cursor-pointer hover:bg-accent transition-colors md:px-5 md:py-3">
            <span className="text-xxs md:text-xs md:font-semibold md:tracking-wider">
              VIEW WORK
            </span>{" "}
            <ArrowForward className="size-5.5 md:size-6.5" />
          </button>
          <div className="w-px border-l border-borderColor"></div>
          {linksArr.map((profileLink) => (
            <div key={profileLink[0]} className="relative h-fit self-center">
              <a
                href={profileLink[1]}
                target="_blank"
                className="peer flex gap-2 items-center text-muted cursor-pointer hover:text-foreground transition-colors"
              >
                <span className="text-xs font-medium uppercase md:text-sm md:font-normal">
                  {profileLink[0]}
                </span>{" "}
                <NorthEast className="size-4" />
              </a>
              <hr className="absolute -bottom-2 left-0 w-full opacity-0 peer-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-10 min-w-64 md:w-1/3">
        <div>
          <p className="mb-1 font-label text-primary text-xs font-semibold tracking-wider">
            CORE TECHNOLOGIES
          </p>
          <hr className="mb-5 border-borderColor" />
          <ul className="space-y-2">
            {techs
              .sort((a, b) => a.sort_order - b.sort_order)
              .map((tech) => (
                <li
                  key={tech.sort_order}
                  className="group relative px-4 py-2 bg-surface text-sm"
                >
                  {tech.name}
                  <div className="absolute top-0 left-0 size-full border border-accent opacity-0 group-hover:opacity-100"></div>
                </li>
              ))}
          </ul>
        </div>
        <p className="p-4 bg-[#0e0e0e] whitespace-pre-wrap font-mono text-sm border border-borderColor">
          {currentFocus[0].current_focus}
        </p>
      </div>
    </section>
  );
}
