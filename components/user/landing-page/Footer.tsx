import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#011029] text-white py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Simponia Column */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/logo simponia.svg"
                alt="Simponia Logo"
                width={120}
                height={60}
                className="mr-2"
              />
            </div>
            <p className="text-gray-300 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Commodo viverra amet sollicitudin ac maecenas. Nibh metus imperdiet netus gravida in laoreet proin sem. Blandit gravida convallis volutpat lobortis. Potenti semper morbi lorem tristique netus nisl risus ut risus. Vestibulum tristique sociis id est sapien rhoncus nunc ut.
            </p>
            <div className="flex space-x-3">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <MessageCircle size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
            </div>
          </div>

          {/* Find Us Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Find Us</h3>
            <p className="text-gray-300 text-xs leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Purus donec gravida leo eget in scelerisque adipiscing.
            </p>
            <div className="space-y-1.5">
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Twitter</Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Instagram</Link>
              <Link href="#" className="block text-gray-300 hover:text-white transition-colors text-sm">Facebook</Link>
            </div>
          </div>

          {/* Support By Column */}
          <div className="space-y-4 flex flex-col items-center">
            <h3 className="text-lg font-semibold text-center">Support By</h3>
            <div className="flex flex-row w-full gap-6">
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/logo ilab.svg"
                  alt="Lab Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-contain w-full h-32 md:h-40"
                />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  src="/logo-umm.svg"
                  alt="UMM Logo"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="object-contain w-full h-32 md:h-40"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <p>© 2024. All rights reserved</p>
            <p>made by Calon Asisten Laboratorium Infotech</p>
          </div>
        </div>
      </div>
    </footer>
  );
} 