import React from "react";
import {
  AlertSuccess,
  AlertError,
  AlertWarning,
  AlertInfo,
} from "./alert";

export function AlertDemo() {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">
        Alert Component Demo
      </h1>

      {/* Quick Examples */}
      <div className="space-y-4">
        <AlertSuccess
          title="Welcome!"
          description="This is a success alert example."
          dismissible
        />

        <AlertError
          title="Error"
          description="This is an error alert example."
        />

        <AlertWarning
          title="Warning"
          description="This is a warning alert example."
        />

        <AlertInfo
          title="Information"
          description="This is an info alert example."
        />

        {/* RTL Example */}
        <AlertSuccess
          title="مرحبا!"
          description="هذا مثال على تنبيه باللغة العربية"
          dir="rtl"
          dismissible
        />
      </div>

      {/* Interactive Demo */}
      <div className="mt-8 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2">Try it yourself:</h3>
        <p className="text-sm text-gray-600 mb-4">
          Copy and paste this code to use the Alert component:
        </p>
        <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
          {`<AlertSuccess
  title="Your Title"
  description="Your description here"
  dismissible
/>`}
        </pre>
      </div>
    </div>
  );
}

export default AlertDemo;
