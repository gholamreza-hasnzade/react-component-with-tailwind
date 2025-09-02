import React from "react";
import { Image, GalleryImage } from "./image";

export function ImageGalleryExample() {
  // Sample gallery data
  const galleries = {
    nature: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
    ],
    people: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
    ],
    architecture: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&h=600&fit=crop",
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Image Gallery Examples</h1>
        <p className="text-gray-600 text-lg">
          Comprehensive gallery showcase with different layouts and features
        </p>
      </div>

      {/* Single Image with Preview */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Single Image with Preview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"
              alt="Mountain landscape"
              size="full"
              className="w-full h-64"
              showPreview={true}
              previewTitle="Mountain Landscape"
              previewDescription="Beautiful mountain view with clear skies"
            />
            <p className="text-sm text-gray-600 mt-2">Click to preview</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
              alt="Forest path"
              size="full"
              className="w-full h-64"
              showPreview={true}
              previewTitle="Forest Path"
              previewDescription="Peaceful forest trail through the woods"
            />
            <p className="text-sm text-gray-600 mt-2">Click to preview</p>
          </div>
          
          <div className="text-center">
            <Image
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop"
              alt="Ocean waves"
              size="full"
              className="w-full h-64"
              showPreview={true}
              previewTitle="Ocean Waves"
              previewDescription="Calming ocean waves at sunset"
            />
            <p className="text-sm text-gray-600 mt-2">Click to preview</p>
          </div>
        </div>
      </section>

      {/* Nature Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Nature Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleries.nature.map((image, index) => (
            <div key={index} className="text-center">
              <GalleryImage
                src={image}
                alt={`Nature image ${index + 1}`}
                size="full"
                className="w-full h-32"
                gallery={galleries.nature}
                previewTitle="Nature Gallery"
                previewDescription={`Nature photo ${index + 1} of ${galleries.nature.length}`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Click any image to open the full gallery with navigation
        </p>
      </section>

      {/* People Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">People Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleries.people.map((image, index) => (
            <div key={index} className="text-center">
              <GalleryImage
                src={image}
                alt={`Person ${index + 1}`}
                size="full"
                className="w-full h-32"
                gallery={galleries.people}
                previewTitle="People Gallery"
                previewDescription={`Portrait ${index + 1} of ${galleries.people.length}`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Navigate through the gallery with arrow keys or buttons
        </p>
      </section>

      {/* Architecture Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Architecture Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.architecture.map((image, index) => (
            <div key={index} className="text-center">
              <GalleryImage
                src={image}
                alt={`Architecture ${index + 1}`}
                size="full"
                className="w-full h-48"
                gallery={galleries.architecture}
                previewTitle="Architecture Gallery"
                previewDescription={`Building ${index + 1} of ${galleries.architecture.length}`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Use spacebar to zoom in/out, ESC to close
        </p>
      </section>

      {/* Mixed Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Mixed Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ...galleries.nature.slice(0, 2),
            ...galleries.people.slice(0, 2),
            ...galleries.architecture.slice(0, 2),
            ...galleries.nature.slice(2, 4),
          ].map((image, index) => (
            <div key={index} className="text-center">
              <GalleryImage
                src={image}
                alt={`Mixed gallery image ${index + 1}`}
                size="full"
                className="w-full h-40"
                gallery={[
                  ...galleries.nature.slice(0, 2),
                  ...galleries.people.slice(0, 2),
                  ...galleries.architecture.slice(0, 2),
                  ...galleries.nature.slice(2, 4),
                ]}
                previewTitle="Mixed Gallery"
                previewDescription={`Mixed content ${index + 1} of 8`}
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Mixed content from different categories
        </p>
      </section>

      {/* Large Hero Gallery */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Hero Gallery</h2>
        <div className="text-center">
          <GalleryImage
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop"
            alt="Hero landscape"
            size="full"
            className="w-full h-96"
            gallery={[
              "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
              "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=600&fit=crop",
              "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=600&fit=crop",
              "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&h=600&fit=crop",
            ]}
            previewTitle="Hero Gallery"
            previewDescription="Stunning landscape photography"
          />
          <p className="text-sm text-gray-600 mt-2">
            Large hero image with full gallery navigation
          </p>
        </div>
      </section>

      {/* Gallery Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Gallery Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🖱️ Mouse Controls</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Click image to open gallery</li>
              <li>• Click navigation buttons</li>
              <li>• Click thumbnails to jump</li>
              <li>• Click image to zoom</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">⌨️ Keyboard Controls</h3>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• ESC - Close gallery</li>
              <li>• ← → Arrow keys - Navigate</li>
              <li>• Spacebar - Toggle zoom</li>
              <li>• Number keys - Jump to image</li>
            </ul>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-800 mb-2">📱 Touch Controls</h3>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Tap to open gallery</li>
              <li>• Swipe to navigate</li>
              <li>• Pinch to zoom</li>
              <li>• Tap outside to close</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Code Examples</h2>
        <div className="bg-gray-100 p-6 rounded-lg">
          <pre className="text-sm overflow-x-auto">
            {`// Single image with preview
<Image
  src="/image.jpg"
  alt="Description"
  showPreview={true}
  previewTitle="Image Title"
  previewDescription="Image description"
/>

// Gallery with multiple images
<GalleryImage
  src="/image1.jpg"
  alt="Gallery image"
  gallery={[
    "/image1.jpg",
    "/image2.jpg",
    "/image3.jpg"
  ]}
  previewTitle="Photo Gallery"
  previewDescription="Click to view full gallery"
/>

// Custom gallery with all features
<GalleryImage
  src="/hero.jpg"
  alt="Hero image"
  size="full"
  className="w-full h-96"
  gallery={imageArray}
  previewTitle="Custom Gallery"
  previewDescription="Full featured gallery"
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
}

export default ImageGalleryExample;
