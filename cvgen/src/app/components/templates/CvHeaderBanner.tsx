import React from "react";
import data from "../../../../public/data2.json";


// ---------------- Template 5: Top Header Banner ----------------
const CvHeaderBanner = () => {
  return (
    <div className="bg-white text-black print:w-[1200px] print:m-auto">
      {/* Header */}
      <div className="bg-blue-700 text-white p-10 text-center">
        <h1 className="text-5xl font-bold mb-2">{data.name}</h1>
        <h2 className="text-2xl mb-4">{data.title}</h2>
        <p>{data.contact.email} | {data.contact.phone} | {data.contact.location}</p>
        <p>
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> | {" "}
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a> | {" "}
          <a href={data.contact.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
        </p>
      </div>
      {/* Content */}
      <div className="p-10">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">About</h2>
          <p>{data.about}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Objectives</h2>
          <p>{data.objectives}</p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Experience</h2>
          {data.projects_experiences.map((exp, i) => (
            <div key={i} className="mb-6">
              <p className="font-semibold">{exp.title}</p>
              <p className="italic">{exp.start} - {exp.end}</p>
              <ul className="list-disc ml-6">
                {exp.details.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          ))}
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Education</h2>
          {data.studies_training.map((edu, i) => (
            <p key={i} className="mb-2"><em>{edu.degree}</em> – {edu.institution}, {edu.honors} ({edu.start} - {edu.end})</p>
          ))}
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Skills</h2>
          <ul className="list-disc ml-6">
            {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-2">Hobbies</h2>
          <ul className="list-disc ml-6">
            {data.hobbies.map((h, i) => <li key={i}>{h}</li>)}
          </ul>
        </section>
      </div>
    </div>
  );
};
export default CvHeaderBanner;
