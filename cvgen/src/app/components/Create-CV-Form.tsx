"use client";
import React, { useActionState, useState } from "react";
import { validateForm , State } from "@/app/lib/actions"


export default function Form() {
  const initialState = { message: '', errors: {} };
  //const [state , formAction] = useActionState();
  return (
    <form>
      <div className="collapse collapse-arrow bg-white text-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-black">
          Personal Information
        </div>
        <div className="collapse-content  bg-gray-100 rounded-lg shadow-lg text-black" >
          <div className="form-control mb-4">
            <label htmlFor="name" className="label">
              <span className="label-text">Name:</span>
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Name
              <input
                type="text"
                id="name"
                name="name"
                className="input input-bordered w-full bg-white"
                placeholder="Enter your name"
              />
            </label>
          </div>

          <div className="form-control mb-4">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address:</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full bg-white"
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
              className="input input-bordered w-full bg-white"
              placeholder="Enter your title"
            />
          </div>

          <div className="form-control mb-4">
            <label htmlFor="number" className="label">
              <span className="label-text">Phone Number:</span>
            </label>
            <input
              type="number"
              id="number"
              name="number"
              className="input input-bordered w-full bg-white"
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
              className="input input-bordered w-full bg-white"
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
              className="input input-bordered w-full bg-white text-black"
              placeholder="Enter your LinkedIn profile"
            />
          </div>
          <textarea className="textarea textarea-bordered w-full bg-white" placeholder="Profile"></textarea>
          <div className="form-control">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>

        </div>
      </div>
      <div className="collapse mt-5 collapse-arrow bg-white text-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-black">
          Skills
        </div>
        </div>
    </form>


  );
};

