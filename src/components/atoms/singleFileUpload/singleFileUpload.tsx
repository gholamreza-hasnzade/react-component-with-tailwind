import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Upload, X, File, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '../toast/useToast';

export interface FileUploadConfig {
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  maxWidth?: number; // for images
  maxHeight?: number; // for images
}

export interface FileUploadResult {
  file: File;
  preview?: string;
  error?: string;
}

export interface SingleFileUploadProps {
  onFileSelect?: (result: FileUploadResult) => void;
  onFileUpload?: (file: File) => Promise<void>;
  onFileRemove?: () => void;
  config?: FileUploadConfig;
  className?: string;
  disabled?: boolean;
  placeholder?: string;
  showPreview?: boolean;
  variant?: 'default' | 'outlined' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (type: string): React.ReactNode => {
  if (type.startsWith('image/')) return <File className="w-5 h-5 text-blue-500" />;
  if (type.startsWith('video/')) return <File className="w-5 h-5 text-purple-500" />;
  if (type.startsWith('audio/')) return <File className="w-5 h-5 text-green-500" />;
  if (type.includes('pdf')) return <File className="w-5 h-5 text-red-500" />;
  if (type.includes('text') || type.includes('code')) return <File className="w-5 h-5 text-indigo-500" />;
  return <File className="w-5 h-5 text-gray-500" />;
};

export const SingleFileUpload: React.FC<SingleFileUploadProps> = ({
  onFileSelect,
  onFileUpload,
  onFileRemove,
  config = {},
  className,
  disabled = false,
  placeholder = 'Drag & drop a file here or click to browse',
  showPreview = true,
  variant = 'default',
  size = 'md',
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showErrorToast } = useToast();

  const {
    maxSize = 10 * 1024 * 1024, // 10MB default
    allowedTypes: rawAllowedTypes = [],
    maxWidth = 1920,
    maxHeight = 1080,
  } = config;

  // Ensure allowedTypes is always an array
  const allowedTypes = Array.isArray(rawAllowedTypes) ? rawAllowedTypes : [];

  // Helper function to safely get allowed types display string
  const getAllowedTypesDisplay = () => {
    if (Array.isArray(allowedTypes) && allowedTypes.length > 0) {
      return allowedTypes.join(', ');
    }
    return '';
  };

  // Validate config on component mount and when config changes
  useEffect(() => {
    const configErrors: string[] = [];

    // Validate maxSize
    if (maxSize !== undefined && (typeof maxSize !== 'number' || maxSize <= 0)) {
      configErrors.push('maxSize must be a positive number');
    }

    // Validate allowedTypes
    if (rawAllowedTypes !== undefined && (!Array.isArray(rawAllowedTypes) || rawAllowedTypes.some(type => typeof type !== 'string'))) {
      configErrors.push('allowedTypes must be an array of strings');
    }

    // Validate maxWidth
    if (maxWidth !== undefined && (typeof maxWidth !== 'number' || maxWidth <= 0)) {
      configErrors.push('maxWidth must be a positive number');
    }

    // Validate maxHeight
    if (maxHeight !== undefined && (typeof maxHeight !== 'number' || maxHeight <= 0)) {
      configErrors.push('maxHeight must be a positive number');
    }

    // Show toast error if config is invalid
    if (configErrors.length > 0) {
      const errorMessage = `Invalid upload configuration: ${configErrors.join(', ')}`;
      showErrorToast({
        title: 'Configuration Error',
        description: errorMessage,
        duration: 5000,
      });
      setError(errorMessage);
    }
  }, [config, maxSize, rawAllowedTypes, maxWidth, maxHeight, showErrorToast]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'outlined':
        return 'border-2 border-dashed border-gray-300 hover:border-gray-400 bg-transparent';
      case 'filled':
        return 'border-2 border-dashed border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100';
      default:
        return 'border-2 border-dashed border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'p-4 min-h-[120px]';
      case 'lg':
        return 'p-8 min-h-[200px]';
      default:
        return 'p-6 min-h-[160px]';
    }
  };

  const validateFile = useCallback(async (file: File): Promise<string | null> => {
    // Check file size
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }

    // Check file type
    if (Array.isArray(allowedTypes) && allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      return `File type not allowed. Allowed types: ${getAllowedTypesDisplay()}`;
    }

    // Check image dimensions if it's an image
    if (file.type.startsWith('image/')) {
      return new Promise<string | null>((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (img.width > maxWidth || img.height > maxHeight) {
            resolve(`Image dimensions must be less than ${maxWidth}x${maxHeight}px`);
          } else {
            resolve(null);
          }
        };
        img.onerror = () => resolve('Invalid image file');
        img.src = URL.createObjectURL(file);
      });
    }

