"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Briefcase, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "NexCommerce",
    description: "Full-stack e-commerce platform with AI recommendations and real-time inventory management.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Stripe"],
    link: "#",
    github: "#",
    color: "from-cyan-500 to-blue-600"
  },
  {
    title: "Lumina Dashboard",
    description: "Real-time analytics dashboard with live WebSocket data and advanced visualization tools.",
    tech: ["React", "D3.js", "WebSocket", "Tailwind"],
    link: "#",
    github: "#",
    color: "from-purple-500 to-pink-600"
  },
  {
    title: "PixelForge Studio",
    description: "Browser-based creative suite for generative art using WebGL and custom shaders.",
    tech: ["Canvas API", "WebGL", "GSAP", "TypeScript"],
    link: "#",
    github: "#",
    color: "from-green-500 to-teal-600"
  },
  {
    title: "Cogni AI Chat",
    description: "Conversational AI platform with multi-model routing and contextual memory.",
    tech: ["Python", "FastAPI", "OpenAI", "Redis"],
    link: "#",
    github: "#",
    color: "from-orange-500 to-red-600"
  },
  {
    title: "ThreadNest",
    description: "Social platform for developers with integrated code sharing and real-time collaboration.",
    tech: ["Node.js", "Socket.io", "Redis", "React"],
    link: "#",
    github: "#",
    color: "from-blue-500 to-indigo-600"
  },
  {
    title: "VaultChain",
    description: "Decentralized file storage with blockchain verification and end-to-end encryption.",
    tech: ["Solidity", "IPFS", "Web3.js", "Next.js"],
    link: "#",
    github: "#",
    color: "from-cyan-400 to-emerald-500"
  }
];

export default function ProjectsPage() {
  return (
    <PageWrapper
      title="Selected Work"
      subtitle="A collection of high-impact digital experiences and technical implementations."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative p-8 rounded-3xl bg-[#0a0c12] border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
          >
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${project.color} rounded-3xl transition-opacity duration-500`} />

            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div className="flex gap-3">
                  <a href={project.github} className="text-gray-500 hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M15 22c-.88 0-2-.8-2-2V7.5c0-.88.8-2 2-2s2 .8 2 2v12.5c0 1.2-1.12 2-2 2z"/><path d="M9 12.5c0-.88.8-2 2-2s2 .8 2 2v12.5c0 1.2-1.12 2-2 2s-2-.8-2-2V7.5c0-.88.8-2 2-2s2 .8 2 2"/><path d="M2 12.5c0-.88.8-2 2-2s2 .8 2 2v12.5c0 1.2-1.12 2-2 2s-2-.8-2-2V7.5c0-.88.8-2 2-2s2 .8 2 2"/></svg>
                </a>
                  <a href={project.link} className="text-gray-500 hover:text-white transition-colors"><ExternalLink className="w-5 h-5" /></a>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-syne group-hover:text-cyan-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed font-light">
                {project.description}
              </p>

              <div className="mt-auto flex flex-wrap gap-2">
                {project.tech.map(t => (
                  <span key={t} className="px-3 py-1 rounded-full bg-cyan-500/5 text-cyan-400 text-xs font-mono border border-cyan-500/20">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
