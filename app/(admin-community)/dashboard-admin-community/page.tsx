// dashboard/page.tsx

import DashboardContent from "@/components/admin-community/dashboard/DashboardContent";

const sampleAdminData = {
  id: "1",
  name: "Admin",
  role: "admin",
  created_at: "2024-01-01",
  updated_at: "2024-01-01"
};

export default function DashboardAdminCommunityPage() {
  return <DashboardContent adminData={sampleAdminData} />;
}
