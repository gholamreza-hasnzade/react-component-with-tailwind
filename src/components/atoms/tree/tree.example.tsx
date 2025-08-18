import React, { useState } from 'react';
import { Tree } from './tree';
import type { TreeNode } from './tree';

export const TreeExample: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('');

  const sampleData: TreeNode[] = [
    {
      id: '1',
      label: 'Project Root',
      type: 'folder',
      isExpanded: true,
      children: [
        {
          id: '1-1',
          label: 'src',
          type: 'folder',
          isExpanded: true,
          children: [
            {
              id: '1-1-1',
              label: 'components',
              type: 'folder',
              children: [
                {
                  id: '1-1-1-1',
                  label: 'Button.tsx',
                  type: 'code'
                },
                {
                  id: '1-1-1-2',
                  label: 'Input.tsx',
                  type: 'code'
                },
                {
                  id: '1-1-1-3',
                  label: 'Modal.tsx',
                  type: 'code'
                }
              ]
            },
            {
              id: '1-1-2',
              label: 'utils',
              type: 'folder',
              children: [
                {
                  id: '1-1-2-1',
                  label: 'helpers.ts',
                  type: 'code'
                },
                {
                  id: '1-1-2-2',
                  label: 'constants.ts',
                  type: 'code'
                }
              ]
            },
            {
              id: '1-1-3',
              label: 'App.tsx',
              type: 'code'
            },
            {
              id: '1-1-4',
              label: 'index.tsx',
              type: 'code'
            }
          ]
        },
        {
          id: '1-2',
          label: 'public',
          type: 'folder',
          children: [
            {
              id: '1-2-1',
              label: 'index.html',
              type: 'document'
            },
            {
              id: '1-2-2',
              label: 'favicon.ico',
              type: 'image'
            },
            {
              id: '1-2-3',
              label: 'logo.png',
              type: 'image'
            }
          ]
        },
        {
          id: '1-3',
          label: 'config',
          type: 'folder',
          children: [
            {
              id: '1-3-1',
              label: 'webpack.config.js',
              type: 'code'
            },
            {
              id: '1-3-2',
              label: 'tsconfig.json',
              type: 'document'
            },
            {
              id: '1-3-3',
              label: 'package.json',
              type: 'document'
            }
          ]
        },
        {
          id: '1-4',
          label: 'database',
          type: 'database',
          children: [
            {
              id: '1-4-1',
              label: 'schema.sql',
              type: 'code'
            },
            {
              id: '1-4-2',
              label: 'migrations',
              type: 'folder',
              children: [
                {
                  id: '1-4-2-1',
                  label: '001_initial.sql',
                  type: 'code'
                },
                {
                  id: '1-4-2-2',
                  label: '002_users.sql',
                  type: 'code'
                }
              ]
            }
          ]
        },
        {
          id: '1-5',
          label: 'settings.json',
          type: 'settings'
        }
      ]
    }
  ];

  const handleNodeClick = (node: TreeNode) => {
    console.log('Node clicked:', node);
  };

  const handleNodeToggle = (node: TreeNode, isExpanded: boolean) => {
    console.log('Node toggled:', node.label, 'Expanded:', isExpanded);
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
    console.log('Node selected:', nodeId);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive File Tree</h2>
        <p className="text-gray-600 mb-4">Click on nodes to interact, use arrow keys for navigation</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Tree */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Basic Tree (Selectable)</h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <Tree
                data={sampleData}
                showIcons={true}
                indentSize={24}
                selectable={true}
                selectedNodeId={selectedNodeId}
                onNodeClick={handleNodeClick}
                onNodeToggle={handleNodeToggle}
                onNodeSelect={handleNodeSelect}
              />
            </div>
          </div>

          {/* Tree without Icons */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tree without Icons</h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <Tree
                data={sampleData}
                showIcons={false}
                indentSize={20}
                onNodeClick={handleNodeClick}
                onNodeToggle={handleNodeToggle}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">🌳 Tree Features:</h3>
        <ul className="text-blue-700 space-y-1 text-sm">
          <li>• <strong>Expandable Nodes</strong> - Click chevron icons to expand/collapse folders</li>
          <li>• <strong>Multiple Node Types</strong> - Folder, File, Document, Image, Database, Code, Settings</li>
          <li>• <strong>Custom Icons</strong> - Each node type has its own colored icon</li>
          <li>• <strong>Selectable Nodes</strong> - Enable selection with visual feedback</li>
          <li>• <strong>Keyboard Navigation</strong> - Use Tab, Enter, Space, Arrow keys</li>
          <li>• <strong>Customizable Indentation</strong> - Adjust spacing between levels</li>
          <li>• <strong>Event Handlers</strong> - Handle clicks, toggles, and selections</li>
          <li>• <strong>Dark Mode Support</strong> - Responsive to theme changes</li>
        </ul>
      </div>

      {/* Selected Node Info */}
      {selectedNodeId && (
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Selected Node:</h3>
          <p className="text-green-700 text-sm">ID: {selectedNodeId}</p>
        </div>
      )}
    </div>
  );
};
