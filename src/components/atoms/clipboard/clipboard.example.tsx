import { Clipboard } from "./clipboard";

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
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {basicText}
              </span>
              <Clipboard text={basicText} toastPosition="left" />
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
            <Clipboard text="Small button" size="sm" />
            <Clipboard text="Medium button (default)" size="md" />
            <Clipboard text="Large button" size="lg" />
          </div>
        </section>

        {/* Different Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Variants
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Default variant" variant="default" />
            <Clipboard text="Outlined variant" variant="outlined" />
            <Clipboard text="Filled variant" variant="filled" />
            <Clipboard text="Ghost variant" variant="ghost" />
          </div>
        </section>

        {/* Different Colors */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Different Colors
          </h2>
          <div className="flex items-center gap-4">
            <Clipboard text="Primary color" color="primary" />
            <Clipboard text="Secondary color" color="secondary" />
            <Clipboard text="Success color" color="success" />
            <Clipboard text="Error color" color="error" />
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
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {urlText}
              </span>
              <Clipboard text={urlText} copyText="Copy Link" />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">Email:</span>
              <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                {emailText}
              </span>
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
            <Clipboard
              text="Icon only outlined"
              showText={false}
              variant="outlined"
            />
            <Clipboard
              text="Icon only filled"
              showText={false}
              variant="filled"
            />
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
