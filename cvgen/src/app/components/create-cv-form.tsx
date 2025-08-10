"use client";
import React, { useActionState } from "react";
import { validateForm } from "@/app/lib/actions";
import SkillSection from "./skill-section";
import PersonalInfoSection from "./form-sections/personal-info-section";
import LanguagesSection from "./form-sections/languages-section";
import HobbiesSection from "./form-sections/hobbies-section";
import ObjectivesSection from "./form-sections/objectives-section";
import ProjectsSection from "./form-sections/projects-section";
import StudiesSection from "./form-sections/studies-section";

export default function Form() {
  const [state, dispatch] = useActionState(validateForm, null);

  return (
    <form action={dispatch}>
      <PersonalInfoSection />
      <SkillSection />
      <LanguagesSection />
      <HobbiesSection />
      <ObjectivesSection />
      <ProjectsSection />
      <StudiesSection />
      <div className="form-control mt-5">
        <button type="submit" className="btn btn-primary w-full">
          Generate
        </button>
      </div>
    </form>
  );
}
