'use client';

import { FolderOpen } from 'lucide-react';
import { Button } from './button';
import { useRouter } from 'next/navigation';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  showAction?: boolean;
}

export function EmptyState({
  title = "Belum ada data",
  description = "Anda belum memiliki portfolio. Mulai buat portfolio Anda sekarang!",
  actionLabel = "Buat Portfolio",
  actionHref = "/portfolio",
  showAction = true
}: EmptyStateProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4">
        <FolderOpen className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-center max-w-md mb-6">{description}</p>
      {showAction && (
        <Button
          onClick={() => router.push(actionHref)}
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
} 