import { Clipboard } from "../clipboard";

export const ClipboardExamples = () => {
  const basicText = "Hello, World!";
  const codeText = `function greet(name) {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;
  const urlText = "https://example.com";
  const emailText = "contact@example.com";

  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Clipboard Button Examples
        </h1>

        {/* Basic Usage */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Basic Usage with Toast
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Text to copy:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{basicText}</span>
              <Clipboard text={basicText} />
            </div>
            <p className="text-sm text-gray-500">
              Click the button to see the toast notification appear!
            </p>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Sizes
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Small" size="sm" />
            <Clipboard text="Medium (default)" size="md" />
            <Clipboard text="Large" size="lg" />
            <Clipboard text="Icon" size="icon" showText={false} />
          </div>
        </section>

        {/* Different Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Variants
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Clipboard text="Contained" variant="contained" />
            <Clipboard text="Outlined" variant="outlined" />
            <Clipboard text="Text" variant="text" />
          </div>
        </section>

        {/* Different Colors */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Colors
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Clipboard text="Primary" color="primary" />
            <Clipboard text="Secondary" color="secondary" />
            <Clipboard text="Success" color="success" />
            <Clipboard text="Error" color="error" />
            <Clipboard text="Warning" color="warning" />
            <Clipboard text="Info" color="info" />
          </div>
        </section>

        {/* Code Example */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Code Example
          </h2>
          <div className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
              <pre>{codeText}</pre>
            </div>
            <Clipboard 
              text={codeText} 
              copyText="Copy Code"
              copiedText="Code Copied!"
            />
          </div>
        </section>

        {/* URL and Email */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            URL and Email
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">URL:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{urlText}</span>
              <Clipboard text={urlText} copyText="Copy Link" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{emailText}</span>
              <Clipboard text={emailText} copyText="Copy Email" />
            </div>
          </div>
        </section>

        {/* Custom Text */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Custom Text
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard 
              text="Custom copy text" 
              copyText="📋 Copy This"
              copiedText="✅ Copied!"
            />
            <Clipboard 
              text="Another custom text" 
              copyText="Click to Copy"
              copiedText="Done!"
            />
          </div>
        </section>

        {/* Icon Only */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Icon Only
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Icon only button" showText={false} />
            <Clipboard text="Icon only outlined" showText={false} variant="outlined" />
            <Clipboard text="Icon only filled" showText={false} variant="text" />
          </div>
        </section>

        {/* Custom Children */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Custom Children
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Custom content">
              <span>🚀 Copy to Clipboard</span>
            </Clipboard>
            <Clipboard text="Another custom">
              <span>📝 Copy Text</span>
            </Clipboard>
          </div>
        </section>

        {/* Disabled State */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Disabled State
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Disabled button" disabled={true} />
            <Clipboard text="" disabled={true} />
          </div>
        </section>

        {/* Toast Positions */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Toast Positions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Top Positions</h3>
              <div className="flex items-center gap-4">
                <Clipboard text="Top" toastPosition="top" />
                <Clipboard text="Top Left" toastPosition="top-left" />
                <Clipboard text="Top Right" toastPosition="top-right" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Bottom Positions</h3>
              <div className="flex items-center gap-4">
                <Clipboard text="Bottom" toastPosition="bottom" />
                <Clipboard text="Bottom Left" toastPosition="bottom-left" />
                <Clipboard text="Bottom Right" toastPosition="bottom-right" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Side Positions</h3>
              <div className="flex items-center gap-4">
                <Clipboard text="Left" toastPosition="left" />
                <Clipboard text="Right" toastPosition="right" />
              </div>
            </div>
          </div>
        </section>

        {/* Custom Toast Duration */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Custom Toast Duration
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard 
              text="Quick toast (1s)" 
              toastDuration={1000}
              copiedText="Quick!"
            />
            <Clipboard 
              text="Long toast (5s)" 
              toastDuration={5000}
              copiedText="This stays longer!"
            />
          </div>
        </section>

        {/* No Toast */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            No Toast
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard 
              text="No toast notification" 
              showToast={false}
            />
            <Clipboard 
              text="Button changes only" 
              showToast={false}
              variant="outlined"
            />
          </div>
        </section>

        {/* Rounded Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Rounded Variants
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <Clipboard text="Default" rounded="default" />
            <Clipboard text="Full" rounded="full" />
            <Clipboard text="Large" rounded="lg" />
            <Clipboard text="Extra Large" rounded="xl" />
            <Clipboard text="None" rounded="none" />
          </div>
        </section>

        {/* Full Width */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Full Width
          </h2>
          <Clipboard 
            text="This button takes the full width of its container" 
            fullWidth={true}
          />
        </section>
      </div>
    </div>
  );
};
