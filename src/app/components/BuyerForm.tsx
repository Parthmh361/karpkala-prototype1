import React from 'react'

const BuyerForm: React.FC = () => {
  return (
    <>
      <div>
        <label htmlFor="buyerAddress" className="block text-sm font-medium text-gray-700">Address</label>
        <textarea
          id="buyerAddress"
          rows={3}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        ></textarea>
      </div>
      <div>
        <label htmlFor="cottonPreference" className="block text-sm font-medium text-gray-700">Type of Cotton Likely to Buy</label>
        <input
          type="text"
          id="cottonPreference"
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          required
        />
      </div>
    </>
  )
}

export default BuyerForm

