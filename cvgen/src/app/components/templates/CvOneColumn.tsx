import React, { useMemo } from "react";
import { UserProfile } from "@/types";
import { useCv } from "../CvContext";

const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};

// ---------------- Template 6: One-Column Clean ----------------
type CvOneColumnProps = {
  data?: UserProfile;
};

const CvOneColumn: React.FC<CvOneColumnProps> = ({ data: propData }) => {
  const context = useCv();
  const data = propData || context.data;

  const groupedSkills = useMemo(() => {
    const grouped: { [key: string]: string[] } = {};
    (data.skills as any[]).forEach((skill: any) => {
      const cat = skill.category || "Other";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(skill.skill);
    });
    return grouped;
  }, [data.skills]);

  return (
    <div className="bg-white text-black max-w-6xl mx-auto w-[210mm] p-10 space-y-4 print:w-[210mm] print:p-2 print:m-0 text-[12px] print:text-[12px]">
      {/* Header */}
      <div className="flex items-center">
        {/* Name and Title to the left */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1 print:text-[15px]">{data.name}</h1>
          <h2 className="text-lg mb-0 print:text-[13px]">{data.title}</h2>
        </div>
        {/* Contact info to the right */}
        <div className="flex flex-col items-end text-sm space-y-1 print:text-[12px]">
          <span>
            <a href={`mailto:${data.contact.email}`} className="hover:underline">{data.contact.email}</a>
          </span>
          <span>{data.contact.phone}</span>
          <span>{data.contact.location}</span>
          <span>
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">LinkedIn</a>
            {data.contact.github && (
              <> | <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="hover:underline">GitHub</a></>
            )}
          </span>
        </div>
      </div>

      {/* Education */}
      {Array.isArray(data.studies_training) && data.studies_training.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full print:text-[13px]">Education & Training</h2>
          {data.studies_training.map((edu, i) => {
            return (
              <div key={i} className="flex items-center justify-between mt-2 print:text-[12px]">
                <div>
                  <p className="font-semibold">{edu.degree}</p>
                  <p>{edu.institution}</p>
                  <p className="italic">{edu.honors}</p>
                </div>
                <div className="w-32 text-right text-blue-700 font-semibold">
                  {getYear(edu.start)} – {getYear(edu.end)}
                </div>
              </div>
            );
          })}
        </section>
      )}

      {/* Experience */}
      {Array.isArray(data.experiences) && data.experiences.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full print:text-[13px]">Experience</h2>
          {data.experiences.map((exp, i) => {
            return (
              <div key={i} className="mt-2 print:text-[12px]">
                <p className="font-semibold text-lg">{exp.position}</p>
                <p>{exp.company}</p>
                <p className="italic">{getYear(exp.start)} - {getYear(exp.end)}</p>
                <ul className="list-disc ml-6 mt-1">
                  {Array.isArray(exp.details) && exp.details.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            );
          })}
        </section>
      )}

      {/* Projects */}
      {Array.isArray(data.projects) && data.projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full print:text-[13px]">Projects</h2>
          {data.projects.map((proj, i) => {
            return (
              <div key={i} className="mt-2 print:text-[12px]">
                <p className="font-semibold text-lg">{proj.title}</p>
                <p className="italic">{getYear(proj.start)} - {getYear(proj.end)}</p>
                <ul className="list-disc ml-6 mt-1">
                  {Array.isArray(proj.details) && proj.details.map((d, j) => <li key={j}>{d}</li>)}
                </ul>
              </div>
            );
          })}
        </section>
      )}

      {/* Skills */}
      {Array.isArray(data.skills) && data.skills.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full print:text-[13px]">Skills</h2>
          <div className="ml-2 mt-2 print:text-[12px]">
            {Object.entries(groupedSkills).map(([cat, skills]) => (
              <p key={cat}>
                <span className="font-semibold">{cat}:</span> {skills.join(", ")}
              </p>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {Array.isArray(data.languages) && data.languages.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full print:text-[13px]">Languages</h2>
          {data.languages.map((lang, i) => (
            <p key={i} className="mt-2 print:text-[12px]">{lang.language} – {lang.proficiency}</p>
          ))}
        </section>
      )}
    </div>
  );
};

export default React.memo(CvOneColumn);
