import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock, Heart } from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Hospital Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="#home" className="inline-flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-xl p-1">
                <Image
                  src={hospitalData.hospital.logo}
                  alt={hospitalData.hospital.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-white tracking-tight">
                  TRINETHRA
                </span>
                <span className="text-xs font-bold tracking-wider text-cyan-400 uppercase">
                  Multispeciality &amp; Critical Care
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Dedicated 24/7 multispeciality hospital providing acute trauma management, intensive care (ICU), advanced diagnostics, and specialist patient consultations in Jangareddygudem, Andhra Pradesh.
            </p>

            {/* Social Icons */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href={hospitalData.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 flex items-center justify-center transition-all text-slate-300"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current stroke-2"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a href="#home" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  About Hospital
                </a>
              </li>
              <li>
                <a href="#departments" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Specialties
                </a>
              </li>
              <li>
                <a href="#doctors" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Our Doctors
                </a>
              </li>
              <li>
                <a href="#services" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  24/7 Services &amp; ICU
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Hospital Gallery
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
                  Location &amp; Directions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Departments */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Departments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400">
              <li>Critical Care &amp; ICU</li>
              <li>Emergency &amp; Trauma</li>
              <li>General Medicine</li>
              <li>Pediatrics &amp; Child Health</li>
              <li>Obstetrics &amp; Gynecology</li>
              <li>Orthopedics &amp; Joint Surgery</li>
              <li>ENT Specialist Unit</li>
              <li>24/7 Pharmacy &amp; Lab</li>
            </ul>
          </div>

          {/* Col 5: 24/7 Contacts */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              24/7 Hospital Helplines
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] text-slate-500 uppercase font-bold block">
                    Emergency Casualty
                  </span>
                  <a
                    href={`tel:${hospitalData.contact.emergencyPhone.replace(/\s+/g, "")}`}
                    className="font-bold text-red-400 hover:underline"
                  >
                    {hospitalData.contact.emergencyPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  {hospitalData.contact.address.street}, {hospitalData.contact.address.locality}, {hospitalData.contact.address.state}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400">Emergency &amp; ICU: Open 24 Hours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; {currentYear} {hospitalData.hospital.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span>Healthcare with Integrity &amp; Care</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Jangareddygudem &amp; Surrounding Region</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
