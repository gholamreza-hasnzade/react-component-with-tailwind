import React, { useState, useEffect } from 'react';
import { ProgressBar } from './progressbar';

export const ProgressBarExample = () => {
  const [progressValues, setProgressValues] = useState({
    basic: 25,
    success: 75,
    warning: 45,
    error: 90,
    info: 60,
    custom: 30,
    animated: 0,
    indeterminate: 0,
  });

  const [isAnimating, setIsAnimating] = useState(false);

  // Animate progress bars
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setProgressValues(prev => ({
          ...prev,
          animated: (prev.animated + 1) % 101,
        }));
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isAnimating]);

  const handleProgressChange = (key: string, value: number) => {
    setProgressValues(prev => ({
      ...prev,
      [key]: Math.max(0, Math.min(100, value))
    }));
  };

  const handleSetRandomProgress = () => {
    setProgressValues(prev => ({
      ...prev,
      basic: Math.floor(Math.random() * 101),
      success: Math.floor(Math.random() * 101),
      warning: Math.floor(Math.random() * 101),
      error: Math.floor(Math.random() * 101),
      info: Math.floor(Math.random() * 101),
      custom: Math.floor(Math.random() * 101),
    }));
  };

  const handleResetAll = () => {
    setProgressValues(prev => ({
      ...prev,
      basic: 0,
      success: 0,
      warning: 0,
      error: 0,
      info: 0,
      custom: 0,
      animated: 0,
    }));
  };

  const handleSetToMax = () => {
    setProgressValues(prev => ({
      ...prev,
      basic: 100,
      success: 100,
      warning: 100,
      error: 100,
      info: 100,
      custom: 100,
    }));
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">ProgressBar Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the ProgressBar component with different variants, sizes, animations, and interactive features.
        </p>
      </div>

      {/* Basic Progress Bar */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Progress Bar</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="mb-4">
            <label htmlFor="basicProgress" className="block text-sm font-medium text-gray-700 mb-2">
              Progress: {progressValues.basic}%
            </label>
            <input
              id="basicProgress"
              type="range"
              min="0"
              max="100"
              value={progressValues.basic}
              onChange={(e) => handleProgressChange('basic', parseInt(e.target.value))}
              className="w-full"
            />
          </div>
          <ProgressBar
            value={progressValues.basic}
            showLabel
            ariaLabel="Basic progress example"
          />
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Progress Bar Variants</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Success Variant</h4>
            <div className="mb-4">
              <label htmlFor="successProgress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progressValues.success}%
              </label>
              <input
                id="successProgress"
                type="range"
                min="0"
                max="100"
                value={progressValues.success}
                onChange={(e) => handleProgressChange('success', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <ProgressBar
              value={progressValues.success}
              variant="success"
              showLabel
              ariaLabel="Success progress"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Warning Variant</h4>
            <div className="mb-4">
              <label htmlFor="warningProgress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progressValues.warning}%
              </label>
              <input
                id="warningProgress"
                type="range"
                min="0"
                max="100"
                value={progressValues.warning}
                onChange={(e) => handleProgressChange('warning', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <ProgressBar
              value={progressValues.warning}
              variant="warning"
              showLabel
              ariaLabel="Warning progress"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Error Variant</h4>
            <div className="mb-4">
              <label htmlFor="errorProgress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progressValues.error}%
              </label>
              <input
                id="errorProgress"
                type="range"
                min="0"
                max="100"
                value={progressValues.error}
                onChange={(e) => handleProgressChange('error', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <ProgressBar
              value={progressValues.error}
              variant="error"
              showLabel
              ariaLabel="Error progress"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Info Variant</h4>
            <div className="mb-4">
              <label htmlFor="infoProgress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progressValues.info}%
              </label>
              <input
                id="infoProgress"
                type="range"
                min="0"
                max="100"
                value={progressValues.info}
                onChange={(e) => handleProgressChange('info', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
            <ProgressBar
              value={progressValues.info}
              variant="info"
              showLabel
              ariaLabel="Info progress"
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Small Size</h4>
            <ProgressBar
              value={75}
              size="sm"
              showLabel
              ariaLabel="Small progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Medium Size (Default)</h4>
            <ProgressBar
              value={75}
              size="md"
              showLabel
              ariaLabel="Medium progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Large Size</h4>
            <ProgressBar
              value={75}
              size="lg"
              showLabel
              ariaLabel="Large progress bar"
            />
          </div>
        </div>
      </div>

      {/* Custom Height */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Height</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Thin (8px)</h4>
            <ProgressBar
              value={60}
              height={8}
              showLabel
              ariaLabel="Thin progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Thick (20px)</h4>
            <ProgressBar
              value={60}
              height={20}
              showLabel
              ariaLabel="Thick progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Extra Thick (32px)</h4>
            <ProgressBar
              value={60}
              height={32}
              showLabel
              ariaLabel="Extra thick progress bar"
            />
          </div>
        </div>
      </div>

      {/* Animated Progress Bars */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Animated Progress Bars</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Animated Progress</h4>
            <div className="mb-4">
              <button
                onClick={() => setIsAnimating(!isAnimating)}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                {isAnimating ? 'Stop Animation' : 'Start Animation'}
              </button>
            </div>
            <ProgressBar
              value={progressValues.animated}
              variant="info"
              animated
              showLabel
              ariaLabel="Animated progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Striped Progress Bar</h4>
            <ProgressBar
              value={65}
              variant="success"
              striped
              showLabel
              ariaLabel="Striped progress bar"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Indeterminate Progress</h4>
            <ProgressBar
              value={0}
              variant="info"
              indeterminate
              showLabel
              ariaLabel="Loading progress"
            />
            <p className="text-xs text-gray-500 mt-1">
              Used for loading states when progress is unknown
            </p>
          </div>
        </div>
      </div>

      {/* Custom Colors */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Colors</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Custom Progress Color</h4>
            <ProgressBar
              value={progressValues.custom}
              color="#8B5CF6"
              showLabel
              ariaLabel="Custom color progress bar"
            />
            <div className="mt-2">
              <label htmlFor="customProgress" className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progressValues.custom}%
              </label>
              <input
                id="customProgress"
                type="range"
                min="0"
                max="100"
                value={progressValues.custom}
                onChange={(e) => handleProgressChange('custom', parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Custom Background Color</h4>
            <ProgressBar
              value={55}
              backgroundColor="#FEF3C7"
              color="#F59E0B"
              showLabel
              ariaLabel="Custom background progress bar"
            />
          </div>
        </div>
      </div>

      {/* Different Label Types */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Label Types</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Percentage Label</h4>
            <ProgressBar
              value={80}
              variant="success"
              showLabel
              ariaLabel="Progress with percentage"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Value Label (e.g., 80/100)</h4>
            <ProgressBar
              value={80}
              variant="info"
              showValue
              max={100}
              ariaLabel="Progress with value"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Custom Label</h4>
            <ProgressBar
              value={65}
              variant="warning"
              label="Upload Progress: 65%"
              ariaLabel="Custom label progress"
            />
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">No Label</h4>
            <ProgressBar
              value={45}
              variant="default"
              ariaLabel="Progress without label"
            />
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-indigo-700 mb-2">
              Control all progress bars at once
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={handleSetRandomProgress}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Set Random Progress
              </button>
              <button
                onClick={handleResetAll}
                className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Reset All
              </button>
              <button
                onClick={handleSetToMax}
                className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
              >
                Set to Max
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ProgressBar
              value={progressValues.basic}
              variant="default"
              showLabel
              ariaLabel="Interactive basic progress"
            />
            <ProgressBar
              value={progressValues.success}
              variant="success"
              showLabel
              ariaLabel="Interactive success progress"
            />
            <ProgressBar
              value={progressValues.warning}
              variant="warning"
              showLabel
              ariaLabel="Interactive warning progress"
            />
            <ProgressBar
              value={progressValues.error}
              variant="error"
              showLabel
              ariaLabel="Interactive error progress"
            />
          </div>
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">File Upload Progress</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Progress bar for file uploads with custom styling
            </p>
            <ProgressBar
              value={75}
              variant="info"
              striped
              animated
              showLabel
              label="Uploading file... 75%"
              ariaLabel="File upload progress"
            />
          </div>
          
          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium text-teal-900 mb-2">Task Completion</h4>
            <p className="text-sm text-teal-700 mb-3">
              Progress bar for task completion tracking
            </p>
            <ProgressBar
              value={8}
              max={10}
              variant="success"
              showValue
              label="Tasks completed: 8/10"
              ariaLabel="Task completion progress"
            />
          </div>
          
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Loading State</h4>
            <p className="text-sm text-pink-700 mb-3">
              Indeterminate progress bar for loading states
            </p>
            <ProgressBar
              value={0}
              variant="info"
              indeterminate
              label="Loading..."
              ariaLabel="Loading progress"
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">Component Features:</h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• 5 variants: default, success, warning, error, info</li>
            <li>• 3 sizes: small, medium, large</li>
            <li>• Custom height support (in pixels)</li>
            <li>• Multiple label types: percentage, value, custom, none</li>
            <li>• Animated progress bars with pulse effect</li>
            <li>• Striped progress bars with gradient effects</li>
            <li>• Indeterminate progress for loading states</li>
            <li>• Custom colors for progress and background</li>
            <li>• Accessibility features with ARIA attributes</li>
            <li>• Smooth transitions and animations</li>
            <li>• Responsive design with Tailwind CSS</li>
            <li>• TypeScript support with comprehensive interfaces</li>
            <li>• Value clamping and validation</li>
            <li>• Flexible max value support</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
