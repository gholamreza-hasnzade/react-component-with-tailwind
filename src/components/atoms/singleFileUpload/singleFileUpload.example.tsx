import React, { useState } from "react";
import { SingleFileUpload } from "./singleFileUpload";
import type { FileUploadResult } from "./singleFileUpload";

export const SingleFileUploadExample: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileUploadResult[]>([]);

  const handleFileSelect = (result: FileUploadResult) => {
    console.log("File selected:", result);
    if (!result.error) {
      setUploadedFiles((prev) => [...prev, result]);
    }
  };

  const handleFileUpload = async (file: File): Promise<void> => {
    // Simulate file upload
    console.log("Uploading file:", file.name);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    console.log("File uploaded successfully:", file.name);
  };

  const handleFileRemove = () => {
    console.log("File removed");
  };

  const imageConfig = {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    maxWidth: 1920, // Max width 1920px
    maxHeight: 1080, // Max height 1080px
  };

  const documentConfig = {
    maxSize: 10 * 1024 * 1024, // 10MB
    allowedTypes: [
      "application/pdf",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  };

  const videoConfig = {
    maxSize: 100 * 1024 * 1024, // 100MB
    allowedTypes: ["video/mp4", "video/webm", "video/ogg"],
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Single File Upload Component
        </h2>
        <p className="text-gray-600 mb-6">
          Professional file upload with drag & drop, validation, and progress
          tracking
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Upload</h3>
            <SingleFileUpload
              onFileSelect={handleFileSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop any file here or click to browse"
            />
          </div>

          {/* Image Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Image Upload (5MB max, 1920x1080px max)
            </h3>
            <SingleFileUpload
              config={imageConfig}
              onFileSelect={handleFileSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop an image here (JPEG, PNG, GIF, WebP)"
              showPreview={true}
            />
          </div>

          {/* Document Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Document Upload (10MB max)
            </h3>
            <SingleFileUpload
              config={documentConfig}
              onFileSelect={handleFileSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop a document here (PDF, DOC, DOCX, TXT)"
              variant="outlined"
            />
          </div>

          {/* Video Upload */}
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Video Upload (100MB max)
            </h3>
            <SingleFileUpload
              config={videoConfig}
              onFileSelect={handleFileSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Drop a video here (MP4, WebM, OGG)"
              variant="filled"
              size="lg"
            />
          </div>

          {/* Disabled State */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Disabled State</h3>
            <SingleFileUpload
              disabled={true}
              placeholder="This upload is disabled"
            />
          </div>

          {/* Small Size */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Small Size</h3>
            <SingleFileUpload
              size="sm"
              onFileSelect={handleFileSelect}
              onFileUpload={handleFileUpload}
              onFileRemove={handleFileRemove}
              placeholder="Compact upload area"
            />
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">
          📁 Upload Features:
        </h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>
            • <strong>Drag & Drop</strong> - Intuitive file dropping with visual
            feedback
          </li>
          <li>
            • <strong>File Validation</strong> - Size, type, and dimension
            validation
          </li>
          <li>
            • <strong>Progress Tracking</strong> - Real-time upload progress
            with progress bar
          </li>
          <li>
            • <strong>Image Preview</strong> - Automatic preview generation for
            images
          </li>
          <li>
            • <strong>Error Handling</strong> - Clear error messages and
            validation feedback
          </li>
          <li>
            • <strong>Multiple Variants</strong> - Default, outlined, and filled
            styles
          </li>
          <li>
            • <strong>Size Options</strong> - Small, medium, and large sizes
          </li>
          <li>
            • <strong>Accessibility</strong> - Full keyboard navigation and
            screen reader support
          </li>
          <li>
            • <strong>Customizable</strong> - Configurable file types, sizes,
            and dimensions
          </li>
          <li>
            • <strong>Dark Mode Ready</strong> - Responsive to theme changes
          </li>
        </ul>
      </div>

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Uploaded Files:
          </h3>
          <div className="space-y-2">
            {uploadedFiles.map((result, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-sm text-green-700"
              >
                <span>✓</span>
                <span>{result.file.name}</span>
                <span className="text-green-600">
                  ({(result.file.size / 1024 / 1024).toFixed(2)} MB)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
