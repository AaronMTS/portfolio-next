import { Suspense } from "react";
import Link from "next/link";
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
import IntroSkeleton from "@/components/ui/skeletons/home/IntroSkeleton";
import LinksSkeleton from "@/components/ui/skeletons/home/LinksSkeleton";
import TechsSkeleton from "@/components/ui/skeletons/home/TechsSkeleton";

async function Intro() {
  const data = await getProfileIntro();

  return <p className="whitespace-pre-line">{data[0].intro}</p>;
}

async function ProfileLinks() {
  const links = await getProfileLinks();
  const linksArr = Object.entries(links[0]);

  return (
    <>
      {linksArr.map((profileLink) => (
        <div key={profileLink[0]} className="relative h-fit self-center">
          <a
            href={profileLink[1] ?? undefined}
            target="_blank"
            className="peer flex gap-1 items-center text-muted cursor-pointer hover:text-foreground transition-colors"
          >
            <span className="text-xs font-medium uppercase md:text-sm md:font-normal">
              {profileLink[0]}
            </span>{" "}
            <NorthEast className="size-4 mt-[0.5px]" />
          </a>
          <hr className="absolute -bottom-1.5 left-0 w-full opacity-0 peer-hover:opacity-100 transition-opacity" />
        </div>
      ))}
    </>
  );
}

async function Technologies() {
  const techs = await getTechnologies();

  return (
    <ul className="space-y-2">
      {techs.map((tech) => (
        <li
          key={tech.sort_order}
          className="group relative px-4 py-2 bg-surface text-sm"
        >
          {tech.name}
          <div className="absolute top-0 left-0 size-full border border-accent opacity-0 group-hover:opacity-100"></div>
        </li>
      ))}
    </ul>
  );
}

async function CurrentFocus() {
  const currentFocus = await getCurrentFocus();

  return <>{currentFocus[0].current_focus}</>;
}

export default function Home() {
  return (
    <section className="flex flex-col gap-16 md:flex-row">
      <div className="space-y-10 md:w-2/3">
        <h2 className="text-5xl text-primary mb-3">Hi</h2>
        <Suspense fallback={<IntroSkeleton />}>
          <Intro />
        </Suspense>
        <div className="flex gap-4.5 md:gap-6">
          <Link
            href="/work"
            className="flex gap-2 items-center bg-primary px-3 py-2.5 text-surface text-nowrap cursor-pointer hover:bg-accent transition-colors md:px-5 md:py-3"
          >
            <span className="text-xxs md:text-xs md:font-semibold md:tracking-wider lg:text-sm">
              VIEW WORK
            </span>{" "}
            <ArrowForward className="size-5.5 md:size-6.5" />
          </Link>
          <div className="w-px border-l border-borderColor"></div>
          <Suspense fallback={<LinksSkeleton />}>
            <ProfileLinks />
          </Suspense>
        </div>
      </div>
      <div className="space-y-10 min-w-64 md:w-1/3">
        <div>
          <p className="mb-1 font-label text-primary text-xs font-semibold tracking-wider">
            CORE TECHNOLOGIES
          </p>
          <hr className="mb-5 border-borderColor" />
          <Suspense fallback={<TechsSkeleton />}>
            <Technologies />
          </Suspense>
        </div>
        <p className="p-4 bg-surfaceLowest whitespace-pre-wrap font-mono text-sm border border-borderColor">
          <Suspense fallback="Loading current focus...">
            <CurrentFocus />
          </Suspense>
        </p>
      </div>
    </section>
  );
}
