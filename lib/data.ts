import { createClient as createPublicClient } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Database, Tables } from "./database.types";
import { cacheLife } from "next/cache";

type Technologies = Omit<Tables<"profile_techs">, "id">[];
type ProfileIntro = Pick<Tables<"profile">, "intro">[];
type CurrentFocus = Pick<Tables<"profile">, "current_focus">[];
type ProfileLinks = Pick<Tables<"profile">, "github" | "linkedin">[];
export type WorksAndProjects = Tables<"projects">[] | null;
type ProjectImages = (Tables<"project-images"> & { url: string })[] | null;

const publicSupabase = createPublicClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
);

async function getSupabase() {
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

export async function getTechnologies(): Promise<Technologies> {
  "use cache";
  cacheLife("hours");

  const { data: tech } = await publicSupabase
    .from("profile_techs")
    .select()
    .order("sort_order");

  if (!tech) {
    return [
      { name: "React", sort_order: 100 },
      { name: "TypeScript", sort_order: 200 },
      { name: "Tailwind CSS", sort_order: 300 },
      { name: "Next.js", sort_order: 400 },
      { name: "Cursor", sort_order: 500 },
      { name: "MySQL", sort_order: 600 },
    ];
  }

  return tech;
}

export async function getProfileIntro(): Promise<ProfileIntro> {
  "use cache";
  cacheLife("hours");

  const { data: profile } = await publicSupabase
    .from("profile")
    .select("intro");

  if (!profile) {
    return [
      {
        intro: `I am a front-end developer dedicated to the craft of building refined, high-performance web experiences. My approach centers on a minimalist philosophy—stripping away the unnecessary to reveal clear, functional, and aesthetically striking interfaces.

I believe that code, much like design, should be elegant and intentional. By focusing on fundamental engineering principles and a deep understanding of modern web standards, I create systems that are robust beneath the surface and effortless for the user.`,
      },
    ];
  }

  return profile;
}

export async function getCurrentFocus(): Promise<CurrentFocus> {
  "use cache";
  cacheLife("hours");

  const { data } = await publicSupabase.from("profile").select("current_focus");

  if (!data) {
    const fallback = `// Current focus
        const dev = {
            focus: 'Performance and Accessibility',
            learning: [],
            status: true
        };`;
    return [{ current_focus: fallback }];
  }

  return data;
}

export async function getProfileLinks(): Promise<ProfileLinks> {
  "use cache";
  cacheLife("hours");

  const { data } = await publicSupabase
    .from("profile")
    .select("github,linkedin");

  if (!data) {
    return [
      {
        github: "https://github.com/AaronMTS",
        linkedin: "https://www.linkedin.com/in/saysonaaronmark/",
      },
    ];
  }

  return data;
}

export async function getWorks(): Promise<WorksAndProjects> {
  "use cache";
  cacheLife("hours");

  const { data: works } = await publicSupabase
    .from("projects")
    .select()
    .eq("type", "work")
    .order("sort_order");

  return works;
}

export async function getPersonalProjects(): Promise<WorksAndProjects> {
  "use cache";
  cacheLife("hours");

  const { data: projects } = await publicSupabase
    .from("projects")
    .select()
    .eq("type", "personal")
    .order("sort_order");

  return projects;
}

export async function getProjectImages(
  projectId: number,
): Promise<ProjectImages> {
  const supabase = await getSupabase();

  const { data: images, error } = await supabase
    .from("project-images")
    .select()
    .eq("project_id", projectId);

  if (error) {
    console.error("Failed to fetch project images:", error);
    return null;
  }

  const imagesWithUrl = (
    await Promise.allSettled(
      images.map(async (image) => {
        const { data, error } = await supabase.storage
          .from("project-images")
          .createSignedUrl(image.image_path, 60 * 60);

        if (error) {
          throw error;
        }

        return { ...image, url: data.signedUrl };
      }),
    )
  )
    .filter((result) => result.status === "fulfilled")
    .map((image) => image.value);

  return imagesWithUrl;
}
