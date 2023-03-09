import React, { useState } from "react";

const CreateStudent = () => {
  const [name, setName] = useState("John Doe");
  const [dateOfBirth, setDateOfBirth] = useState("2000-01-01");
  const [gender, setGender] = useState("male");
  const [motherName, setMotherName] = useState("Mom");
  const [motherOccupation, setMotherOccupation] = useState("Work");
  const [fatherName, setFatherName] = useState("Dad");
  const [fatherOccupation, setFatherOccupation] = useState("Work");
  const [educationLevel, setEducationLevel] = useState("school");
  const [educationYear, setEducationYear] = useState(7);

  const handleNameChange = (e) => setName(e.target.value);
  const handleDateOfBirthChange = (e) => setDateOfBirth(e.target.value);
  const handleGenderChange = (e) => setGender(e.target.value);
  const handleMotherNameChange = (e) => setMotherName(e.target.value);
  const handleMotherOccupationChange = (e) =>
    setMotherOccupation(e.target.value);
  const handleFatherNameChange = (e) => setFatherName(e.target.value);
  const handleFatherOccupationChange = (e) =>
    setFatherOccupation(e.target.value);
  const handleEducationLevelChange = (e) => setEducationLevel(e.target.value);
  const handleEducationYearChange = (e) => setEducationYear(e.target.value);

  return (
    <div className="bg-gray-100 p-4">
      <img
        src="https://picsum.photos/200"
        alt="rain forest"
        className="mb-4 rounded-full w-32 h-32"
      />
      <label htmlFor="name" className="block text-lg font-medium mt-4">
        Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={handleNameChange}
        className="border-gray-400 border-2 rounded-md p-2 w-full"
      />
      <label htmlFor="dateOfBirth" className="block text-lg font-medium mt-4">
        Date of Birth
      </label>
      <input
        id="dateOfBirth"
        type="date"
        value={dateOfBirth}
        onChange={handleDateOfBirthChange}
        className="border-gray-400 border-2 rounded-md p-2 w-full"
      />
      <label htmlFor="gender" className="block text-lg font-medium mt-4">
        Gender
      </label>
      <select
        id="gender"
        value={gender}
        onChange={handleGenderChange}
        className="border-gray-400 border-2 rounded-md p-2 w-full"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <h3 className="text-xl font-bold mt-4 mb-2">Parents</h3>
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:w-1/2">
          <label
            htmlFor="motherName"
            className="block text-lg font-medium mt-4"
          >
            Mother Name
          </label>
          <input
            id="motherName"
            type="text"
            value={motherName}
            onChange={handleMotherNameChange}
            className="border-gray-400 border-2 rounded-md p-2 w-full"
          />
          <label
            htmlFor="motherOccupation"
            className="block text-lg font-medium mt-4"
          >
            Mother Occupation
          </label>
          {/* <input id="motherOccupation type=" text" value={motherOccupation} onChange={handleMotherOccupationChange} className="border-gray-400 border-2 rounded-md p-2 w-full" /> */}
        </div>
        <div className="w-full md:w-1/2">
          <label
            htmlFor="fatherName"
            className="block text-lg font-medium mt-4"
          >
            Father Name
          </label>
          <input
            id="fatherName"
            type="text"
            value={fatherName}
            onChange={handleFatherNameChange}
            className="border-gray-400 border-2 rounded-md p-2 w-full"
          />
          <label
            htmlFor="fatherOccupation"
            className="block text-lg font-medium mt-4"
          >
            Father Occupation
          </label>
          <input
            id="fatherOccupation"
            type="text"
            value={fatherOccupation}
            onChange={handleFatherOccupationChange}
            className="border-gray-400 border-2 rounded-md p-2 w-full"
          />
        </div>
      </div>
      <h3 className="text-xl font-bold mt-4 mb-2">Education</h3>
      <label
        htmlFor="educationLevel"
        className="block text-lg font-medium mt-4"
      >
        Level
      </label>
      <select
        id="educationLevel"
        value={educationLevel}
        onChange={handleEducationLevelChange}
        className="border-gray-400 border-2 rounded-md p-2 w-full"
      >
        <option value="school">School</option>
        <option value="college">College</option>
        <option value="university">University</option>
      </select>
      <label htmlFor="educationYear" className="block text-lg font-medium mt-4">
        Year
      </label>
      <input
        id="educationYear"
        type="number"
        value={educationYear}
        onChange={handleEducationYearChange}
        className="border-gray-400 border-2 rounded-md p-2 w-full"
      />
    </div>
  );
};

export default CreateStudent;
