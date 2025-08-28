"use client";
import React, { useActionState, useCallback } from "react";
import { validateForm } from "@/app/lib/actions";
import SkillSectionBase from "./form-sections/skill-section";
import PersonalInfoSectionBase from "./form-sections/personal-info-section";
import LanguagesSectionBase from "./form-sections/languages-section";
import HobbiesSectionBase from "./form-sections/hobbies-section";
import ObjectivesSectionBase from "./form-sections/objectives-section";
import ProjectsSectionBase from "./form-sections/projects-section";
import StudiesSectionBase from "./form-sections/education-section";
import ExperienceSectionBase from "./form-sections/experience-section";
import { printComponent } from "@/app/components/printCv";
import CvOneColumn from "@/app/components/templates/CvOneColumn";
import CvHeaderBanner from "@/app/components/templates/CvHeaderBanner";
export default function Form() {
  const [state, dispatch] = useActionState(validateForm, null);
  // Memoize sections to prevent unnecessary re-renders of heavy subtrees
  const PersonalInfoSection = React.useMemo(() => React.memo(PersonalInfoSectionBase), []);
  const StudiesSection = React.useMemo(() => React.memo(StudiesSectionBase), []);
  const ExperienceSection = React.useMemo(() => React.memo(ExperienceSectionBase), []);
  const ProjectsSection = React.useMemo(() => React.memo(ProjectsSectionBase), []);
  const SkillSection = React.useMemo(() => React.memo(SkillSectionBase), []);
  const LanguagesSection = React.useMemo(() => React.memo(LanguagesSectionBase), []);
  const HobbiesSection = React.useMemo(() => React.memo(HobbiesSectionBase), []);
  const ObjectivesSection = React.useMemo(() => React.memo(ObjectivesSectionBase), []);
  const handlePrint = useCallback(() => {
    printComponent(CvHeaderBanner, {}, { title: "My CV", theme: "winter" });
  }, []);
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-base-100 rounded-2xl shadow-xl md:h-[85vh] border border-base-200">
      <h1 className="text-2xl sm:text-3xl md:text-4xl text-base-content font-bold text-center mb-6 md:mb-8">Create Your CV</h1>
      
      <form action={dispatch} className="space-y-6">
        <div className="space-y-6 md:max-h-[60vh] overflow-y-auto pr-1">
          <PersonalInfoSection />
          <StudiesSection />
          <ExperienceSection />
          <ProjectsSection />
          <SkillSection />
          <LanguagesSection />
           <HobbiesSection />
          <ObjectivesSection />
        </div>
        <div className="form-control mt-6 md:mt-8">
          <button type="submit" className="btn btn-primary btn-block text-base md:text-lg">
            Preview CV
          </button>
          <button type="button" onClick={handlePrint} className="btn btn-primary btn-block text-base md:text-lg">
            Download CV
          </button>
        </div>
        {state?.message && (
          <div className="text-center mt-4 text-success">{state.message}</div>
        )}
      </form>
      
    </div>
  );
}
