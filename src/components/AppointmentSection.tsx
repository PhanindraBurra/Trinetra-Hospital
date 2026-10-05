"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  Send,
} from "lucide-react";
import { hospitalData, doctorsData } from "@/lib/data";
import { Doctor } from "@/types";

interface AppointmentSectionProps {
  selectedDoctor?: Doctor | null;
  onClearDoctor?: () => void;
}

export default function AppointmentSection({
  selectedDoctor,
  onClearDoctor,
}: AppointmentSectionProps) {
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("Morning (10:00 AM - 1:00 PM)");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<{
    bookingId: string;
    whatsappUrl: string;
  } | null>(null);

  // Default to tomorrow's date
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Sync selectedDoctor from props
  useEffect(() => {
    if (selectedDoctor) {
      setDepartmentId(selectedDoctor.departmentId);
      setDoctorId(selectedDoctor.id);
    }
  }, [selectedDoctor]);

  // Available doctors based on chosen department
  const availableDoctors = departmentId
    ? doctorsData.doctors.filter((d) => d.departmentId === departmentId)
    : doctorsData.doctors;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!patientName.trim() || patientName.trim().length < 2) {
      errs.patientName = "Please enter patient's full name";
    }

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (!cleanPhone || cleanPhone.length < 10) {
      errs.phoneNumber = "Please enter a valid 10-digit mobile number";
    }

    if (!departmentId) {
      errs.departmentId = "Please select a department";
    }

    if (!date) {
      errs.date = "Please select an appointment date";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const chosenDept = doctorsData.departments.find((d) => d.id === departmentId);
    const chosenDoctor = doctorsData.doctors.find((d) => d.id === doctorId);

    const bookingId = `TRN-${Math.floor(10000 + Math.random() * 90000)}`;

    const bookingPayload = {
      bookingId,
      patientName: patientName.trim(),
      phone: phoneNumber.trim(),
      department: chosenDept?.name || "General OPD",
      doctor: chosenDoctor?.displayName || "Any Available Specialist",
      date,
      timeSlot,
      message: message.trim() || "Routine Checkup / Consultation",
      createdAt: new Date().toISOString(),
    };

    // 1. Save to localStorage
    try {
      const existing = JSON.parse(
        localStorage.getItem("trinethra_appointments") || "[]"
      );
      existing.unshift(bookingPayload);
      localStorage.setItem("trinethra_appointments", JSON.stringify(existing));
    } catch {
      // ignore storage error
    }

    // 2. Submit to backend API
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });
    } catch (err) {
      console.warn("Backend API sync completed locally:", err);
    }

    // 3. Build WhatsApp text & URL
    const rawMsg =
      `*New Appointment Request - Trinethra Hospital*\n` +
      `*Booking ID:* ${bookingId}\n` +
      `*Patient:* ${bookingPayload.patientName}\n` +
      `*Phone:* ${bookingPayload.phone}\n` +
      `*Department:* ${bookingPayload.department}\n` +
      `*Doctor:* ${bookingPayload.doctor}\n` +
      `*Date:* ${bookingPayload.date}\n` +
      `*Time Slot:* ${bookingPayload.timeSlot}\n` +
      `*Details:* ${bookingPayload.message}`;

    const encodedMsg = encodeURIComponent(rawMsg);
    const whatsappUrl = `https://wa.me/${hospitalData.contact.whatsAppPhone}?text=${encodedMsg}`;

    setIsSubmitting(false);
    setBookingSuccess({ bookingId, whatsappUrl });

    // Automatically trigger WhatsApp in new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="appointment"
      className="py-16 sm:py-24 bg-gradient-to-b from-white via-cyan-50/30 to-slate-50 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-800 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200">
              Online OPD &amp; Consultation Booking
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Schedule Your Doctor Appointment
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Fill out the form below to reserve your priority consultation slot. On submission, a pre-filled WhatsApp confirmation will open directly with our reception desk.
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
            {/* Top Accent Strip */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-700 via-sky-600 to-teal-500" />

            {/* Active Doctor Chosen Alert */}
            {selectedDoctor && (
              <div className="mb-6 p-4 rounded-2xl bg-cyan-50 border border-cyan-200 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-700 text-white flex items-center justify-center font-bold text-xs">
                    Dr
                  </div>
                  <div>
                    <p className="text-xs text-cyan-800 font-bold">Booking for selected doctor:</p>
                    <p className="text-sm font-extrabold text-slate-900">
                      {selectedDoctor.displayName} ({selectedDoctor.departmentName})
                    </p>
                  </div>
                </div>
                {onClearDoctor && (
                  <button
                    type="button"
                    onClick={onClearDoctor}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 px-2 py-1 rounded-md hover:bg-slate-200/60"
                  >
                    Change
                  </button>
                )}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Patient Name */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Patient Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all ${
                        errors.patientName
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200 bg-slate-50/60 focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.patientName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.patientName}</span>
                    </p>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Mobile Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all ${
                        errors.phoneNumber
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200 bg-slate-50/60 focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.phoneNumber && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.phoneNumber}</span>
                    </p>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Medical Department *
                  </label>
                  <select
                    value={departmentId}
                    onChange={(e) => {
                      setDepartmentId(e.target.value);
                      setDoctorId(""); // reset doctor choice
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all ${
                      errors.departmentId
                        ? "border-red-400 bg-red-50/30"
                        : "border-slate-200 bg-slate-50/60 focus:bg-white"
                    }`}
                  >
                    <option value="">-- Select Medical Department --</option>
                    {doctorsData.departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                  {errors.departmentId && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.departmentId}</span>
                    </p>
                  )}
                </div>

                {/* Doctor */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Doctor
                  </label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                  >
                    <option value="">Any Available Specialist</option>
                    {availableDoctors.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.displayName} ({doc.departmentName})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="date"
                      value={date}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all ${
                        errors.date
                          ? "border-red-400 bg-red-50/30"
                          : "border-slate-200 bg-slate-50/60 focus:bg-white"
                      }`}
                    />
                  </div>
                  {errors.date && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.date}</span>
                    </p>
                  )}
                </div>

                {/* Preferred Time Slot */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Preferred Time Slot *
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <select
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                    >
                      <option value="Morning (9:30 AM - 1:00 PM)">
                        Morning (9:30 AM - 1:00 PM)
                      </option>
                      <option value="Afternoon (1:00 PM - 4:00 PM)">
                        Afternoon (1:00 PM - 4:00 PM)
                      </option>
                      <option value="Evening (5:00 PM - 8:00 PM)">
                        Evening (5:00 PM - 8:00 PM)
                      </option>
                      <option value="24/7 Emergency Casualty Visit">
                        Emergency / Urgent Casualty Visit
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Message / Symptoms */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Symptoms or Reason for Visit (Optional)
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your symptoms or medical concern..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-cyan-600 transition-all"
                  />
                </div>
              </div>

              {/* Notice & Submit CTA */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-cyan-700 flex-shrink-0" />
                  <span>Your medical details remain strictly confidential.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-cyan-700 via-cyan-800 to-sky-700 hover:from-cyan-800 hover:to-sky-800 rounded-xl shadow-lg shadow-cyan-900/15 hover:shadow-cyan-900/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Processing..." : "Confirm & Send via WhatsApp"}</span>
                </button>
              </div>
            </form>
          </div>

          {/* Booking Confirmation Modal */}
          {bookingSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
              <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-2xl text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  Appointment Requested!
                </h3>
                <p className="mt-1 text-xs font-bold text-cyan-700">
                  Reference ID: {bookingSuccess.bookingId}
                </p>

                <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Your appointment booking has been recorded. We have opened WhatsApp to transmit your pre-filled details to the hospital desk.
                </p>

                <div className="mt-6 flex flex-col gap-2.5">
                  <a
                    href={bookingSuccess.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition-all"
                  >
                    <span>Open WhatsApp Message</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>

                  <button
                    onClick={() => setBookingSuccess(null)}
                    className="w-full py-2.5 text-xs font-bold text-slate-600 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
