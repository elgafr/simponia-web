"use client";

import React, { useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface TeamMember {
  id: number;
  name: string;
  nim: string;
  role: string;
  score: number;
  status: "Present" | "Absent";
}

interface EventItem {
  id: string;
  title: string;
  image: string;
  description: string | string[];
  teamMembers: TeamMember[];
}

const HeroSection1EventDetail: React.FC = () => {
  const params = useParams();
  const idParam = params.id;

  const eventId = idParam
    ? typeof idParam === 'string'
      ? idParam.substring(0, 36)
      : null
    : null;

  const [eventItem, setEventItem] = useState<EventItem | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    if (!eventId) {
      setError("No event ID found in the URL.");
      setLoading(false);
      return;
    }

    const mockEvent: EventItem = {
      id: eventId,
      title: "Tech Conference 2025",
      image: "/images/portfolio2.png",
      description: [
        "This event brings together tech enthusiasts, developers, and innovators to share ideas and insights.",
        "Join us for a series of talks, workshops, and networking sessions."
      ],
      teamMembers: [
        { id: 1, name: "Alice Johnson", nim: "20221037031101", role: "Event Organizer", score: 0, status: "Present" },
        { id: 2, name: "Bob Smith", nim: "20221037031102", role: "Speaker Coordinator", score: 0, status: "Present" },
        { id: 3, name: "Charlie Brown", nim: "20221037031103", role: "Tech Lead", score: 0, status: "Absent" },
      ],
    };

    setEventItem(mockEvent);
    setLoading(false);
  }, [eventId]);

  // Calculate pagination
  const totalPages = eventItem ? Math.ceil(eventItem.teamMembers.length / itemsPerPage) : 1;
  const paginatedMembers = eventItem
    ? eventItem.teamMembers.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      )
    : [];

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] lg:px-60 py-30">
        <div className="flex justify-start mb-6">
          <Link href={'/event-admin-community'}>
            <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-105 transition">
              <FaArrowLeft className="mr-2" /> Back
            </button>
          </Link>
        </div>
        <div className="text-white text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Event Details</h1>
          <p>Loading event details...</p>
        </div>
      </section>
    );
  }

  if (error || !eventItem) {
    return (
      <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] lg:px-60 py-30">
        <div className="flex justify-start mb-6">
          <Link href={'/event-admin-community'}>
            <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-105 transition">
              <FaArrowLeft className="mr-2" /> Back
            </button>
          </Link>
        </div>
        <div className="text-white text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Event Details</h1>
          <p>{error || "Event item not found."}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] text-white">
      <main className="flex-1 pt-15 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start mb-6">
            <Link href={'/event-admin-community'}>
              <button className="flex items-center text-white bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-600 hover:scale-105 transition">
                <FaArrowLeft className="mr-2" /> Back
              </button>
            </Link>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">{eventItem.title}</h1>
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <div className="rounded-xl overflow-hidden w-[800px] border-4 border-white mb-6 shadow-lg mx-auto">
                <Image
                  src={eventItem.image}
                  alt={eventItem.title}
                  width={300}
                  height={200}
                  className="w-full object-cover"
                />
              </div>
              <div className="text-gray-300 text-center space-y-4">
                {Array.isArray(eventItem.description) ? (
                  eventItem.description.map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))
                ) : (
                  <p className="mb-4">{eventItem.description}</p>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden mb-20 w-full max-w-7xl px-8 py-4">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">No.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Nama</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">NIM</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Jabatan</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Skor Panitia</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedMembers.map((member: TeamMember) => (
                      <tr key={member.id} className="border-b border-gray-700/50 hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-300 text-left">{member.id}</td>
                        <td className="px-6 py-4 text-gray-300 text-left">{member.name}</td>
                        <td className="px-6 py-4 text-gray-300 text-left">{member.nim}</td>
                        <td className="px-6 py-4 text-gray-300 text-left">{member.role}</td>
                        <td className="px-6 py-4 text-gray-300 text-left">{member.score}</td>
                        <td className="px-6 py-4 text-gray-300 text-left">
                          <span className={`px-3 py-2 rounded-2xl text-base text-white ${member.status === "Present" ? "bg-green-600" : "bg-red-600"}`}>
                            {member.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-left">
                          <Link href="/detail-admin-community/community/edit/id">
                            <button className="bg-orange-500 text-white px-3 py-1 rounded-2xl hover:bg-orange-600 hover:scale-105 transition">
                              Detail
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Section */}
                <div className="flex justify-end mt-9 pr-4">
                  <button
                    onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition ${currentPage === 1 ? "cursor-not-allowed" : ""}`}
                  >
                    {'<'}
                  </button>
                  <span className="text-lg font-thin mx-3 mt-2.5">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 text-2xl text-white rounded-md disabled:opacity-50 hover:scale-120 transition ${currentPage === totalPages ? "cursor-not-allowed" : ""}`}
                  >
                    {'>'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection1EventDetail;