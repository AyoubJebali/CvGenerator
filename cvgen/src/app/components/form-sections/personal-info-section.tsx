import React from "react";

export default function PersonalInfoSection() {
  return (
    <div className="collapse collapse-arrow bg-white text-white">
      <input type="checkbox" />
      <div className="collapse-title text-xl font-medium text-black">
        Personal Information
      </div>
      <div className="collapse-content bg-gray-100 rounded-lg shadow-lg text-black">
        <div className="form-control mb-4">
          <label htmlFor="name" className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="input input-bordered w-full bg-white"
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
        <div className="form-control mb-4">
          <label htmlFor="profile" className="label">
            <span className="label-text">Profile:</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full bg-white"
            placeholder="Profile"
            name="profile"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
