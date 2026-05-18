"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { BookOpen, Calendar, Tag, ArrowRight } from "lucide-react";

const posts = [
  {
    title: "The Future of WebGL and 3D Interfaces",
    excerpt: "Exploring how spatial computing is changing the way we interact with the browser...",
    date: "May 12, 2026",
    category: "Technology",
    readTime: "5 min read"
  },
  {
    title: "Cybersecurity in the AI Era",
    excerpt: "The intersection of LLMs and security vulnerabilities: what every developer needs to know...",
    date: "April 28, 2026",
    category: "Security",
    readTime: "8 min read"
  },
  {
    title: "Designing for Motion and Emotion",
    excerpt: "Why smooth transitions and micro-interactions are the key to a premium user experience...",
    date: "April 15, 2026",
    category: "Design",
    readTime: "6 min read"
  },
  {
    title: "Scaling Next.js Apps in 2026",
    excerpt: "Advanced patterns for state management and server components in large-scale applications...",
    date: "March 22, 2026",
    category: "Development",
    readTime: "10 min read"
  }
];

export default function BlogPage() {
  return (
    <PageWrapper
      title="Journal"
      subtitle="Thoughts on technology, design, and the journey of building in public."
    >
      <div className="grid grid-cols-1 gap-6">
        {posts.map((post, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group p-6 rounded-3xl bg-[#0a0c12] border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="hidden md:block w-48 h-32 rounded-2xl bg-cyan-500/10 overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-transparent" />
                <BookOpen className="w-full h-full p-8 text-cyan-500/30" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono border border-cyan-500/20">{post.category}</span>
                  <span className="text-gray-500 text-xs font-mono flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="text-gray-500 text-xs font-mono flex items-center gap-1"><Tag className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 font-syne group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light mb-6 max-w-3xl">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-cyan-500 font-bold text-sm group-hover:gap-3 transition-all">
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
