"use client";

import { motion } from "framer-motion";
import { Star, CheckCircle, Quote, ExternalLink } from "lucide-react";
import { hospitalData } from "@/lib/data";

export default function Reviews() {
  return (
    <section id="reviews" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-700 bg-cyan-100/70 px-3.5 py-1.5 rounded-full border border-cyan-200">
            Patient Stories &amp; Public Feedback
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Verified Reviews from Our Patients
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Real feedback from families who entrusted their emergency, critical care, and medical recovery to Trinethra Hospital.
          </p>

          {/* Rating Summary Card */}
          <div className="mt-8 inline-flex items-center gap-4 p-4 rounded-2xl bg-cyan-50/70 border border-cyan-200 shadow-sm">
            <div className="text-3xl font-extrabold text-cyan-900">
              {hospitalData.reviewsSummary.averageRating.toFixed(1)}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">
                Based on <strong>{hospitalData.reviewsSummary.totalReviews}+ Verified Public Ratings</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {hospitalData.reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="p-7 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                {/* Header with stars and quote icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-7 h-7 text-cyan-200" />
                </div>

                {/* Review Text */}
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              {/* Author & Verification Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/70 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.author}</h4>
                  <p className="text-xs text-slate-500">{rev.department}</p>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{rev.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Reviews Direct Link Action */}
        <div className="mt-12 text-center">
          <a
            href={hospitalData.reviewsSummary.googleListingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-cyan-900 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 transition-colors shadow-sm"
          >
            <span>Read More Reviews or Write a Review on Google</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
