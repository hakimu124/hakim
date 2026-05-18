"use client";
import { HeroText } from "./HeroText";
import { HangingGallery } from "./HangingGallery/HangingGallery";

export function Hero() {
  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      <HeroText />
    </section>
  );
}
