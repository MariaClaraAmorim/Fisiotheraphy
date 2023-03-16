import { getNotionData } from "src/data/notion";

function json<T extends Record<string, any>>(data: T) {
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-type": "application/json",
    },
  });
}

export async function GET() {
  try {
    const data = await getNotionData();

    return json(data);
  } catch (err) {
    if (err instanceof Error) {
      return json({ error: err.message });
    }

    return json({ error: "Algo deu errado!" });
  }
}
