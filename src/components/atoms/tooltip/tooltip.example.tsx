import React from 'react';
import { Tooltip } from './tooltip';
import { Button } from '../button/button';

export const TooltipExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tooltip Component Test</h1>
        
        {/* Simple Test Tooltips */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="This is a simple tooltip">
              <Button>Hover me for tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the right" position="right">
              <Button variant="outlined">Right tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the bottom" position="bottom">
              <Button variant="outlined" color="success">Bottom tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the left" position="left">
              <Button variant="outlined" color="warning">Left tooltip</Button>
            </Tooltip>
          </div>
        </section>

        {/* Icon Tooltip Test */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Icon Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="Info icon tooltip">
              <span className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                i
              </span>
            </Tooltip>
            
            <Tooltip content="Question mark tooltip">
              <span className="inline-block w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                ?
              </span>
            </Tooltip>
          </div>
        </section>

        {/* Text Tooltip Test */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="This is a helpful hint">
              <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                Click here for help
              </span>
            </Tooltip>
            
            <Tooltip content="Another helpful tooltip">
              <span className="text-green-600 underline cursor-pointer hover:text-green-800">
                More information
              </span>
            </Tooltip>
          </div>
        </section>

        {/* Debug Info */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Debug Information</h2>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 mb-4">
              If tooltips are not working, check the browser console for errors.
              Make sure the Tooltip component is properly imported and exported.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Hover over the buttons above to see tooltips</p>
              <p>• Tooltips should appear after a short delay (300ms default)</p>
              <p>• Check that the component is mounted and visible</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TooltipExample;
