"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Calendar, Award, Clock, ArrowRight, Stethoscope, Sparkles } from "lucide-react";
import { doctorsData } from "@/lib/data";
import { Doctor } from "@/types";
import DoctorModal from "./DoctorModal";

interface DoctorsProps {
  selectedDept?: string;
  onBookDoctor?: (doctor: Doctor) => void;
}

export default function Doctors({ selectedDept = "all", onBookDoctor }: DoctorsProps) {
  const [activeFilter, setActiveFilter] = useState<string>(selectedDept);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

  useMemo(() => {
    if (selectedDept && selectedDept !== "all") {
      setActiveFilter(selectedDept);
    }
  }, [selectedDept]);

  const filteredDoctors = useMemo(() => {
    return doctorsData.doctors.filter((doc) => {
      const matchesDept =
        activeFilter === "all" || doc.departmentId === activeFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        doc.displayName.toLowerCase().includes(q) ||
        doc.name.toLowerCase().includes(q) ||
        doc.specialization.toLowerCase().includes(q) ||
        doc.departmentName.toLowerCase().includes(q) ||
        doc.qualification.toLowerCase().includes(q);
      return matchesDept && matchesQuery;
    });
  }, [activeFilter, searchQuery]);

  const handleBookClick = (doc: Doctor) => {
    if (onBookDoctor) {
      onBookDoctor(doc);
    }
    const elem = document.getElementById("appointment");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="doctors" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-[#004B87] text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#50B446]" />
            <span>Consultant Doctors &amp; Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Medical Faculty in Jangareddygudem
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Meet our dedicated team of experienced physicians, surgeons, pediatricians, gynecologists, and ENT specialists practicing at Trinethra Hospital.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-6 mb-12">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto w-full">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by doctor name or specialty..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0A8CC8] focus:bg-white transition-all shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Department Filter Pills */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeFilter === "all"
                  ? "bg-[#004B87] text-white shadow-md"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
              }`}
            >
              All Doctors ({doctorsData.doctors.length})
            </button>
            {doctorsData.departments.map((dept) => {
              const count = doctorsData.doctors.filter(
                (d) => d.departmentId === dept.id
              ).length;
              if (count === 0) return null; // only show departments that have active doctors
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveFilter(dept.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                    activeFilter === dept.id
                      ? "bg-[#004B87] text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200/70"
                  }`}
                >
                  {dept.name} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Doctors Card Grid */}
        {filteredDoctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredDoctors.map((doc, idx) => (
                <motion.div
                  key={doc.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-[#0A8CC8] transition-all flex flex-col justify-between overflow-hidden group hover-medical-glow"
                >
                  <div>
                    {/* Top Image with Badge */}
                    <div className="relative w-full h-72 bg-slate-100 overflow-hidden">
                      <Image
                        src={doc.image}
                        alt={doc.displayName}
                        fill
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                      {/* Department Chip */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 text-[#004B87] shadow-sm backdrop-blur-sm border border-slate-100">
                          {doc.departmentName}
                        </span>
                      </div>

                      {/* Doctor Name Overlay on bottom of photo */}
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                          {doc.specialization}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="p-6">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 group-hover:text-[#004B87] transition-colors">
                        {doc.displayName}
                      </h3>
                      <p className="text-xs font-bold text-[#50B446] mt-1">
                        {doc.qualification}
                      </p>

                      {/* Experience and Timings */}
                      <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                        <div className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-[#0A8CC8] flex-shrink-0" />
                          <span className="font-medium">{doc.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3.5 h-3.5 text-[#50B446] flex-shrink-0" />
                          <span className="font-medium text-slate-700">{doc.timing}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-6 pt-0 flex items-center gap-2.5">
                    <button
                      onClick={() => setSelectedDoctor(doc)}
                      className="w-1/2 py-2.5 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-50 hover:bg-sky-50 hover:text-[#004B87] border border-slate-200 transition-colors"
                    >
                      Profile &amp; Posters
                    </button>
                    <button
                      onClick={() => handleBookClick(doc)}
                      className="w-1/2 py-2.5 px-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#004B87] to-[#0A8CC8] hover:opacity-95 shadow-sm hover:shadow transition-all inline-flex items-center justify-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book Slot</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-slate-200">
            <Stethoscope className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">No doctors found</h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Try adjusting your search query or reset filter to view all physicians.
            </p>
            <button
              onClick={() => {
                setActiveFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#004B87] bg-sky-50 hover:bg-sky-100 rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Doctor Detail Modal */}
        <DoctorModal
          doctor={selectedDoctor}
          onClose={() => setSelectedDoctor(null)}
          onBookAppointment={(doc) => {
            setSelectedDoctor(null);
            handleBookClick(doc);
          }}
        />
      </div>
    </section>
  );
}
