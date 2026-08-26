"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { ResumeSchema, UserProfileSchema } from "@/types";

// Empty initial data
const emptyCvData: ResumeSchema = {
  "name": "",
  "title": "",
  "contact": {
    "email": "",
    "phone": "",
    "location": "",
    "linkedin": "",
    "github": ""
  },
  "about": "",
  "skills": [],
  "languages": [],
  "hobbies": [],
  "objectives": "",
  "projects": [],
  "studies_training": [],
  "experiences": []
};

type CvContextType = {
  data: ResumeSchema;
  setData: React.Dispatch<React.SetStateAction<ResumeSchema>>;
  reset: () => void; // <--- added
};

const CvContext = createContext<CvContextType | null>(null);

export const CvProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<ResumeSchema>(() => {
    if (typeof window === "undefined") return emptyCvData;
    const saved = localStorage.getItem("cvData");
    if (!saved) return emptyCvData;
    try {
      const result = UserProfileSchema.safeParse(JSON.parse(saved));
      return result.success ? result.data : emptyCvData;
    } catch {
      return emptyCvData;
    }
  });
  const { status } = useSession();
  const prevStatus = useRef(status);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("cvData", JSON.stringify(data));
  }, [data]);

  // reset function callable from components
  const reset = () => {
    setData(emptyCvData);
    if (typeof window !== "undefined") localStorage.removeItem("cvData");
  };

  return (
    <CvContext.Provider value={{ data, setData, reset }}>
      {children}
    </CvContext.Provider>
  );
};

export const useCv = () => {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCv must be used within CvProvider");
  return ctx;
};
