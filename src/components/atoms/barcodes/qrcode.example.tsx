import { useState } from "react";
import { QRCode } from "./qrcode";

export const QRCodeExamples = () => {
  const [qrValue, setQrValue] = useState("https://example.com");
  const [qrWidth, setQrWidth] = useState(200);
  const [qrHeight, setQrHeight] = useState(200);
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  return (
    <div className="p-8 space-y-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">QR Code Component Examples</h1>

      {/* Controls */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Controls</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              QR Code Value
            </label>
            <input
              type="text"
              value={qrValue}
              onChange={(e) => setQrValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter QR code value"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Width
            </label>
            <input
              type="number"
              value={qrWidth}
              onChange={(e) => setQrWidth(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="100"
              max="500"
              title="Set QR code width"
              aria-label="QR code width in pixels"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Height
            </label>
            <input
              type="number"
              value={qrHeight}
              onChange={(e) => setQrHeight(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="100"
              max="500"
              title="Set QR code height"
              aria-label="QR code height in pixels"
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
        </div>
      </section>

      {/* Basic QR Code */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basic QR Code</h2>
        <div className="flex justify-center">
          <QRCode
            value={qrValue}
            width={qrWidth}
            height={qrHeight}
            foregroundColor={foregroundColor}
            backgroundColor={backgroundColor}
          />
        </div>
      </section>

      {/* Different Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Different Sizes</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Small</h3>
            <QRCode
              value="https://example.com"
              size="sm"
              width={150}
              height={150}
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Medium</h3>
            <QRCode
              value="https://example.com"
              size="md"
              width={200}
              height={200}
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Large</h3>
            <QRCode
              value="https://example.com"
              size="lg"
              width={250}
              height={250}
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Extra Large</h3>
            <QRCode
              value="https://example.com"
              size="xl"
              width={300}
              height={300}
            />
          </div>
        </div>
      </section>

      {/* Sample QR Codes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Sample QR Codes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Website URL</h3>
            <QRCode
              value="https://www.google.com"
              width={200}
              height={200}
              foregroundColor="#1f2937"
              backgroundColor="#f9fafb"
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Email</h3>
            <QRCode
              value="mailto:contact@example.com"
              width={200}
              height={200}
              foregroundColor="#059669"
              backgroundColor="#ecfdf5"
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Phone Number</h3>
            <QRCode
              value="tel:+1234567890"
              width={200}
              height={200}
              foregroundColor="#dc2626"
              backgroundColor="#fef2f2"
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">WiFi Network</h3>
            <QRCode
              value="WIFI:T:WPA;S:MyNetwork;P:mypassword123;H:false;;"
              width={200}
              height={200}
              foregroundColor="#7c3aed"
              backgroundColor="#f3f4f6"
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Text Message</h3>
            <QRCode
              value="Hello, this is a test message!"
              width={200}
              height={200}
              foregroundColor="#ea580c"
              backgroundColor="#fff7ed"
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Geographic Location</h3>
            <QRCode
              value="geo:40.7128,-74.0060"
              width={200}
              height={200}
              foregroundColor="#0891b2"
              backgroundColor="#f0f9ff"
            />
          </div>
        </div>
      </section>

      {/* Custom Colors */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Custom Color Schemes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Dark Theme</h3>
            <QRCode
              value="https://darktheme.com"
              width={200}
              height={200}
              foregroundColor="#ffffff"
              backgroundColor="#1f2937"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Blue Theme</h3>
            <QRCode
              value="https://bluetheme.com"
              width={200}
              height={200}
              foregroundColor="#1e40af"
              backgroundColor="#dbeafe"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Green Theme</h3>
            <QRCode
              value="https://greentheme.com"
              width={200}
              height={200}
              foregroundColor="#059669"
              backgroundColor="#d1fae5"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Purple Theme</h3>
            <QRCode
              value="https://purpletheme.com"
              width={200}
              height={200}
              foregroundColor="#7c3aed"
              backgroundColor="#f3f4f6"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Red Theme</h3>
            <QRCode
              value="https://redtheme.com"
              width={200}
              height={200}
              foregroundColor="#dc2626"
              backgroundColor="#fef2f2"
            />
          </div>
          
          <div className="text-center">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Orange Theme</h3>
            <QRCode
              value="https://orangetheme.com"
              width={200}
              height={200}
              foregroundColor="#ea580c"
              backgroundColor="#fff7ed"
            />
          </div>
        </div>
      </section>

      {/* Business Card QR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Business Card QR Code</h2>
        <div className="flex justify-center">
          <div className="text-center p-6 border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">John Doe</h3>
            <p className="text-sm text-gray-600 mb-2">Software Engineer</p>
            <p className="text-sm text-gray-600 mb-4">Tech Company Inc.</p>
            <QRCode
              value="BEGIN:VCARD\nVERSION:3.0\nFN:John Doe\nORG:Tech Company Inc.\nTITLE:Software Engineer\nTEL:+1234567890\nEMAIL:john.doe@techcompany.com\nEND:VCARD"
              width={180}
              height={180}
              foregroundColor="#1e40af"
              backgroundColor="#ffffff"
            />
          </div>
        </div>
      </section>

      {/* Error Handling */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Error Handling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Empty Value</h3>
            <QRCode
              value=""
              width={200}
              height={200}
            />
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Very Long Value</h3>
            <QRCode
              value="This is a very long text that exceeds the recommended length for QR codes. QR codes work best with shorter text, URLs, or structured data. When you have very long content, it can make the QR code more complex and harder to scan. It's generally recommended to keep QR code content concise and focused."
              width={200}
              height={200}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default QRCodeExamples;
