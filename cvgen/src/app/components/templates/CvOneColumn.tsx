import React from "react";
import data from "../../../../public/generated-cv.json";

// ---------------- Template 6: One-Column Clean ----------------
const CvOneColumn = () => {
  return (
    <div className="bg-white text-black max-w-6xl mx-auto p-10 space-y-0 print:w-[1200px] print:m-auto">
      {/* Header */}
      <div className="flex items-center">
        {/* Name and Title to the left */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{data.name}</h1>
          <h2 className="text-lg mb-0">{data.title}</h2>
        </div>
        {/* Contact info to the right */}
        <div className="flex flex-col items-end text-sm space-y-1">
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
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full">Education & Training</h2>
          {data.studies_training.map((edu, i) => {
            const getYear = (dateStr: string) => {
              if (!dateStr) return "";
              const d = new Date(dateStr);
              return isNaN(d.getTime()) ? dateStr : d.getFullYear();
            };
            return (
              <div key={i} className="flex items-center justify-between">
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
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full">Experience</h2>
          {data.experiences.map((exp, i) => {
            const getYear = (dateStr: string) => {
              if (!dateStr) return "";
              const d = new Date(dateStr);
              return isNaN(d.getTime()) ? dateStr : d.getFullYear();
            };
            return (
              <div key={i}>
                <p className="font-semibold text-lg">{exp.position}</p>
                <p>{exp.company}</p>
                <p className="italic">{getYear(exp.start)} - {getYear(exp.end)}</p>
                <ul className="list-disc ml-6">
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
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full">Projects</h2>
          {data.projects.map((proj, i) => {
            const getYear = (dateStr: string) => {
              if (!dateStr) return "";
              const d = new Date(dateStr);
              return isNaN(d.getTime()) ? dateStr : d.getFullYear();
            };
            return (
              <div key={i}>
                <p className="font-semibold text-lg">{proj.title}</p>
                <p className="italic">{getYear(proj.start)} - {getYear(proj.end)}</p>
                <ul className="list-disc ml-6">
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
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full">Skills</h2>
          <div className="ml-2">
            {(() => {
              const grouped: { [key: string]: string[] } = {};
              data.skills.forEach(skill => {
                const cat = skill.category || "Other";
                if (!grouped[cat]) grouped[cat] = [];
                grouped[cat].push(skill.skill);
              });
              return Object.entries(grouped).map(([cat, skills]) => (
                <p key={cat}>
                  <span className="font-semibold">{cat}:</span> {skills.join(", ")}
                </p>
              ));
            })()}
          </div>
        </section>
      )}

      {/* Languages */}
      {Array.isArray(data.languages) && data.languages.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold text-blue-600 border-b-4 border-blue-600 inline-block w-full">Languages</h2>
          {data.languages.map((lang, i) => (
            <p key={i}>{lang.language} – {lang.proficiency}</p>
          ))}
        </section>
      )}
    </div>
  );
};
export default CvOneColumn;
