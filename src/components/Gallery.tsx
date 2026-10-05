"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    "All",
    "Facility",
    "Doctor Guidance",
  ];

  const filteredItems =
    activeCategory === "All"
      ? hospitalData.gallery
      : hospitalData.gallery.filter(
          (item) => item.category.toLowerCase() === activeCategory.toLowerCase()
        );

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredItems.length : null
        );
      }
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) =>
          prev !== null
            ? (prev - 1 + filteredItems.length) % filteredItems.length
            : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-slate-50/70 border-t border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#004B87] bg-sky-100 px-3.5 py-1.5 rounded-full border border-sky-200">
            Real Photos &amp; Clinical Guidance
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hospital Photos &amp; Doctor Posters
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            View our 4-story hospital building in Jangareddygudem along with clinical health education posters from our practicing doctors.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#004B87] text-white shadow-md"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setLightboxIndex(idx)}
              className="relative group rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all cursor-pointer aspect-[4/3] hover-medical-glow"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay with details */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 mb-1">
                  {item.category}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-2">
                  {item.title}
                </h3>
              </div>

              {/* Zoom Icon Button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                <Maximize2 className="w-4 h-4 text-[#004B87]" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
              {/* Close Button */}
              <button
                onClick={() => setLightboxIndex(null)}
                aria-label="Close lightbox"
                className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (prev) =>
                      (prev! - 1 + filteredItems.length) % filteredItems.length
                  );
                }}
                aria-label="Previous image"
                className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(
                    (prev) => (prev! + 1) % filteredItems.length
                  );
                }}
                aria-label="Next image"
                className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Container */}
              <div className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center">
                <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
                  <Image
                    src={filteredItems[lightboxIndex].image}
                    alt={filteredItems[lightboxIndex].alt}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="mt-4 text-center text-white">
                  <span className="text-xs uppercase font-bold tracking-wider text-sky-400">
                    {filteredItems[lightboxIndex].category}
                  </span>
                  <h3 className="text-lg font-bold mt-0.5">
                    {filteredItems[lightboxIndex].title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Photo {lightboxIndex + 1} of {filteredItems.length}
                  </p>
                </div>
              </div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
