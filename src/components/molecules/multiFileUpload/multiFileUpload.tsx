import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Upload,
  X,
  File,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "../../atoms/toast/useToast";

export interface FileUploadConfig {
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  maxWidth?: number; // for images
  maxHeight?: number; // for images
  maxFiles?: number; // maximum number of files allowed
}

export interface FileUploadResult {
  file: File;
  preview?: string;
  error?: string;
  status: "pending" | "uploading" | "completed" | "error";
  progress: number;
  uploadId: string;
}

export interface MultiFileUploadProps {
  onFilesSelect?: (results: FileUploadResult[]) => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileRemove?: (fileId: string) => void;
  onAllFilesComplete?: (results: FileUploadResult[]) => void;
  config?: FileUploadConfig;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showPreview?: boolean;
  variant?: "default" | "outlined" | "filled";
  size?: "sm" | "md" | "lg";
  autoUpload?: boolean; // whether to start upload automatically
  defaultFiles?: File[]; // default files to show on component mount
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const generateUploadId = (): string => {
  return `upload_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const MultiFileUpload: React.FC<MultiFileUploadProps> = ({
  onFilesSelect,
  onFileUpload,
  onFileRemove,
  onAllFilesComplete,
  config = {},
  className,
  disabled = false,
  placeholder = "Drag & drop files here or click to browse",
  showPreview = true,
  variant = "default",
  size = "md",
  autoUpload = true,
  defaultFiles = [],
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileUploadResult[]>([]);
  const [uploadQueue, setUploadQueue] = useState<FileUploadResult[]>([]);
  const [activeUploads, setActiveUploads] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showErrorToast, showSuccessToast, showInfoToast } = useToast();

  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes: rawAllowedTypes = [],
    maxWidth = 1920,
    maxHeight = 1080, 
    maxFiles = 10,     
  } = config;

  // Ensure allowedTypes is always an array
  const allowedTypes = Array.isArray(rawAllowedTypes) ? rawAllowedTypes : [];

  // Helper function to safely get allowed types display string
  const getAllowedTypesDisplay = () => {
    if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
      return allowedTypes.join(", ");
    }
    return "";
  };

  // Validate config on component mount and when config changes
  useEffect(() => {
    const configErrors: string[] = [];

    // Validate maxSize
    if (
      maxSize !== undefined &&
      (typeof maxSize !== "number" || maxSize <= 0)
    ) {
      configErrors.push("maxSize must be a positive number");
    }

    // Validate allowedTypes
    if (
      rawAllowedTypes !== undefined &&
      (!Array.isArray(rawAllowedTypes) ||
        rawAllowedTypes.some((type) => typeof type !== "string"))
    ) {
      configErrors.push("allowedTypes must be an array of strings");
    }

    // Validate maxWidth
    if (
      maxWidth !== undefined &&
      (typeof maxWidth !== "number" || maxWidth <= 0)
    ) {
      configErrors.push("maxWidth must be a positive number");
    }

    // Validate maxHeight
    if (
      maxHeight !== undefined &&
      (typeof maxHeight !== "number" || maxHeight <= 0)
    ) {
      configErrors.push("maxHeight must be a positive number");
    }

    // Validate maxFiles
    if (
      maxFiles !== undefined &&
      (typeof maxFiles !== "number" || maxFiles <= 0)
    ) {
      configErrors.push("maxFiles must be a positive number");
    }

    // Show toast error if config is invalid
    if (configErrors.length > 0) {
      const errorMessage = `Invalid upload configuration: ${configErrors.join(
        ", "
      )}`;
      showErrorToast({
        title: "Configuration Error",
        description: errorMessage,
        duration: 5000,
      });
      setError(errorMessage);
    }
  }, [
    config,
    maxSize,
    rawAllowedTypes,
    maxWidth,
    maxHeight,
    maxFiles,
    showErrorToast,
  ]);



  const getVariantClasses = () => {
    switch (variant) {
      case "outlined":
        return "border-2 border-dashed border-gray-300 hover:border-gray-400 bg-transparent";
      case "filled":
        return "border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100";
      default:
        return "border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50";
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "p-4 min-h-[120px]";
      case "lg":
        return "p-8 min-h-[200px]";
      default:
        return "p-6 min-h-[160px]";
    }
  };

  const validateFile = useCallback(
    async (file: File): Promise<string | null> => {
      // Check file size
      if (file.size > maxSize) {
        return `File size must be less than ${formatFileSize(maxSize)}`;
      }

      // Check file type
      if (
        Array.isArray(allowedTypes) &&
        allowedTypes.length > 0 &&
        !allowedTypes.includes(file.type)
      ) {
        return `File type not allowed. Allowed types: ${getAllowedTypesDisplay()}`;
      }

      // Check image dimensions if it's an image
      if (file.type.startsWith("image/")) {
        return new Promise<string | null>((resolve) => {
          const img = new Image();
          img.onload = () => {
            if (img.width > maxWidth || img.height > maxHeight) {
              resolve(
                `Image dimensions must be less than ${maxWidth}x${maxHeight}px`
              );
            } else {
              resolve(null);
            }
          };
          img.onerror = () => resolve("Invalid image file");
          img.src = URL.createObjectURL(file);
        });
      }

      return null;
    },
    [maxSize, allowedTypes, maxWidth, maxHeight, getAllowedTypesDisplay]
  );

  const processFiles = useCallback(
    async (files: File[]): Promise<FileUploadResult[]> => {
      const results: FileUploadResult[] = [];

      for (const file of files) {
        try {
          // Validate file
          const validationError = await validateFile(file);
          if (validationError) {
            results.push({
              file,
              error: validationError,
              status: "error",
              progress: 0,
              uploadId: generateUploadId(),
            });
            continue;
          }

          // Generate preview for images
          let filePreview: string | null = null;
          if (showPreview && file.type.startsWith("image/")) {
            filePreview = URL.createObjectURL(file);
          }

          results.push({
            file,
            preview: filePreview || undefined,
            status: "pending",
            progress: 0,
            uploadId: generateUploadId(),
          });
        } catch (err) {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to process file";
          results.push({
            file,
            error: errorMessage,
            status: "error",
            progress: 0,
            uploadId: generateUploadId(),
          });
        }
      }

      return results;
    },
    [validateFile, showPreview]
  );

  // Process default files when they change
  useEffect(() => {
    if (defaultFiles.length > 0) {
      // Process default files directly without calling handleFilesSelect
      const processDefaultFiles = async () => {
        try {
          const results = await processFiles(defaultFiles);
          
          // Add default files to selected files
          setSelectedFiles(results);
          
          // Show success message for valid files
          const validFiles = results.filter((r) => !r.error);
          if (validFiles.length > 0) {
            showSuccessToast({
              title: "Default Files Loaded",
              description: `Successfully loaded ${validFiles.length} default file(s)`,
              duration: 3000,
            });
          }
          
          // Auto-upload if enabled
          if (autoUpload && onFileUpload) {
            const validResults = results.filter((r) => !r.error);
            if (validResults.length > 0) {
              setUploadQueue((prev) => [...prev, ...validResults]);
            }
          }
        } catch (err) {
          const errorMessage = err instanceof Error ? err.message : "Failed to process default files";
          setError(errorMessage);
          showErrorToast({
            title: "Default Files Error",
            description: errorMessage,
            duration: 4000,
          });
        }
      };
      
      processDefaultFiles();
    }
  }, [defaultFiles]); // Watch for changes to defaultFiles

  const handleFilesSelect = useCallback(
    async (files: File[]) => {
      setError(null);

      // Check max files limit
      if (selectedFiles.length + files.length > maxFiles) {
        const errorMessage = `Maximum ${maxFiles} files allowed. You can add ${
          maxFiles - selectedFiles.length
        } more files.`;
        showErrorToast({
          title: "File Limit Exceeded",
          description: errorMessage,
          duration: 4000,
        });
        return;
      }

      try {
        const results = await processFiles(files);

        // Add new files to selected files
        const newSelectedFiles = [...selectedFiles, ...results];
        setSelectedFiles(newSelectedFiles);

        // Call onFilesSelect callback
        onFilesSelect?.(newSelectedFiles);

        // Show success message for valid files
        const validFiles = results.filter((r) => !r.error);
        const errorFiles = results.filter((r) => r.error);

        if (validFiles.length > 0) {
          showSuccessToast({
            title: "Files Added",
            description: `Successfully added ${validFiles.length} file(s)`,
            duration: 3000,
          });
        }

        if (errorFiles.length > 0) {
          showErrorToast({
            title: "Some Files Failed",
            description: `${errorFiles.length} file(s) failed validation`,
            duration: 4000,
          });
        }

        // Auto-upload if enabled
        if (autoUpload && onFileUpload) {
          const validResults = results.filter((r) => !r.error);
          if (validResults.length > 0) {
            setUploadQueue((prev) => [...prev, ...validResults]);
          }
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to process files";
        setError(errorMessage);
        showErrorToast({
          title: "File Processing Error",
          description: errorMessage,
          duration: 4000,
        });
      }
    },
    [
      selectedFiles,
      maxFiles,
      processFiles,
      onFilesSelect,
      autoUpload,
      onFileUpload,
      showErrorToast,
      showSuccessToast,
    ]
  );

  const uploadFile = useCallback(
    async (fileResult: FileUploadResult) => {
      if (!onFileUpload) return;

      const { uploadId } = fileResult;

      // Update status to uploading
      setSelectedFiles((prev) =>
        prev.map((f) =>
          f.uploadId === uploadId
            ? { ...f, status: "uploading", progress: 0 }
            : f
        )
      );

      try {
        // Simulate progress (replace with actual upload logic)
        const progressInterval = setInterval(() => {
          setSelectedFiles((prev) =>
            prev.map((f) => {
              if (f.uploadId === uploadId) {
                const newProgress = Math.min(f.progress + 10, 90);
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 100);

        await onFileUpload(fileResult.file);

        clearInterval(progressInterval);

        // Update status to completed
        setSelectedFiles((prev) =>
          prev.map((f) =>
            f.uploadId === uploadId
              ? { ...f, status: "completed", progress: 100 }
              : f
          )
        );

        // Remove from active uploads
        setActiveUploads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(uploadId);
          return newSet;
        });

        // Show success message
        showSuccessToast({
          title: "Upload Complete",
          description: `${fileResult.file.name} uploaded successfully`,
          duration: 3000,
        });

        // Check if all uploads are complete
        const allFiles = selectedFiles;
        const completedFiles = allFiles.filter((f) => f.status === "completed");
        if (completedFiles.length === allFiles.length && onAllFilesComplete) {
          onAllFilesComplete(allFiles);
        }
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Upload failed";

        // Update status to error
        setSelectedFiles((prev) =>
          prev.map((f) =>
            f.uploadId === uploadId
              ? { ...f, status: "error", error: errorMessage }
              : f
          )
        );

        // Remove from active uploads
        setActiveUploads((prev) => {
          const newSet = new Set(prev);
          newSet.delete(uploadId);
          return newSet;
        });

        // Show error message
        showErrorToast({
          title: "Upload Error",
          description: `${fileResult.file.name}: ${errorMessage}`,
          duration: 4000,
        });
      }
    },
    [
      onFileUpload,
      selectedFiles,
      onAllFilesComplete,
      showErrorToast,
      showSuccessToast,
    ]
  );

  // Process upload queue - Sequential uploads only
  useEffect(() => {
    if (uploadQueue.length === 0 || !onFileUpload || activeUploads.size > 0)
      return;

    const processQueue = async () => {
      // Only process one file at a time for truly sequential uploads
      const fileToUpload = uploadQueue[0];
      if (!fileToUpload) return;

      // Remove file from queue
      setUploadQueue((prev) => prev.slice(1));

      // Add to active uploads
      setActiveUploads((prev) => {
        const newSet = new Set(prev);
        newSet.add(fileToUpload.uploadId);
        return newSet;
      });

      // Start upload
      await uploadFile(fileToUpload);
    };

    processQueue();
  }, [uploadQueue, activeUploads, onFileUpload, uploadFile]);



  const handleDragOver = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (!disabled) setIsDragOver(true);
    },
    [disabled]
  );

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFilesSelect(files);
      }
    },
    [disabled, handleFilesSelect]
  );

  const handleFileInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFilesSelect(Array.from(files));
      }
    },
    [handleFilesSelect]
  );

  const handleRemoveFile = useCallback(
    (uploadId: string) => {
      setSelectedFiles((prev) => {
        const fileToRemove = prev.find((f) => f.uploadId === uploadId);
        if (fileToRemove?.preview) {
          URL.revokeObjectURL(fileToRemove.preview);
        }
        return prev.filter((f) => f.uploadId !== uploadId);
      });

      // Remove from upload queue if present
      setUploadQueue((prev) => prev.filter((f) => f.uploadId !== uploadId));

      // Remove from active uploads if present
      setActiveUploads((prev) => {
        const newSet = new Set(prev);
        newSet.delete(uploadId);
        return newSet;
      });

      onFileRemove?.(uploadId);
    },
    [onFileRemove]
  );

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);



  const handleIndividualUpload = useCallback((fileResult: FileUploadResult) => {
    if (!onFileUpload || activeUploads.size > 0) return;

    // Add this single file to the upload queue
    setUploadQueue(() => [fileResult]);
    
    showInfoToast({
      title: "Upload Started",
      description: `Starting upload of ${fileResult.file.name}`,
      duration: 3000,
    });
  }, [onFileUpload, activeUploads.size, showInfoToast]);

  const clearAllFiles = useCallback(() => {
    // Revoke all preview URLs
    selectedFiles.forEach((f) => {
      if (f.preview) {
        URL.revokeObjectURL(f.preview);
      }
    });

    setSelectedFiles([]);
    setUploadQueue([]);
    setActiveUploads(new Set());
    setError(null);

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [selectedFiles]);

  const getStatusIcon = (status: FileUploadResult["status"]) => {
    switch (status) {
      case "pending":
        return <File className="w-5 h-5 text-gray-400" />;
      case "uploading":
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <File className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: FileUploadResult["status"]) => {
    switch (status) {
      case "pending":
        return "Pending";
      case "uploading":
        return "Uploading";
      case "completed":
        return "Complete";
      case "error":
        return "Error";
      default:
        return "Unknown";
    }
  };

  return (
    <div className={cn("w-full", className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileInputChange}
        accept={getAllowedTypesDisplay() ? getAllowedTypesDisplay() : undefined}
        disabled={disabled}
        aria-label="Multiple file upload input"
      />

      {selectedFiles.length === 0 ? (
        /* Upload Area */
        <div
          className={cn(
            "relative transition-all duration-200 cursor-pointer",
            getVariantClasses(),
            getSizeClasses(),
            isDragOver && "border-blue-500 bg-blue-50",
            disabled && "opacity-50 cursor-not-allowed",
            "rounded-lg"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload
              className={cn(
                "mb-3 transition-colors duration-200",
                isDragOver ? "text-blue-500" : "text-gray-400",
                size === "sm"
                  ? "w-8 h-8"
                  : size === "lg"
                  ? "w-12 h-12"
                  : "w-10 h-10"
              )}
            />
            <p
              className={cn(
                "font-medium transition-colors duration-200",
                isDragOver ? "text-blue-600" : "text-gray-600",
                size === "sm"
                  ? "text-sm"
                  : size === "lg"
                  ? "text-lg"
                  : "text-base"
              )}
            >
              {isDragOver ? "Drop files here" : placeholder}
            </p>
            <p
              className={cn(
                "text-gray-500 mt-1",
                size === "sm" ? "text-xs" : "text-sm"
              )}
            >
              Max size: {formatFileSize(maxSize)} • Max files: {maxFiles}
              {getAllowedTypesDisplay() &&
                ` • Allowed: ${getAllowedTypesDisplay()}`}
            </p>
          </div>
        </div>
      ) : (
        /* Files List and Controls */
        <div className="space-y-4">
          {/* Header with controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="font-medium text-gray-900">
                Selected Files ({selectedFiles.length}/{maxFiles})
              </h3>
              {activeUploads.size > 0 && (
                <span className="text-sm text-blue-600">
                  1 uploading, {uploadQueue.length} waiting...
                </span>
              )}
              {uploadQueue.length > 0 && activeUploads.size === 0 && (
                <span className="text-sm text-gray-600">
                  {uploadQueue.length} in queue
                </span>
              )}
            </div>

                         <div className="flex items-center gap-2">
               <button
                 onClick={clearAllFiles}
                 className="px-3 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors duration-200"
               >
                 <Trash2 className="w-4 h-4 mr-2 inline" />
                 Clear All
               </button>

               <button
                 onClick={handleClick}
                 disabled={disabled || selectedFiles.length >= maxFiles}
                 className="px-3 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
               >
                 <Plus className="w-4 h-4 mr-2 inline" />
                 Add More
               </button>
             </div>
          </div>

          {/* Files List */}
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {selectedFiles.map((fileResult) => (
              <div
                key={fileResult.uploadId}
                className={cn(
                  "border rounded-lg p-3 transition-all duration-200",
                  fileResult.status === "error"
                    ? "border-red-200 bg-red-50"
                    : fileResult.status === "completed"
                    ? "border-green-200 bg-green-50"
                    : fileResult.status === "uploading"
                    ? "border-blue-200 bg-blue-50"
                    : "border-gray-200 bg-white"
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(fileResult.status)}
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate text-sm">
                        {fileResult.file.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(fileResult.file.size)} •{" "}
                        {fileResult.file.type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs font-medium",
                        fileResult.status === "error"
                          ? "text-red-600"
                          : fileResult.status === "completed"
                          ? "text-green-600"
                          : fileResult.status === "uploading"
                          ? "text-blue-600"
                          : "text-gray-600"
                      )}
                    >
                      {getStatusText(fileResult.status)}
                      {fileResult.status === "pending" &&
                        uploadQueue.length > 0 && (
                          <span className="ml-1 text-xs text-gray-500">
                            (in queue)
                          </span>
                        )}
                    </span>

                    {fileResult.status === "uploading" && (
                      <span className="text-xs text-blue-600">
                        {fileResult.progress}%
                      </span>
                    )}

                    {/* Individual Upload Button */}
                    {onFileUpload && fileResult.status === "pending" && !fileResult.error && (
                      <button
                        onClick={() => handleIndividualUpload(fileResult)}
                        className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                        disabled={disabled || activeUploads.size > 0}
                        type="button"
                        aria-label="Upload this file"
                        title="Upload this file"
                      >
                        <Upload className="w-3 h-3 mr-1 inline" />
                        Upload
                      </button>
                    )}

                    <button
                      onClick={() => handleRemoveFile(fileResult.uploadId)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      disabled={fileResult.status === "uploading"}
                      type="button"
                      aria-label="Remove file"
                      title="Remove file"
                    >
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                {fileResult.status === "uploading" && (
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${fileResult.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {fileResult.error && (
                  <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-xs text-red-700">{fileResult.error}</p>
                  </div>
                )}

                {/* Image Preview */}
                {showPreview &&
                  fileResult.preview &&
                  fileResult.file.type.startsWith("image/") && (
                    <div className="mt-2">
                      <img
                        src={fileResult.preview}
                        alt={fileResult.file.name}
                        className="w-16 h-16 object-cover rounded-md border border-gray-200"
                      />
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
