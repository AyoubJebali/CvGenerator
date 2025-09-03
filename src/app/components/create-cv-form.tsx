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
  
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-base-100 via-base-200 to-base-300 rounded-3xl shadow-2xl border border-base-300/50 backdrop-blur-sm overflow-y-auto">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-8 border-b border-base-300/30">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Create Your CV
          </h1>
          <p className="text-base-content/70 text-sm sm:text-base">
            Build a professional resume in minutes
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
          <form action={dispatch}>
            <PersonalInfoSection />
            <StudiesSection />
            <ExperienceSection />
            <ProjectsSection />
            <SkillSection />
            <LanguagesSection />
            <HobbiesSection />
            <ObjectivesSection />
          </form>
        </div>
      </div>
    </div>
  );
}
