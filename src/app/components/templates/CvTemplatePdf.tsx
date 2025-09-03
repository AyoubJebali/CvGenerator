import React from "react";
// import data from "../../../../public/datapdf.json";
import { useCv } from "../CvContext";

const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};

const CvTemplatePdf = () => {
  const { data } = useCv();
  return (
    <div
      className="bg-white text-black print:bg-white print:text-black"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        boxShadow: "0 0 12px rgba(0,0,0,0.08)",
        borderRadius: "8px",
        padding: "0",
      }}
    >
      <div
        className="w-full h-full"
        style={{
          width: "210mm",
          minHeight: "297mm",
          padding: "24mm 18mm",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-3xl font-bold mb-1 tracking-wide print:text-[28px]">{data.name}</h1>
          <h2 className="text-lg mb-2 font-semibold print:text-[18px]">{data.title}</h2>
          <div className="flex flex-wrap justify-center gap-4 mt-1 text-base print:text-[14px]">
            {data.contact?.phone && <span>{data.contact.phone}</span>}
            {data.contact?.email && <span>{data.contact.email}</span>}
            {data.contact?.github && (
              <a href={data.contact.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">GitHub</a>
            )}
            {data.contact?.linkedin && (
              <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-600">LinkedIn</a>
            )}
            {data.contact?.location && <span>{data.contact.location}</span>}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-0 bg-white print:w-full">
          {/* Left Column */}
          <div className="col-span-1 pr-6 border-r border-gray-200 print:border-gray-300">
            {/* Skills by category */}
            {Array.isArray(data.skills) && data.skills.length > 0 && (
              <>
                <h2 className="text-base font-bold text-blue-700 uppercase mb-2 tracking-wide print:text-[14px]">Skills</h2>
                <ul className="mb-4 space-y-1">
                  {(() => {
                    const grouped: { [key: string]: string[] } = {};
                    data.skills.forEach((skill: any) => {
                      const cat = skill.category || "Other";
                      if (!grouped[cat]) grouped[cat] = [];
                      grouped[cat].push(skill.skill);
                    });
                    return Object.entries(grouped)
                      .sort(([a], [b]) => a.localeCompare(b))
                      .map(([cat, skills], idx) => (
                        <li key={cat + idx} className="mb-1 print:text-[12px]">
                          <span className="font-semibold text-blue-700">{cat}:</span>
                          <span className="ml-1">{skills.join(", ")}</span>
                        </li>
                      ));
                  })()}
                </ul>
              </>
            )}

            {/* Languages */}
            {Array.isArray(data.languages) && data.languages.length > 0 && (
              <>
                <h2 className="text-base font-bold text-blue-700 uppercase mb-2 tracking-wide print:text-[14px]">Languages</h2>
                <ul className="mb-4 space-y-1">
                  {data.languages.map((lang: any, i: number) => (
                    <li key={i} className="flex justify-between print:text-[12px]">
                      <span>{lang.language}</span>
                      <span className="text-gray-500">{lang.proficiency}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* Hobbies */}
            {Array.isArray(data.hobbies) && data.hobbies.length > 0 && data.hobbies.some(h => h) && (
              <>
                <h2 className="text-base font-bold text-blue-700 uppercase mb-2 tracking-wide print:text-[14px]">Hobbies</h2>
                <ul className="mb-4 space-y-1">
                  {data.hobbies.map((hobby: string, i: number) => (
                    hobby && <li key={i} className="print:text-[12px]">{hobby}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="col-span-3 pl-6">
            {/* About */}
            {data.about && data.about.trim() !== "" && (
              <section className="mb-4">
                <h2 className="text-base font-bold text-blue-700 mb-1 border-b border-blue-100 pb-1 print:text-[14px]">About</h2>
                <p className="text-gray-700 leading-relaxed print:text-[12px]">{data.about}</p>
              </section>
            )}

            {/* Objectives */}
            {data.objectives && data.objectives.trim() !== "" && (
              <section className="mb-4">
                <h2 className="text-base font-bold text-blue-700 mb-1 border-b border-blue-100 pb-1 print:text-[14px]">Objectives</h2>
                <p className="text-gray-700 leading-relaxed print:text-[12px]">{data.objectives}</p>
              </section>
            )}

            {/* Education */}
            {Array.isArray(data.studies_training) && data.studies_training.length > 0 && (
              <section className="mb-4">
                <h2 className="text-base font-bold text-blue-700 mb-1 border-b border-blue-100 pb-1 print:text-[14px]">Education</h2>
                {data.studies_training.map((edu: any, index: number) => (
                  <div key={index} className="mb-2 print:text-[12px]">
                    <p>
                      <span className="font-semibold">{edu.degree}</span>
                      {" - "}
                      <span>{edu.institution}</span>
                    </p>
                    <p className="text-gray-500">
                      {getYear(edu.start)} - {getYear(edu.end)}
                      {edu.honors && ` | ${edu.honors}`}
                    </p>
                  </div>
                ))}
              </section>
            )}

            {/* Projects */}
            {Array.isArray(data.projects) && data.projects.length > 0 && (
              <section className="mb-4">
                <h2 className="text-base font-bold text-blue-700 mb-1 border-b border-blue-100 pb-1 print:text-[14px]">Projects</h2>
                {data.projects.map((project: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold print:text-[12px]">{project.title}</p>
                    <ul className="list-disc ml-6">
                      {Array.isArray(project.details) && project.details.map((detail: string, i: number) => (
                        <li key={i} className="print:text-[12px]">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {/* Experience */}
            {Array.isArray(data.experiences) && data.experiences.length > 0 && (
              <section className="mb-4">
                <h2 className="text-base font-bold text-blue-700 mb-1 border-b border-blue-100 pb-1 print:text-[14px]">Experience</h2>
                {data.experiences.map((exp: any, index: number) => (
                  <div key={index} className="mb-4">
                    <p className="font-semibold print:text-[12px]">{exp.position} – {exp.company}</p>
                    <p className="italic text-gray-500 print:text-[12px]">{getYear(exp.start)} - {getYear(exp.end)}</p>
                    <ul className="list-disc ml-6">
                      {Array.isArray(exp.details) && exp.details.map((detail: string, i: number) => (
                        <li key={i} className="print:text-[12px]">{detail}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CvTemplatePdf;
