"use client";

import { motion } from "framer-motion";
import { ShieldCheck, HeartHandshake, Stethoscope, Clock, CheckCircle } from "lucide-react";
import { hospitalData } from "@/lib/data";

const valueIcons = [Clock, ShieldCheck, HeartHandshake, Stethoscope];

export default function About() {
  return (
    <section id="about" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-100">
            About Our Healthcare Mission
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Setting the Standard in Critical Care &amp; Multispeciality Medicine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {hospitalData.hospital.description}
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-cyan-900 via-cyan-800 to-sky-900 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-200 bg-white/10 px-3 py-1 rounded-full">
              Our Mission
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white">Healthcare With Compassion &amp; Precision</h3>
            <p className="mt-3 text-sm sm:text-base text-cyan-50/90 leading-relaxed">
              {hospitalData.about.mission}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-950 text-white shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-teal-400/20 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs font-bold uppercase tracking-wider text-teal-200 bg-white/10 px-3 py-1 rounded-full">
              Our Vision
            </span>
            <h3 className="mt-4 text-2xl font-bold text-white">The Region's Most Trusted Hospital</h3>
            <p className="mt-3 text-sm sm:text-base text-slate-200 leading-relaxed">
              {hospitalData.about.vision}
            </p>
          </motion.div>
        </div>

        {/* 4 Pillars of Care */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitalData.about.values.map((val, idx) => {
            const Icon = valueIcons[idx % valueIcons.length];
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-cyan-400 hover:bg-white hover:shadow-lg transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-100/70 text-cyan-800 flex items-center justify-center group-hover:bg-cyan-700 group-hover:text-white transition-colors mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-cyan-800 transition-colors">
                  {val.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
