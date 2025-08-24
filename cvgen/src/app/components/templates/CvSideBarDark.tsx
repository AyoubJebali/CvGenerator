import React from "react";
import data from "../../../../public/data2.json";

const CvSidebarDark = () => {
  return (
    <div className="grid grid-cols-4 min-h-screen bg-gray-100 print:w-[1200px] print:m-auto">
      {/* Sidebar */}
      <div className="col-span-1 bg-gray-900 text-white p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-2">{data.name}</h1>
        <h2 className="text-lg mb-6">{data.title}</h2>
        <div className="mb-6">
          <h3 className="text-blue-400 uppercase font-bold mb-2">Contact</h3>
          <p>{data.contact.email}</p>
          <p>{data.contact.phone}</p>
          <p>{data.contact.location}</p>
          <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a><br/>
          <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a><br/>
          <a href={data.contact.portfolio} target="_blank" rel="noopener noreferrer">Portfolio</a>
        </div>
        <div className="mb-6">
          <h3 className="text-blue-400 uppercase font-bold mb-2">Skills</h3>
          <ul className="list-disc ml-4 text-sm">
            {data.skills.map((skill, i) => <li key={i}>{skill}</li>)}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-blue-400 uppercase font-bold mb-2">Languages</h3>
          {data.languages.map((lang, i) => (
            <p key={i}>{lang.language} – {lang.proficiency}</p>
          ))}
        </div>
        <div>
          <h3 className="text-blue-400 uppercase font-bold mb-2">Hobbies</h3>
          <ul className="list-disc ml-4 text-sm">
            {data.hobbies.map((hobby, i) => <li key={i}>{hobby}</li>)}
          </ul>
        </div>
      </div>
      {/* Main */}
      <div className="col-span-3 bg-white p-10">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">About</h2>
        <p className="mb-6 text-black">{data.about}</p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Objectives</h2>
        <p className="mb-6 text-black">{data.objectives}</p>
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Experience</h2>
        {data.projects_experiences.map((exp, i) => (
          <div key={i} className="mb-6 text-black">
            <p className="font-semibold">{exp.title}</p>
            <p className="italic">{exp.start} - {exp.end}</p>
            <ul className="list-disc ml-6">
              {exp.details.map((d, j) => <li key={j}>{d}</li>)}
            </ul>
          </div>
        ))}
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Education & Training</h2>
        {data.studies_training.map((edu, i) => (
          <p key={i} className="mb-2 text-black"><em>{edu.degree}</em> – {edu.institution}, {edu.honors} ({edu.start} - {edu.end})</p>
        ))}
      </div>
    </div>
  );
};
export default CvSidebarDark;