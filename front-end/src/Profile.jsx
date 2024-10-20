// Pink #F45F67
// Dark Orange #FC7100
// Light Orange #FB8818
// Peach #F5DDC2
// Green #5CA135

import React, { useState } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    highRiskAllergies: [""],
    lowRiskAllergies: [""],
    dietaryRestrictions: [""],
  });

  const [otherInputs, setOtherInputs] = useState({
    highRiskAllergies: [""],
    lowRiskAllergies: [""],
    dietaryRestrictions: [""],
  });

  const handleHighRiskChange = (index, event) => {
    const newHighRiskAllergies = [...formData.highRiskAllergies];
    newHighRiskAllergies[index] = event.target.value;

    // Reset the "Other" input if the selection is not "Other"
    if (event.target.value !== "other") {
      const newOtherInputs = [...otherInputs.highRiskAllergies];
      newOtherInputs[index] = "";
      setOtherInputs({ ...otherInputs, highRiskAllergies: newOtherInputs });
    }

    setFormData({ ...formData, highRiskAllergies: newHighRiskAllergies });
  };

  const handleLowRiskChange = (index, event) => {
    const newLowRiskAllergies = [...formData.lowRiskAllergies];
    newLowRiskAllergies[index] = event.target.value;

    // Reset the "Other" input if the selection is not "Other"
    if (event.target.value !== "other") {
      const newOtherInputs = [...otherInputs.lowRiskAllergies];
      newOtherInputs[index] = "";
      setOtherInputs({ ...otherInputs, lowRiskAllergies: newOtherInputs });
    }

    setFormData({ ...formData, lowRiskAllergies: newLowRiskAllergies });
  };

  const handleRestrictionChange = (index, event) => {
    const newDietaryRestrictions = [...formData.dietaryRestrictions];
    newDietaryRestrictions[index] = event.target.value;

    // Reset the "Other" input if the selection is not "Other"
    if (event.target.value !== "other") {
      const newOtherInputs = [...otherInputs.dietaryRestrictions];
      newOtherInputs[index] = "";
      setOtherInputs({ ...otherInputs, dietaryRestrictions: newOtherInputs });
    }

    setFormData({ ...formData, dietaryRestrictions: newDietaryRestrictions });
  };

  const handleOtherInputChange = (index, category, event) => {
    const newOtherInputs = { ...otherInputs };
    newOtherInputs[category][index] = event.target.value;
    setOtherInputs(newOtherInputs);
  };

  const addHighRiskAllergy = () => {
    setFormData({ ...formData, highRiskAllergies: [...formData.highRiskAllergies, ""] });
    setOtherInputs({ ...otherInputs, highRiskAllergies: [...otherInputs.highRiskAllergies, ""] });
  };

  const removeLastHighRiskAllergy = () => {
    const newHighRiskAllergies = [...formData.highRiskAllergies];
    const newOtherInputs = [...otherInputs.highRiskAllergies];
    newHighRiskAllergies.pop(); // Remove last allergy
    newOtherInputs.pop(); // Remove last "Other" input
    setFormData({ ...formData, highRiskAllergies: newHighRiskAllergies });
    setOtherInputs({ ...otherInputs, highRiskAllergies: newOtherInputs });
  };

  const addLowRiskAllergy = () => {
    setFormData({ ...formData, lowRiskAllergies: [...formData.lowRiskAllergies, ""] });
    setOtherInputs({ ...otherInputs, lowRiskAllergies: [...otherInputs.lowRiskAllergies, ""] });
  };

  const removeLastLowRiskAllergy = () => {
    const newLowRiskAllergies = [...formData.lowRiskAllergies];
    const newOtherInputs = [...otherInputs.lowRiskAllergies];
    newLowRiskAllergies.pop(); // Remove last allergy
    newOtherInputs.pop(); // Remove last "Other" input
    setFormData({ ...formData, lowRiskAllergies: newLowRiskAllergies });
    setOtherInputs({ ...otherInputs, lowRiskAllergies: newOtherInputs });
  };

  const addDietaryRestriction = () => {
    setFormData({ ...formData, dietaryRestrictions: [...formData.dietaryRestrictions, ""] });
    setOtherInputs({ ...otherInputs, dietaryRestrictions: [...otherInputs.dietaryRestrictions, ""] });
  };

  const removeLastDietaryRestriction = () => {
    const newDietaryRestrictions = [...formData.dietaryRestrictions];
    const newOtherInputs = [...otherInputs.dietaryRestrictions];
    newDietaryRestrictions.pop(); // Remove last restriction
    newOtherInputs.pop(); // Remove last "Other" input
    setFormData({ ...formData, dietaryRestrictions: newDietaryRestrictions });
    setOtherInputs({ ...otherInputs, dietaryRestrictions: newOtherInputs });
  };

  const handleSubmit = () => {
    // Create an aggregated list of selected allergies and restrictions
    const aggregatedData = {
      highRiskAllergies: formData.highRiskAllergies.map((allergy, index) => (
        allergy === "other" ? otherInputs.highRiskAllergies[index] : allergy
      )),
      lowRiskAllergies: formData.lowRiskAllergies.map((allergy, index) => (
        allergy === "other" ? otherInputs.lowRiskAllergies[index] : allergy
      )),
      dietaryRestrictions: formData.dietaryRestrictions.map((restriction, index) => (
        restriction === "other" ? otherInputs.dietaryRestrictions[index] : restriction
      )),
    };

    console.log("Submitted Data:", aggregatedData);
  };

  return (
    <div className="flex flex-col">
    <header className="bg-white w-full l-20"></header>
      <header className="bg-black py-10 border-b h-80 flex border-gray-300 items-center justify-center shadow-md relative bg-[url(https://www.shutterstock.com/image-photo/menu-frame-different-types-cheese-600nw-1810524649.jpg)] bg-left bg-no-repeat w-full mx-auto bg-contain">
        <h1 className="text-3xl font-cursive font-bold text-white">Create Your Allergy Profile</h1>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mt-8">High Risk Allergies</h2>
        {formData.highRiskAllergies.map((allergy, index) => (
          <div key={index} className="mt-4">
            <label htmlFor={`highRiskAllergy${index}`} className="block text-gray-600 mb-2">
              Select High Risk Allergy:
            </label>
            <select
              id={`highRiskAllergy${index}`}
              value={allergy}
              onChange={(event) => handleHighRiskChange(index, event)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>Select Allergy</option>
              <option value="none">None</option>
              <option value="peanuts">Peanuts</option>
              <option value="tree_nuts">Tree Nuts</option>
              <option value="milk">Milk</option>
              <option value="eggs">Eggs</option>
              <option value="soy">Soy</option>
              <option value="wheat">Wheat</option>
              <option value="fish">Fish</option>
              <option value="shellfish">Shellfish</option>
              <option value="other">Other</option>
            </select>
            {allergy === "other" && (
              <input
                type="text"
                value={otherInputs.highRiskAllergies[index]}
                onChange={(event) => handleOtherInputChange(index, "highRiskAllergies", event)}
                placeholder="Please specify"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4 mx-4 space-x-4">
        <button
          onClick={addHighRiskAllergy}
          className="mt-4 bg-[#5CA135] hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full shadow-md transition-shadow duration-200"
        >
          Add
        </button>
        <button
          onClick={removeLastHighRiskAllergy}
          className="mt-4 bg-[#FC7100] hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-shadow duration-200"
        >
          Remove
        </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8">Low Risk Allergies</h2>
        {formData.lowRiskAllergies.map((allergy, index) => (
          <div key={index} className="mt-4">
            <label htmlFor={`lowRiskAllergy${index}`} className="block text-gray-600 mb-2">
              Select Low Risk Allergy:
            </label>
            <select
              id={`lowRiskAllergy${index}`}
              value={allergy}
              onChange={(event) => handleLowRiskChange(index, event)}
              className="block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>Select Allergy</option>
              <option value="none">None</option>
              <option value="peanuts">Peanuts</option>
              <option value="tree_nuts">Tree Nuts</option>
              <option value="milk">Milk</option>
              <option value="eggs">Eggs</option>
              <option value="soy">Soy</option>
              <option value="wheat">Wheat</option>
              <option value="fish">Fish</option>
              <option value="shellfish">Shellfish</option>
              <option value="other">Other</option>
            </select>
            {allergy === "other" && (
              <input
                type="text"
                value={otherInputs.lowRiskAllergies[index]}
                onChange={(event) => handleOtherInputChange(index, "lowRiskAllergies", event)}
                placeholder="Please specify"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4 mx-4 space-x-4">
        <button
          onClick={addLowRiskAllergy}
          className="mt-4 bg-[#5CA135] hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full shadow-md transition-shadow duration-200"
        >
          Add
        </button>
        <button
          onClick={removeLastLowRiskAllergy}
          className="mt-4 bg-[#FC7100] hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-shadow duration-200"
        >
          Remove
        </button>
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8">Dietary Restrictions</h2>
        {formData.dietaryRestrictions.map((restriction, index) => (
          <div key={index} className="mt-4">
            <label htmlFor={`dietaryRestriction${index}`} className="block text-gray-600 mb-2">
              Select Dietary Restriction:
            </label>
            <select
              id={`dietaryRestriction${index}`}
              value={restriction}
              onChange={(event) => handleRestrictionChange(index, event)}
              className="block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="" disabled>Select Restriction</option>
              <option value="none">None</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="glutenfree">Gluten-Free</option>
              <option value="halal">Halal</option>
              <option value="kosher">Kosher</option>
              <option value="other">Other</option>
            </select>
            {restriction === "other" && (
              <input
                type="text"
                value={otherInputs.dietaryRestrictions[index]}
                onChange={(event) => handleOtherInputChange(index, "dietaryRestrictions", event)}
                placeholder="Please specify"
                className="mt-2 block w-full border border-gray-300 rounded-md p-2"
              />
            )}
          </div>
        ))}
        <div className="flex justify-end mt-4 mx-4 space-x-4">
        <button
          onClick={addDietaryRestriction}
          className="mt-4 bg-[#5CA135] hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full shadow-md transition-shadow duration-200"
        >
          Add
        </button>
        <button
          onClick={removeLastDietaryRestriction}
          className="mt-4 bg-[#FC7100] hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-shadow duration-200"
        >
          Remove
        </button>
        </div>
      </main>
      <div className="items-center mx-auto my-5">
      {/* Submit Button */}
      <button
          onClick={handleSubmit}
          className="mt-4 bg-[#5CA135] justify-center hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full shadow-md transition-shadow duration-200 l-60"
        >
          Submit
        </button>
       </div> 
    </div>
  );
};

export default Profile;
