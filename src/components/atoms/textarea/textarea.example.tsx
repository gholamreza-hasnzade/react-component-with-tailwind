import React, { useState } from 'react';
import { Textarea } from './textarea';

export const TextareaExample: React.FC = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isValidating, setIsValidating] = useState(false);

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    setError('');
    
    // Simple validation example
    if (newValue.length > 0 && newValue.length < 10) {
      setError('Text must be at least 10 characters long');
    }
  };

  const handleSubmit = () => {
    setIsValidating(true);
    // Simulate validation
    setTimeout(() => {
      if (value.length < 10) {
        setError('Text must be at least 10 characters long');
      } else {
        setError('');
        alert('Form submitted successfully!');
      }
      setIsValidating(false);
    }, 1000);
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Textarea Component</h1>
        <p className="text-gray-600 text-lg">
          A comprehensive and accessible textarea component with multiple variants, sizes, and features.
        </p>
      </div>

      {/* Basic Usage */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Usage</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Simple Textarea</h3>
            <Textarea
              placeholder="Enter your message here..."
              rows={4}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">With Label</h3>
            <Textarea
              label="Message"
              placeholder="Type your message..."
              rows={4}
            />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Default</h3>
            <Textarea
              label="Default Variant"
              placeholder="Default styling..."
              variant="default"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Filled</h3>
            <Textarea
              label="Filled Variant"
              placeholder="Filled background..."
              variant="filled"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Outlined</h3>
            <Textarea
              label="Outlined Variant"
              placeholder="Transparent background..."
              variant="outlined"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Sizes */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Small</h3>
            <Textarea
              label="Small Size"
              placeholder="Small textarea..."
              size="sm"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Medium</h3>
            <Textarea
              label="Medium Size"
              placeholder="Medium textarea..."
              size="md"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Large</h3>
            <Textarea
              label="Large Size"
              placeholder="Large textarea..."
              size="lg"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* States */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">States</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">With Error</h3>
            <Textarea
              label="Error State"
              placeholder="This will show an error..."
              error="This field is required"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">With Hint</h3>
            <Textarea
              label="Hint Text"
              placeholder="Type something..."
              hint="This is helpful information about the field"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Disabled</h3>
            <Textarea
              label="Disabled State"
              placeholder="This field is disabled"
              disabled={true}
              value="This text cannot be edited"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Read Only</h3>
            <Textarea
              label="Read Only"
              placeholder="This field is read-only"
              readOnly={true}
              value="This text is read-only and cannot be modified"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Resize Options */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Resize Options</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Vertical Only</h3>
            <Textarea
              label="Vertical Resize"
              placeholder="Resize vertically only..."
              resize="vertical"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">No Resize</h3>
            <Textarea
              label="No Resize"
              placeholder="Cannot be resized..."
              resize="none"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Both Directions</h3>
            <Textarea
              label="Both Directions"
              placeholder="Resize in all directions..."
              resize="both"
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Horizontal Only</h3>
            <Textarea
              label="Horizontal Resize"
              placeholder="Resize horizontally only..."
              resize="horizontal"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Character Count */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Character Count</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">With Character Limit</h3>
            <Textarea
              label="Character Count (100 max)"
              placeholder="Type up to 100 characters..."
              maxLength={100}
              showCharacterCount={true}
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">With Character Limit (50 max)</h3>
            <Textarea
              label="Character Count (50 max)"
              placeholder="Type up to 50 characters..."
              maxLength={50}
              showCharacterCount={true}
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Required Fields */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Required Fields</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Required Field</h3>
            <Textarea
              label="Required Message"
              placeholder="This field is required..."
              required={true}
              rows={3}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Required with Error</h3>
            <Textarea
              label="Required Field"
              placeholder="This field is required..."
              required={true}
              error="This field must be filled out"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Interactive Example */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Interactive Example</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <Textarea
            label="Your Feedback"
            placeholder="Please provide your feedback here..."
            value={value}
            onValueChange={handleValueChange}
            error={error}
            hint="Please provide detailed feedback to help us improve"
            required={true}
            maxLength={500}
            showCharacterCount={true}
            rows={5}
            resize="vertical"
            className="mb-4"
          />
          
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              disabled={isValidating || !value.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isValidating ? 'Validating...' : 'Submit Feedback'}
            </button>
            
            <button
              onClick={() => {
                setValue('');
                setError('');
              }}
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear
            </button>
          </div>
          
          {value && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Preview:</h4>
              <p className="text-blue-700 whitespace-pre-wrap">{value}</p>
            </div>
          )}
        </div>
      </div>

      {/* Features Summary */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">🎯 Textarea Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Core Features:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Multiple variants (default, filled, outlined)</li>
              <li>• Three sizes (sm, md, lg)</li>
              <li>• Resize options (none, vertical, horizontal, both)</li>
              <li>• Character count with visual feedback</li>
              <li>• Error and hint text support</li>
              <li>• Required field indicators</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Accessibility:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Proper ARIA attributes</li>
              <li>• Screen reader friendly</li>
              <li>• Keyboard navigation support</li>
              <li>• Focus management</li>
              <li>• Semantic HTML structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
