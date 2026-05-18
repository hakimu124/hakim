"use client";

import { PageWrapper } from "@/components/layout/PageWrapper";
import { motion } from "framer-motion";
import { Mail, MessageSquare, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <PageWrapper
      title="Contact"
      subtitle="Let's collaborate on something extraordinary. I'm always open to new challenges."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-12">
          <div className="p-8 rounded-3xl bg-[#0a0c12] border border-cyan-500/20 relative overflow-hidden group">
             <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-cyan-500 rounded-full blur-3xl transition-opacity -top-1/2 -left-1/2" />
             <div className="relative z-10 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">Email Address</div>
                  <div className="text-xl text-white font-bold">abdihakma0@gmail.com</div>
                </div>
             </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#0a0c12] border border-cyan-500/20 relative overflow-hidden group">
             <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-cyan-500 rounded-full blur-3xl transition-opacity -bottom-1/2 -right-1/2" />
             <div className="relative z-10 flex items-center gap-6">
                <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-gray-500 text-xs font-mono uppercase tracking-widest">Direct Message</div>
                  <div className="text-xl text-white font-bold">Available for Projects</div>
                </div>
             </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative p-8 rounded-3xl bg-[#0a0c12] border border-cyan-500/30">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-mono uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full p-4 rounded-xl bg-[#0f121a] border border-cyan-500/20 text-white outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-mono uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full p-4 rounded-xl bg-[#0f121a] border border-cyan-500/20 text-white outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-gray-400 text-xs font-mono uppercase ml-1">Message</label>
                <textarea
                  placeholder="Tell me about your project..."
                  className="w-full p-4 rounded-xl bg-[#0f121a] border border-cyan-500/20 text-white outline-none focus:border-cyan-500 transition-colors placeholder:text-gray-600 min-h-[150px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all flex items-center justify-center gap-2 group"
              >
                {submitted ? "Message Sent!" : "Send Message"} <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
