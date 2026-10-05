"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, ArrowUp } from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function FloatingCTAs() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const whatsappMessage = encodeURIComponent(
    "Hello Trinethra Hospital, I would like to inquire about medical consultations and emergency services."
  );

  return (
    <>
      {/* Floating Action Buttons Container */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* Scroll To Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top of page"
            className="w-10 h-10 rounded-full bg-slate-900/80 text-white shadow-lg hover:bg-slate-900 backdrop-blur-sm flex items-center justify-center pointer-events-auto transition-all transform hover:-translate-y-0.5 active:translate-y-0 animate-in fade-in duration-200"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* WhatsApp Chat Floating Button */}
        <a
          href={`https://wa.me/${hospitalData.contact.whatsAppPhone}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with hospital on WhatsApp"
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl pointer-events-auto transition-all transform hover:scale-105 active:scale-95"
        >
          {/* Pulsing indicator */}
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white" />
          </span>

          <MessageCircle className="w-5 h-5 flex-shrink-0" />
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline-block">
            WhatsApp Desk
          </span>
        </a>
      </div>

      {/* Mobile Fixed Bottom Emergency Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-3 shadow-2xl">
        <a
          href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-red-600 active:bg-red-700 shadow"
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call 24/7 Casualty</span>
        </a>

        <a
          href="#appointment"
          className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-extrabold text-white bg-cyan-700 active:bg-cyan-800 shadow"
        >
          <span>Book Doctor</span>
        </a>
      </div>
    </>
  );
}
