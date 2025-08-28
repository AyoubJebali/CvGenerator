import React from "react";
import Image from "next/image";
import { UserProfile } from "@/types" 

type CvPreviewProps = {
  data: UserProfile;
};

const Cvtemplate = ({ data }: CvPreviewProps) => {
    return (
        <>
            <div className="grid grid-cols-5 grid-rows-5 gap-0  text-black   bg-sky-200 	 print:w-[1200px] print-h-[297mm]  print:m-auto print:grid print:grid-cols-3 print:grid-rows-5 print:gap-0" >
                <div className="col-start-2 col-end-5 row-start-1 row-end-2 bg-blue-400 flex space-x-4 print:col-span-3 print:row-span-1 print:border-none break-inside-avoid">
                    <Image
                        className="mx-auto ml-0 mr-0"
                        src="/CV/images/portrait.jpeg"
                        alt="Portrait"
                        width={300}
                        height={300}
                    ></Image>
                    <div className=" pl-7 m-6 grid items-end text-white ">
                        <h1 className="text-5xl  print:text-[36px]">
                            {data.name.split(" ")[0]} <span className="text-blue-600 uppercase">{data.name.split(" ")[1]}</span>
                        </h1>
                        <h1 className="text-3xl">{data.title}</h1>
                        <ul className="columns-2 list-none p-0 mb-0">
                            <li className="mb-2">
                                <a
                                    href={data.contact.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center mb-0  print:text-[20px]"
                                >
                                    <img
                                        src="/CV/images/linkedin.png"
                                        alt="LinkedIn"
                                        width={15}
                                        height={15}
                                        className="mr-2"
                                    />
                                    {data.name}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <img
                                    src="/CV/images/email.png"
                                    alt="Email"
                                    width={15}
                                    height={15}
                                    className="mr-2"
                                />
                                <a href={`mailto:${data.contact.email}`} className="print:text-[20px]">{data.contact.email}</a>
                            </li>
                            <li className="flex items-center mb-2">
                                <img
                                    src="/CV/images/phone.png"
                                    alt="Phone"
                                    width={15}
                                    height={15}
                                    className="mr-2"
                                />
                                <p className="print:text-[20px]"> {data.contact.phone}</p>
                            </li>
                            <li className="flex items-center mb-2">
                                <img
                                    src="/CV/images/location.png"
                                    alt="Location"
                                    width={15}
                                    height={15}
                                    className="mr-2"
                                />
                                <p className="print:text-[20px]">{data.contact.location}</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-6 p-10 bg-white print:col-span-1 print:row-span-4 print:border-none break-inside-avoid">
                    <div className="mt-6 ">
                        <h2 className="uppercase mb-4 font-bold text-blue-600 print:text-[24px]">Skills</h2>
                        <ul className="list-none p-0 text-lg tracking-wider">
                            {Array.isArray(data.skills) && data.skills.map((skill, idx) => (
                                <li key={idx} className="flex items-center mb-2">
                                    <img
                                        src="/CV/images/checkmark.png"
                                        alt="Checkmark"
                                        width={15}
                                        height={15}
                                        className="mr-2"
                                    />
                                    <p className="print:text-[20px]">
                                        {typeof skill === "string"
                                            ? skill
                                            : `${skill.skill}${skill.category ? ` (${skill.category})` : ""}`}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2 className="uppercase mb-4 text-blue-600 font-bold print:text-[24px]">Languages</h2>
                    {
                        data.languages.map((language, index) => {
                            // Map proficiency to a percentage
                            const proficiencyMap: { [key: string]: number } = {
                                "Native": 100,
                                "Fluent": 90,
                                "Proficient": 75,
                                "Intermediate": 50,
                                "Basic": 25,
                            };
                            const widthPercent = proficiencyMap[language.proficiency] || 0;
                            return (
                                <div key={index} className="mb-4">
                                    <div className="mb-2 print:text-[20px]">{language.language}</div>
                                    <div className="w-3/4 h-3 bg-white mb-4">
                                        <div
                                            className="h-full bg-blue-900"
                                            style={{ width: `${widthPercent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div className="mb-2 print:text-[20px]">English</div>
                    <div className="w-3/4 h-3 bg-white mb-4">
                        <div className="w-11/12 h-full bg-blue-900"></div>
                    </div>
                    <div className="mb-2 print:text-[20px]">French</div>
                    <div className="w-3/4 h-3 bg-white mb-4">
                        <div className="w-1/2 h-full bg-blue-900"></div>
                    </div>
                    <div>
                        <h2 className="uppercase mb-4 text-blue-600 font-bold print:text-[24px]">Hobbies</h2>
                        <p className="print:text-[20px]">
                            {data.hobbies.join('\n')}
                        </p>
                    </div>
                </div>
                <div className="col-start-3 col-end-5 row-start-2 row-end-6 pt-10 bg-white pr-20 print:col-span-2 print:row-span-4 print:border-none break-inside-avoid">
                    <div className="mb-6 mt-6">
                        <h1 className="uppercase mb-4 font-bold text-blue-600 print:text-[24px]">About Me</h1>
                        <p className="print:text-[20px]">{data.about}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="uppercase mb-4 font-bold text-blue-600 print:text-[24px]">Objectives & Ambitions</h2>
                        <p className="print:text-[20px]" >{data.objectives}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="uppercase mb-4 font-bold text-blue-600 print:text-[24px]">Projects & Experiences</h2>
                        {data.experiences.map((project, index) => (
                            <div key={index}>
                                <p className="print:text-[20px]" ><strong>{project.period}</strong></p>
                                <ul className="list-disc ml-6 mb-6">
                                    {project.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="uppercase mb-4 font-bold text-blue-600 print:text-[24px]">Studies & Training</h2>
                        {data.studies_training.map((study, index) => {
                            const formatDate = (dateStr: string) => {
                                if (!dateStr) return "";
                                const date = new Date(dateStr);
                                if (isNaN(date.getTime())) return dateStr;
                                return date.toLocaleString("default", { month: "short", year: "numeric" });
                            };
                            return (
                                <p key={index} className="print:text-[20px]">
                                    <em>{study.degree}</em>, {study.honors}, {study.institution}
                                    <br />
                                    <strong>{formatDate(study.start)}</strong> to <strong>{formatDate(study.end)}</strong>
                                </p>

                            );
                        })}

                    </div>
                </div>
            </div>
        </>
    );
};

export default Cvtemplate;
