"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Calendar, Clock, Award, CheckCircle, Stethoscope, Phone, Eye } from "lucide-react";
import { Doctor } from "@/types";
import { hospitalData } from "@/lib/data";

interface DoctorModalProps {
  doctor: Doctor | null;
  onClose: () => void;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorModal({
  doctor,
  onClose,
  onBookAppointment,
}: DoctorModalProps) {
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (doctor) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [doctor, onClose]);

  if (!doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#50B446]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#004B87]">
              Doctor Profile • Trinethra Hospital Jangareddygudem
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            {/* Doctor Image */}
            <div className="relative w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 shadow-md">
              <Image
                src={doctor.image}
                alt={doctor.displayName}
                fill
                className="object-cover"
              />
            </div>

            {/* Doctor Primary Info */}
            <div className="flex flex-col text-center sm:text-left flex-grow">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-[#004B87] border border-sky-200 self-center sm:self-start mb-2">
                {doctor.departmentName}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {doctor.displayName}
              </h3>
              <p className="text-sm font-bold text-[#0A8CC8] mt-1">
                {doctor.specialization}
              </p>
              <p className="text-xs font-semibold text-slate-500 mt-0.5">
                {doctor.qualification}
              </p>

              {/* Experience Badge */}
              <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
                  <Award className="w-3.5 h-3.5 text-[#0A8CC8]" />
                  {doctor.experience}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-xs font-bold text-emerald-800 border border-emerald-200">
                  <Clock className="w-3.5 h-3.5 text-[#50B446]" />
                  {doctor.timing}
                </span>
              </div>
            </div>
          </div>

          {/* About Doctor */}
          <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#004B87] mb-1 flex items-center gap-1.5">
              <Stethoscope className="w-4 h-4 text-[#0A8CC8]" />
              Clinical Focus &amp; Profile
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {doctor.about}
            </p>
          </div>

          {/* Services & Key Procedures */}
          {doctor.services && doctor.services.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Procedures &amp; Care Areas
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {doctor.services.map((srv, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 font-medium"
                  >
                    <CheckCircle className="w-4 h-4 text-[#50B446] flex-shrink-0" />
                    <span>{srv}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Educational Poster Toggle if available */}
          {doctor.poster && (
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900">
                    Health Guidance &amp; Awareness Poster
                  </h4>
                  <p className="text-[11px] text-amber-700 mt-0.5">
                    View clinical guidance poster by {doctor.displayName}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPoster(!showPoster)}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition-colors inline-flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{showPoster ? "Hide Poster" : "View Poster"}</span>
                </button>
              </div>

              {showPoster && (
                <div className="mt-4 relative w-full h-96 rounded-xl overflow-hidden bg-slate-100 border border-amber-200">
                  <Image
                    src={doctor.poster}
                    alt={`${doctor.displayName} Poster`}
                    fill
                    className="object-contain"
                  />
                </div>
              )}
            </div>
          )}

          {/* Consultation Days */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Available Days for OPD Consultation
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {doctor.availableDays.map((day, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-md bg-slate-100 text-slate-700"
                >
                  {day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href={`tel:${hospitalData.contact.primaryPhone.replace(/\s+/g, "")}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Phone className="w-4 h-4 text-[#0A8CC8]" />
            <span>Call OPD Desk</span>
          </a>

          <button
            onClick={() => onBookAppointment(doctor)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#004B87] via-[#0A8CC8] to-[#50B446] shadow-md hover:shadow-lg transition-all"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment with {doctor.displayName}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
