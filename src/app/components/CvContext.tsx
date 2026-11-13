"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { ResumeSchema, UserProfileSchema } from "@/types";

// Empty initial data
export const emptyCvData: ResumeSchema = {
  name: "",
  title: "",
  contact: {
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
  },
  about: "",
  skills: [],
  languages: [],
  hobbies: [],
  objectives: "",
  projects: [],
  studies_training: [],
  experiences: [],
};

type CvContextType = {
  data: ResumeSchema;
  setData: React.Dispatch<React.SetStateAction<ResumeSchema>>;
  reset: () => void;
};

const CvContext = createContext<CvContextType | null>(null);

interface CvProviderProps {
  children: React.ReactNode;
  initialData?: ResumeSchema;
  storageKey?: string | null;
}

export const CvProvider = ({
  children,
  initialData,
  storageKey,
}: CvProviderProps) => {
  const [data, setData] = useState<ResumeSchema>(() => {
    if (initialData) {
      return initialData;
    }
    if (typeof window === "undefined" || !storageKey) {
      return emptyCvData;
    }
    const saved = localStorage.getItem(storageKey);
    if (!saved) return emptyCvData;
    try {
      const result = UserProfileSchema.safeParse(JSON.parse(saved));
      return result.success ? result.data : emptyCvData;
    } catch {
      return emptyCvData;
    }
  });

  // Save to localStorage only if storageKey is explicitly set
  useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      localStorage.setItem(storageKey, JSON.stringify(data));
    }
  }, [data, storageKey]);

  // reset function callable from components
  const reset = () => {
    setData(emptyCvData);
    if (storageKey && typeof window !== "undefined") {
      localStorage.removeItem(storageKey);
    }
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
