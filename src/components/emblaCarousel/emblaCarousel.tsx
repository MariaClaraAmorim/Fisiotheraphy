"use client";

import useEmblaCarousel, { EmblaOptionsType } from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import {
  DotButton
} from "./EmblaCarouselArrowsDotsButtons";
import imageByIndex from "./imageByIndex";

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

import Image from "next/image";
import css from "./styles.module.css";

export default function EmblaCarouselConfig(props: PropType) {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );
  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return (
    <>
      <div className={css.embla}>
        <div className={css.emblaViewport} ref={emblaRef}>
          <div className={css.emblaContainer}>
            {slides.map((index) => (
              <div className={css.emblaSlide} key={index}>
                <div className={css.emblaSlideNumber}>
                  <span>{index + 1}</span>
                </div>

                <Image
                  className={css.emblaSlideImg}
                  src={imageByIndex(index)}
                  alt="Your alt text"
                />
              </div>
            ))}
          </div>

          {/* <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} /> */}
        </div>

        <div className={css.emblaDots}>
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
