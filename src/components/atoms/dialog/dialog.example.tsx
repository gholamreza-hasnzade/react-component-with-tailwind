import { Dialog, ConfirmDialog, AlertDialog } from "./dialog";
import { useDialog } from "./useDialog";

export const DialogExample = () => {
  const basicDialog = useDialog();
  const formDialog = useDialog();
  const confirmDialog = useDialog();
  const alertDialog = useDialog();
  
  // Position-specific dialogs
  const centerDialog = useDialog();
  const topDialog = useDialog();
  const bottomDialog = useDialog();
  const leftDialog = useDialog();
  const rightDialog = useDialog();
  const topLeftDialog = useDialog();
  const topRightDialog = useDialog();
  const bottomLeftDialog = useDialog();
  const bottomRightDialog = useDialog();
  const centerLeftDialog = useDialog();
  const centerRightDialog = useDialog();

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dialog Component Examples
        </h1>
        <p className="text-gray-600">
          Comprehensive dialog examples with all positions and variants
        </p>
      </div>

      {/* Basic Dialogs Section */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Dialogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={basicDialog.open}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Basic Dialog
          </button>
          <button
            onClick={formDialog.open}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Form Dialog
          </button>
          <button
            onClick={confirmDialog.open}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Confirm Dialog
          </button>
          <button
            onClick={alertDialog.open}
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Alert Dialog
          </button>
        </div>
      </div>

      {/* Position Examples Section */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Position Examples</h2>
        <p className="text-gray-600 mb-4">Click any button to see the dialog in that specific position:</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button
            onClick={centerDialog.open}
            className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm"
          >
            Center
          </button>
          <button
            onClick={topDialog.open}
            className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
          >
            Top
          </button>
          <button
            onClick={bottomDialog.open}
            className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
          >
            Bottom
          </button>
          <button
            onClick={leftDialog.open}
            className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm"
          >
            Left
          </button>
          <button
            onClick={rightDialog.open}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm"
          >
            Right
          </button>
          <button
            onClick={centerLeftDialog.open}
            className="px-3 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors text-sm"
          >
            Center Left
          </button>
          <button
            onClick={centerRightDialog.open}
            className="px-3 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors text-sm"
          >
            Center Right
          </button>
          <button
            onClick={topLeftDialog.open}
            className="px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors text-sm"
          >
            Top Left
          </button>
          <button
            onClick={topRightDialog.open}
            className="px-3 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors text-sm"
          >
            Top Right
          </button>
          <button
            onClick={bottomLeftDialog.open}
            className="px-3 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors text-sm"
          >
            Bottom Left
          </button>
          <button
            onClick={bottomRightDialog.open}
            className="px-3 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700 transition-colors text-sm"
          >
            Bottom Right
          </button>
        </div>
      </div>

      {/* Size Examples Section */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Size Examples</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => {
              // You can add size-specific dialogs here
              console.log("Small size: max-w-sm, 90vw width, 80vh max height");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Small
          </button>
          <button
            onClick={() => {
              console.log("Medium size: max-w-md, 90vw width, 80vh max height");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Medium
          </button>
          <button
            onClick={() => {
              console.log("Large size: max-w-lg, 90vw width, 85vh max height");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Large
          </button>
          <button
            onClick={() => {
              console.log("Extra Large size: max-w-xl, 90vw width, 85vh max height");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            XL
          </button>
          <button
            onClick={() => {
              console.log("Full size: 95vw width, 90vh height");
            }}
            className="px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors text-sm"
          >
            Full
          </button>
        </div>
      </div>

      {/* Basic Dialog */}
      <Dialog
        {...basicDialog.dialogProps}
        title="Basic Dialog"
        size="md"
        variant="default"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            This is a basic dialog with default settings. It demonstrates the standard
            dialog behavior and styling.
          </p>
          <p className="text-gray-600">
            The dialog now has proper positioning logic and better responsive behavior!
          </p>
        </div>
      </Dialog>

      {/* Form Dialog */}
      <Dialog
        {...formDialog.dialogProps}
        title="User Registration"
        size="lg"
        variant="info"
        showIcon
      >
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
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

      {/* Confirm Dialog */}
      <ConfirmDialog
        {...confirmDialog.dialogProps}
        title="Delete Confirmation"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirmText="Delete Permanently"
        cancelText="Cancel"
        variant="error"
        onConfirm={() => alert("Item deleted!")}
      />

      {/* Alert Dialog */}
      <AlertDialog
        {...alertDialog.dialogProps}
        title="Information"
        message="This is an informational alert message. The dialog now has better sizing and won't take up the entire screen."
        variant="info"
      />

      {/* Position-specific dialogs */}
      <Dialog
        {...centerDialog.dialogProps}
        title="Center Position"
        position="center"
        size="md"
        variant="default"
      >
        <p className="text-gray-600">This dialog is positioned in the center of the screen.</p>
      </Dialog>

      <Dialog
        {...topDialog.dialogProps}
        title="Top Position"
        position="top"
        size="md"
        variant="info"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the top of the screen.</p>
      </Dialog>

      <Dialog
        {...bottomDialog.dialogProps}
        title="Bottom Position"
        position="bottom"
        size="md"
        variant="success"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the bottom of the screen.</p>
      </Dialog>

      <Dialog
        {...leftDialog.dialogProps}
        title="Left Position"
        position="left"
        size="md"
        variant="warning"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned on the left side of the screen.</p>
      </Dialog>

      <Dialog
        {...rightDialog.dialogProps}
        title="Right Position"
        position="right"
        size="md"
        variant="error"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned on the right side of the screen.</p>
      </Dialog>

      <Dialog
        {...topLeftDialog.dialogProps}
        title="Top Left Position"
        position="top-left"
        size="md"
        variant="info"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the top-left corner of the screen.</p>
      </Dialog>

      <Dialog
        {...topRightDialog.dialogProps}
        title="Top Right Position"
        position="top-right"
        size="md"
        variant="success"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the top-right corner of the screen.</p>
      </Dialog>

      <Dialog
        {...bottomLeftDialog.dialogProps}
        title="Bottom Left Position"
        position="bottom-left"
        size="md"
        variant="warning"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the bottom-left corner of the screen.</p>
      </Dialog>

      <Dialog
        {...bottomRightDialog.dialogProps}
        title="Bottom Right Position"
        position="bottom-right"
        size="md"
        variant="error"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned at the bottom-right corner of the screen.</p>
      </Dialog>

      {/* Center Left Dialog */}
      <Dialog
        {...centerLeftDialog.dialogProps}
        title="Center Left Position"
        position="center-left"
        size="md"
        variant="warning"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned on the left side but vertically centered.</p>
      </Dialog>

      {/* Center Right Dialog */}
      <Dialog
        {...centerRightDialog.dialogProps}
        title="Center Right Position"
        position="center-right"
        size="md"
        variant="success"
        showIcon
      >
        <p className="text-gray-600">This dialog is positioned on the right side but vertically centered.</p>
      </Dialog>

      {/* Information Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Dialog Features & Improvements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Fixed Positioning Issues:</h4>
            <ul className="space-y-2">
              <li>✅ <strong>Left:</strong> Now properly positioned on the left side</li>
              <li>✅ <strong>Right:</strong> Now properly positioned on the right side</li>
              <li>✅ <strong>Center-Left:</strong> Left side, vertically centered</li>
              <li>✅ <strong>Center-Right:</strong> Right side, vertically centered</li>
              <li>✅ <strong>Corner positions:</strong> All corner positions now work correctly</li>
              <li>✅ <strong>Responsive behavior:</strong> Better mobile and tablet support</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Size Options:</h4>
            <ul className="space-y-2">
              <li>• <strong>sm:</strong> max-w-sm, 90vw width, 80vh max height</li>
              <li>• <strong>md:</strong> max-w-md, 90vw width, 80vh max height</li>
              <li>• <strong>lg:</strong> max-w-lg, 90vw width, 85vh max height</li>
              <li>• <strong>xl:</strong> max-w-xl, 90vw width, 85vh max height</li>
              <li>• <strong>full:</strong> 95vw width, 90vh height</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
