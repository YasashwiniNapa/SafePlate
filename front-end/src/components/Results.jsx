import React from 'react';
import skibidiImage from '../assets/skibidi.jpg'; // Adjust the path as needed
import { useData } from './DataContext';

const Results = ({ identifiedAllergies }) => {
  const { aggregatedData } = useData();
  
  // Safeguard: Ensure aggregatedData and its properties are defined
  const highRiskAllergies = aggregatedData?.highRiskAllergies || [];
  const lowRiskAllergies = aggregatedData?.lowRiskAllergies || [];

  // Normalize both lists for comparison
  const normalizedIdentifiedAllergies = identifiedAllergies.map(allergy => allergy.toLowerCase().trim());
  const normalizedHighRiskAllergies = highRiskAllergies.map(allergy => allergy.toLowerCase().trim());
  const normalizedLowRiskAllergies = lowRiskAllergies.map(allergy => allergy.toLowerCase().trim());

  // Find common allergies
  const commonHighRiskAllergies = normalizedHighRiskAllergies.filter(allergy => 
    normalizedIdentifiedAllergies.includes(allergy)
  );

  const commonLowRiskAllergies = normalizedLowRiskAllergies.filter(allergy => 
    normalizedIdentifiedAllergies.includes(allergy)
  );

  // Determine banner color and message based on common allergies
  const hasNoAllergies = commonHighRiskAllergies.length === 0 && commonLowRiskAllergies.length === 0;
  const bannerColor = hasNoAllergies ? 'bg-green-500' : 'bg-[#F45F67]';
  const bannerMessage = hasNoAllergies ? 'No Allergies Found' : 'Warning: Allergies Found';

  return (
    <div className="bg-[#228B22] flex flex-col mt-20">
      <header className="bg-gray-100 p-10 text-center">
        <h1 className="m-0 text-5xl text-gray-800">Results</h1>
      </header>
      <div className="flex flex-col bg-gray-100">
        <header className={`${bannerColor} text-center p-5 flex text-bold text-white justify-center`}>
          {bannerMessage}
        </header>
      </div>
      <div className="flex justify-around items-center h-[80vh] bg-gray-200">
        <div className="flex flex-col justify-between bg-[#FB8818] text-gray-800 p-8 w-[85%] h-[80%] shadow-md">
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">High Risk Allergies:</h3>
            <p>{commonHighRiskAllergies.length > 0 ? commonHighRiskAllergies.join(', ') : 'None'}</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm mb-2">
            <h3 className="text-lg font-bold">Low Risk Allergies:</h3>
            <p>{commonLowRiskAllergies.length > 0 ? commonLowRiskAllergies.join(', ') : 'None'}</p>
          </div>
          <div className="flex-1 p-4 bg-white bg-opacity-80 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold">Dietary Restrictions:</h3>
            <p>{aggregatedData.dietaryRestrictions?.[0] || 'None'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
