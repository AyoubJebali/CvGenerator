"use client";
import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    contact: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
    },
    about: "",
    skills: [],
    languages: {
      English: "",
      Spanish: "",
    },
    hobbies: [],
    objectives: "",
    projects_experiences: [
      {
        period: "",
        details: [""],
      },
    ],
    studies_training: [
      {
        period: "",
        degree: "",
        institution: "",
        honors: "",
      },
    ],
  });

  
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Forum</h2>

      <div className="collapse bg-white text-black">
        <input type="checkbox" />
         <div className="collapse-title text-xl font-medium">
                    Focus me to see content
                </div>
                <div className="collapse-content">

                    <form>
                        <label htmlFor="inputData" className="block mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </form>
                </div> 
        
        
      </div>
    </>
  );
};

export default Form;
