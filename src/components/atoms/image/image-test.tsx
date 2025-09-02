import React from "react";
import { Image } from "./image";

export function ImageTest() {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center">Image Component Test</h1>
      
      {/* Simple Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Basic Image Test</h2>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
              alt="Test image"
              size="lg"
              variant="rounded"
            />
            <p className="text-sm mt-2">Rounded Image</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Test image 2"
              size="lg"
              variant="default"
            />
            <p className="text-sm mt-2">Default Image</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop"
              alt="Test image 3"
              size="lg"
              variant="card"
            />
            <p className="text-sm mt-2">Card Image</p>
          </div>
        </div>
      </div>

      {/* Size Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Size Test</h2>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
              alt="Small image"
              size="sm"
              variant="rounded"
            />
            <p className="text-sm mt-2">Small</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop"
              alt="Medium image"
              size="md"
              variant="rounded"
            />
            <p className="text-sm mt-2">Medium</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
              alt="Large image"
              size="lg"
              variant="rounded"
            />
            <p className="text-sm mt-2">Large</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
              alt="Extra large image"
              size="xl"
              variant="rounded"
            />
            <p className="text-sm mt-2">Extra Large</p>
          </div>
        </div>
      </div>

      {/* Error Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Error Handling Test</h2>
        <div className="flex gap-4 items-center">
          <div className="text-center">
            <Image
              src="https://invalid-url.com/image.jpg"
              alt="Broken image"
              size="lg"
              variant="rounded"
            />
            <p className="text-sm mt-2">Broken Image</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://invalid-url.com/image.jpg"
              alt="Broken image with fallback"
              size="lg"
              variant="rounded"
              fallbackSrc="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop"
            />
            <p className="text-sm mt-2">With Fallback</p>
          </div>
        </div>
      </div>

      {/* Gallery Test */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Gallery Test</h2>
        <div className="text-center">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop"
            alt="Gallery test"
            size="full"
            className="w-full h-64"
            showPreview={true}
            previewTitle="Test Gallery"
            previewDescription="Click to open gallery"
          />
          <p className="text-sm mt-2">Click to open gallery preview</p>
        </div>
      </div>

      {/* Debug Info */}
      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Debug Information:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• If you see loading spinners, images are loading</li>
          <li>• If you see error placeholders, error handling is working</li>
          <li>• If you see images, everything is working correctly</li>
          <li>• Check browser console for any error messages</li>
        </ul>
      </div>
    </div>
  );
}

export default ImageTest;
