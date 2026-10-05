import hospitalDataRaw from "../../data/hospital.json";
import doctorsDataRaw from "../../data/doctors.json";
import { HospitalData, DoctorsData } from "@/types";

export const hospitalData: HospitalData = hospitalDataRaw as HospitalData;
export const doctorsData: DoctorsData = doctorsDataRaw as DoctorsData;

export function getDepartmentById(id: string) {
  return doctorsData.departments.find((d) => d.id === id);
}

export function getDoctorsByDepartment(departmentId: string) {
  if (!departmentId || departmentId === "all") {
    return doctorsData.doctors;
  }
  return doctorsData.doctors.filter((doc) => doc.departmentId === departmentId);
}

export function getDoctorById(id: string) {
  return doctorsData.doctors.find((doc) => doc.id === id);
}
