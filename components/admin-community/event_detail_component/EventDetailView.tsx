"use client";

import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, PenLine, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";

interface Anggota {
  id: string;
  id_user: string;
  nama: string;
  nim: string;
  jabatan: string;
  status: string;
  kerjasama: number | null;
  kedisiplinan: number | null;
  komunikasi: number | null;
  tanggung_jawab: number | null;
  nilai_rata_rata: number | null;
  grade: string | null;
  catatan: string | null;
}

interface User {
  id: string;
  nim: string;
  name: string;
  role: string;
}

interface EventDetail {
  id: string;
  judul: string;
  tanggal: string;
  jumlah_panitia: number;
  skor: number;
  status: string;
  gambar: string;
  deskripsi: string;
  created_at: string;
  updated_at: string;
  created_by: User;
  anggota: Anggota[];
}

const getStatusBg = (status: string) => {
  switch (status) {
    case "Active":
      return "bg-green-600 hover:bg-green-700";
    case "Ongoing":
      return "bg-yellow-600 hover:bg-yellow-700";
    case "Finished":
      return "bg-blue-600 hover:bg-blue-700";
    case "ABSENT":
      return "bg-red-600 hover:bg-red-700";
    case "PERMISSION":
      return "bg-blue-600 hover:bg-blue-700";
    case "PRESENT":
      return "bg-green-600 hover:bg-green-700";
    default:
      return "bg-white/5";
  }
};

