import React from 'react'
import SkillInput from './skill-input';

const SkillSection = () => {
  return (
    <div className="collapse mt-5 collapse-arrow bg-white text-white">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium text-black">
          Skills
        </div>
        <div className="collapse-content  bg-gray-100 rounded-lg shadow-lg text-black">

          <div className="form-control mb-4">
            <input
              type="text"
              id="skill"
              name="skill"
              className="input input-bordered w-full bg-white"
              placeholder="Enter your skill"
            />
          </div>
          <SkillInput/>
        </div>
      </div>
  )
}

export default SkillSection;