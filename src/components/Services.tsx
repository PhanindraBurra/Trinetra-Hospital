"use client";

import { motion } from "framer-motion";
import {
  HeartPulse,
  Ambulance,
  Pill,
  Microscope,
  Baby,
  Activity,
  HeartHandshake,
  Ear,
  CheckCircle,
  Phone,
} from "lucide-react";
import { hospitalData } from "@/lib/data";

const serviceIcons: Record<string, React.ElementType> = {
  HeartPulse,
  Ambulance,
  Pill,
  Microscope,
  Baby,
  Activity,
  HeartHandshake,
  Ear,
};

export default function Services() {
  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-50/80 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#004B87] bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
            Healthcare Infrastructure
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Facilities &amp; Clinical Services in Jangareddygudem
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Engineered to provide immediate emergency response, specialized surgical and pediatric consultations, round-the-clock pharmacy dispensing, and intensive care recovery.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {hospitalData.services.map((srv, idx) => {
            const Icon = serviceIcons[srv.icon] || HeartPulse;
            return (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                className={`rounded-3xl p-6 transition-all flex flex-col justify-between ${
                  srv.highlight
                    ? "bg-gradient-to-br from-[#004B87] via-[#0A8CC8] to-[#50B446] text-white shadow-xl hover:shadow-2xl"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-[#0A8CC8] text-slate-900"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        srv.highlight
                          ? "bg-white/15 text-white border border-white/20"
                          : "bg-sky-50 border border-sky-100 text-[#004B87]"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        srv.highlight
                          ? "bg-white/20 text-white"
                          : "bg-emerald-50 text-[#50B446] border border-emerald-200"
                      }`}
                    >
                      {srv.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-lg font-bold ${
                      srv.highlight ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {srv.title}
                  </h3>

                  <p
                    className={`mt-2.5 text-xs sm:text-sm leading-relaxed ${
                      srv.highlight ? "text-sky-100" : "text-slate-600"
                    }`}
                  >
                    {srv.description}
                  </p>
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-200/20">
                  <div
                    className={`flex items-center gap-1.5 text-xs font-semibold ${
                      srv.highlight ? "text-emerald-300" : "text-[#50B446]"
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>Active in Jangareddygudem</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 24/7 Emergency Notification Callout */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-red-200 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0 animate-emergency-beacon">
              <Ambulance className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-slate-900">
                24 Hours Acute Emergency &amp; Ambulance Support
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Our emergency casualty desk and resuscitation team are alert and ready 24/7 on Abbaigari Street, Jangareddygudem.
              </p>
            </div>
          </div>

          <a
            href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-red-600 hover:bg-red-700 shadow-md hover:shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Casualty: {hospitalData.contact.emergencyPhone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
