import React, { useState } from 'react';
import { DataTableExample } from './dataTable.example';
import { SimpleDataTableExample } from './simple.example';
import { ApiDataTableExample } from './api.example';

export const DataTableDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'simple' | 'advanced' | 'api'>('simple');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                DataTable Component Demo
              </h1>
              <p className="mt-2 text-gray-600">
                Comprehensive data table component with advanced features
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/your-repo"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('simple')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'simple'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Simple Example
            </button>
            <button
              onClick={() => setActiveTab('advanced')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'advanced'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Advanced Example
            </button>
            <button
              onClick={() => setActiveTab('api')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'api'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              API Examples
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        {activeTab === 'simple' && <SimpleDataTableExample />}
        {activeTab === 'advanced' && <DataTableExample />}
        {activeTab === 'api' && <ApiDataTableExample />}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p>
              Built with React, TanStack Table, and Tailwind CSS
            </p>
            <p className="mt-2">
              Fully RTL-compatible and optimized for Persian/Arabic applications
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataTableDemo;
