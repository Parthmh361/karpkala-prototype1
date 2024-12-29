import React from "react";

const FarmerForm: React.FC = () => {
  return (
    <>
      <div>
        <label
          htmlFor="farmLocation"
          className="block text-sm font-medium text-gray-700"
        >
          Farm Location
        </label>
        <input
          type="text"
          id="farmLocation"
          placeholder="Region, State, Area"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="cottonType"
          className="block text-sm font-medium text-gray-700"
        >
          Type of Cotton Grown
        </label>
        <input
          type="text"
          id="cottonType"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label
          htmlFor="farmingYears"
          className="block text-sm font-medium text-gray-700"
        >
          Years in Cotton Farming
        </label>
        <input
          type="number"
          id="farmingYears"
          min="0"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
    </>
  );
};

export default FarmerForm;
