import React from 'react'
import { Separator } from './separator'

export const SeparatorExample: React.FC = () => {
  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Separator
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Visually or semantically separates content.
        </p>
      </div>

      {/* Basic Usage */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Basic Usage
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-gray-700 dark:text-gray-300">Content above separator</p>
          <Separator className="my-4" />
          <p className="text-gray-700 dark:text-gray-300">Content below separator</p>
        </div>
      </div>

      {/* Orientation */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Orientation
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Horizontal</h4>
            <p className="text-gray-700 dark:text-gray-300">Content above</p>
            <Separator className="my-4" />
            <p className="text-gray-700 dark:text-gray-300">Content below</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Vertical</h4>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Left content</span>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-gray-700 dark:text-gray-300">Right content</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative vs Semantic */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Decorative vs Semantic
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Decorative (default)</h4>
            <p className="text-gray-700 dark:text-gray-300">Content above</p>
            <Separator className="my-4" />
            <p className="text-gray-700 dark:text-gray-300">Content below</p>
          </div>
          
          <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-3">Semantic (hr element)</h4>
            <p className="text-gray-700 dark:text-gray-300">Content above</p>
            <Separator decorative={false} className="my-4" />
            <p className="text-gray-700 dark:text-gray-300">Content below</p>
          </div>
        </div>
      </div>

      {/* Layout Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Layout Examples
        </h3>
        <div className="space-y-4">
          {/* Card with separators */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-white">Card Header</h4>
            </div>
            <div className="p-4">
              <p className="text-gray-700 dark:text-gray-300">Card content goes here</p>
            </div>
            <Separator />
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <p className="text-sm text-gray-600 dark:text-gray-400">Card footer</p>
            </div>
          </div>

          {/* List with separators */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border">
            <div className="p-4">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">List Items</h4>
              <div className="space-y-0">
                <div className="py-2">List item 1</div>
                <Separator />
                <div className="py-2">List item 2</div>
                <Separator />
                <div className="py-2">List item 3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styling */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Custom Styling
        </h3>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg border">
          <p className="text-gray-700 dark:text-gray-300">Custom styled separator</p>
          <Separator 
            className="my-4 bg-gradient-to-r from-blue-500 to-purple-500 h-0.5" 
          />
          <p className="text-gray-700 dark:text-gray-300">Gradient separator with custom classes</p>
        </div>
      </div>
    </div>
  )
}

export default SeparatorExample
