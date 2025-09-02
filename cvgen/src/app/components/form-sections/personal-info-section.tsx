import React from "react";
import { useCv } from "../CvContext";

export default function PersonalInfoSection() {
  const { data, setData } = useCv();

  return (
    <div className="collapse collapse-arrow bg-base-200 rounded-lg	">
      <input type="checkbox" name="personal-info-accordion" defaultChecked />
      <div className="text-black collapse-title text-xl font-medium flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-icon lucide-user">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
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
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="input input-bordered w-full text-black"
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
              value={data.contact.email}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, email: e.target.value },
                })    
              }
              className="input input-bordered w-full text-black"
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
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              className="input input-bordered w-full text-black"
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
              value={data.contact.phone}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, phone: e.target.value },
                })
              }
              className="input input-bordered w-full text-black"
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
              value={data.contact.location}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, location: e.target.value },
                })
              }
              className="input input-bordered w-full text-black"
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
              value={data.contact.linkedin}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, linkedin: e.target.value },
                })
              }
              className="input input-bordered w-full text-black"
              placeholder="https://linkedin.com/in/yourprofile"
            />
          </div>
          <div className="form-control">
            <label htmlFor="github" className="label">
              <span className="label-text">GitHub</span>
            </label>
            <input
              type="url"
              id="github"
              name="github"
              value={data.contact.github || ""}
              onChange={(e) =>
                setData({
                  ...data,
                  contact: { ...data.contact, github: e.target.value },
                })
              }    
              className="input input-bordered w-full text-black"
              placeholder="https://github.com/yourusername"
            />
          </div>
        </div>
        <div className="form-control mt-4">
          <label htmlFor="profile" className="label">
            <span className="label-text">Profile</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full text-black"
            placeholder="Tell us about yourself"
            name="profile"
            value={data.about}
            onChange={(e) => setData({ ...data, about: e.target.value })}
            id="profile"
            rows={4}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
