"use client";
import React, { createContext, useContext, useState } from "react";
import { UserProfile } from "@/types" // ✅ import from Zod schema

// Empty initial data
const emptyCvData: UserProfile = {
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
  data: UserProfile;
  setData: React.Dispatch<React.SetStateAction<UserProfile>>;
};

const CvContext = createContext<CvContextType | null>(null);

export const CvProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserProfile>(emptyCvData);

  return (
    <CvContext.Provider value={{ data, setData }}>
      {children}
    </CvContext.Provider>
  );
};

export const useCv = () => {
  const ctx = useContext(CvContext);
  if (!ctx) throw new Error("useCv must be used within CvProvider");
  return ctx;
};
