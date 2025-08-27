import React, { useState } from "react";
import { SpeedDial, type SpeedDialAction } from "./speedDial";
import { 
  FaEdit, 
  FaTrash, 
  FaShare
} from "react-icons/fa";

export const SpeedDialExamples = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: SpeedDialAction[] = [
    {
      id: "edit",
      icon: <FaEdit />,
      label: "Edit",
      tooltip: "Edit item",
      onClick: () => console.log("Edit clicked"),
    },
    {
      id: "delete",
      icon: <FaTrash />,
      label: "Delete",
      tooltip: "Delete item",
      onClick: () => console.log("Delete clicked"),
    },
    {
      id: "share",
      icon: <FaShare />,
      label: "Share",
      tooltip: "Share item",
      onClick: () => console.log("Share clicked"),
    },
  ];

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">SpeedDial Examples</h1>

      {/* Test Section - Debug Positioning */}
      <div className="border-2 border-red-300 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-red-700 mb-4">🔧 Test Section - Check Positioning</h2>
        <p className="text-red-600 mb-4">Click each SpeedDial to test if actions appear correctly. Bottom positions with up direction should work properly now!</p>
        
        <div className="grid grid-cols-2 gap-8">
          {/* Left Side Test */}
          <div className="border border-blue-300 p-4 rounded">
            <h3 className="font-medium text-blue-700 mb-2">Bottom-Left + Up Direction</h3>
            <p className="text-blue-600 text-sm mb-2">Actions should expand upward from bottom-left</p>
            <SpeedDial
              actions={actions}
              position="bottom-left"
              direction="up"
              colorScheme="primary"
              size="md"
            />
          </div>
          
          {/* Right Side Test */}
          <div className="border border-green-300 p-4 rounded">
            <h3 className="font-medium text-green-700 mb-2">Bottom-Right + Up Direction</h3>
            <p className="text-green-600 text-sm mb-2">Actions should expand upward from bottom-right</p>
            <SpeedDial
              actions={actions}
              position="bottom-right"
              direction="up"
              colorScheme="success"
              size="md"
            />
          </div>
        </div>
      </div>

      {/* Outside Click Test */}
      <div className="border-2 border-purple-300 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-purple-700 mb-4">🧪 Outside Click Test</h2>
        <p className="text-purple-600 mb-4">Test the outside click functionality. Open a SpeedDial, then click outside to close it!</p>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-purple-700 mb-2">Test Outside Click</h3>
            <p className="text-purple-600 text-sm mb-2">Click the SpeedDial, then click anywhere outside to close it</p>
            <SpeedDial
              actions={actions}
              position="bottom-right"
              direction="up"
              colorScheme="secondary"
              size="md"
              closeOnOutsideClick={true}
            />
          </div>
          
          <div>
            <h3 className="font-medium text-purple-700 mb-2">No Outside Click</h3>
            <p className="text-purple-600 text-sm mb-2">This one won't close on outside click</p>
            <SpeedDial
              actions={actions}
              position="bottom-left"
              direction="up"
              colorScheme="secondary"
              size="md"
              closeOnOutsideClick={true}
            />
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-300">
        <h2 className="text-lg font-semibold text-yellow-800 mb-2">🐛 Debug Information</h2>
        <p className="text-yellow-700 text-sm mb-2">
          <strong>Fixed:</strong> Bottom positions with up direction now have proper positioning.
        </p>
        <p className="text-yellow-700 text-sm mb-2">
          <strong>Outside Click Debug:</strong> Check the browser console for "Outside click detected, closing SpeedDial" messages.
        </p>
        <p className="text-yellow-700 text-sm mb-2">
          <strong>Working Combinations:</strong>
        </p>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• <code>position="bottom-left" direction="up"</code> → Actions expand up from bottom-left ✅</li>
          <li>• <code>position="bottom-right" direction="up"</code> → Actions expand up from bottom-right ✅</li>
          <li>• <code>position="bottom-left" direction="right"</code> → Actions expand right from bottom-left ✅</li>
          <li>• <code>position="bottom-right" direction="left"</code> → Actions expand left from bottom-right ✅</li>
          <li>• <code>position="top-left" direction="down"</code> → Actions expand down from top-left ✅</li>
          <li>• <code>position="top-right" direction="down"</code> → Actions expand down from top-right ✅</li>
        </ul>
        <p className="text-yellow-700 text-sm mt-2">
          <strong>Troubleshooting:</strong> If outside click isn't working, check that <code>closeOnOutsideClick={true}</code> is set.
        </p>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Instructions</h2>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• Click the SpeedDial buttons to open them</li>
          <li>• Left-side SpeedDials auto-expand right to prevent cutoff</li>
          <li>• Right-side SpeedDials auto-expand left to prevent cutoff</li>
          <li>• The 'direction' prop is overridden for left/right positions</li>
          <li>• Try clicking outside to close (should work on both)</li>
          <li>• Hover over actions to see labels</li>
        </ul>
      </div>

      {/* Basic SpeedDial (Outside Click Enabled) */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic SpeedDial (Outside Click Enabled)</h2>
        <SpeedDial
          actions={actions}
          position="bottom-right"
          direction="up"
          colorScheme="primary"
        />
      </div>

      {/* SpeedDial (No Outside Click) */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">SpeedDial (No Outside Click)</h2>
        <SpeedDial
          actions={actions}
          position="bottom-left"
          direction="up"
          colorScheme="success"
          closeOnOutsideClick={true}
        />
      </div>

      {/* Controlled SpeedDial */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Controlled SpeedDial</h2>
        <div className="space-y-4">
          <SpeedDial
            actions={actions}
            controlled={true}
            open={isOpen}
            onOpenChange={setIsOpen}
            closeOnActionClick={false}
            position="center"
            direction="right"
            colorScheme="info"
          />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {isOpen ? "Close" : "Open"} SpeedDial
          </button>
        </div>
      </div>

      {/* Different Positions */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Different Positions</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Top-left + Down Direction</h3>
            <p className="text-gray-600 text-sm mb-2">Actions expand downward from top-left</p>
            <SpeedDial
              actions={actions}
              position="top-left"
              direction="down"
              colorScheme="success"
              size="sm"
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Top-right + Down Direction</h3>
            <p className="text-gray-600 text-sm mb-2">Actions expand downward from top-right</p>
            <SpeedDial
              actions={actions}
              position="top-right"
              direction="down"
              colorScheme="error"
              size="sm"
            />
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Different Sizes</h2>
        <div className="flex space-x-8">
          {/* <div>
            <h3 className="font-medium text-gray-700 mb-2">Small</h3>
            <SpeedDial actions={actions} size="sm" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Medium</h3>
            <SpeedDial actions={actions} size="md" />
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Large</h3>
            <SpeedDial actions={actions} size="lg" />
          </div> */}
        </div>
      </div>

      {/* Different Color Schemes */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Different Color Schemes</h2>
        <div className="grid grid-cols-3 gap-6">
        {/*   <SpeedDial actions={actions} colorScheme="primary" />
          <SpeedDial actions={actions} colorScheme="success" />
          <SpeedDial actions={actions} colorScheme="error" />
          <SpeedDial actions={actions} colorScheme="warning" />
          <SpeedDial actions={actions} colorScheme="info" />
          <SpeedDial actions={actions} colorScheme="secondary" /> */}
        </div>
      </div>

      {/* Custom Main Icon */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Custom Main Icon</h2>
       {/*  <SpeedDial
          actions={actions}
          mainIcon={<FaHeart className="text-white" />}
          colorScheme="error"
          size="lg"
        /> */}
      </div>

      {/* No Labels (Tooltips Only) */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">No Labels (Tooltips Only)</h2>
     {/*    <SpeedDial
          actions={actions}
          showLabels={false}
          showTooltips={true}
          size="sm"
        /> */}
      </div>
    </div>
  );
};
