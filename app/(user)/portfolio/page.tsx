'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon } from "lucide-react";
import Footer from "@/components/landing-page/Footer";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow bg-gradient-to-b from-[#001B45] via-[#001233] to-[#051F4C] pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8">
            {/* Side Menu */}
            <div className="w-64 flex-shrink-0">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                <h2 className="text-white font-semibold mb-4">Side Menu</h2>
                <nav className="space-y-2">
                  <button className="w-full text-left px-4 py-2 text-white bg-blue-500 rounded-lg">
                    Nama Project
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg">
                    Kategori
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg">
                    Profile
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg">
                    Team Project
                  </button>
                  <button className="w-full text-left px-4 py-2 text-gray-300 hover:bg-white/5 rounded-lg">
                    Detail Project
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow">
              {/* Nama Project Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Nama Project</h2>
                <Input
                  placeholder="Judul"
                  className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                />
              </div>

              {/* Kategori Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Kategori</h2>
                <Select>
                  <SelectTrigger className="bg-white/5 border-0 text-white">
                    <SelectValue placeholder="Pilih Kategori Bidang Minat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rpl">Rekayasa Perangkat Lunak</SelectItem>
                    <SelectItem value="game">Game Intelligence</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="network">Network and Security</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Profile Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-300 mb-2">Nama Lengkap</p>
                    <Input
                      placeholder="Elga Putri"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">NIM</p>
                    <Input
                      placeholder="202210370311449"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">Email</p>
                    <Input
                      placeholder="elga@email.com"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">Angkatan</p>
                    <Input
                      placeholder="22"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Team Project Section */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Team Project</h2>
                  <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                    Add Member
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-gray-300 mb-2">Nama Lengkap</p>
                    <Input
                      placeholder="Elga Putri"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">NIM</p>
                    <Input
                      placeholder="202210370311449"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <p className="text-gray-300 mb-2">Role</p>
                    <Input
                      placeholder="Mahasiswa Info Angka"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Detail Project Section */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Detail Project</h2>
                <div className="space-y-6">
                  <div>
                    <p className="text-gray-300 mb-2">Tahun Project Dibuat</p>
                    <Input
                      placeholder="Masukkan Tahun Project Dibuat"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-300 mb-2">Judul Link</p>
                      <Input
                        placeholder="Judul Link"
                        className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                      />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-grow">
                        <p className="text-gray-300 mb-2">Link Project</p>
                        <Input
                          placeholder="Link Project"
                          className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                        />
                      </div>
                      <div className="pt-8">
                        <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                          Add New Link
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-gray-300 mb-2">Tag</p>
                    <Input
                      placeholder="#Tag"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>

                  <div>
                    <p className="text-gray-300 mb-2">Description</p>
                    <Textarea
                      placeholder="Description"
                      className="bg-white/5 border-0 text-white placeholder:text-gray-400 min-h-[150px]"
                    />
                  </div>

                  <div>
                    <p className="text-gray-300 mb-2">Image</p>
                    <div className="bg-white/5 border-2 border-dashed border-white/20 rounded-lg p-8">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <ImageIcon className="h-16 w-16 mb-4" />
                        <p>Add Image</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" className="bg-blue-500 text-white hover:bg-blue-600 border-0">
                      Preview Portfolio
                    </Button>
                    <Button className="bg-green-500 text-white hover:bg-green-600">
                      Submit Portfolio
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
