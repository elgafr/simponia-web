"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaTasks } from "react-icons/fa";


interface GradeScoringProps {
  isOpen: boolean;
  onClose: () => void;
}

const GradeScoring: React.FC<GradeScoringProps> = ({ isOpen, onClose }) => {
  const [kerjasamaGrade, setKerjasamaGrade] = useState("");
  const [kedisiplinanGrade, setKedisiplinanGrade] = useState("");
  const [komunikasiGrade, setKomunikasiGrade] = useState("");
  const [tanggungjawabGrade, setTanggungjawabGrade] = useState("");
  
  const [catatan, setCatatan] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-gradient-to-b from-[#001B45] to-[#051F4C] p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
            <FaTasks className="mr-4"/> Set Grade
        </h2>
        <hr className="border-gray-600 mb-4" />

        {/* Detail Penilaian */}
        <div className="bg-blue-800/50 p-4 rounded-lg mb-6">
          <p className="text-gray-200 text-base">
            Detail Penilaian
            <br />
            A: &gt;80, B+: &gt;= 75, B: &gt;= 70, C+: &gt;= 60, C: &gt;= 55, D: &gt;= 40, E: &lt; 40
          </p>
        </div>

        {/* Kerjasama */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Kerjasama</label>
          <input
            type="text"
            value={kerjasamaGrade}
            onChange={(e) => setKerjasamaGrade(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Grade*"
          />
        </div>

        {/* Kedisiplinan */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Kedisiplinan</label>
          <input
            type="text"
            value={kedisiplinanGrade}
            onChange={(e) => setKedisiplinanGrade(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Grade*"
          />
        </div>

        {/* Komunikasi */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Komunikasi</label>
          <input
            type="text"
            value={komunikasiGrade}
            onChange={(e) => setKomunikasiGrade(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Grade*"
          />
        </div>

        {/* Tanggung Jawab */}
        <div className="mb-4">
          <label className="block text-white text-lg mb-2">Tanggung Jawab</label>
          <input
            type="text"
            value={tanggungjawabGrade}
            onChange={(e) => setTanggungjawabGrade(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Grade*"
          />
        </div>

        {/* Catatan */}
        <div className="mb-6">
          <label className="block text-white text-lg mb-2">Catatan</label>
          <textarea
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
            className="w-full p-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            placeholder="Catatan"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
        <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg font-semibold hover:bg-gray-400 transition"
        >
            Cancel
        </button>
            <Link href="/event-detail-admin-community/id">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                Submit
                </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default GradeScoring;