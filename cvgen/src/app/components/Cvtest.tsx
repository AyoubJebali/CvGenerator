import React from 'react';

const resumeData = {
  "name": "Mahdi BARHOUMI",
  "title": "Computer Science Student",
  "contact": {
    "email": "mahdi.barhoumi@ensi-uma.tn",
    "phone": "+216 99 422 037",
    "location": "Jardins D'El Menzeh I, 2094 Mnihla",
    "linkedin": "https://www.linkedin.com/in/mahdi-barhoumi"
  },
  "about": "I am a computer science student with a strong background in Python and C/C++. I have 3 years of experience in developing software applications and have worked on a wide range of projects throughout my career. Resourceful and independent in my work, I enjoy learning new technologies, spending time solving problems and producing quality code. My work values: clean code, flexibility and performance.",
  "skills": [
    "C/C++",
    "Python",
    "Java",
    "HTML",
    "CSS",
    "Javascript",
    "PHP",
    "SQL"
  ],
  "languages": {
    "English": "proficient",
    "French": "proficient"
  },
  "hobbies": [
    "Video games",
    "IT in general",
    "Sport"
  ],
  "objectives": "I am actively seeking a month-long summer internship to further my professional growth and gain valuable hands-on experience. With a strong desire to learn and contribute, I am eager to embrace this opportunity and make a meaningful impact in a short-term internship.",
  "projects_experiences": [
    {
      "period": "2020 → 2022",
      "details": [
        "Developed various web scraping tools using Python",
        "Used APIs to handle application to server communications"
      ]
    },
    {
      "period": "2022 → Present",
      "details": [
        "Developed a record keeping C application",
        "Collaboratively designed and developed a charity website",
        "Actively building a C++ 3D render engine using OpenGL"
      ]
    }
  ],
  "studies_training": [
    {
      "period": "2019 → 2020",
      "degree": "Baccalauréat's degree in Technology",
      "institution": "Menzah 9 High School",
      "honors": "Graduated with Good honours"
    },
    {
      "period": "2020 → 2022",
      "degree": "Preparatory in Technology and Physics",
      "institution": "Preparatory Institute for Engineering Studies El Manar",
      "honors": "Graduated"
    },
    {
      "period": "2022 → Present",
      "degree": "Computer Science Engineering",
      "institution": "National School of Computer Science",
      "honors": "Studying"
    }
  ]
};

const Cvtest = () => {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-5xl mx-auto my-24 shadow-lg bg-red-700 cursor-zoom-in">
      <div className="col-span-1 p-12 bg-blue-600 text-white">
        <img 
          className="rounded-full mx-auto mb-12"
          src="/images/portrait.png" 
          alt="Portrait" 
          width={200} 
          height={200}
        />
        <div className="mb-6">
          <a 
            href={resumeData.contact.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center mb-4"
          >
            <img 
              src="/CV/images/linkedin.png" 
              alt="LinkedIn" 
              width={15} 
              height={15} 
              className="mr-2"
            />
            {resumeData.contact.linkedin.split('/').pop()}
          </a>
        </div>
        <div className="mb-6">
          <h2 className="uppercase mb-4">About Me</h2>
          <p>{resumeData.about}</p>
        </div>
        <div className="mb-6">
          <h2 className="uppercase mb-4">Skills</h2>
          <ul className="list-none p-0 text-lg tracking-wider">
            {resumeData.skills.map(skill => (
              <li key={skill} className="flex items-center mb-2">
                <img 
                  src="/CV/images/checkmark.png" 
                  alt="Checkmark" 
                  width={15} 
                  height={15} 
                  className="mr-2"
                />
                <strong>{skill}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="uppercase mb-4">Languages</h2>
          <div className="mb-2">English</div>
          <div className="w-3/4 h-3 bg-white mb-4">
            <div className="w-11/12 h-full bg-blue-900"></div>
          </div>
          <div className="mb-2">French</div>
          <div className="w-3/4 h-3 bg-white mb-4">
            <div className="w-1/2 h-full bg-blue-900"></div>
          </div>
        </div>
        <div>
          <h2 className="uppercase mb-4">Hobbies</h2>
          <p>
            {resumeData.hobbies.join('\n')}
          </p>
        </div>
      </div>
      <div className="col-span-2">
        <div className="bg-gray-200 p-12 flex flex-col justify-center">
          <h1 className="text-4xl mb-4">{resumeData.name} <span className="text-blue-600 uppercase">{resumeData.name.split(' ')[1]}</span></h1>
          <p className="mb-4">{resumeData.title}</p>
          <ul className="columns-2 list-none p-0">
            <li className="flex items-center mb-2">
              <img 
                src="/CV/images/email.png" 
                alt="Email" 
                width={15} 
                height={15} 
                className="mr-2"
              />
              <a href={`mailto:${resumeData.contact.email}`}>{resumeData.contact.email}</a>
            </li>
            <li className="flex items-center mb-2">
              <img 
                src="/CV/images/phone.png" 
                alt="Phone" 
                width={15} 
                height={15} 
                className="mr-2"
              />
              {resumeData.contact.phone}
            </li>
            <li className="flex items-center mb-2">
              <img 
                src="/CV/images/location.png" 
                alt="Location" 
                width={15}  
                height={15} 
                className="mr-2"
              />
              {resumeData.contact.location}
            </li>
          </ul>
        </div>
        <div className="p-12">
          <div className="mb-6">
            <h2 className="uppercase mb-4">Objectives & Ambitions</h2>
            <p>{resumeData.objectives}</p>
          </div>
          <div className="mb-6">
            <h2 className="uppercase mb-4">Projects & Experiences</h2>
            {resumeData.projects_experiences.map((project, index) => (
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
            <h2 className="uppercase mb-4">Studies & Training</h2>
            {resumeData.studies_training.map((study, index) => (
              <p key={index}>
                <strong>{study.period}</strong>
                <br />
                <em>{study.degree}</em>, {study.honors}, {study.institution}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cvtest;