const EventDetailView: React.FC = () => {
  const params = useParams();
  const idParam = params.id;
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const eventId = idParam
    ? typeof idParam === 'string'
      ? idParam.substring(0, 36)
      : null
    : null;

  const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatingMemberId, setUpdatingMemberId] = useState<string | null>(null);
  const [isEditingDescription, setIsEditingDescription] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [editingJabatan, setEditingJabatan] = useState<{ [key: string]: string }>({});
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!eventId) {
        setError("No event ID found in the URL.");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch event details');
        }

        const data = await response.json();
        setEventDetail(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch event details');
        toast.error('Failed to fetch event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEventDetail();
  }, [eventId]);

  // Add useEffect to fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portofolio/user`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.error('Failed to fetch users', err);
      }
    };
    fetchUsers();
  }, []);

  // Calculate pagination
  const totalPages = eventDetail ? Math.ceil((eventDetail.anggota.filter(member => member.jabatan !== 'Ketua Pelaksana').length) / itemsPerPage) : 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedMembers = eventDetail
    ? eventDetail.anggota.filter(member => member.jabatan !== 'Ketua Pelaksana').slice(startIndex, endIndex)
    : [];

  // Add updateStatus function
  const updateStatus = async (newStatus: string) => {
    if (!eventId || !eventDetail) return;
    
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update event status');
      }

      // Only update the status in the state, preserve all other data
      setEventDetail(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: newStatus
        };
      });
      toast.success('Status acara berhasil diperbarui');
    } catch (error) {
      console.error('Error updating event status:', error);
      toast.error('Gagal memperbarui status acara');
    } finally {
      setIsUpdating(false);
    }
  };

  // Add updateMemberStatus function
  const updateMemberStatus = async (memberId: string, newStatus: string) => {
    if (!eventId) return;

    try {
      setUpdatingMemberId(memberId);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          status: newStatus
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update member status');
      }

      const updatedMember = await response.json();

      // Update the member's status in the local state
      setEventDetail(prev => {
        if (!prev) return null;
        return {
          ...prev,
          anggota: prev.anggota.map(member =>
            member.id === memberId ? { ...member, status: newStatus } : member
          )
        };
      });

      toast.success('Status anggota berhasil diperbarui');
    } catch (error) {
      console.error('Error updating member status:', error);
      toast.error('Gagal memperbarui status anggota');
    } finally {
      setUpdatingMemberId(null);
    }
  };

  // Add updateDescription function
  const updateDescription = async () => {
    if (!eventId) return;

    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          deskripsi: editedDescription
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update event description');
      }

      const updatedEvent = await response.json();
      setEventDetail(updatedEvent);
      setIsEditingDescription(false);
      toast.success('Deskripsi acara berhasil diperbarui');
    } catch (error) {
      console.error('Error updating event description:', error);
      toast.error('Gagal memperbarui deskripsi acara');
    } finally {
      setIsUpdating(false);
    }
  };

  // Add handler for user selection
  const handleUserSelect = (memberId: string, selectedNim: string) => {
    const selectedUser = users.find(user => user.nim === selectedNim);
    if (!selectedUser) return;

    setEventDetail(prev => {
      if (!prev) return null;
      return {
        ...prev,
        anggota: prev.anggota.map(member =>
          member.id === memberId
            ? {
                ...member,
                nama: selectedUser.name,
                nim: selectedUser.nim,
                id_user: selectedUser.id
              }
            : member
        )
      };
    });
  };

  // Add handler for jabatan change
  const handleJabatanChange = (memberId: string, newJabatan: string) => {
    setEditingJabatan(prev => ({
      ...prev,
      [memberId]: newJabatan
    }));

    setEventDetail(prev => {
      if (!prev) return null;
      return {
        ...prev,
        anggota: prev.anggota.map(member =>
          member.id === memberId
            ? {
                ...member,
                jabatan: newJabatan
              }
            : member
        )
      };
    });
  };

  // Add new function to update jumlah_panitia
  const updateJumlahPanitia = async (newCount: number) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          jumlah_panitia: newCount
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update jumlah_panitia');
      }

      // Update local state
      setEventDetail(prev => {
        if (!prev) return null;
        return {
          ...prev,
          jumlah_panitia: newCount
        };
      });
    } catch (error) {
      console.error('Error updating jumlah_panitia:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal memperbarui jumlah panitia');
    }
  };

  // Update handleDeleteMember function
  const handleDeleteMember = async (memberId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Only make API call if the member is not a temporary one
      if (!memberId.startsWith('temp-')) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${memberId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(errorData?.message || 'Failed to delete member');
        }
      }

      // Calculate new count
      const newCount = eventDetail!.anggota.length - 1;

      // Update jumlah_panitia in the event
      await updateJumlahPanitia(newCount);

      // Update local state
      setEventDetail(prev => {
        if (!prev) return null;
        const updatedAnggota = prev.anggota.filter(m => m.id !== memberId);
        return {
          ...prev,
          anggota: updatedAnggota,
          jumlah_panitia: newCount
        };
      });

      toast.success('Anggota berhasil dihapus');
    } catch (error) {
      console.error('Error deleting member:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal menghapus anggota');
    }
  };

  // Update handleSaveChanges function
  const handleSaveChanges = async () => {
    if (!eventId || !eventDetail) return;

    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Separate new members (temp-) from existing members
      const newMembers = eventDetail.anggota.filter(member => member.id.startsWith('temp-'));
      const existingMembers = eventDetail.anggota.filter(member => !member.id.startsWith('temp-'));

      // Handle new members with POST requests
      for (const member of newMembers) {
        // Skip if required fields are missing
        if (!member.id_user || !member.nama || !member.nim || !member.jabatan) {
          console.log('Skipping invalid member:', member);
          continue;
        }

        const newMemberData = {
          id_acara: eventId,
          id_user: member.id_user,
          nama: member.nama,
          nim: member.nim,
          jabatan: member.jabatan,
          kerjasama: null,
          kedisiplinan: null,
          komunikasi: null,
          tanggung_jawab: null,
          catatan: null
        };

        console.log('Sending new member data:', newMemberData);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newMemberData)
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          console.error('Server response:', errorData);
          console.log('Skipping member due to server error:', member);
          continue;
        }
      }

      // Update existing members with PUT requests
      for (const member of existingMembers) {
        const updateData = {
          nama: member.nama,
          nim: member.nim,
          jabatan: member.jabatan,
          status: member.status,
          kerjasama: member.kerjasama,
          kedisiplinan: member.kedisiplinan,
          komunikasi: member.komunikasi,
          tanggung_jawab: member.tanggung_jawab,
          catatan: member.catatan || null
        };

        console.log('Updating member data:', updateData);

        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/anggota-acara/${member.id}`, {
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateData)
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error('Server response:', errorData);
            throw new Error(errorData?.message || `Failed to update member ${member.nama}`);
          }

          const updatedMember = await response.json();
          console.log('Successfully updated member:', updatedMember);
        } catch (error) {
          console.error('Error updating member:', error);
          toast.error(`Gagal memperbarui data ${member.nama}: ${error instanceof Error ? error.message : 'Unknown error'}`);
          // Continue with other members even if one fails
          continue;
        }
      }

      // Calculate valid members count
      const validMembers = eventDetail.anggota.filter(member => 
        !member.id.startsWith('temp-') || (member.id_user && member.nama && member.nim && member.jabatan)
      );

      // Update jumlah_panitia in the event
      await updateJumlahPanitia(validMembers.length);

      // Fetch updated event details
      const updatedEventResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!updatedEventResponse.ok) {
        const errorData = await updatedEventResponse.json().catch(() => null);
        console.error('Server response:', errorData);
        throw new Error(`Failed to fetch updated event details: ${errorData?.message || updatedEventResponse.statusText}`);
      }

      const updatedEvent = await updatedEventResponse.json();
      setEventDetail(updatedEvent);
      setIsEditMode(false);
      toast.success('Perubahan berhasil disimpan');
    } catch (error) {
      console.error('Error updating event details:', error);
      toast.error(error instanceof Error ? error.message : 'Gagal menyimpan perubahan');
    } finally {
      setIsUpdating(false);
    }
  };

  // Add handler for adding new member
  const handleAddMember = () => {
    const newMember: Anggota = {
      id: `temp-${Date.now()}`,
      id_user: "",
      nama: "",
      nim: "",
      jabatan: "",
      status: "ABSENT",
      kerjasama: 0,
      kedisiplinan: 0,
      komunikasi: 0,
      tanggung_jawab: 0,
      nilai_rata_rata: 0,
      grade: null,
      catatan: null
    };

    setEventDetail(prev => {
      if (!prev) return null;
      return {
        ...prev,
        anggota: [...prev.anggota, newMember],
        jumlah_panitia: prev.anggota.length + 1
      };
    });
  };

  const handleImageUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !eventId) return;

    try {
      setIsUpdatingImage(true);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const formData = new FormData();
      formData.append('gambar', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/acara/${eventId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to update event image');
      }

      const updatedEvent = await response.json();
      setEventDetail(updatedEvent);
      toast.success('Gambar acara berhasil diperbarui');
    } catch (error) {
      console.error('Error updating event image:', error);
      toast.error('Gagal memperbarui gambar acara');
    } finally {
      setIsUpdatingImage(false);
    }
  };

  if (loading) {
    return (
      <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] lg:px-60 py-30">
        <div className="flex justify-start mb-6">
          <Button
            onClick={() => router.push('/dashboard-admin-community')}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="text-white text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Detail Acara</h1>
          <p>Memuat detail acara...</p>
        </div>
      </section>
    );
  }

  if (error || !eventDetail) {
    return (
      <section className="bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] lg:px-60 py-30">
        <div className="flex justify-start mb-6">
          <Button
            onClick={() => router.push('/dashboard-admin-community')}
            variant="outline"
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
        </div>
        <div className="text-white text-center py-10">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Detail Acara</h1>
          <p>{error || "Acara tidak ditemukan."}</p>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] text-white">
      <main className="flex-1 pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-start mb-6">
            <Button
              onClick={() => router.push('/dashboard-admin-community')}
              variant="outline"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-0" />
              Kembali
            </Button>
          </div>
          <div className="flex justify-center items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-5xl font-bold text-center">{eventDetail.judul}</h1>
          </div>
          <div className="flex flex-col gap-8">
            <div className="w-full">
              <div className="rounded-xl overflow-hidden w-[800px] h-[300px] border-4 border-white mb-6 shadow-lg mx-auto relative">
                {eventDetail.gambar && (
                  <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
                    <DialogTrigger asChild>
                      <div className="cursor-pointer">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${eventDetail.gambar}`}
                          alt={eventDetail.judul}
                          width={800}
                          height={300}
                          className="w-full h-full object-cover hover:opacity-90 transition-opacity"
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl bg-[#001233] border-white/10">
                      <DialogTitle className="sr-only">Pratinjau Gambar</DialogTitle>
                      <div className="relative max-h-[80vh] overflow-y-auto">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_URL}${eventDetail.gambar}`}
                          alt={eventDetail.judul}
                          width={1200}
                          height={800}
                          className="w-full h-auto object-contain"
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                <div className="absolute top-2 right-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpdate}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUpdatingImage}
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 text-white border-white/20 hover:text-blue-600"
                  >
                    {isUpdatingImage ? 'Memperbarui...' : 'Ubah Gambar'}
                  </Button>
                </div>
              </div>
              <div className="text-gray-300 text-center space-y-4">
                {isEditingDescription ? (
                  <div className="flex flex-col items-center gap-4 w-full">
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full p-4 bg-white/5 border border-white/20 rounded-lg text-white resize-none"
                      rows={4}
                      placeholder="Enter description..."
                    />
                    <div className="flex gap-2 justify-end w-full">
                      <Button
                        onClick={() => {
                          setIsEditingDescription(false);
                          setEditedDescription(eventDetail.deskripsi);
                        }}
                        variant="outline"
                        className="bg-red-500 border-white/20 hover:bg-red-600 hover:text-white"
                      >
                        Batal
                      </Button>
                      <Button
                        onClick={updateDescription}
                        disabled={isUpdating}
                        className="bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        {isUpdating ? 'Menyimpan...' : 'Simpan'}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex justify-between items-start mb-4">
                      <p className="flex-1">{eventDetail.deskripsi}</p>
                      <button
                        onClick={() => {
                          setIsEditingDescription(true);
                          setEditedDescription(eventDetail.deskripsi);
                        }}
                        className="ml-4 bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors"
                      >
                        <PenLine className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-20 gap-4">
                {isEditMode ? (
                  <>
                    <Button
                      onClick={() => {
                        setIsEditMode(false);
                        // Reset any changes made during edit mode
                        setEventDetail(prev => {
                          if (!prev) return null;
                          return {
                            ...prev,
                            anggota: prev.anggota.filter(member => !member.id.startsWith('temp-'))
                          };
                        });
                      }}
                      variant="outline"
                      className="bg-red-500 hover:bg-red-600 hover:text-white border-white/20 text-white"
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={handleSaveChanges}
                      disabled={isUpdating}
                      variant="outline"
                      className="bg-green-500 hover:bg-green-600 hover:text-white border-white/20 text-white"
                    >
                      {isUpdating ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditMode(true)}
                    variant="outline"
                    className="bg-white/5 hover:bg-white/10 hover:text-white border-white/20 text-white"
                  >
                    Edit Kepanitiaan
                  </Button>
                )}
              </div>
            </div>
            <div className="w-full">
              <div className="bg-[#011B45]/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden mb-10">
                <div className="flex justify-between items-center p-4 border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Jumlah Panitia:</span>
                    <span className="text-white font-semibold">{eventDetail.jumlah_panitia}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">Status:</span>
                    <Select
                      value={eventDetail.status}
                      onValueChange={updateStatus}
                      disabled={isUpdating}
                    >
                      <SelectTrigger className={`w-[140px] border-0 text-white hover:bg-white/10 transition-colors ${getStatusBg(eventDetail.status)}`}>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#001233] border-[#001B45]">
                        <SelectItem value="Active" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                          Aktif
                        </SelectItem>
                        <SelectItem value="Ongoing" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                          Sedang Berlangsung
                        </SelectItem>
                        <SelectItem value="Finished" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                          Selesai
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <table className="w-full table-fixed">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-12">No.</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-64">Nama</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">NIM</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Jabatan</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-40">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white w-24">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Ketua Pelaksana Row */}
                    {eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana') && (
                      <tr className="border-b border-gray-700/50 hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-300 w-12">1</td>
                        <td className="px-6 py-4 text-white w-64 truncate">
                          {isEditMode ? (
                            <Select
                              value={eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.nim || ''}
                              onValueChange={(value) => handleUserSelect(
                                eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id || '',
                                value
                              )}
                            >
                              <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Select user" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#001233] border-[#001B45]">
                                {users
                                  .filter(user => 
                                    // Filter out users that are already in the table
                                    !eventDetail.anggota.some(
                                      existingMember => 
                                        existingMember.nim === user.nim && 
                                        existingMember.jabatan !== 'Ketua Pelaksana' // Allow selecting the same user for Ketua Pelaksana
                                    )
                                  )
                                  .map((user) => (
                                    <SelectItem
                                      key={user.id}
                                      value={user.nim}
                                      className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                                    >
                                      {user.name} ({user.nim})
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.nama
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-300 w-40 truncate">
                          {eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.nim}
                        </td>
                        <td className="px-6 py-4 text-gray-300 w-40">
                          {isEditMode ? (
                            <Input
                              value={editingJabatan[eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id || ''] || 'Ketua Pelaksana'}
                              onChange={(e) => handleJabatanChange(
                                eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id || '',
                                e.target.value
                              )}
                              className="bg-white/5 border-white/20 text-white focus:border-white/40"
                              placeholder="Enter position"
                            />
                          ) : (
                            'Ketua Pelaksana'
                          )}
                        </td>
                        <td className="px-6 py-4 w-40">
                          <Select
                            value={eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.status || 'ABSENT'}
                            onValueChange={(value) => updateMemberStatus(eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id || '', value)}
                            disabled={isUpdating || updatingMemberId === eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id}
                          >
                            <SelectTrigger
                              className={`w-[140px] border-0 text-white hover:bg-white/10 transition-colors  ${getStatusBg(eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.status || 'ABSENT')}`}
                            >
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#001233] border-[#001B45]">
                              <SelectItem value="PRESENT" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Hadir
                              </SelectItem>
                              <SelectItem value="ABSENT" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Tidak Hadir
                              </SelectItem>
                              <SelectItem value="PERMISSION" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Izin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 w-24">
                          <Link href={`/event/${eventId}/a/${eventDetail.anggota.find(member => member.jabatan === 'Ketua Pelaksana')?.id}`}>
                            <button className="bg-white/5 text-white px-3 py-2 text-white px-3 py-1 rounded-full text-sm hover:bg-white/10 transition flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              Detail
                            </button>
                          </Link>
                        </td>
                      </tr>
                    )}
                    {/* Anggota Rows */}
                    {paginatedMembers.map((member, index) => (
                      <tr key={member.id} className="border-b border-gray-700/50 hover:bg-white/5">
                        <td className="px-6 py-4 text-gray-300 w-12">{(currentPage - 1) * itemsPerPage + index + 2}</td>
                        <td className="px-6 py-4 text-white w-64 truncate">
                          {isEditMode ? (
                            <Select
                              value={member.nim}
                              onValueChange={(value) => handleUserSelect(member.id, value)}
                            >
                              <SelectTrigger className="w-full bg-white/5 border-white/20 text-white">
                                <SelectValue placeholder="Select user" />
                              </SelectTrigger>
                              <SelectContent className="bg-[#001233] border-[#001B45]">
                                {users
                                  .filter(user => 
                                    // Filter out users that are already in the table
                                    !eventDetail.anggota.some(
                                      existingMember => 
                                        existingMember.nim === user.nim && 
                                        existingMember.id !== member.id // Allow selecting the same user for the current row
                                    )
                                  )
                                  .map((user) => (
                                    <SelectItem
                                      key={user.id}
                                      value={user.nim}
                                      className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white"
                                    >
                                      {user.name} ({user.nim})
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                          ) : (
                            member.nama
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-300 w-40 truncate">{member.nim}</td>
                        <td className="px-6 py-4 text-gray-300 w-40">
                          {isEditMode ? (
                            <Input
                              value={editingJabatan[member.id] || member.jabatan}
                              onChange={(e) => handleJabatanChange(member.id, e.target.value)}
                              className="bg-white/5 border-white/20 text-white focus:border-white/40"
                              placeholder="Enter position"
                            />
                          ) : (
                            member.jabatan
                          )}
                        </td>
                        <td className="px-6 py-4 w-40">
                          <Select
                            value={member.status}
                            onValueChange={(value) => updateMemberStatus(member.id, value)}
                            disabled={isUpdating || updatingMemberId === member.id}
                          >
                            <SelectTrigger
                              className={`w-[140px] border-0 text-white  hover:bg-white/10 transition-colors ${getStatusBg(member.status)}`}
                            >
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#001233] border-[#001B45]">
                              <SelectItem value="PRESENT" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Hadir
                              </SelectItem>
                              <SelectItem value="ABSENT" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Tidak Hadir
                              </SelectItem>
                              <SelectItem value="PERMISSION" className="text-white hover:bg-[#051F4C] focus:bg-[#051F4C] focus:text-white">
                                Izin
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="px-6 py-4 w-24">
                          {isEditMode ? (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="bg-red-500 hover:bg-red-600 text-white border-white/20"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent className="bg-[#001233] border border-white/10">
                                <AlertDialogHeader>
                                  <AlertDialogTitle className="text-white">Konfirmasi Hapus</AlertDialogTitle>
                                  <AlertDialogDescription className="text-gray-400">
                                    Apakah Anda yakin ingin menghapus anggota ini? Tindakan ini tidak dapat dibatalkan.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel className="bg-gray-600 text-white hover:bg-gray-700 hover:text-white">Batal</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => handleDeleteMember(member.id)}
                                    className="bg-red-600 text-white hover:bg-red-700"
                                  >
                                    Hapus
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          ) : (
                            <Link href={`/event/${eventId}/a/${member.id}`}>
                              <button className="bg-white/5 text-white px-3 py-2 text-sm rounded-full hover:bg-white/10 transition flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                Detail
                              </button>
                            </Link>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination Section */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-gray-700/50">
                    <div className="text-sm text-gray-400">
                      Menampilkan {startIndex + 1} sampai {Math.min(endIndex, eventDetail.anggota.length)} dari {eventDetail.anggota.length} data
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {'<'}
                      </button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-1 rounded-md text-sm ${currentPage === page
                              ? 'bg-blue-500 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {'>'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              {isEditMode && (
                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleAddMember}
                    variant="outline"
                    className="bg-blue-500 hover:bg-blue-600 hover:text-white border-white/20 text-white"
                  >
                    Tambah Panitia
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetailView;