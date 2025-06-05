'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageIcon, Plus, Trash2, X } from "lucide-react";
import { RequiredLabel } from "./RequiredLabel";
import { usePortfolioStore } from "@/store/portfolioStore";
import { useEffect, useState } from 'react';
import Image from "next/image";

interface ProjectLink {
  id: number;
  title: string;
  url: string;
}

interface Tag {
  id: number;
  text: string;
}

interface ProjectImage {
  file: File | null;
  preview: string;
}

interface DetailProjectSectionProps {
  sectionRef: React.RefObject<HTMLDivElement>;
  projectLinks: ProjectLink[];
  tags: Tag[];
  tagInput: string;
  projectImage: ProjectImage;
  fileInputRef: React.RefObject<HTMLInputElement>;
  onAddLink: () => void;
  onDeleteLink: (id: number) => void;
  onLinkChange: (id: number, field: keyof ProjectLink, value: string) => void;
  onTagInputChange: (value: string) => void;
  onTagKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onTagDelete: (id: number) => void;
  onImageClick: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPreview: () => void;
  onYearChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  errors?: {
    [key: string]: string;
  };
}

export function DetailProjectSection({
  sectionRef,
  projectLinks,
  tags,
  tagInput,
  projectImage,
  fileInputRef,
  onAddLink,
  onDeleteLink,
  onLinkChange,
  onTagInputChange,
  onTagKeyDown,
  onTagDelete,
  onImageClick,
  onImageChange,
  onPreview,
  onYearChange,
  onDescriptionChange,
  errors = {}
}: DetailProjectSectionProps) {
  const [mounted, setMounted] = useState(false);
  const year = usePortfolioStore((state) => state.year);
  const description = usePortfolioStore((state) => state.description);
  const setPortfolioData = usePortfolioStore((state) => state.setPortfolioData);

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Hanya terima angka
    if (/^\d*$/.test(value)) {
      onYearChange(value);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setPortfolioData({
        projectLinks: projectLinks.map(link => ({ title: link.title, url: link.url })),
        tags: tags.map(tag => tag.text),
        projectImage: projectImage.preview || '',
      });
    }
  }, [projectLinks, tags, projectImage, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={sectionRef} className="mb-8 scroll-mt-24">
      <h2 className="text-xl font-semibold text-white mb-4">Detail Project</h2>
      <div className="space-y-6">
        {/* Tahun Project */}
        <div>
          <RequiredLabel>Tahun Project Dibuat</RequiredLabel>
          <Input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={year}
            onChange={handleYearChange}
            placeholder="Masukkan Tahun Project Dibuat"
            className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.year ? 'border-red-500' : ''}`}
          />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">{errors.year}</p>
          )}
        </div>

        {/* Project Links */}
        <div className="space-y-6">
          {projectLinks.map((link) => (
            <div key={link.id} className="flex gap-6">
              <div className="flex-1">
                <RequiredLabel>Judul Link</RequiredLabel>
                <Input
                  value={link.title}
                  onChange={(e) => onLinkChange(link.id, 'title', e.target.value)}
                  className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors[`projectLink_${link.id}_title`] ? 'border-red-500' : ''}`}
                  placeholder="Masukkan Judul Link"
                />
                {errors[`projectLink_${link.id}_title`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`projectLink_${link.id}_title`]}</p>
                )}
              </div>
              <div className="flex-1">
                <RequiredLabel>Link Project</RequiredLabel>
                <Input
                  value={link.url}
                  onChange={(e) => onLinkChange(link.id, 'url', e.target.value)}
                  className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors[`projectLink_${link.id}_url`] ? 'border-red-500' : ''}`}
                  placeholder="Masukkan Link Project"
                />
                {errors[`projectLink_${link.id}_url`] && (
                  <p className="text-red-500 text-sm mt-1">{errors[`projectLink_${link.id}_url`]}</p>
                )}
              </div>
              {projectLinks.length > 1 && (
                <div className="flex items-end">
                  <Button
                    onClick={() => onDeleteLink(link.id)}
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-500/10 h-10 w-10 p-0"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
              {projectLinks.length === 1 && <div className="w-10" />}
            </div>
          ))}
          <Button 
            onClick={onAddLink}
            variant="outline" 
            className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex hover:text-blue-500 items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Tambah Link Baru
          </Button>
        </div>

        {/* Tags */}
        <div>
          <RequiredLabel>Tag</RequiredLabel>
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-1 bg-blue-500/20 text-white px-2 py-1 rounded-lg"
                >
                  <span>{tag.text}</span>
                  <button
                    onClick={() => onTagDelete(tag.id)}
                    className="text-white/80 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Input
              value={tagInput}
              onChange={(e) => onTagInputChange(e.target.value)}
              onKeyDown={onTagKeyDown}
              placeholder="Ketik tag dan tekan enter"
              className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 ${errors.tags ? 'border-red-500' : ''}`}
            />
            {errors.tags && (
              <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <RequiredLabel>Description</RequiredLabel>
          <Textarea
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Description"
            className={`bg-white/5 border-0 text-white placeholder:text-gray-400 focus:bg-blue-900/30 focus-visible:ring-2 focus-visible:ring-blue-500 min-h-[150px] ${errors.description ? 'border-red-500' : ''}`}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <RequiredLabel>Image</RequiredLabel>
          <div 
            onClick={onImageClick}
            className={`relative w-full h-[200px] bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-colors ${errors.projectImage ? 'border-2 border-red-500' : ''}`}
          >
            {projectImage.preview ? (
              <Image
                src={projectImage.preview}
                alt="Project Preview"
                fill
                className="object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <ImageIcon className="w-12 h-12 mb-2" />
                <p>Klik untuk upload gambar</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={onImageChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          {errors.projectImage && (
            <p className="text-red-500 text-sm mt-1">{errors.projectImage}</p>
          )}
        </div>

        {/* Action Buttons */}
        {/* <div className="flex justify-end gap-4">
          <Button 
            variant="outline" 
            className="bg-blue-500 text-white hover:bg-blue-600 border-0 hover:text-white"
            onClick={onPreview}
          >
            Preview Portfolio
          </Button>
          <Button className="bg-green-500 text-white hover:bg-green-600">
            Submit Portfolio
          </Button>
        </div> */}
      </div>
    </div>
  );
} 