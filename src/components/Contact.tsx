"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function Contact() {
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquiryMsg, setInquiryMsg] = useState("");
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    const rawMsg =
      `*New Inquiry - Trinethra Hospital Website*\n` +
      `*Name:* ${inquiryName}\n` +
      `*Phone:* ${inquiryPhone}\n` +
      `*Message:* ${inquiryMsg || "General Information Request"}`;

    const url = `https://wa.me/${hospitalData.contact.whatsAppPhone}?text=${encodeURIComponent(
      rawMsg
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSentSuccess(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200">
            Reach Out To Us
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Contact &amp; Hospital Location
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            We are accessible 24 hours a day. Visit us in person or reach our medical helpline for immediate consultations and emergency services.
          </p>
        </div>

        {/* Contact Information & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-cyan-700 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-bold text-slate-900">Hospital Address</h3>
                <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                  {hospitalData.contact.address.street}, {hospitalData.contact.address.locality}
                  <br />
                  {hospitalData.contact.address.region}
                  <br />
                  PIN: {hospitalData.contact.address.postalCode}, {hospitalData.contact.address.country}
                </p>

                <div className="mt-4">
                  <a
                    href={hospitalData.contact.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-cyan-700 hover:bg-cyan-800 shadow-sm transition-all"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions on Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & Emergency Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Phone &amp; Helplines</h3>
                <div className="mt-2 space-y-1 text-sm">
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-900">Emergency (24/7): </span>
                    <a
                      href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
                      className="font-bold text-red-600 hover:underline"
                    >
                      {hospitalData.contact.emergencyPhone}
                    </a>
                  </p>
                  <p className="text-slate-600">
                    <span className="font-semibold text-slate-900">OPD Appointments: </span>
                    <a
                      href={`tel:${hospitalData.contact.primaryPhone.replace(/\s+/g, "")}`}
                      className="font-bold text-cyan-800 hover:underline"
                    >
                      {hospitalData.contact.primaryPhone}
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Working Hours</h3>
                <div className="mt-2 space-y-1 text-xs sm:text-sm text-slate-600">
                  <p>
                    <strong className="text-slate-900">Emergency &amp; ICU:</strong> 24 Hours / 7 Days
                  </p>
                  <p>
                    <strong className="text-slate-900">Pharmacy &amp; Lab:</strong> 24 Hours Open
                  </p>
                  <p>
                    <strong className="text-slate-900">Outpatient (OPD):</strong> Mon - Sat: 9:00 AM - 8:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Email / Official Desk */}
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center flex-shrink-0 mt-1">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Official Email</h3>
                <p className="mt-1 text-sm text-slate-600">
                  {hospitalData.contact.email.includes("TODO") ? (
                    <span className="text-slate-500 italic">
                      Email: contact@trinethrahospital.com (TODO: Configurable in hospital.json)
                    </span>
                  ) : (
                    <a
                      href={`mailto:${hospitalData.contact.email}`}
                      className="text-cyan-700 hover:underline font-semibold"
                    >
                      {hospitalData.contact.email}
                    </a>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Map & Fast Inquiry Form */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Embedded Google Map */}
            <div className="w-full h-80 sm:h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-md relative bg-slate-100">
              <iframe
                title="Trinethra Hospital Google Map Location"
                src={hospitalData.contact.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>

            {/* Quick Contact / WhatsApp Inquiry Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900">
                Have a Quick Medical Question?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Send an instant message directly to our reception coordinator.
              </p>

              <form onSubmit={handleInquirySubmit} className="mt-5 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                  />
                  <input
                    type="tel"
                    required
                    value={inquiryPhone}
                    onChange={(e) => setInquiryPhone(e.target.value)}
                    placeholder="Your Phone Number"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                  />
                </div>
                <textarea
                  rows={2}
                  value={inquiryMsg}
                  onChange={(e) => setInquiryMsg(e.target.value)}
                  placeholder="Your Question or Inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-cyan-600 focus:outline-none"
                />

                <div className="flex items-center justify-between">
                  {sentSuccess ? (
                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Inquiry prepared and opened in WhatsApp!
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 shadow transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
