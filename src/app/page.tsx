import { Parallax } from "@components/Parallax";
import { Inter } from "@next/font/google";
import { getNotionData } from "src/data/notion";

import css from "./page.module.css";

const inter = Inter({ subsets: ["latin"] });

export default async function Home() {
  const data = await getNotionData();

  return (
    <main className={css.main}>
      <Parallax data={data} />
    </main>
  );
}
