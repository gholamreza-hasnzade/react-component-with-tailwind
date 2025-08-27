import { useState } from "react";
import { Barcode } from "./barcodes";

export const BarcodeExamples = () => {
  const [barcodeValue, setBarcodeValue] = useState("123456789");
  const [barcodeWidth, setBarcodeWidth] = useState(300);
  const [barcodeHeight, setBarcodeHeight] = useState(100);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");
  const [showText, setShowText] = useState(true);

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Barcode Component Examples
      </h1>

      {/* Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barcode Value
            </label>
            <input
              type="text"
              value={barcodeValue}
              onChange={(e) => setBarcodeValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter barcode value"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <input
              type="number"
              value={barcodeWidth}
              onChange={(e) => setBarcodeWidth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="100"
              max="800"
              title="Set barcode width"
              aria-label="Barcode width in pixels"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="number"
              value={barcodeHeight}
              onChange={(e) => setBarcodeHeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="50"
              max="300"
              title="Set barcode height"
              aria-label="Barcode height in pixels"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground Color
            </label>
            <input
              type="color"
              value={foregroundColor}
              onChange={(e) => setForegroundColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
              title="Select foreground color"
              aria-label="Foreground color picker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-md cursor-pointer"
              title="Select background color"
              aria-label="Background color picker"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="showText"
              checked={showText}
              onChange={(e) => setShowText(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="showText"
              className="ml-2 block text-sm text-gray-700"
            >
              Show Text
            </label>
          </div>
        </div>
      </section>

      {/* Basic Barcode */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basic Barcode</h2>
        <div className="flex justify-center">
          <Barcode
            value={barcodeValue}
            width={barcodeWidth}
            height={barcodeHeight}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
            showText={showText}
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Different Sizes
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Small</h3>
            <Barcode value="12345" size="sm" width={200} height={80} />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Medium</h3>
            <Barcode value="12345" size="md" width={250} height={100} />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Large</h3>
            <Barcode value="12345" size="lg" width={300} height={120} />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Extra Large
            </h3>
            <Barcode value="12345" size="xl" width={350} height={140} />
          </div>
        </div>
      </section>

      {/* Sample Barcodes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Sample Barcodes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Product Code
            </h3>
            <Barcode
              value="1234567890123"
              width={250}
              height={100}
              foregroundColor="#1f2937"
              backgroundColor="#f9fafb"
            />
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Serial Number
            </h3>
            <Barcode
              value="SN2024001"
              width={250}
              height={100}
              foregroundColor="#059669"
              backgroundColor="#ecfdf5"
            />
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Order ID</h3>
            <Barcode
              value="ORD-2024-001"
              width={250}
              height={100}
              foregroundColor="#dc2626"
              backgroundColor="#fef2f2"
            />
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">ISBN</h3>
            <Barcode
              value="9780123456789"
              width={250}
              height={100}
              foregroundColor="#7c3aed"
              backgroundColor="#f3f4f6"
            />
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Tracking Number
            </h3>
            <Barcode
              value="TRK123456789"
              width={250}
              height={100}
              foregroundColor="#ea580c"
              backgroundColor="#fff7ed"
            />
          </div>

          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Customer ID
            </h3>
            <Barcode
              value="CUST001"
              width={250}
              height={100}
              foregroundColor="#0891b2"
              backgroundColor="#f0f9ff"
            />
          </div>
        </div>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Custom Color Schemes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Dark Theme
            </h3>
            <Barcode
              value="DARK123"
              width={250}
              height={100}
              foregroundColor="#ffffff"
              backgroundColor="#1f2937"
            />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Blue Theme
            </h3>
            <Barcode
              value="BLUE456"
              width={250}
              height={100}
              foregroundColor="#1e40af"
              backgroundColor="#dbeafe"
            />
          </div>

          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">
              Green Theme
            </h3>
            <Barcode
              value="GREEN789"
              width={250}
              height={100}
              foregroundColor="#059669"
              backgroundColor="#d1fae5"
            />
          </div>
        </div>
      </section>

      {/* No Text Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Without Text Labels
        </h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Barcode
            value="NO-TEXT-123"
            width={200}
            height={80}
            showText={false}
          />
          <Barcode
            value="NO-TEXT-456"
            width={200}
            height={80}
            showText={false}
            foregroundColor="#dc2626"
          />
          <Barcode
            value="NO-TEXT-789"
            width={200}
            height={80}
            showText={false}
            foregroundColor="#059669"
          />
        </div>
      </section>
    </div>
  );
};

export default BarcodeExamples;
