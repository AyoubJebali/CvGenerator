"use client";
import React, { useActionState } from "react";
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
  const [, dispatch] = useActionState(validateForm, null);

  return (
    <div className="max-w-4xl">
      <form action={dispatch} className="space-y-6">
        <PersonalInfoSectionBase />
        <ExperienceSectionBase />
        <StudiesSectionBase />
        <SkillSectionBase />
        <ProjectsSectionBase />
        <LanguagesSectionBase />
        <HobbiesSectionBase />
        <ObjectivesSectionBase />
      </form>
    </div>
  );
}
