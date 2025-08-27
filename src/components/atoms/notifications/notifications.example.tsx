import React from "react";
import { NotificationSystem } from "./notifications";
import { useNotifications } from "./useNotifications";

export const NotificationsExample = () => {
  const {
    notifications,
    addSuccess,
    addError,
    addWarning,
    addInfo,
    removeNotification,
    clearAll,
  } = useNotifications();

  const handleAddSuccess = () => {
    addSuccess("Success!", "Your action was completed successfully.");
  };

  const handleAddError = () => {
    addError("Error!", "Something went wrong. Please try again.");
  };

  const handleAddWarning = () => {
    addWarning("Warning!", "Please check your input before proceeding.");
  };

  const handleAddInfo = () => {
    addInfo("Information", "Here's some helpful information for you.");
  };

  const handleAddPersistent = () => {
    addInfo("Persistent Notification", "This notification won't auto-dismiss.", {
      persistent: true,
      action: {
        label: "Dismiss",
        onClick: () => console.log("Dismiss clicked"),
      },
    });
  };

  const handleAddWithAction = () => {
    addSuccess("Action Required", "Please confirm your selection.", {
      duration: 10000,
      action: {
        label: "Confirm",
        onClick: () => console.log("Confirmed!"),
      },
    });
  };

  const handleAddCustomDuration = () => {
    addWarning("Custom Duration", "This will auto-dismiss in 2 seconds.", {
      duration: 2000,
    });
  };

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Notification System Examples</h1>

      {/* Notification System */}
      <NotificationSystem
        notifications={notifications}
        onDismiss={removeNotification}
        position="top-right"
        maxNotifications={5}
      />

      {/* Control Buttons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Basic Notifications</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddSuccess}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Add Success
          </button>
          <button
            onClick={handleAddError}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Add Error
          </button>
          <button
            onClick={handleAddWarning}
            className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
          >
            Add Warning
          </button>
          <button
            onClick={handleAddInfo}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Add Info
          </button>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Advanced Features</h2>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleAddPersistent}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
          >
            Add Persistent
          </button>
          <button
            onClick={handleAddWithAction}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
          >
            Add With Action
          </button>
          <button
            onClick={handleAddCustomDuration}
            className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
          >
            Add Custom Duration
          </button>
          <button
            onClick={clearAll}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Features List */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900 mb-4">Features</h2>
        <ul className="text-blue-800 space-y-2">
          <li>✅ <strong>4 Types:</strong> Success, Error, Warning, Info</li>
          <li>✅ <strong>Auto-dismiss:</strong> Configurable duration (default: 5s)</li>
          <li>✅ <strong>Persistent:</strong> Notifications that don't auto-dismiss</li>
          <li>✅ <strong>Actions:</strong> Clickable buttons within notifications</li>
          <li>✅ <strong>Progress Bar:</strong> Visual countdown for auto-dismiss</li>
          <li>✅ <strong>Staggered Animation:</strong> Smooth entrance effects</li>
          <li>✅ <strong>Multiple Positions:</strong> Top, bottom, left, right, center</li>
          <li>✅ <strong>Accessibility:</strong> ARIA labels and screen reader support</li>
          <li>✅ <strong>Responsive:</strong> Works on all screen sizes</li>
          <li>✅ <strong>Customizable:</strong> Colors, icons, and styling</li>
        </ul>
      </div>

      {/* Usage Instructions */}
      <div className="bg-green-50 p-6 rounded-lg border border-green-200">
        <h2 className="text-lg font-semibold text-green-900 mb-4">Usage</h2>
        <div className="text-green-800 space-y-2">
          <p><strong>1. Import the hook:</strong></p>
          <code className="block bg-green-100 p-2 rounded text-sm">
            {`import { useNotifications } from './notifications';`}
          </code>
          
          <p><strong>2. Use in your component:</strong></p>
          <code className="block bg-green-100 p-2 rounded text-sm">
            {`const { addSuccess, addError, addWarning, addInfo } = useNotifications();`}
          </code>
          
          <p><strong>3. Add notifications:</strong></p>
          <code className="block bg-green-100 p-2 rounded text-sm">
            {`addSuccess("Success!", "Operation completed");`}
          </code>
          
          <p><strong>4. Render the system:</strong></p>
          <code className="block bg-green-100 p-2 rounded text-sm">
            {`<NotificationSystem notifications={notifications} onDismiss={removeNotification} />`}
          </code>
        </div>
      </div>
    </div>
  );
};
