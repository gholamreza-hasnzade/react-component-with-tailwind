import { Dialog, ConfirmDialog, AlertDialog } from "./dialog";
import { useDialog } from "./useDialog";

export const DialogExample = () => {
  const basicDialog = useDialog();
  const formDialog = useDialog();
  const confirmDialog = useDialog();
  const alertDialog = useDialog();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Dialog Component Examples
        </h1>
        <p className="text-gray-600">
          Improved dialog with better sizing and responsive design
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Basic Dialog */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Basic Dialog</h2>
          <button
            onClick={basicDialog.open}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Open Basic Dialog
          </button>
          <Dialog
            {...basicDialog.dialogProps}
            title="Basic Dialog"
            position="bottom-left"
            mobileFullScreen={false}
            tabletFullScreen={false}
          >
            <div className="space-y-4">
              <p className="text-gray-600">
                This dialog now has better sizing! It won't take up the entire
                screen height by default.
              </p>
              <p className="text-gray-600">Key improvements:</p>
              <ul className="text-sm text-gray-600 space-y-1 ml-4">
                <li>• Default height is now 80-85% of viewport height</li>
                <li>• Width is 90% of viewport width on mobile</li>
                <li>• Content scrolls if it's too long</li>
                <li>• More usable on all screen sizes</li>
              </ul>
            </div>
          </Dialog>
        </div>

        {/* Form Dialog */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Form Dialog</h2>
          <button
            onClick={formDialog.open}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Open Form Dialog
          </button>
          <Dialog
            {...formDialog.dialogProps}
            title="User Registration"
            size="lg"
          >
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter your message"
                />
              </div>
            </form>
            <div className="flex items-center justify-end gap-3 pt-4">
              <button
                onClick={formDialog.close}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
                Submit
              </button>
            </div>
          </Dialog>
        </div>

        {/* Confirm Dialog */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Confirm Dialog
          </h2>
          <button
            onClick={confirmDialog.open}
            className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Delete Item
          </button>
          <ConfirmDialog
            {...confirmDialog.dialogProps}
            title="Delete Confirmation"
            message="Are you sure you want to delete this item? This action cannot be undone."
            confirmText="Delete Permanently"
            cancelText="Cancel"
            variant="error"
            onConfirm={() => alert("Item deleted!")}
          />
        </div>

        {/* Alert Dialog */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">Alert Dialog</h2>
          <button
            onClick={alertDialog.open}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Show Alert
          </button>
          <AlertDialog
            {...alertDialog.dialogProps}
            title="Information"
            message="This is an informational alert message. The dialog now has better sizing and won't take up the entire screen."
            variant="info"
          />
        </div>

        {/* Position Examples */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800">
            Position Examples
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                // You can test different positions here
                console.log("Use position='left' for left side positioning");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              Left Position
            </button>
            <button
              onClick={() => {
                console.log("Use position='right' for right side positioning");
              }}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 text-sm"
            >
              Right Position
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Left/Right positions now have proper spacing and responsive behavior
          </p>
        </div>
      </div>

      {/* Sizing Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Dialog Sizing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-2">Size Options:</h4>
            <ul className="space-y-1">
              <li>
                • <strong>sm:</strong> max-w-sm, 90vw width, 80vh max height
              </li>
              <li>
                • <strong>md:</strong> max-w-md, 90vw width, 80vh max height
              </li>
              <li>
                • <strong>lg:</strong> max-w-lg, 90vw width, 85vh max height
              </li>
              <li>
                • <strong>xl:</strong> max-w-xl, 90vw width, 85vh max height
              </li>
              <li>
                • <strong>full:</strong> 95vw width, 90vh height
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-2">
              Responsive Features:
            </h4>
            <ul className="space-y-1">
              <li>• Content scrolls when needed</li>
              <li>• Proper mobile sizing</li>
              <li>• Flexible height management</li>
              <li>• Better user experience</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
