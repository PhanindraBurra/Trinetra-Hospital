"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import EcgBanner from "@/components/EcgBanner";
import About from "@/components/About";
import Departments from "@/components/Departments";
import Doctors from "@/components/Doctors";
import Services from "@/components/Services";
import AppointmentSection from "@/components/AppointmentSection";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import { Doctor } from "@/types";

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] =
    useState<Doctor | null>(null);

  const handleSelectDepartment = (deptId: string) => {
    setSelectedDepartment(deptId);
  };

  const handleBookDoctor = (doc: Doctor) => {
    setSelectedDoctorForBooking(doc);
  };

  const handleClearDoctor = () => {
    setSelectedDoctorForBooking(null);
  };

  return (
    <>
      <Hero />
      <EcgBanner />
      <About />
      <Departments onSelectDepartment={handleSelectDepartment} />
      <Doctors
        selectedDept={selectedDepartment}
        onBookDoctor={handleBookDoctor}
      />
      <Services />
      <AppointmentSection
        selectedDoctor={selectedDoctorForBooking}
        onClearDoctor={handleClearDoctor}
      />
      <Reviews />
      <Gallery />
      <Contact />
    </>
  );
}
