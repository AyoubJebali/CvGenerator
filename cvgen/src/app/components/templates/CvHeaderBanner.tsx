import React from "react";
//import data from '../../../../public/datapdf.json'
import { CvProps } from "@/types";
const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};


// ---------------- Template 5: Top Header Banner ----------------
const CvHeaderBanner = ({ data: propData }: CvProps) => {
   //const { data } = useCv();
  const data = propData;
  
  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white print:w-[210mm] print:min-h-[297mm] print:p-0 print:m-0 shadow-lg print:shadow-none">
      {/* Header */}
      <div className="bg-blue-700 text-white p-4 print:p-3 text-center">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">{data.name}</h1>
        <h2 className="text-lg md:text-xl mb-3">{data.title}</h2>
        <div className="space-y-1 text-xs md:text-sm">
          <p>
            {data.contact.email} | {data.contact.phone} | {data.contact.location}
          </p>
          <p>
            <span className="text-blue-200">{data.contact.linkedin}</span>
            {data.contact.github && (
              <> | <span className="text-blue-200">{data.contact.github}</span></>
            )}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 print:p-3 overflow-visible">
        {data.about && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">About</h2>
            <p className="text-xs text-gray-700 leading-tight">{data.about}</p>
          </section>
        )}

        {data.objectives && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-1 border-b border-gray-300 pb-1">Objectives</h2>
            <p className="text-xs text-gray-700 leading-tight">{data.objectives}</p>
          </section>
        )}

        {/* Experiences */}
        {Array.isArray(data.experiences) && data.experiences.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Experience</h2>
            <div className="space-y-2">
              {data.experiences.map((exp, i) => (
                <div key={i} className="border-l-2 border-blue-400 pl-2">
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

        {/* Projects */}
        {Array.isArray(data.projects) && data.projects.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Projects</h2>
            <div className="space-y-2">
              {data.projects.map((proj, i) => (
                <div key={i} className="border-l-2 border-green-400 pl-2">
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

        {/* Education */}
        {Array.isArray(data.studies_training) && data.studies_training.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Education</h2>
            <div className="space-y-1">
              {data.studies_training.map((edu, i) => (
                <div key={i} className="border-l-2 border-purple-400 pl-2">
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

        {/* Skills */}
        {Array.isArray(data.skills) && data.skills.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Skills</h2>
            <div className="grid grid-cols-2 gap-1">
              {(data.skills as any[]).map((skillObj, i) => (
                <div key={i} className="flex items-center">
                  <span className="w-1 h-1 bg-orange-400 rounded-full mr-1"></span>
                  <span className="text-xs text-gray-700">
                    {skillObj.skill} {skillObj.category && <span className="text-gray-500">({skillObj.category})</span>}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {Array.isArray(data.languages) && data.languages.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Languages</h2>
            <div className="grid grid-cols-2 gap-1">
              {data.languages.map((lang, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-xs text-gray-700">{lang.language}</span>
                  <span className="text-xs text-gray-500">{lang.proficiency}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Hobbies */}
        {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
          <section className="mb-3">
            <h2 className="text-lg font-bold text-gray-800 mb-2 border-b border-gray-300 pb-1">Hobbies</h2>
            <div className="flex flex-wrap gap-1">
              {data.hobbies.map((h, i) => (
                <span key={i} className="text-xs text-gray-700 bg-gray-100 px-2 py-0.5 rounded">
                  {h}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default React.memo(CvHeaderBanner);
