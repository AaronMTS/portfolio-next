import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const cookieStore = await cookies();
const supabase = createClient(cookieStore);

export async function getTechnologies() {
  const { data: tech } = await supabase.from("profile_techs").select();

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

export async function getProfileIntro() {
  const { data: profile } = await supabase.from("profile").select("intro");

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

export async function getCurrentFocus() {
  const { data } = await supabase.from("profile").select("current_focus");

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

export async function getProfileLinks() {
  const { data } = await supabase.from("profile").select("github,linkedin");

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
