import React from "react";
import { useCv } from "../CvContext";
// ---------------- Template 5: Top Header Banner ----------------
const CvHeaderBanner = () => {
  const { data } = useCv();
  return (
    <div className="bg-white text-black print:w-[1200px] print:m-auto">
      {/* Header */}
      <div className="bg-blue-700 text-white p-10 text-center">
        <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
        <h2 className="text-2xl mb-4">{data.title}</h2>
        <p>
          {data.contact.email} | {data.contact.phone} | {data.contact.location}
        </p>
        <p>
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> |{" "}
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>

      {/* Content */}
      <div className="p-10">
        {data.about && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">About</h2>
            <p>{data.about}</p>
          </section>
        )}

        {data.objectives && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">Objectives</h2>
            <p>{data.objectives}</p>
          </section>
        )}

        {/* Experiences */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Experience</h2>
          {(Array.isArray(data.experiences) ? data.experiences : []).map((exp, i) => (
            <div key={i} className="mb-6">
              <p className="font-semibold">
                {exp.position} – {exp.company}
              </p>
              <p className="italic">
                {exp.start} - {exp.end}
              </p>
              <ul className="list-disc ml-6">
                {(Array.isArray(exp.details) ? exp.details : []).map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Projects */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Projects</h2>
          {(Array.isArray(data.projects) ? data.projects : []).map((proj, i) => (
            <div key={i} className="mb-6">
              <p className="font-semibold">{proj.title}</p>
              <p className="italic">
                {proj.start} - {proj.end}
              </p>
              <ul className="list-disc ml-6">
                {(Array.isArray(proj.details) ? proj.details : []).map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* Education */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Education</h2>
          {(Array.isArray(data.studies_training) ? data.studies_training : []).map((edu, i) => (
            <p key={i} className="mb-2">
              <em>{edu.degree}</em> – {edu.institution} ({edu.start} - {edu.end})
            </p>
          ))}
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Skills</h2>
          <ul className="list-disc ml-6">
            {(Array.isArray(data.skills) ? data.skills : []).map((skillObj, i) => (
              <li key={i}>
                {skillObj.skill} {skillObj.category ? `(${skillObj.category})` : ""}
              </li>
            ))}
          </ul>
        </section>

        {/* Languages */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Languages</h2>
          <ul className="list-disc ml-6">
            {(Array.isArray(data.languages) ? data.languages : []).map((lang, i) => (
              <li key={i}>
                {lang.language} – {lang.proficiency}
              </li>
            ))}
          </ul>
        </section>

        {/* Hobbies */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Hobbies</h2>
          <ul className="list-disc ml-6">
            {(Array.isArray(data.hobbies) ? data.hobbies : []).map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default CvHeaderBanner;
