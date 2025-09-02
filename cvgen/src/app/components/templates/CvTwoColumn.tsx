import React from "react";
// import data from "../../../../public/datapdf.json";
import { useCv } from "../CvContext";
const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};

// ---------------- Template 4: Two-Column Modern ----------------
const CvTwoColumn = () => {
  const { data } = useCv();
  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white print:w-[210mm] print:h-[297mm] print:p-0 print:m-0 shadow-lg">
      <div className="grid grid-cols-3 h-full">
        {/* Left Column */}
        <div className="bg-gradient-to-b from-blue-50 to-blue-100 p-4 print:p-3 border-r border-gray-200">
          {/* Header */}
          <div className="mb-4 pb-3 border-b border-blue-200">
            <h1 className="text-xl font-bold text-blue-800 mb-1">{data.name}</h1>
            <h2 className="text-sm text-blue-600 font-medium">{data.title}</h2>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wider">Contact</h3>
            <div className="space-y-1 text-sm text-gray-700">
              <p>{data.contact.email}</p>
              <p>{data.contact.phone}</p>
              <p>{data.contact.location}</p>
              <p className="text-blue-600">{data.contact.linkedin}</p>
              {data.contact.github && (
                <p className="text-blue-600">{data.contact.github}</p>
              )}
            </div>
          </div>

          {/* Education */}
          {Array.isArray(data.studies_training) && data.studies_training.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wider">Education</h3>
              <div className="space-y-2">
                {data.studies_training.map((edu, i) => (
                  <div key={i} className="border-l-2 border-blue-300 pl-2">
                    <p className="font-semibold text-sm text-gray-800">{edu.degree}</p>
                    <p className="text-sm text-gray-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{getYear(edu.start)} - {getYear(edu.end)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wider">Skills</h3>
              <div className="space-y-1">
                {(() => {
                  // Group skills by category
                  const grouped: { [key: string]: string[] } = {};
                  (data.skills as any[]).forEach((skill: any) => {
                    const cat = skill.category || "Other";
                    if (!grouped[cat]) grouped[cat] = [];
                    grouped[cat].push(skill.skill);
                  });
                  // Sort categories alphabetically
                  return Object.entries(grouped)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([cat, skills], idx) => (
                      <div key={cat + idx} className="flex items-center">
                        <span className="font-semibold text-blue-700 mr-1">{cat}:</span>
                        <span className="text-sm text-gray-700">{skills.join(", ")}</span>
                      </div>
                    ));
                })()}
              </div>
            </div>
          )}

          {/* Languages */}
          {Array.isArray(data.languages) && data.languages.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wider">Languages</h3>
              <div className="space-y-1">
                {data.languages.map((lang, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">{lang.language}</span>
                    <span className="text-sm text-gray-500 bg-blue-100 px-1 rounded">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies */}
          {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
            <div className="mt-auto">
              <h3 className="text-sm font-bold text-blue-700 mb-2 uppercase tracking-wider">Hobbies</h3>
              <div className="flex flex-wrap gap-1">
                {data.hobbies.map((h, i) => (
                  <span key={i} className="text-sm text-gray-700 bg-blue-100 px-2 py-0.5 rounded">
                    {h}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 p-4 print:p-3">
          {/* About */}
          {data.about && (
            <section className="mb-4">
              <h3 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">About</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.about}</p>
            </section>
          )}

          {/* Objectives */}
          {data.objectives && (
            <section className="mb-4">
              <h3 className="text-base font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Objectives</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.objectives}</p>
            </section>
          )}

          {/* Experience */}
          {Array.isArray(data.experiences) && data.experiences.length > 0 && (
            <section className="mb-4">
              <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">Experience</h3>
              <div className="space-y-3">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="border-l-2 border-blue-400 pl-3">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold text-sm text-gray-800">{exp.position}</p>
                        <p className="text-sm text-blue-600">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">
                        {getYear(exp.start)} - {getYear(exp.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-1">
                      {(Array.isArray(exp.details) ? exp.details : []).map((d, j) => (
                        <li key={j} className="text-sm text-gray-700 flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {Array.isArray(data.projects) && data.projects.length > 0 && (
            <section className="mb-4">
              <h3 className="text-base font-bold text-gray-800 mb-3 border-b border-gray-300 pb-1">Projects</h3>
              <div className="space-y-3">
                {data.projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-green-400 pl-3">
                    <div className="flex justify-between items-start mb-2">
                      <p className="font-semibold text-sm text-gray-800">{proj.title}</p>
                      <span className="text-sm text-gray-500">
                        {getYear(proj.start)} - {getYear(proj.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-1">
                      {(Array.isArray(proj.details) ? proj.details : []).map((d, j) => (
                        <li key={j} className="text-sm text-gray-700 flex items-start">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CvTwoColumn;