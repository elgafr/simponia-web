"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CommunityProfileSection from "@/components/super-admin/detail_component/community/edit/CommunityProfileSection";
import CommunityActivitySection from "@/components/super-admin/detail_component/community/edit/CommunityActivitySection";

const MemberDetailPage = () => {
  const params = useParams();
  const eventId = params.id;
  const memberId = params.memberId;
  const [userProfile, setUserProfile] = useState(null);
  const [anggotaData, setAnggotaData] = useState(null);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch anggota data first
        const anggotaResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`);
        if (!anggotaResponse.ok) {
          throw new Error('Failed to fetch anggota data');
        }
        const anggotaResult = await anggotaResponse.json();
        setAnggotaData(anggotaResult);

        // Get profile user ID from anggota data or use default
        const profileId = anggotaResult?.profile_user?.id || "d98c0c5e-4d8a-4abe-a2e2-8f8809fdcc90";
        
        // Fetch user profile using the profile ID
        const profileResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile-user/${profileId}`);
        if (!profileResponse.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const profileResult = await profileResponse.json();
        setUserProfile(profileResult);

        // Fetch event data
        const eventResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`);
        if (!eventResponse.ok) {
          throw new Error('Failed to fetch event data');
        }
        const eventResult = await eventResponse.json();
        setEventData(eventResult);
      } catch (error) {
        console.error("Error fetching data:", error);
        // You might want to add proper error handling UI here
      }
    };

    fetchData();
  }, [memberId, eventId]);

  if (!userProfile || !anggotaData || !eventData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C]">
      <div className="w-full px-2 md:px-6">
        <CommunityProfileSection userProfile={userProfile} anggotaData={anggotaData} />
        <CommunityActivitySection eventData={eventData} />
      </div>
    </div>
  );
};

export default MemberDetailPage; 