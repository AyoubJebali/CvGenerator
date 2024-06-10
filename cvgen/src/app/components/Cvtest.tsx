import React from 'react'

const Cvtest = () => {
  return (
    
    <div className="container grid ">
  <div className="left">
    <img className="portait" src="./images/portrait.png" />
    <div className="section">
      <a
        href="https://www.linkedin.com/in/mahdi-barhoumi"
        target="_blank"
        className="icon"
        id="linkedin"
      >
        mahdi-barhoumi
      </a>
    </div>
    <div className="section">
      <h2>ABOUT ME</h2>
      <p>
        I am a computer science student with a strong background in{" "}
        <strong>Python</strong> and <strong>C/C++</strong>. I have 3 years of
        experience in developing software applications and have worked on a wide
        range of projects throughout my career.
      </p>
      <p>
        Resourceful and independent in my work, I enjoy learning new
        technologies, spending time solving problems and producing quality code.
        My work values: clean code, flexibility and performance.
      </p>
    </div>
    <div className="section">
      <h2>SKILLS</h2>
      <ul className="skills">
        <li className="icon" id="checkmark">
          <strong>C/C++</strong>
        </li>
        <li className="icon" id="checkmark">
          <strong>Python</strong>
        </li>
        <li className="icon" id="checkmark">
          <strong>Java</strong>
        </li>
        <li className="icon" id="checkmark">
          <strong>HTML</strong>
        </li>
        <li className="icon" id="checkmark">
          <strong>CSS</strong>
        </li>
        <li className="icon" id="checkmark">
          Javascript
        </li>
        <li className="icon" id="checkmark">
          PHP
        </li>
        <li className="icon" id="checkmark">
          SQL
        </li>
      </ul>
    </div>
    <div className="section">
      <h2>LANGUAGES</h2>
      English
      <div className="skill-bar-container">
        <div className="skill-bar english">
          <p>&nbsp;</p>
        </div>
      </div>
      French
      <div className="skill-bar-container">
        <div className="skill-bar french">
          <p>&nbsp;</p>
        </div>
      </div>
    </div>
    <div className="section">
      <h2>HOBBIES</h2>
      <p>
        Video games
        <br />
        IT in general
        <br />
        Sport
      </p>
    </div>
  </div>
  <div className="right">
    <div className="header">
      <h1>
        Mahdi <span className="text-blue text-uppercase">BARHOUMI</span>
      </h1>
      <p>Computer Science Student</p>
      <ul className="infos">
        <li className="icon" id="email">
          <a href="mailto:mahdi.barhoumi@ensi-uma.tn">
            mahdi.barhoumi@ensi-uma.tn
          </a>
        </li>
        <li className="icon" id="phone">
          +216 99 422 037
        </li>
        <li className="icon" id="location">
          Jardins D'El Menzeh I, 2094 Mnihla
        </li>
      </ul>
    </div>
    <div className="content">
      <div className="section">
        <h2>
          OBJECTIVES
          <br />
          <span className="text-blue">&amp; AMBITIONS</span>
        </h2>
        <p>
          I am actively seeking a month-long summer internship to further my
          professional growth and gain valuable hands-on experience. With a
          strong desire to learn and contribute, I am eager to embrace this
          opportunity and make a meaningful impact in a short-term internship.
        </p>
      </div>
      <div className="section">
        <h2>
          PROJECTS
          <br />
          <span className="text-blue">&amp; EXPERIENCES</span>
        </h2>
        <p>
          <strong>2020 → 2022</strong>
        </p>
        <ul className="experience-list">
          <li>Developed various web scraping tools using Python</li>
          <li>Used APIs to handle application to server communications</li>
        </ul>
      </div>
      <div className="section">
        <p>
          <strong>2022 → Present</strong>
        </p>
        <ul className="experience-list">
          <li>Developed a record keeping C application</li>
          <li>Collaboratively designed and developed a charity website</li>
          <li>Actively buidling a C++ 3D render engine using OpenGL</li>
        </ul>
      </div>
      <div className="section">
        <h2>
          STUDIES
          <br />
          <span className="text-blue">&amp; TRAINING</span>
        </h2>
        <p>
          <strong>2019 → 2020</strong>
          <br />
          <em>Baccalauréat's degree in Technology</em>, Graduated with Good
          honours, Menzah 9 High School
        </p>
        <p>
          <strong>2020 → 2022</strong>
          <br />
          <em>Preparatory in Technology and Physics</em>, Graduated, Preparatory
          Institute for Engineering Studies El Manar
        </p>
        <p>
          <strong>2022 → Present</strong>
          <br />
          <em>Computer Science Engineering</em>, Studying, National School of
          Computer Science
        </p>
      </div>
    </div>
  </div>
</div>

  )
}

export default Cvtest