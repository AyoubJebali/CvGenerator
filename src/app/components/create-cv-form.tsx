"use client";
import React from "react";
import SkillSectionBase from "./form-sections/skill-section";
import PersonalInfoSectionBase from "./form-sections/personal-info-section";
import LanguagesSectionBase from "./form-sections/languages-section";
import HobbiesSectionBase from "./form-sections/hobbies-section";
import ObjectivesSectionBase from "./form-sections/objectives-section";
import ProjectsSectionBase from "./form-sections/projects-section";
import StudiesSectionBase from "./form-sections/education-section";
import ExperienceSectionBase from "./form-sections/experience-section";

export default function Form() {
  return (
    <div className="max-w-4xl">
      <div className="space-y-6">
        <PersonalInfoSectionBase />
        <ExperienceSectionBase />
        <StudiesSectionBase />
        <SkillSectionBase />
        <ProjectsSectionBase />
        <LanguagesSectionBase />
        <HobbiesSectionBase />
        <ObjectivesSectionBase />
      </div>
    </div>
  );
}
