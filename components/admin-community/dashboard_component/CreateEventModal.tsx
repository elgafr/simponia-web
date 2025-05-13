"use client";

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/60 z-50">
      <div className="bg-[#0F172A] text-white p-6 rounded-lg w-full max-w-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
        
        <form className="space-y-4">
          {/* Judul Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Judul Acara*</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Ketua Pelaksana */}
          <div>
            <label className="block text-sm font-medium mb-1">Ketua Pelaksana*</label>
            <input type="text" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          {/* Tanggal Pelaksanaan */}
          <div>
            <label className="block text-sm font-medium mb-1">Tanggal Pelaksanaan*</label>
            <div className="flex space-x-2">
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Tanggal</option>
                {[...Array(31)].map((_, i) => (
                  <option key={i} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Bulan</option>
                {["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"].map((bulan, i) => (
                  <option key={i} value={bulan}>{bulan}</option>
                ))}
              </select>
              <select className="w-1/3 p-2 rounded-md bg-gray-800 text-white">
                <option value="">Tahun</option>
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={2024 - i}>{2024 - i}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Jumlah Panitia & Batas Score */}
          <div className="flex space-x-2">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Jumlah Panitia</label>
              <input type="number" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Batas Score</label>
              <input type="number" className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Poster Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Poster Acara*</label>
            <div className="w-full h-40 border-2 border-gray-600 flex items-center justify-center rounded-md cursor-pointer bg-gray-800">
              <span className="text-gray-400">Add Image</span>
            </div>
          </div>

          {/* Deskripsi Acara */}
          <div>
            <label className="block text-sm font-medium mb-1">Deskripsi Acara*</label>
            <textarea className="w-full p-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"></textarea>
          </div>

          {/* Button Action */}
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-600 rounded-md text-white hover:bg-gray-500 transition">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 rounded-md text-white hover:bg-blue-500 transition">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEventModal;
