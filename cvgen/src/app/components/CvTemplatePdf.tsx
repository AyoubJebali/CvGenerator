import React from "react";
import data from "../../../public/datapdf.json";

const CvTemplatePdf = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 bg-gray-100 text-black print:w-[1200px] print:m-auto">
        {/* Header */}
        <div className="col-span-4 bg-blue-600 text-white p-6 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold print:text-[36px]">{data.name}</h1>
          <h2 className="text-2xl print:text-[24px]">{data.title}</h2>
          <div className="flex flex-wrap justify-center mt-4 space-x-6 print:text-[18px]">
            <p>{data.contact.phone}</p>
            <p>{data.contact.email}</p>
            <a href={data.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Left Column */}
        <div className="col-span-1 bg-white p-6 print:border-none">
          <h2 className="text-xl font-bold text-blue-600 uppercase mb-4">Technical Skills</h2>
          <ul className="mb-6">
            {data.technical_skills.map((skill, index) => (
              <li key={index} className="mb-2 print:text-[18px]">{skill}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-blue-600 uppercase mb-4">Areas of Interest</h2>
          <ul className="mb-6">
            {data.areas_of_interest.map((area, index) => (
              <li key={index} className="mb-2 print:text-[18px]">{area}</li>
            ))}
          </ul>

          <h2 className="text-xl font-bold text-blue-600 uppercase mb-4">Soft Skills</h2>
          <ul>
            {data.soft_skills.map((skill, index) => (
              <li key={index} className="mb-2 print:text-[18px]">{skill}</li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div className="col-span-3 bg-white p-6 print:border-none">
          <h2 className="text-2xl font-bold text-blue-600 uppercase mb-4">Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4 print:text-[18px]">
              <p><strong>{edu.degree}</strong> - {edu.institution}</p>
              <p>{edu.duration} | CGPA: {edu.cgpa}</p>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-blue-600 uppercase mb-4 mt-6">Personal Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold print:text-[18px]">{project.name}</p>
              <ul className="list-disc ml-6">
                {project.details.map((detail, i) => (
                  <li key={i} className="print:text-[18px]">{detail}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-blue-600 uppercase mb-4 mt-6">Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-6">
              <p className="font-semibold print:text-[18px]">{exp.role} – {exp.organization}</p>
              <p className="italic print:text-[18px]">{exp.period}</p>
              <ul className="list-disc ml-6">
                {exp.details.map((detail, i) => (
                  <li key={i} className="print:text-[18px]">{detail}</li>
                ))}
              </ul>
            </div>
          ))}

          <h2 className="text-2xl font-bold text-blue-600 uppercase mb-4 mt-6">Positions of Responsibility</h2>
          {data.positions.map((pos, index) => (
            <div key={index} className="mb-6 print:text-[18px]">
              <p className="font-semibold">{pos.title} – {pos.organization}</p>
              <p className="italic">{pos.period}</p>
              <ul className="list-disc ml-6">
                {pos.details.map((detail, i) => (
                  <li key={i}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CvTemplatePdf;
