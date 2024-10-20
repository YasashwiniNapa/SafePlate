// AllergyCard.jsx
import React from "react";

const AllergyCard = ({
  title,
  allergies,
  otherInputs,
  onSelectChange,
  onOtherInputChange,
  onAdd,
  onRemove,
  category,
}) => (
  <div className="mt-8">
    <h2 className="text-2xl font-semibold text-gray-700">{title}</h2>
    {allergies.map((allergy, index) => (
      <div key={index} className="mt-4">
        <label htmlFor={`${category}${index}`} className="block text-gray-600 mb-2">
          Select {title}:
        </label>
        <select
          id={`${category}${index}`}
          value={allergy}
          onChange={(event) => onSelectChange(index, event)}
          className="w-full border border-gray-300 rounded-md p-2"
        >
          <option value="" disabled>Select Allergy</option>
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
            value={otherInputs[index]}
            onChange={(event) => onOtherInputChange(index, category, event)}
            placeholder="Please specify"
            className="mt-2 block w-full border border-gray-300 rounded-md p-2"
          />
        )}
      </div>
    ))}
    <div className="flex justify-end mt-4 space-x-4">
      <button
        onClick={onAdd}
        className="bg-[#5CA135] hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full shadow-md transition-shadow duration-200"
      >
        Add
      </button>
      <button
        onClick={onRemove}
        className="bg-[#FC7100] hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full shadow-md transition-shadow duration-200"
      >
        Remove
      </button>
    </div>
  </div>
);

export default AllergyCard;
