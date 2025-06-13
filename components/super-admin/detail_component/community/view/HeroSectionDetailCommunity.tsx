"use client";

import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchAcara, AnggotaAcara, fetchAnggotaAcara } from "./fetch";
import GenerateCertificate from "./GenerateCertificate"; // Adjust the import path as needed

// Utility function to map gender codes to full names
const mapGender = (gender: string | undefined): string => {
  switch (gender) {
    case "L":
      return "Laki-laki";
    case "P":
      return "Perempuan";
    default:
      return gender || "No data";
  }
};

const HeroSection1DetailCommunity: React.FC = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const [id] = useState<string | null>(params?.id as string | null); // This is id_user
  const selectedActivity = searchParams.get("activity") || "";
  const selectedYear = searchParams.get("year") || "";
  const [memberData, setMemberData] = useState<AnggotaAcara | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [acaraDescription, setAcaraDescription] = useState<string>("");
  const [acaraId, setAcaraId] = useState<string | null>(null);
  const [gambar, setGambar] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setError("No ID provided or invalid ID");
        setLoading(false);
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Fetching member data with id_user:", id);

        // Fetch all acara data to find the matching member
        const acaraResponse = await fetchAcara();
        console.log("Acara Response:", acaraResponse);
        const matchingAcara = acaraResponse.find(acara => 
          acara.judul === decodeURIComponent(selectedActivity) && 
          acara.tanggal.split('-')[0] === selectedYear
        );
        console.log("Matching Acara:", matchingAcara);

        if (matchingAcara && matchingAcara.anggota) {
          const foundMember = matchingAcara.anggota.find(m => m.id_user === id);
          if (foundMember) {
            // Fetch the full AnggotaAcara record using the member's id
            const fullMemberData = await fetchAnggotaAcara(foundMember.id);
            setMemberData(fullMemberData);
            console.log("Fetched Full Member Data:", fullMemberData);

            setAcaraDescription(matchingAcara.deskripsi || "No description available.");
            setAcaraId(matchingAcara.id);
            setGambar(matchingAcara.gambar || null);
          } else {
            setMemberData(null);
            setError("No member found for the given ID");
          }
        } else {
          setMemberData(null);
          setAcaraDescription("No description available.");
          setAcaraId(null);
          setGambar(null);
          setError("No matching event or members found");
        }
      } catch (err) {
        console.error("Fetch error details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, selectedActivity, selectedYear]);

  if (loading) return <div className="text-white text-center py-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-20">{error}</div>;

  return (
    <section className="text-white p-8 rounded-lg lg:px-100 py-20">
      <h2 className="text-3xl font-bold mb-4 flex items-center gap-2">Profile</h2>
      <div className="border-t border-gray-500 my-4"></div>
      <div className="flex flex-col md:flex-row gap-9 mt-9">
        <div className="flex-1">
          <div className="text-xl bg-white/9 p-5 rounded-2xl hover:scale-102 transition with-spacing min-h-[250px] space-y-4">
            <p><span className="text-gray-300">Nama Lengkap :</span> {memberData?.nama || "No data"}</p>
            <p><span className="text-gray-300">NIM :</span> {memberData?.nim || "No data"}</p>
            <p><span className="text-gray-300">Email :</span> {memberData?.email || "No data"}</p>
            <p><span className="text-gray-300">Gender :</span> {mapGender(memberData?.gender)}</p>
          </div>
        </div>

        <div className="flex-1">
          <div className="text-xl bg-white/9 p-5 rounded-2xl hover:scale-102 transition with-spacing min-h-[250px] space-y-3">
            <h2 className="text-2xl font-semibold">Community</h2>
            <h3 className="font-semibold">{memberData?.nama_komunitas || "N/A"}</h3>
            <p><span className="text-gray-300">Tanggal Bergabung :</span> {memberData?.join_komunitas || "N/A"}</p>
            <p><span className="text-gray-300">Divisi :</span> {memberData?.divisi || "N/A"}</p>
            <p><span className="text-gray-300">Posisi :</span> {memberData?.posisi || "N/A"}</p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 mt-12 flex items-center gap-2">Activity</h2>
      <div className="border-t border-gray-500 my-4"></div>
      <div className="mt-9">
        {memberData ? (
          <div
            className={`flex flex-col md:flex-row items-center rounded-lg p-4 mb-6 shadow-2xl bg-white/9 hover:scale-105 transition`}
          >
            <Image
              src={gambar || "/images/portfolio.png"}
              alt={selectedActivity}
              width={450}
              height={200}
              className="rounded-lg object-cover"
            />
            <div className="md:ml-6 mt-4 md:mt-0 text-start">
              <h3 className="text-2xl font-bold">{selectedActivity}</h3>
              <p className="text-gray-300 mt-8 text-lg">
                {acaraDescription}
              </p>
              <Link
                href={`/event-detail-super-admin/${acaraId || ''}`}
                className="mt-10 px-4 py-2 bg-white text-black rounded-md font-semibold hover:bg-gray-300 transition inline-block"
              >
                Click to see more details
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-center">No activity found.</p>
        )}
      </div>

      <h2 className="text-3xl font-bold mb-4 mt-12 flex items-center gap-2">Final Scoring</h2>
      <div className="border-t border-gray-500 my-4"></div>
      <div className="mt-1">
        <div className="text-white p-9 rounded-lg shadow-lg px-5 py-2">
          <div className="space-y-5 bg-gray-900 p-4 rounded-2xl">
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">Nama Acara</span>
              <span className="font-medium text-xl">: {selectedActivity || "Workshop Python"}</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">Jabatan</span>
              <span className="font-medium text-xl">: {memberData?.jabatan || "Sekretaris"}</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">Nama Lengkap</span>
              <span className="font-medium text-xl">: {memberData?.nama || "Fatahillah Al-Fatih"}</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">NIM</span>
              <span className="font-medium text-xl">: {memberData?.nim || "202310370311132"}</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">Rata - Rata Nilai</span>
              <span className="font-medium text-xl">: {memberData?.nilai_rata_rata?.toString() || "86.4"}</span>
            </div>
            <div className="flex justify-start">
              <span className="text-gray-300 text-xl">Nilai Keseluruhan</span>
              <span className="font-medium text-xl">: {memberData?.grade || "A"}</span>
            </div>
          </div>
          <div className="mt-6 flex justify-end py-15">
            {memberData && (
              <GenerateCertificate memberId={memberData.id} selectedActivity={selectedActivity} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection1DetailCommunity;