import EmblaCarousel from "@components/emblaCarousel";
import { History } from "@components/History/history";
import Image from "next/image";
import { NotionData } from "src/data/notion";

import css from "./styles.module.css";

export function Parallax({ data }: { data: NotionData[] }) {
  return (
    <>
      <section className={css.sandboxCarousel}>
        <EmblaCarousel />
      </section>

      <section className={css.parallaxContainer}>
        <History />
      </section>

      <section className={css.buffer}></section>
      <section className={`${css.parallaxContainer} ${css.parallaxContainer2}`}>
        {data.map((item) => (
          <div key={item.specialty} className={css.card}>
            <div className={css.cardImg}>
              <Image
                src={item.medias}
                alt={item.specialty}
                width={320}
                height={200}
              />
            </div>
            <h3 className={css.h3}>{item.specialty}</h3>
            <p className={css.p}>{item.description}</p>
          </div>
        ))}
      </section>
      <section className={css.buffer}></section>
    </>
  );
}
