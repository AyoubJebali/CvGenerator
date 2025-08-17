"use client";
import React, { useActionState } from "react";
import { validateForm } from "@/app/lib/actions";
import SkillSection from "./skill-section";
import PersonalInfoSection from "./form-sections/personal-info-section";
import LanguagesSection from "./form-sections/languages-section";
import HobbiesSection from "./form-sections/hobbies-section";
import ObjectivesSection from "./form-sections/objectives-section";
import ProjectsSection from "./form-sections/projects-section";
import StudiesSection from "./form-sections/education-section";

export default function Form() {
  const [state, dispatch] = useActionState(validateForm, null);

  return (
    <div className="max-w-4xl mx-auto p-8 bg-base-100 rounded-xl shadow-lg">
      <h1 className="text-4xl text-black font-bold text-center mb-8">Create Your CV</h1>
      <form action={dispatch}>
        <div className="space-y-6">
          <PersonalInfoSection />
          <SkillSection />
          <LanguagesSection />
          <HobbiesSection />
          <ObjectivesSection />
          <ProjectsSection />
          <StudiesSection />
        </div>
        <div className="form-control mt-8">
          <button type="submit" className="btn btn-outline btn-primary   w-full text-lg">
            Generate CV
          </button>
        </div>
        {state?.message && (
          <div className="text-center mt-4 text-success">{state.message}</div>
        )}
      </form>
    </div>
  );
}
