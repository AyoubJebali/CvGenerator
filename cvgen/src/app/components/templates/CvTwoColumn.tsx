import React from "react";
import data from "../../../../public/data2.json";


// ---------------- Template 4: Two-Column Modern ----------------
 const CvTwoColumn = () => {
  return (
    <div className="grid grid-cols-2 gap-6 bg-gray-50 text-black p-10 print:w-[1200px] print:m-auto border-black border-solid border-2">
      {/* Left Column */}
      <div>
        <h1 className="text-4xl font-bold text-blue-700 mb-2">{data.name}</h1>
        <h2 className="text-xl mb-6">{data.title}</h2>
        <h3 className="text-lg font-bold text-blue-600 mb-2">Education</h3>
        {data.studies_training.map((edu, i) => (
          <div key={i} className="mb-4">
            <p className="font-semibold">{edu.degree}</p>
            <p>{edu.institution} ({edu.start} - {edu.end})</p>
            <p className="italic">{edu.honors}</p>
          </div>
        ))}
        <h3 className="text-lg font-bold text-blue-600 mb-2">Skills</h3>
        <ul className="list-disc ml-6 mb-6">
          {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
        </ul>
        <h3 className="text-lg font-bold text-blue-600 mb-2">Languages</h3>
        {data.languages.map((lang, i) => (
          <p key={i}>{lang.language} – {lang.proficiency}</p>
        ))}
      </div>
      {/* Right Column */}
      <div>
        <h3 className="text-lg font-bold text-blue-600 mb-2">About</h3>
        <p className="mb-6">{data.about}</p>
        <h3 className="text-lg font-bold text-blue-600 mb-2">Objectives</h3>
        <p className="mb-6">{data.objectives}</p>
        <h3 className="text-lg font-bold text-blue-600 mb-2">Experience</h3>
        {data.projects_experiences.map((exp, i) => (
          <div key={i} className="mb-6">
            <p className="font-semibold">{exp.title}</p>
            <p className="italic">{exp.start} - {exp.end}</p>
            <ul className="list-disc ml-6">
              {exp.details.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
        <h3 className="text-lg font-bold text-blue-600 mb-2">Hobbies</h3>
        <ul className="list-disc ml-6">
          {data.hobbies.map((h, i) => <li key={i}>{h}</li>)}
        </ul>
      </div>
    </div>
  );
};
export default CvTwoColumn;