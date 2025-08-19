import React, { useState, useEffect } from "react";
import { MultiFileUpload } from "./multiFileUpload";
import type { FileUploadResult } from "./multiFileUpload";

export const MultiFileUploadExample: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);
  const [defaultFiles, setDefaultFiles] = useState<File[]>([]);

  // Initialize default files
  useEffect(() => {
    const initDefaultFiles = async () => {
      try {
        // Create text file
        const textContent = "This is a default text file content.";
        const textBlob = new Blob([textContent], { type: 'text/plain' });
        const textFile = new File([textBlob], 'default-document.txt', { type: 'text/plain' });

        // Create image file
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#3B82F6';
          ctx.fillRect(0, 0, 100, 100);
          ctx.fillStyle = 'white';
          ctx.font = '16px Arial';
          ctx.fillText('Demo', 30, 55);
        }
        
        const imageFile = await new Promise<File>((resolve) => {
          canvas.toBlob((blob) => {
            if (blob) {
              const file = new File([blob], 'default-image.png', { type: 'image/png' });
              resolve(file);
            } else {
              resolve(textFile);
            }
          }, 'image/png');
        });

        console.log('Setting default files:', [textFile, imageFile]);
        setDefaultFiles([textFile, imageFile]);
      } catch (error) {
        console.error('Error creating default files:', error);
      }
    };

    initDefaultFiles();
  }, []); // Only run once on mount

  const handleFilesSelect = (results: FileUploadResult[]) => {
    console.log("Files selected:", results);
    setUploadedFiles(results);
  };

  const handleFileUpload = async (file: File): Promise<void> => {
    // Simulate file upload
    console.log("Uploading file:", file.name);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("File uploaded successfully:", file.name);
  };

  const handleFileRemove = (fileId: string) => {
    console.log("File removed:", fileId);
    setUploadedFiles(prev => prev.filter(f => f.uploadId !== fileId));
  };

  const handleAllFilesComplete = (results: FileUploadResult[]) => {
    console.log("All files completed:", results);
    showSuccessToast({
      title: 'All Uploads Complete!',
      description: `Successfully uploaded ${results.length} files`,
      duration: 5000,
    });
  };

  const imageConfig = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    maxWidth: 1920, // Max width 1920px
    maxHeight: 1080, // Max height 1080px
    maxFiles: 5, // Maximum 5 images
  };

  const documentConfig = {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
    maxFiles: 10, // Maximum 10 documents
  };

  const videoConfig = {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ["video/mp4", "video/webm", "video/ogg"],
    maxFiles: 3, // Maximum 3 videos
  };

  const mixedConfig = {
    maxSize: 50 * 1024 * 1024, // 50MB
    maxFiles: 20, // Maximum 20 files of any type
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Multi File Upload Component
        </h2>
        <p className="text-gray-600 mb-6">
          Professional multiple file upload with drag & drop, validation, and sequential upload
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                     {/* Basic Multi Upload */}
           <div>
             <h3 className="text-lg font-semibold mb-3">Basic Multi Upload</h3>
             <MultiFileUpload
               onFilesSelect={handleFilesSelect}
               onFileUpload={handleFileUpload}
               onFileRemove={handleFileRemove}
               placeholder="Drop multiple files here or click to browse"
               autoUpload={false}
             />
           </div>

                       {/* With Default Files */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                With Default Files ({defaultFiles.length} files)
              </h3>
              <div className="mb-2 text-sm text-gray-600">
                Default files: {defaultFiles.map(f => f.name).join(', ')}
              </div>
              <MultiFileUpload
                onFilesSelect={handleFilesSelect}
                onFileUpload={handleFileUpload}
                onFileRemove={handleFileRemove}
                placeholder="This component starts with default files"
                autoUpload={false}
                defaultFiles={defaultFiles}
              />
            </div>

          {/* Image Multi Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Image Multi Upload (5MB max, 5 files max)
            </h3>
            <MultiFileUpload
              config={imageConfig}
              onFilesSelect={handleFilesSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop multiple images here (JPEG, PNG, GIF, WebP)"
              showPreview={true}
              autoUpload={true}
            />
          </div>

          {/* Document Multi Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Document Multi Upload (10MB max, 10 files max)
            </h3>
            <MultiFileUpload
              config={documentConfig}
              onFilesSelect={handleFilesSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop multiple documents here (PDF, DOC, DOCX, TXT)"
              variant="outlined"
              autoUpload={false}
            />
          </div>

          {/* Video Multi Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Video Multi Upload (100MB max, 3 files max)
            </h3>
            <MultiFileUpload
              config={videoConfig}
              onFilesSelect={handleFilesSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop multiple videos here (MP4, WebM, OGG)"
              variant="filled"
              size="lg"
              autoUpload={true}
            />
          </div>

          {/* Mixed Files Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Mixed Files Upload (50MB max, 20 files max)
            </h3>
            <MultiFileUpload
              config={mixedConfig}
              onFilesSelect={handleFilesSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              onAllFilesComplete={handleAllFilesComplete}
              placeholder="Drop any type of files here"
              autoUpload={true}
            />
          </div>

          {/* Disabled State */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
            <MultiFileUpload
              disabled={true}
              placeholder="This upload is disabled"
            />
          </div>

          {/* Small Size */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Small Size</h3>
            <MultiFileUpload
              size="sm"
              onFilesSelect={handleFilesSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Compact multi-upload area"
              autoUpload={false}
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          📁 Multi Upload Features:
        </h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>
            • <strong>Multiple File Selection</strong> - Select many files at once
          </li>
          <li>
            • <strong>Sequential Upload</strong> - Files upload one by one for better control
          </li>
          <li>
            • <strong>Sequential Uploads</strong> - Files upload one by one in order
          </li>
          <li>
            • <strong>Upload Queue</strong> - Smart queue management with progress tracking
          </li>
          <li>
            • <strong>File Validation</strong> - Size, type, and dimension validation
          </li>
          <li>
            • <strong>Progress Tracking</strong> - Individual file progress with progress bars
          </li>
          <li>
            • <strong>Image Preview</strong> - Automatic preview generation for images
          </li>
          <li>
            • <strong>Error Handling</strong> - Per-file error handling and display
          </li>
          <li>
            • <strong>Status Management</strong> - Clear status indicators (pending, uploading, completed, error)
          </li>
          <li>
            • <strong>File Management</strong> - Add, remove, and clear files easily
          </li>
          <li>
            • <strong>Auto Upload</strong> - Optional automatic upload start
          </li>
          <li>
            • <strong>Toast Notifications</strong> - Success, error, and info notifications
          </li>
          <li>
            • <strong>Drag & Drop</strong> - Intuitive file dropping with visual feedback
          </li>
          <li>
            • <strong>Multiple Variants</strong> - Default, outlined, and filled styles
          </li>
          <li>
            • <strong>Size Options</strong> - Small, medium, and large sizes
          </li>
          <li>
            • <strong>Accessibility</strong> - Full keyboard navigation and screen reader support
          </li>
        </ul>
      </div>

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Uploaded Files ({uploadedFiles.length}):
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((result) => (
              <div
                key={result.uploadId}
                className="flex items-center gap-2 text-sm text-green-700"
              >
                <span>✓</span>
                <span>{result.file.name}</span>
                <span className="text-green-600">
                  ({(result.file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium',
                  result.status === 'completed' ? 'bg-green-100 text-green-800' :
                  result.status === 'uploading' ? 'bg-blue-100 text-blue-800' :
                  result.status === 'error' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                )}>
                  {result.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function for className concatenation
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Mock toast function for the example
const showSuccessToast = (options: { title: string; description: string; duration: number }) => {
  console.log('Success Toast:', options);
};
