import React, { useState } from 'react';
import { Rating } from './rating';
import { HiHeart, HiFire } from 'react-icons/hi2';
import { HiThumbUp } from 'react-icons/hi';

export const RatingExample: React.FC = () => {
  const [controlledRating, setControlledRating] = useState(3);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Rating Component</h1>
        <p className="text-gray-600 text-lg">
          A flexible and accessible rating component with multiple variants, sizes, and interactive modes.
        </p>
      </div>

      {/* Basic Rating */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Rating</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive Rating</h3>
            <Rating 
              defaultValue={3} 
              onChange={(rating) => console.log('Rating changed:', rating)}
              showValue={true}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Read-only Rating</h3>
            <Rating 
              value={4.5} 
              readOnly={true} 
              showValue={true}
              showCount={true}
              totalRatings={127}
            />
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Different Sizes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Small Size</h3>
            <Rating size="sm" defaultValue={3} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Medium Size</h3>
            <Rating size="md" defaultValue={3} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Large Size</h3>
            <Rating size="lg" defaultValue={3} showValue={true} />
          </div>
        </div>
      </div>

      {/* Variants */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Visual Variants</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Default Variant</h3>
            <Rating variant="default" defaultValue={4} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Filled Variant</h3>
            <Rating variant="filled" defaultValue={4} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Outline Variant</h3>
            <Rating variant="outline" defaultValue={4} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Gradient Variant</h3>
            <Rating variant="gradient" defaultValue={4} showValue={true} />
          </div>
        </div>
      </div>

      {/* Half Star Ratings */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Half Star Ratings</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Allow Half Stars</h3>
            <Rating 
              defaultValue={3.5} 
              allowHalf={true} 
              showValue={true}
              onChange={(rating) => console.log('Half star rating:', rating)}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Read-only Half Stars</h3>
            <Rating 
              value={4.7} 
              allowHalf={true} 
              readOnly={true} 
              showValue={true}
            />
          </div>
        </div>
      </div>

      {/* Custom Icons */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom Icons</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Heart Rating</h3>
            <Rating 
              defaultValue={4} 
              filledIcon={<HiHeart className="w-5 h-5 text-red-500" />}
              emptyIcon={<HiHeart className="w-5 h-5 text-gray-300" />}
              showValue={true}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Thumb Rating</h3>
            <Rating 
              defaultValue={3} 
              filledIcon={<HiThumbUp className="w-5 h-5 text-green-500" />}
              emptyIcon={<HiThumbUp className="w-5 h-5 text-gray-300" />}
              showValue={true}
            />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">Fire Rating</h3>
            <Rating 
              defaultValue={5} 
              filledIcon={<HiFire className="w-5 h-5 text-orange-500" />}
              emptyIcon={<HiFire className="w-5 h-5 text-gray-300" />}
              showValue={true}
            />
          </div>
        </div>
      </div>

      {/* Controlled Rating */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Controlled Rating</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">External Control</h3>
            <Rating 
              value={controlledRating} 
              onChange={setControlledRating}
              showValue={true}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setControlledRating(1)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set to 1
            </button>
            <button
              onClick={() => setControlledRating(3)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set to 3
            </button>
            <button
              onClick={() => setControlledRating(5)}
              className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Set to 5
            </button>
          </div>
          
          <p className="text-sm text-gray-600">
            Current controlled rating: {controlledRating}
          </p>
        </div>
      </div>

      {/* Hover Effects */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hover Effects</h2>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Hover Preview</h3>
            <Rating 
              defaultValue={2} 
              readOnly="hover"
              onHover={setHoverRating}
              showValue={true}
            />
            <p className="text-sm text-gray-500 mt-2">
              Hover rating: {hoverRating || 'None'}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">Interactive with Hover</h3>
            <Rating 
              defaultValue={3} 
              onHover={(rating) => console.log('Hovering:', rating)}
              showValue={true}
            />
          </div>
        </div>
      </div>

      {/* Different Max Values */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Different Max Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">3 Stars Max</h3>
            <Rating max={3} defaultValue={2} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">7 Stars Max</h3>
            <Rating max={7} defaultValue={5} showValue={true} />
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-3">10 Stars Max</h3>
            <Rating max={10} defaultValue={7} showValue={true} />
          </div>
        </div>
      </div>

      {/* Features Summary */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h2 className="text-2xl font-semibold text-blue-800 mb-4">🎯 Rating Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Core Features:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Three sizes (sm, md, lg)</li>
              <li>• Four visual variants</li>
              <li>• Half-star rating support</li>
              <li>• Controlled and uncontrolled modes</li>
              <li>• Custom icon support</li>
              <li>• Hover preview effects</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">Accessibility:</h3>
            <ul className="text-blue-600 space-y-1">
              <li>• Keyboard navigation (Arrow keys)</li>
              <li>• ARIA attributes and labels</li>
              <li>• Screen reader friendly</li>
              <li>• Focus management</li>
              <li>• Semantic HTML structure</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingExample;
