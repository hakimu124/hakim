"use client";
import { BentoCard } from "@/features/bento-grid/BentoCard";
import { Avatar3D } from "./Avatar3D";

export function About() {
  const stats = [
    { number: "5+", label: "Years Experience" },
    { number: "50+", label: "Projects" },
    { number: "20+", label: "Clients" },
    { number: "10+", label: "Technologies" },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-8">
          <h2 className="text-4xl font-serif italic text-mist">
            ABOUT <span className="text-gold">ME</span>
          </h2>
          <BentoCard className="max-w-2xl">
            <p className="text-mist-dim leading-relaxed text-lg">
              I&apos;m a creative developer and designer based in Nairobi,
              passionate about building immersive digital experiences that
              push the boundaries of web technology.
            </p>
          </BentoCard>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <BentoCard key={stat.label} className="text-center p-4">
                <div className="text-2xl font-serif italic text-gold">{stat.number}</div>
                <div className="text-xs font-mono text-mist-dim uppercase tracking-tighter">{stat.label}</div>
              </BentoCard>
            ))}
          </div>
        </div>
        <div className="flex-1 relative group">
          <div className="absolute -inset-4 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-colors duration-500" />
          <div className="relative w-full aspect-square rounded-full border border-white/10 bg-surface/50 backdrop-blur-3xl overflow-hidden shadow-2xl">
            <Avatar3D />
          </div>
        </div>
      </div>
    </section>
  );
}
