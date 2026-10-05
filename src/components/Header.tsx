"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Clock, MapPin, Menu, X, Calendar, AlertCircle } from "lucide-react";
import { hospitalData } from "@/lib/data";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Departments", href: "#departments" },
  { name: "Our Doctors", href: "#doctors" },
  { name: "Services", href: "#services" },
  { name: "Reviews", href: "#reviews" },
  { name: "Gallery", href: "#gallery" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Emergency & Info Bar with Logo Accent Gradient */}
      <div className="bg-slate-950 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Emergency Alert Tag */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/95 text-slate-950 animate-emergency-beacon">
              <AlertCircle className="w-3.5 h-3.5" />
              24/7 Casualty &amp; ICU Ready
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              {hospitalData.contact.address.street}, {hospitalData.contact.address.locality}
            </span>
          </div>

          {/* Contact & Hours */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-1 text-slate-300">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              <span>{hospitalData.contact.timings.emergency}</span>
            </div>
            <a
              href={`tel:${hospitalData.contact.primaryPhone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-sky-400 font-extrabold hover:text-sky-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Helpline: {hospitalData.contact.primaryPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 border-b border-slate-200"
            : "bg-white py-3.5 border-b border-slate-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <Link href="#home" className="flex items-center gap-3 group focus:outline-none">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 transition-transform group-hover:scale-105 rounded-full overflow-hidden border border-slate-100 shadow-sm bg-white">
              <Image
                src={hospitalData.hospital.logo}
                alt={hospitalData.hospital.name}
                fill
                priority
                className="object-contain p-0.5"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-xl tracking-tight text-[#004B87] group-hover:text-[#0A8CC8] transition-colors">
                TRINETHRA
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wider text-[#0A8CC8] uppercase">
                Multispeciality &amp; Critical Care
              </span>
              <span className="text-[9px] text-[#50B446] font-bold hidden sm:block">
                Jangareddygudem • 24/7 Emergency
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-semibold text-slate-700 hover:text-[#0A8CC8] hover:bg-sky-50 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
              className="hidden xl:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 transition-all"
            >
              <Phone className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>24/7 Casualty</span>
            </a>

            <a
              href="#appointment"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#004B87] via-[#0A8CC8] to-[#50B446] hover:opacity-95 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#appointment"
              className="inline-flex sm:hidden items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-[#0A8CC8] hover:bg-[#004B87] rounded-lg"
            >
              <span>Book</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-slate-700 hover:text-[#0A8CC8] hover:bg-slate-100 rounded-lg transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-[#0A8CC8] hover:bg-sky-50 rounded-lg transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
              <a
                href="#appointment"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-[#004B87] to-[#0A8CC8] rounded-xl shadow-md"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Appointment Online</span>
              </a>

              <a
                href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency: {hospitalData.contact.emergencyPhone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
