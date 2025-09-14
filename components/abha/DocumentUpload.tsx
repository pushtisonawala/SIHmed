import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

interface DocumentUploadProps {
  label: string;
  id: string;
  onUpload: (file: File) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ label, id, onUpload }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onUpload(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="mb-6">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      {!file ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-green-500 transition-colors">
          <input
            type="file"
            id={id}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <label htmlFor={id} className="cursor-pointer">
            <div className="flex flex-col items-center">
              <svg
                className="h-12 w-12 text-gray-400"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m8-12v8m-4-4h8m8-16h8a4 4 0 014 4v20a4 4 0 01-4 4H12a4 4 0 01-4-4v-4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-700">
                Click to upload document
              </span>
              <span className="mt-1 text-xs text-gray-500">
                PNG, JPG, GIF up to 10MB
              </span>
            </div>
          </label>
        </div>
      ) : (
        <div className="relative border rounded-lg overflow-hidden">
          <div className="relative h-60 w-full">
            <Image
              src={preview!}
              alt="Document preview"
              fill
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className="absolute top-2 right-2">
            <Button
              onClick={handleRemove}
              variant="destructive"
              size="sm"
              className="rounded-full p-1 h-8 w-8"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
          </div>
          <div className="px-4 py-2 bg-gray-50">
            <p className="text-sm text-gray-800 truncate">{file.name}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;
