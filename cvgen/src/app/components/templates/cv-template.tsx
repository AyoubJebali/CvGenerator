import React from "react";
import Image from "next/image";
import data from "../../../../public/datapdf.json";

const getYear = (dateStr: string) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? dateStr : d.getFullYear();
};

const Cvtemplate = () => {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white print:w-[210mm] print:h-[297mm] print:p-0 print:m-0 shadow-lg print:shadow-none">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 print:p-4 print:bg-blue-600 print:mb-4">
        <div className="flex items-center space-x-6">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <Image
              src="/CV/images/portrait.jpeg"
              alt="Portrait"
              width={80}
              height={80}
              className="rounded-full border-4 border-white shadow-lg"
            />
          </div>
          
          {/* Name and Title */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2 print:text-2xl">
              {data.name}
            </h1>
            <h2 className="text-xl text-blue-100 print:text-lg">{data.title}</h2>
          </div>
          
          {/* Contact Info */}
          <div className="text-sm print:text-xs">
            <div className="space-y-1">
              <div className="flex items-center">
                <Image src="/CV/images/email.png" alt="Email" width={12} height={12} className="mr-2" />
                <a href={`mailto:${data.contact.email}`} className="hover:underline">{data.contact.email}</a>
              </div>
              <div className="flex items-center">
                <Image src="/CV/images/phone.png" alt="Phone" width={12} height={12} className="mr-2" />
                <span>{data.contact.phone}</span>
              </div>
              <div className="flex items-center">
                <Image src="/CV/images/location.png" alt="Location" width={12} height={12} className="mr-2" />
                <span>{data.contact.location}</span>
              </div>
              <div className="flex items-center">
                <Image src="/CV/images/linkedin.png" alt="LinkedIn" width={12} height={12} className="mr-2" />
                <a href={data.contact.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(297mm-120px)] print:h-auto print:flex-col print:space-y-4">
        {/* Left Column - Skills, Languages, Hobbies */}
        <div className="w-1/3 bg-gray-50 p-4 print:p-3 border-r border-gray-200 print:w-full print:border-r-0 print:border-b print:border-gray-200 print:pb-4">
          {/* Skills */}
          {Array.isArray(data.skills) && data.skills.length > 0 && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Skills
              </h3>
              <div className="space-y-2 print:space-y-1">
                {(data.skills as any[]).map((skill, idx) => (
                  <div key={idx} className="flex items-center print:break-inside-avoid">
                    <Image
                      src="/CV/images/checkmark.png"
                      alt="Checkmark"
                      width={12}
                      height={12}
                      className="mr-2 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700 print:text-xs">
                      {skill.skill} {skill.category && <span className="text-gray-500">({skill.category})</span>}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {Array.isArray(data.languages) && data.languages.length > 0 && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Languages
              </h3>
              <div className="space-y-2 print:space-y-1">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between items-center print:break-inside-avoid">
                    <span className="text-sm font-medium text-gray-700 print:text-xs">{language.language}</span>
                    <span className="text-sm text-gray-500 bg-blue-100 px-2 py-1 rounded print:text-xs print:px-1 print:py-0.5">{language.proficiency}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Hobbies */}
          {Array.isArray(data.hobbies) && data.hobbies.length > 0 && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Hobbies
              </h3>
              <div className="flex flex-wrap gap-2 print:gap-1">
                {data.hobbies.map((hobby, index) => (
                  <span key={index} className="text-sm text-gray-700 bg-blue-100 px-2 py-1 rounded-full print:text-xs print:px-1 print:py-0.5">
                    {hobby}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column - About, Objectives, Experience, Projects, Education */}
        <div className="w-2/3 p-4 print:p-3 print:w-full">
          {/* About */}
          {data.about && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                About Me
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed print:text-xs print:leading-tight">{data.about}</p>
            </section>
          )}

          {/* Objectives */}
          {data.objectives && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Objectives & Ambitions
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed print:text-xs print:leading-tight">{data.objectives}</p>
            </section>
          )}

          {/* Experience */}
          {Array.isArray(data.experiences) && data.experiences.length > 0 && (
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Experience
              </h3>
              <div className="space-y-4 print:space-y-3">
                {data.experiences.map((exp, index) => (
                  <div key={index} className="border-l-3 border-blue-400 pl-4 print:pl-3 print:break-inside-avoid">
                    <div className="flex justify-between items-start mb-2 print:mb-1">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 print:text-xs">{exp.position}</h4>
                        <p className="text-sm text-blue-600 print:text-xs">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-500 print:text-xs">
                        {getYear(exp.start)} - {getYear(exp.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-1 print:space-y-0.5">
                      {(Array.isArray(exp.details) ? exp.details : []).map((detail, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start print:text-xs print:break-inside-avoid">
                          <span className="w-1 h-1 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0 print:mr-1 print:mt-1.5"></span>
                          {detail}
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
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Projects
              </h3>
              <div className="space-y-4 print:space-y-3">
                {data.projects.map((proj, index) => (
                  <div key={index} className="border-l-3 border-green-400 pl-4 print:pl-3 print:break-inside-avoid">
                    <div className="flex justify-between items-start mb-2 print:mb-1">
                      <h4 className="font-semibold text-sm text-gray-800 print:text-xs">{proj.title}</h4>
                      <span className="text-sm text-gray-500 print:text-xs">
                        {getYear(proj.start)} - {getYear(proj.end)}
                      </span>
                    </div>
                    <ul className="list-none space-y-1 print:space-y-0.5">
                      {(Array.isArray(proj.details) ? proj.details : []).map((detail, i) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start print:text-xs print:break-inside-avoid">
                          <span className="w-1 h-1 bg-green-400 rounded-full mr-2 mt-2 flex-shrink-0 print:mr-1 print:mt-1.5"></span>
                          {detail}
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
            <section className="mb-6 print:mb-4 print:break-inside-avoid">
              <h3 className="text-lg font-bold text-blue-700 mb-3 uppercase tracking-wider border-b border-blue-200 pb-1 print:text-base print:mb-2">
                Education
              </h3>
              <div className="space-y-3 print:space-y-2">
                {data.studies_training.map((study, index) => (
                  <div key={index} className="border-l-3 border-purple-400 pl-4 print:pl-3 print:break-inside-avoid">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h4 className="font-semibold text-sm text-gray-800 print:text-xs">{study.degree}</h4>
                        <p className="text-sm text-gray-600 print:text-xs">{study.institution}</p>
                      </div>
                      <span className="text-sm text-gray-500 print:text-xs">
                        {getYear(study.start)} - {getYear(study.end)}
                      </span>
                    </div>
                    {study.honors && (
                      <p className="text-sm text-gray-500 italic print:text-xs">{study.honors}</p>
                    )}
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

export default Cvtemplate;
