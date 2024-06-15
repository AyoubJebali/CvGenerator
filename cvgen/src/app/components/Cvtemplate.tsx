import React from "react";
import Image from "next/image";
import data from "../../../public/data.json"
const Cvtemplate = () => {
    return (
        <>
            <div className="grid grid-cols-5 grid-rows-5 gap-0 text-black   bg-gray-400">
                <div className="col-start-2 col-end-5 row-start-1 row-end-2 bg-blue-400 flex space-x-4">
                    <Image
                        className="mx-auto ml-0 mr-0"
                        src="/CV/images/portrait.png"
                        alt="Portrait"
                        width={200}
                        height={200}
                    ></Image>
                    <div className=" pl-7 m-6 text-white ">
                        <h1 className="text-4xl mb-4">
                            MEHDI <span className="text-blue-600 uppercase">BARHOUMI</span>
                        </h1>

                        <p className="mb-4">{data.title}</p>

                        <ul className="columns-2 list-none p-0">
                            <li className="mb-2">
                                <a

                                    href="https://www.linkedin.com/in/mahdi-barhoumi"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center mb-0"
                                >
                                    <img
                                        src="/CV/images/linkedin.png"
                                        alt="LinkedIn"
                                        width={15}
                                        height={15}
                                        className="mr-2"
                                    />
                                    mahdi-barhoumi
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
                                <a href={`mailto:${data.contact.email}`}>{data.contact.email}</a>
                            </li>
                            <li className="flex items-center mb-2">
                                <img
                                    src="/CV/images/phone.png"
                                    alt="Phone"
                                    width={15}
                                    height={15}
                                    className="mr-2"
                                />
                                {data.contact.phone}
                            </li>
                            <li className="flex items-center mb-2">
                                <img
                                    src="/CV/images/location.png"
                                    alt="Location"
                                    width={15}
                                    height={15}
                                    className="mr-2"
                                />
                                {data.contact.location}
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-start-2 col-end-3 row-start-2 row-end-6 p-10 bg-white">
                    <div className="mt-6 ">
                        <h2 className="uppercase mb-4 font-bold text-blue-600">Skills</h2>
                        <ul className="list-none p-0 text-lg tracking-wider">
                            {data.skills.map(skill => (
                                <li key={skill} className="flex items-center mb-2">
                                    <img
                                        src="/CV/images/checkmark.png"
                                        alt="Checkmark"
                                        width={15}
                                        height={15}
                                        className="mr-2"
                                    />
                                    <p>{skill}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <h2 className="uppercase mb-4 text-blue-600 font-bold">Languages</h2>
                    <div className="mb-2">English</div>
                    <div className="w-3/4 h-3 bg-white mb-4">
                        <div className="w-11/12 h-full bg-blue-900"></div>
                    </div>
                    <div className="mb-2">French</div>
                    <div className="w-3/4 h-3 bg-white mb-4">
                        <div className="w-1/2 h-full bg-blue-900"></div>
                    </div>
                    <div>
                        <h2 className="uppercase mb-4 text-blue-600 font-bold">Hobbies</h2>
                        <p>
                            {data.hobbies.join('\n')}
                        </p>
                    </div>
                </div>
                <div className="col-start-3 col-end-5 row-start-2 row-end-6 bg-white">
                    <div className="mb-6 mt-6">
                        <h2 className="uppercase mb-4 font-bold text-blue-600">About Me</h2>
                        <p>{data.about}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="uppercase mb-4 font-bold text-blue-600">Objectives & Ambitions</h2>
                        <p>{data.objectives}</p>
                    </div>
                    <div className="mb-6">
                        <h2 className="uppercase mb-4 font-bold text-blue-600">Projects & Experiences</h2>
                        {data.projects_experiences.map((project, index) => (
                            <div key={index}>
                                <p><strong>{project.period}</strong></p>
                                <ul className="list-disc ml-6 mb-6">
                                    {project.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2 className="uppercase mb-4 font-bold text-blue-600">Studies & Training</h2>
                        {data.studies_training.map((study, index) => (
                            <p key={index} className="mb-6">
                                <strong>{study.period}</strong>
                                <br />
                                <em>{study.degree}</em>, {study.honors}, {study.institution}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cvtemplate;
