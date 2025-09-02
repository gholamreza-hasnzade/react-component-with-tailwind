import React from "react";
import { Image } from "./image";

export function ImageDebug() {
  const [imageSrc, setImageSrc] = React.useState<string>("");
  const [testUrl, setTestUrl] = React.useState<string>("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop");

  const handleImageLoad = () => {
    console.log("✅ Image loaded successfully!");
  };

  const handleImageError = (error: Error) => {
    console.log("❌ Image error:", error.message);
  };

  const handleLoadStart = () => {
    console.log("🔄 Image load started");
  };

  const handleLoadEnd = () => {
    console.log("🏁 Image load ended");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Image Debug Component</h1>
      
      {/* URL Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">Test Image URL:</label>
        <input
          type="text"
          value={testUrl}
          onChange={(e) => setTestUrl(e.target.value)}
          className="w-full p-2 border rounded-md"
          placeholder="Enter image URL"
        />
        <button
          onClick={() => setImageSrc(testUrl)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Load Image
        </button>
      </div>

      {/* Image Display */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Image Component:</h2>
        <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt="Debug image"
              size="lg"
              onLoad={handleImageLoad}
              onError={handleImageError}
              onLoadStart={handleLoadStart}
              onLoadEnd={handleLoadEnd}
            />
          ) : (
            <div className="text-gray-500 text-center py-8">
              Enter a URL and click "Load Image" to test
            </div>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <div className="space-y-2">
        <h3 className="font-semibold">Debug Info:</h3>
        <div className="bg-gray-100 p-3 rounded-md text-sm">
          <p><strong>Current URL:</strong> {imageSrc || "None"}</p>
          <p><strong>Test URL:</strong> {testUrl}</p>
        </div>
      </div>

      {/* Quick Test URLs */}
      <div className="space-y-2">
        <h3 className="font-semibold">Quick Test URLs:</h3>
        <div className="space-y-2">
          <button
            onClick={() => setImageSrc("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop")}
            className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            ✅ Working Image (Unsplash)
          </button>
          <button
            onClick={() => setImageSrc("https://invalid-url.com/image.jpg")}
            className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            ❌ Broken Image (Error Test)
          </button>
          <button
            onClick={() => setImageSrc("")}
            className="block w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            🚫 Empty URL (No Image)
          </button>
        </div>
      </div>

      {/* Console Instructions */}
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
        <h3 className="font-semibold text-yellow-800 mb-2">Debug Instructions:</h3>
        <ol className="text-sm text-yellow-700 space-y-1">
          <li>1. Open your browser's Developer Tools (F12)</li>
          <li>2. Go to the Console tab</li>
          <li>3. Click the test buttons above</li>
          <li>4. Watch the console logs to see what's happening</li>
          <li>5. Check the Network tab to see if images are being requested</li>
        </ol>
      </div>
    </div>
  );
}

export default ImageDebug;
