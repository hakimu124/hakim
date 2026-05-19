"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Avatar3D } from "@/features/about/Avatar3D";
import { User, Code, Palette, Sparkles } from "lucide-react";

export default function AboutPage() {
  const traits = [
    { icon: Code, title: "Engineer", desc: "Building scalable systems with clean, performant code." },
    { icon: Palette, title: "Designer", desc: "Creating visually stunning interfaces with precision." },
    { icon: Sparkles, title: "Innovator", desc: "Pushing the boundaries of what's possible on the web." },
    { icon: User, title: "Strategist", desc: "Bridging the gap between business goals and user needs." },
  ];

  return (
    <PageWrapper
      title="About Me"
      subtitle="A blend of technical rigor and creative exploration, dedicated to crafting premium digital experiences."
    >
      <div className="flex flex-col lg:flex-row gap-16 items-center">
        <div className="flex-1 relative group">
          <div className="absolute -inset-10 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-all duration-700" />
          <div className="relative w-full aspect-square max-w-md mx-auto rounded-full border-2 border-cyan-500/30 bg-[#0a0c12]/50 backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(6,182,212,0.2)]">
            <Avatar3D />
          </div>
        </div>

        <div className="flex-1 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              I&apos;m <strong className="text-white font-semibold">Abdihakim Mohamed</strong>, a Full-Stack Developer and UI/UX Designer based in Eldoret, Kenya.
              I specialize in bridging the gap between complex backend logic and high-end visual storytelling.
            </p>
            <p className="text-gray-400 leading-relaxed">
              With over 5 years of experience, I&apos;ve transitioned from building simple websites to architecting complex 3D web experiences.
              My approach combines the precision of cybersecurity engineering with the fluidity of modern motion design.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {traits.map((trait, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0a0c12] border border-cyan-500/20 hover:border-cyan-500/50 transition-all group"
              >
                <trait.icon className="w-6 h-6 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-white font-bold mb-2 font-syne">{trait.title}</h3>
                <p className="text-gray-400 text-sm font-light">{trait.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
