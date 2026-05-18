"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Cpu, Layers, Zap, Shield } from "lucide-react";

const steps = [
  {
    title: "Discovery",
    desc: "Understanding your vision, goals, and target audience through deep research and strategic analysis.",
    icon: Cpu,
    color: "from-cyan-500 to-blue-500"
  },
  {
    title: "Architecture",
    desc: "Designing the technical blueprint and user journey to ensure scalability, security, and optimal performance.",
    icon: Layers,
    color: "from-blue-500 to-purple-500"
  },
  {
    title: "Crafting",
    desc: "Developing the experience with a focus on pixel-perfect design, smooth animations, and clean code.",
    icon: Zap,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Refining",
    desc: "Rigorous testing, optimization, and iterative polish to ensure the final product is truly premium.",
    icon: Shield,
    color: "from-pink-500 to-orange-500"
  }
];

export default function ProcessPage() {
  return (
    <PageWrapper
      title="How We Work"
      subtitle="A systematic approach to transforming complex ideas into seamless digital realities."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative p-8 rounded-3xl bg-[#0a0c12] border border-cyan-500/20 hover:border-cyan-500/50 transition-all group"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 bg-gradient-to-br ${step.color} rounded-3xl transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400 w-fit mb-6">
                <step.icon className="w-6 h-6" />
              </div>

              <h3 className="text-xl font-bold text-white mb-4 font-syne group-hover:text-cyan-400 transition-colors">
                {step.title}
              </h3>
              <p className="text-gray-400 leading-relaxed font-light">
                {step.desc}
              </p>

              <div className="mt-auto pt-6 flex items-center gap-2 text-cyan-500 font-mono text-xs">
                Step 0{i+1} <span className="w-12 h-px bg-cyan-500/30"></span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