    return null;
  }, [maxSize, allowedTypes, maxWidth, maxHeight]);

  const handleFileSelect = useCallback(async (file: File) => {
    setError(null);
    
    try {
      // Validate file
      const validationError = await validateFile(file);
      if (validationError) {
        setError(validationError);
        // Show toast error for file validation failures
        showErrorToast({
          title: 'File Validation Error',
          description: validationError,
          duration: 4000,
        });
        return;
      }

      // Generate preview for images
      let filePreview: string | null = null;
      if (showPreview && file.type.startsWith('image/')) {
        filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
      }

      setSelectedFile(file);
      
      // Call onFileSelect callback
      onFileSelect?.({
        file,
        preview: filePreview || undefined,
      });

      // Auto-upload if onFileUpload is provided
      if (onFileUpload) {
        await handleUpload(file);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process file';
      setError(errorMessage);
      // Show toast error for processing failures
      showErrorToast({
        title: 'File Processing Error',
        description: errorMessage,
        duration: 4000,
      });
    }
  }, [validateFile, showPreview, onFileSelect, onFileUpload, showErrorToast]);

  const handleUpload = async (file: File) => {
    if (!onFileUpload) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      // Simulate progress (replace with actual upload logic)
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      await onFileUpload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Reset progress after a delay
      setTimeout(() => setUploadProgress(0), 1000);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed';
      setError(errorMessage);
      // Show toast error for upload failures
      showErrorToast({
        title: 'Upload Error',
        description: errorMessage,
        duration: 4000,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [disabled, handleFileSelect]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleRemoveFile = useCallback(() => {
    setSelectedFile(null);
    setPreview(null);
    setError(null);
    setUploadProgress(0);
    setIsUploading(false);
    
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    
    onFileRemove?.();
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [preview, onFileRemove]);

  const handleClick = useCallback(() => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, [disabled]);

  return (
    <div className={cn('w-full', className)}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleFileInputChange}
        accept={getAllowedTypesDisplay() ? getAllowedTypesDisplay() : undefined}
        disabled={disabled}
        aria-label="File upload input"
      />

      {!selectedFile ? (
        /* Upload Area */
        <div
          className={cn(
            'relative transition-all duration-200 cursor-pointer',
            getVariantClasses(),
            getSizeClasses(),
            isDragOver && 'border-blue-500 bg-blue-50',
            disabled && 'opacity-50 cursor-not-allowed',
            'rounded-lg'
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <Upload className={cn(
              'mb-3 transition-colors duration-200',
              isDragOver ? 'text-blue-500' : 'text-gray-400',
              size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-12 h-12' : 'w-10 h-10'
            )} />
            <p className={cn(
              'font-medium transition-colors duration-200',
              isDragOver ? 'text-blue-600' : 'text-gray-600',
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
            )}>
              {isDragOver ? 'Drop file here' : placeholder}
            </p>
            <p className={cn(
              'text-gray-500 mt-1',
              size === 'sm' ? 'text-xs' : 'text-sm'
            )}>
              Max size: {formatFileSize(maxSize)}
              {getAllowedTypesDisplay() && ` • Allowed: ${getAllowedTypesDisplay()}`}
            </p>
          </div>
        </div>
      ) : (
        /* File Preview */
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getFileIcon(selectedFile.type)}
              <div className="min-w-0">
                <p className="font-medium text-gray-900 truncate">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(selectedFile.size)} • {selectedFile.type}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isUploading && (
                <div className="flex items-center gap-2 text-sm text-blue-600">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{uploadProgress}%</span>
                </div>
              )}
              
              {error && (
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span>Error</span>
                </div>
              )}
              
              {!isUploading && !error && uploadProgress === 100 && (
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Complete</span>
                </div>
              )}
              
              <button
                onClick={handleRemoveFile}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                disabled={isUploading}
                type="button"
                aria-label="Remove file"
                title="Remove file"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Image Preview */}
          {showPreview && preview && selectedFile.type.startsWith('image/') && (
            <div className="mt-3">
              <img
                src={preview}
                alt={selectedFile.name}
                className="max-w-full h-auto max-h-48 rounded-md border border-gray-200"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};