// Pink #F45F67
// Dark Orange #FC7100
// Light Orange #FB8818
// Peach #F5DDC2
// Green #5CA135

import React, { useState } from "react";
import plateImage from "../assets/plate.png";
import AllergyCard from "./AllergyCards";

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

  const handleSelectChange = (category, index, event) => {
    const newValues = [...formData[category]];
    newValues[index] = event.target.value;

    if (event.target.value !== "other") {
      const newOtherInputs = [...otherInputs[category]];
      newOtherInputs[index] = "";
      setOtherInputs({ ...otherInputs, [category]: newOtherInputs });
    }

    setFormData({ ...formData, [category]: newValues });
  };

  const handleOtherInputChange = (index, category, event) => {
    const newOtherInputs = { ...otherInputs };
    newOtherInputs[category][index] = event.target.value;
    setOtherInputs(newOtherInputs);
  };

  const addItem = (category) => {
    setFormData({
      ...formData,
      [category]: [...formData[category], ""],
    });
    setOtherInputs({
      ...otherInputs,
      [category]: [...otherInputs[category], ""],
    });
  };

  const removeLastItem = (category) => {
    const newValues = [...formData[category]];
    const newOtherInputs = [...otherInputs[category]];
    newValues.pop();
    newOtherInputs.pop();
    setFormData({ ...formData, [category]: newValues });
    setOtherInputs({ ...otherInputs, [category]: newOtherInputs });
  };

  const handleSubmit = () => {
    const aggregatedData = {
      highRiskAllergies: formData.highRiskAllergies.map((allergy, index) =>
        allergy === "other" ? otherInputs.highRiskAllergies[index] : allergy
      ),
      lowRiskAllergies: formData.lowRiskAllergies.map((allergy, index) =>
        allergy === "other" ? otherInputs.lowRiskAllergies[index] : allergy
      ),
      dietaryRestrictions: formData.dietaryRestrictions.map((restriction, index) =>
        restriction === "other" ? otherInputs.dietaryRestrictions[index] : restriction
      ),
    };
    console.log("Submitted Data:", aggregatedData);
    // navigate("/upload");
  };

  return (
    <div className="flex flex-col text">
      <header className="bg-gradient-to-r from-[#5CA135] to-[#196E63] text-center p-10 flex items-center justify-center h-1/5 space-x-5 transition-transform duration-500 ease-in-out">
        <img src={plateImage} alt="Plate" className="h-20 w-20" />
        <h1 className="m-0 text-5xl backdrop-blur-lg drop-shadow-lg text-black transition-opacity duration-700 ease-in-out hover:opacity-80">
          SafePlate
        </h1>
      </header>

      <header className="bg-[#F5DDC2] w-full l-20"></header>
      <header className="bg-black backdrop-blur-lg p-10 border-b h-80 flex border-gray-300 items-center justify-center shadow-md relative bg-[url(https://www.shutterstock.com/image-photo/menu-frame-different-types-cheese-600nw-1810524649.jpg)] bg-left bg-no-repeat w-full mx-auto bg-contain">
        <h1 className="text-3xl text-opacity-60 shadow-lg font-semibold text-white">Create Your Allergy Profile</h1>
      </header>

      <main className="flex-grow p-6">
        <AllergyCard
          title="High Risk Allergies"
          allergies={formData.highRiskAllergies}
          otherInputs={otherInputs.highRiskAllergies}
          onSelectChange={(index, event) => handleSelectChange("highRiskAllergies", index, event)}
          onOtherInputChange={handleOtherInputChange}
          onAdd={() => addItem("highRiskAllergies")}
          onRemove={() => removeLastItem("highRiskAllergies")}
          category="highRiskAllergies"
        />

        <AllergyCard
          title="Low Risk Allergies"
          allergies={formData.lowRiskAllergies}
          otherInputs={otherInputs.lowRiskAllergies}
          onSelectChange={(index, event) => handleSelectChange("lowRiskAllergies", index, event)}
          onOtherInputChange={handleOtherInputChange}
          onAdd={() => addItem("lowRiskAllergies")}
          onRemove={() => removeLastItem("lowRiskAllergies")}
          category="lowRiskAllergies"
        />

        <AllergyCard
          title="Dietary Restrictions"
          allergies={formData.dietaryRestrictions}
          otherInputs={otherInputs.dietaryRestrictions}
          onSelectChange={(index, event) => handleSelectChange("dietaryRestrictions", index, event)}
          onOtherInputChange={handleOtherInputChange}
          onAdd={() => addItem("dietaryRestrictions")}
          onRemove={() => removeLastItem("dietaryRestrictions")}
          category="dietaryRestrictions"
        />

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </main>
    </div>
  );
};

export default Profile;
