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

      <div className="collapse bg-white text-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-black">
          Personal Information
        </div>
        <div className="collapse-content p-6 bg-gray-100 rounded-lg shadow-lg">
          <form>
            <div className="form-control mb-4">
              <label htmlFor="name" className="label">
                <span className="label-text">Name:</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full"
                placeholder="Enter your name"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="email" className="label">
                <span className="label-text">Email Address:</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="input input-bordered w-full"
                placeholder="Enter your email"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="title" className="label">
                <span className="label-text">Title:</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="input input-bordered w-full"
                placeholder="Enter your title"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="number" className="label">
                <span className="label-text">Phone Number:</span>
              </label>
              <input
                type="tel"
                id="number"
                name="number"
                className="input input-bordered w-full"
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="address" className="label">
                <span className="label-text">Address:</span>
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="input input-bordered w-full"
                placeholder="Enter your address"
              />
            </div>

            <div className="form-control mb-4">
              <label htmlFor="linkedin" className="label">
                <span className="label-text">LinkedIn:</span>
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                className="input input-bordered w-full"
                placeholder="Enter your LinkedIn profile"
              />
            </div>

            <div className="form-control">
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* <div className="collapse-content">

                    <form>
                        <label htmlFor="inputData" className="block mb-2">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">Email Adress:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">Number:</label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">Adress:</label>
                        <input
                            type="text"
                            id="adress"
                            name="adress"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        <label htmlFor="inputData" className="block mb-2">LinkedIn:</label>
                        <input
                            type="text"
                            id="adress"
                            name="adress"
                            className="block input-bordered w-full p-2 bg-white mb-4"
                        />
                        
                        
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                            Submit
                        </button>
                    </form>
                </div>  */}
      </div>
    </>
  );
};

export default Form;
