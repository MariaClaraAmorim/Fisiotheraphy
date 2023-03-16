import { z } from "zod";
import { Client } from "@notionhq/client";

function getNotionEnvVars() {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (typeof token !== "string" || typeof databaseId !== "string") {
    throw new Error("Invalid env vars");
  }

  return { token, databaseId };
}

const notionEnv = getNotionEnvVars();

const bookmarksDatabase = notionEnv.databaseId;

const notion = new Client({ auth: notionEnv.token });

export type NotionData = {
  description: string;
  specialty: string;
  medias: string;
};

export async function getNotionData(): Promise<NotionData[]> {
  const notionQuery = await notion.databases.query({
    database_id: bookmarksDatabase,
  });

  try {
    const parsedData = databaseQueryResultSchema.parse(notionQuery);

    return parsedData.results.map((item) => {
      const description = getDescription(item.properties.description);
      const specialty = getSpecialty(item.properties.specialty);
      const medias = getMedia(item.properties.medias);
      return { description, specialty, medias };
    });
  } catch (error) {
    throw new Error(String(error));
  }
}

const mediaSchema = z.object({
  files: z.array(
    z.union([
      z.object({
        external: z.object({ url: z.string() }),
      }),
      z.object({
        file: z.object({ url: z.string() }),
      }),
    ])
  ),
});

const descriptionSchema = z.object({
  rich_text: z.array(z.object({ text: z.object({ content: z.string() }) })),
});

const specialtySchema = z.object({
  title: z.array(z.object({ text: z.object({ content: z.string() }) })),
});

const databaseQueryResultSchema = z.object({
  results: z.array(
    z.object({
      properties: z.object({
        description: descriptionSchema,
        specialty: specialtySchema,
        medias: mediaSchema,
      }),
    })
  ),
});

type Medias = z.infer<typeof mediaSchema>;
type Specialty = z.infer<typeof specialtySchema>;
type Description = z.infer<typeof descriptionSchema>;

function getDescription(description: Description): string {
  return description.rich_text[0].text.content;
}

function getSpecialty(specialty: Specialty): string {
  return specialty.title[0].text.content;
}

function getMedia(medias: Medias): string {
  const files = medias.files[0];

  if ("external" in files && typeof files.external.url === "string") {
    return files.external.url;
  }

  if ("file" in files && typeof files.file.url === "string") {
    return files.file.url;
  }

  return "https://images.unsplash.com/photo-1581090124355-6c1376cf3047?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80";
}
