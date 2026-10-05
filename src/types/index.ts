export interface HospitalData {
  hospital: {
    name: string;
    shortName: string;
    tagline: string;
    slogan: string;
    description: string;
    establishedYear: string;
    logo: string;
    logoDark: string;
    favicon: string;
    exteriorPhoto?: string;
  };
  contact: {
    primaryPhone: string;
    emergencyPhone: string;
    secondaryPhone?: string;
    whatsAppPhone: string;
    email: string;
    address: {
      street: string;
      locality: string;
      region: string;
      state: string;
      postalCode: string;
      country: string;
    };
    timings: {
      emergency: string;
      opd: string;
      pharmacy: string;
      lab: string;
    };
    mapEmbedUrl: string;
    directionsUrl: string;
  };
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  brandColors: {
    primary: string;
    primaryDark?: string;
    primaryHover?: string;
    secondary: string;
    secondaryDark?: string;
    secondaryHover?: string;
    accent: string;
    accentDark?: string;
    darkText: string;
    lightBackground: string;
    mintTint: string;
    cyanTint: string;
  };
  stats: Array<{
    label: string;
    value: string;
    description: string;
  }>;
  about: {
    mission: string;
    vision: string;
    values: Array<{
      title: string;
      desc: string;
    }>;
  };
  services: Array<{
    id: string;
    title: string;
    badge: string;
    description: string;
    icon: string;
    highlight: boolean;
  }>;
  reviewsSummary: {
    averageRating: number;
    totalReviews: number;
    source: string;
    googleListingUrl: string;
  };
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    text: string;
    department: string;
  }>;
  gallery: Array<{
    id: string;
    title: string;
    category: string;
    image: string;
    alt: string;
  }>;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  shortDescription: string;
  keyTreatments: string[];
}

export interface Doctor {
  id: string;
  name: string;
  displayName: string;
  qualification: string;
  specialization: string;
  departmentId: string;
  departmentName: string;
  experience: string;
  image: string;
  poster?: string;
  availableDays: string[];
  timing: string;
  about: string;
  services: string[];
}

export interface DoctorsData {
  departments: Department[];
  doctors: Doctor[];
}

export interface AppointmentBooking {
  id?: string;
  patientName: string;
  phone: string;
  email?: string;
  departmentId: string;
  doctorId: string;
  date: string;
  timeSlot: string;
  message?: string;
  createdAt?: string;
}
