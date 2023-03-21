import { EmblaOptionsType } from "embla-carousel-react";
import EmblaCarouselConfig from "./emblaCarousel";
import css from "./styles.module.css";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function EmblaCarousel() {
  return (
    <>
      <EmblaCarouselConfig slides={SLIDES} options={OPTIONS} />
    </>
  );
}
