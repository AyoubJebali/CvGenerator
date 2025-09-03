import React from "react";
import { UserProfile } from "@/types";

const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};

type CvSidebarDarkProps = {
  data?: UserProfile;
};

const CvSidebarDark: React.FC<CvSidebarDarkProps> = ({ data: propData }) => {
  const data = propData ;

  // Directly assign arrays, no memoization
  const experiences = Array.isArray(data.experiences) ? data.experiences : [];
  const projects = Array.isArray(data.projects) ? data.projects : [];
  const studies = Array.isArray(data.studies_training) ? data.studies_training : [];
  const skills = Array.isArray(data.skills) ? data.skills : [];
  const languages = Array.isArray(data.languages) ? data.languages : [];
  const hobbies = Array.isArray(data.hobbies) ? data.hobbies : [];

  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white print:w-[210mm] print:h-[297mm] print:p-0 print:m-0 shadow-lg">
      <div className="grid grid-cols-3 h-full">
        {/* Sidebar - 1/3 width */}
        <div className="col-span-1 bg-gray-800 text-white p-4 print:p-3 flex flex-col">
          {/* Header Section */}
          <div className="mb-4 border-b border-gray-600 pb-3">
            <h1 className="text-xl font-bold mb-1 text-white">{data.name}</h1>
            <h2 className="text-sm text-gray-300">{data.title}</h2>
          </div>
          
          {/* Contact Section */}
          <div className="mb-4">
            <h3 className="text-blue-300 uppercase font-bold mb-2 text-xs tracking-wider">Contact</h3>
            <div className="space-y-1 text-xs">
              <p>{data.contact.email}</p>
              <p>{data.contact.phone}</p>
              <p>{data.contact.location}</p>
              <p className="text-blue-300">{data.contact.linkedin}</p>
              {data.contact.github && (
                <p className="text-blue-300">{data.contact.github}</p>
              )}
            </div>
          </div>

          {/* Skills Section */}
          {skills.length > 0 && (
            <div className="mb-4">
              <h3 className="text-blue-300 uppercase font-bold mb-2 text-xs tracking-wider">Skills</h3>
              <ul className="space-y-1 text-xs">
                {(() => {
                  // Group skills by category
                  const grouped: { [key: string]: string[] } = {};
                  skills.forEach((skill: any) => {
                    const cat = skill.category || "Other";
                    if (!grouped[cat]) grouped[cat] = [];
                    grouped[cat].push(skill.skill);
                  });
                  // Sort categories alphabetically
                  return Object.entries(grouped)
                    .sort(([a], [b]) => a.localeCompare(b))
                    .map(([cat, skillArr]) => (
                      <li key={cat}>
                        <span className="font-semibold">{cat}:</span> {skillArr.join(", ")}
                      </li>
                    ));
                })()}
              </ul>
            </div>
          )}

          {/* Languages Section */}
          {languages.length > 0 && (
            <div className="mb-4">
              <h3 className="text-blue-300 uppercase font-bold mb-2 text-xs tracking-wider">Languages</h3>
              <div className="space-y-1 text-xs">
                {languages.map((lang, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{lang.language}</span>
                    <span className="text-gray-400">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hobbies Section */}
          {hobbies.length > 0 && (
            <div className="mt-auto">
              <h3 className="text-blue-300 uppercase font-bold mb-2 text-xs tracking-wider">Hobbies</h3>
              <ul className="space-y-1 text-xs">
                {hobbies.map((hobby, i) => (
                  <li key={i}>{hobby}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Main Content - 2/3 width */}
        <div className="col-span-2 bg-white p-4 print:p-3 overflow-hidden">
          {/* About Section */}
          {data.about && (
            <section className="mb-3">
              <h2 className="text-lg font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">About</h2>
              <p className="text-xs text-gray-700 leading-tight">{data.about}</p>
            </section>
          )}

          {/* Objectives Section */}
          {data.objectives && (
            <section className="mb-3">
              <h2 className="text-lg font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">Objectives</h2>
              <p className="text-xs text-gray-700 leading-tight">{data.objectives}</p>
            </section>
          )}

          {/* Experience Section */}
          {experiences.length > 0 && (
            <section className="mb-3">
              <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Experience</h2>
              <div className="space-y-2">
                {experiences.map((exp, i) => (
                  <div key={i} className="border-l-2 border-blue-300 pl-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <p className="font-semibold text-xs text-gray-800">{exp.position}</p>
                        <p className="text-xs text-blue-600">{exp.company}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {getYear(exp.start)} - {getYear(exp.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-0.5">
                      {(Array.isArray(exp.details) ? exp.details : []).map((d, j) => (
                        <li key={j} className="text-xs text-gray-700 flex items-start">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mr-1 mt-1.5 flex-shrink-0"></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects Section */}
          {projects.length > 0 && (
            <section className="mb-3">
              <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Projects</h2>
              <div className="space-y-2">
                {projects.map((proj, i) => (
                  <div key={i} className="border-l-2 border-green-300 pl-2">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-xs text-gray-800">{proj.title}</p>
                      <span className="text-xs text-gray-500">
                        {getYear(proj.start)} - {getYear(proj.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-0.5">
                      {(Array.isArray(proj.details) ? proj.details : []).map((d, j) => (
                        <li key={j} className="text-xs text-gray-700 flex items-start">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-1 mt-1.5 flex-shrink-0"></span>
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {studies.length > 0 && (
            <section className="mb-3">
              <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Education & Training</h2>
              <div className="space-y-1">
                {studies.map((edu, i) => (
                  <div key={i} className="border-l-2 border-purple-300 pl-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-xs text-gray-800 italic">{edu.degree}</p>
                        <p className="text-xs text-purple-600">{edu.institution}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {getYear(edu.start)} - {getYear(edu.end)}
                      </span>
                    </div>
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

export default React.memo(CvSidebarDark);