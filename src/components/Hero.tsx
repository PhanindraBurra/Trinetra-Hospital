"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone, Calendar, ShieldCheck, HeartPulse, Clock, Star, Award, CheckCircle2, Building2 } from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-slate-50 pt-6 pb-14 lg:pt-12 lg:pb-20">
      {/* Background Soft Medical Color Orbs */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-[#0A8CC8]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-[#50B446]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-[#F58220]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headline, Description & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/90 border border-sky-200 text-[#004B87] text-xs sm:text-sm font-extrabold mb-5">
              <span className="flex h-2.5 w-2.5 rounded-full bg-[#F58220] animate-ping" />
              <span>24/7 Emergency, Trauma &amp; Critical Care (ICU)</span>
            </div>

            {/* Telugu Name Sub-Heading */}
            <div className="text-xs sm:text-sm font-bold text-[#50B446] tracking-wide mb-2">
              త్రినేత్ర మల్టీ స్పెషాలిటీ &amp; క్రిటికల్ కేర్ సెంటర్ • జంగారెడ్డిగూడెం
            </div>

            {/* Main Headline with Logo Colors */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.14] tracking-tight">
              Compassionate Care.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004B87] via-[#0A8CC8] to-[#50B446]">
                Advanced Medicine.
              </span>{" "}
              Dedicated to You.
            </h1>

            {/* Tagline / Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              <strong className="text-slate-900 font-semibold">{hospitalData.hospital.name}</strong> delivers round-the-clock emergency medical response, intensive care (ICU), and trusted multispeciality clinical care with experienced doctors in Jangareddygudem, Andhra Pradesh.
            </p>

            {/* Quick highlights checks */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                <span>Pediatrics (Dr. Nagendra Babu Garu)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                <span>General &amp; Laparoscopic Surgery (Dr. P. Sarathy)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                <span>Gynaecology &amp; Maternity (Dr. Priyanka)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                <span>ENT Specialist (Dr. Samatha Garu - Gold Medalist)</span>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <CheckCircle2 className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                <span>General Medicine &amp; Critical Care (Dr. Valli Sri)</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <a
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#004B87] via-[#0A8CC8] to-[#50B446] hover:opacity-95 rounded-xl shadow-lg shadow-sky-900/15 hover:shadow-sky-900/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Doctor Appointment</span>
              </a>

              <a
                href={`tel:${hospitalData.contact.primaryPhone.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-900 bg-white hover:bg-slate-50 border-2 border-slate-200 hover:border-[#0A8CC8] rounded-xl shadow-sm transition-all"
              >
                <Phone className="w-5 h-5 text-[#F58220]" />
                <span>Call Helpline: {hospitalData.contact.primaryPhone}</span>
              </a>
            </div>

            {/* Google Rating Verification Ribbon */}
            <div className="mt-8 pt-5 border-t border-slate-200/80 w-full flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs sm:text-sm text-slate-700 font-semibold">
                <strong>5.0 / 5.0 Rating</strong> ({hospitalData.reviewsSummary.totalReviews}+ Verified Patient Reviews in Jangareddygudem)
              </span>
            </div>
          </motion.div>

          {/* Right Column: Hospital Real Building Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            {/* Real Building Showcase Card */}
            <div className="relative rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-xl group">
              {/* Actual Hospital Exterior Photo */}
              <div className="relative w-full h-72 sm:h-80 bg-slate-100 overflow-hidden">
                <Image
                  src={hospitalData.hospital.exteriorPhoto || "/assets/gallery/hospital_building.jpg"}
                  alt="Trinethra Multi Speciality & Critical Care Center Building in Jangareddygudem"
                  fill
                  priority
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                
                {/* 24/7 Casualty Status Overlay */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F58220] text-white shadow-md animate-pulse">
                    <HeartPulse className="w-3.5 h-3.5" />
                    24/7 Casualty &amp; ICU
                  </span>
                </div>

                {/* Building Caption */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs text-sky-300 font-bold mb-0.5">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>Abbaigari Street, Jangareddygudem</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold">
                    Trinethra 4-Story Multispeciality Facility
                  </h3>
                </div>
              </div>

              {/* Bottom Quick Feature Highlights */}
              <div className="p-5 sm:p-6 bg-white space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2.5">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#50B446]" />
                    OPD Consultation
                  </span>
                  <span className="font-bold text-[#004B87]">Daily 9:30 AM - 8:30 PM</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-100 pb-2.5">
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#0A8CC8]" />
                    ICU &amp; Emergency
                  </span>
                  <span className="font-bold text-red-600">Always Open 24/7</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
                  <span className="font-semibold text-slate-900">Hospital Pharmacy</span>
                  <span className="font-bold text-[#50B446]">24 Hours In-House</span>
                </div>
              </div>
            </div>

            {/* Floating Doctor Care Badge */}
            <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xl items-center gap-3 animate-float-medical">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0A8CC8] flex items-center justify-center font-bold">
                <HeartPulse className="w-5 h-5 animate-heartbeat text-red-500" />
              </div>
              <div className="text-xs">
                <p className="font-bold text-slate-900">5 Specialist Doctors</p>
                <p className="text-[#50B446] font-semibold">Pediatrics, Surgery, Gynae, ENT, Medicine</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {hospitalData.stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow text-center hover-medical-glow"
            >
              <div className="text-2xl sm:text-3xl font-extrabold text-[#004B87]">{stat.value}</div>
              <div className="mt-1 text-xs sm:text-sm font-bold text-slate-900">{stat.label}</div>
              <div className="mt-0.5 text-[11px] sm:text-xs text-slate-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
