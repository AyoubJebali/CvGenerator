import React from "react";

export default function PersonalInfoSection() {
  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg">
      <input type="checkbox" name="personal-info-accordion" defaultChecked />
      <div className="collapse-title text-xl font-medium">
        Personal Information
      </div>
      <div className="collapse-content">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="form-control">
            <label htmlFor="name" className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input input-bordered w-full"
              placeholder="Enter your name"
            />
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text">Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>
          <div className="form-control">
            <label htmlFor="title" className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input input-bordered w-full"
              placeholder="Enter your title"
            />
          </div>
          <div className="form-control">
            <label htmlFor="number" className="label">
              <span className="label-text">Phone Number</span>
            </label>
            <input
              type="tel"
              id="number"
              name="number"
              className="input input-bordered w-full"
              placeholder="123-456-7890"
            />
          </div>
          <div className="form-control">
            <label htmlFor="address" className="label">
              <span className="label-text">Address</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              className="input input-bordered w-full"
              placeholder="Enter your address"
            />
          </div>
          <div className="form-control">
            <label htmlFor="linkedin" className="label">
              <span className="label-text">LinkedIn</span>
            </label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              className="input input-bordered w-full"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label htmlFor="profile" className="label">
            <span className="label-text">Profile</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Tell us about yourself"
            name="profile"
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
