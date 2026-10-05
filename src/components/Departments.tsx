"use client";

import { motion } from "framer-motion";
import {
  Stethoscope,
  Baby,
  Activity,
  HeartHandshake,
  Ear,
  Siren,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { doctorsData } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  Stethoscope,
  Baby,
  Activity,
  HeartHandshake,
  Ear,
  Siren,
};

interface DepartmentsProps {
  onSelectDepartment?: (deptId: string) => void;
}

export default function Departments({ onSelectDepartment }: DepartmentsProps) {
  const handleDeptClick = (deptId: string) => {
    if (onSelectDepartment) {
      onSelectDepartment(deptId);
    }
    const elem = document.getElementById("doctors");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="departments" className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#004B87] bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
            Clinical Disciplines &amp; Services
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Our Medical Departments
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Specialized inpatient and outpatient clinics staffed by qualified consultants, intensivists, and surgical teams in Jangareddygudem.
          </p>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {doctorsData.departments.map((dept, index) => {
            const Icon = iconMap[dept.icon] || Stethoscope;
            return (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#0A8CC8] transition-all flex flex-col justify-between group hover-medical-glow"
              >
                <div>
                  {/* Department Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 text-[#004B87] flex items-center justify-center group-hover:bg-[#004B87] group-hover:text-white transition-all shadow-sm">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 group-hover:text-[#50B446] transition-colors">
                      Unit 0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#004B87] transition-colors">
                    {dept.name}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                    {dept.shortDescription}
                  </p>

                  {/* Treatments Pill List */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Key Services &amp; Care Areas
                    </span>
                    {dept.keyTreatments.map((treatment, tIdx) => (
                      <div key={tIdx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#50B446] flex-shrink-0" />
                        <span>{treatment}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleDeptClick(dept.id)}
                    className="w-full inline-flex items-center justify-between text-xs sm:text-sm font-bold text-[#004B87] hover:text-[#0A8CC8] group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Specialist Doctor</span>
                    <ArrowRight className="w-4 h-4 text-[#50B446] group-hover:text-[#0A8CC8]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
