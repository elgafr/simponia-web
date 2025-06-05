import React from "react";

const HeroSection3DetailCommunity: React.FC = () => {
  return (
    <div className=" text-white p-9 rounded-lg shadow-lg lg:px-100 py-20 ">
      {/* Title */}
      <h2 className="text-3xl font-semibold mb-10 border-b border-gray-500 pb-2">
        Final Scoring
      </h2>

      {/* Information List */}
      <div className="space-y-5 bg-white/5 p-4 rounded-2xl ">
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">Fullname</span>
          <span className="font-medium text-xl">: Fatahillah Al-Fatih</span>
        </div>
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">NIM</span>
          <span className="font-medium text-xl">: 202310370311132</span>
        </div>
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">Community / Division</span>
          <span className="font-medium text-xl">: Infotech / Sistem Informasi</span>
        </div>
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">Activity Average</span>
          <span className="font-medium text-xl">: Excellent</span>
        </div>
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">Simutu Rating Avg.</span>
          <span className="font-medium text-xl">: 86.4</span>
        </div>
        <div className="flex justify-start">
          <span className="text-gray-300 text-xl">Overall Score</span>
          <span className="font-medium text-xl">: A (Excellent)</span>
        </div>
      </div>

      {/* Generate Certificate Button */}
      <div className="mt-6 flex justify-end py-15">
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition">
          Generate Certificate
        </button>
      </div>
    </div>
  );
};

export default HeroSection3DetailCommunity;
