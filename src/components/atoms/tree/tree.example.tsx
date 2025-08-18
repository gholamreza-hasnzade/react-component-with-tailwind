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

  const handleNodeClick = (node: TreeNode, parentNode?: TreeNode | null) => {
    console.log('=== Node Clicked ===');
    console.log('Current node:', {
      id: node.id,
      label: node.label,
      type: node.type,
      hasParent: !!parentNode
    });
    
    if (parentNode) {
      console.log('Parent node:', {
        id: parentNode.id,
        label: parentNode.label,
        type: parentNode.type,
        hasParent: !!parentNode.parentNode
      });
      
      // Show the complete parent chain
      let currentParent = parentNode;
      const parentChain = [currentParent.label];
      
      while (currentParent.parentNode) {
        currentParent = currentParent.parentNode;
        parentChain.unshift(currentParent.label);
      }
      
      console.log('Complete parent chain:', parentChain.join(' → '));
    } else {
      console.log('This is a root node (no parent)');
    }
    console.log('==================');
  };

  const handleNodeSelect = (nodeId: string) => {
    setSelectedNodeId(nodeId);
  //   console.log('Node selected:', nodeId);
  };

  const handleNodeEdit = (node: TreeNode, parentNode?: TreeNode | null) => {
console.log('Edit node:', node);
    if (parentNode) {
  console.log('Editing child of:', parentNode.label);
    }
    // You can implement your edit logic here
    // For example, open a modal or form
  };

  const handleNodeRemove = (node: TreeNode, parentNode?: TreeNode | null) => {
   // console.log('Remove node:', node);
    if (parentNode) {
   //   console.log('Removing child from:', parentNode.label);
    }
    // You can implement your remove logic here
    // For example, show confirmation dialog
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive File Tree with Actions</h2>
        <p className="text-gray-600 mb-4">Click on nodes to interact, use arrow keys for navigation, and use the three-dot menu for actions</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Basic Tree */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tree with Actions (Edit/Remove)</h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <Tree
                data={sampleData}
                showIcons={true}
                indentSize={24}
                selectable={true}
                selectedNodeId={selectedNodeId}
                onNodeClick={handleNodeClick}
                onNodeSelect={handleNodeSelect}
                onNodeEdit={handleNodeEdit}
                onNodeRemove={handleNodeRemove}
                showActions={true}
              />
            </div>
          </div>

          {/* Tree without Actions */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Tree without Actions</h3>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <Tree
                data={sampleData}
                showIcons={false}
                indentSize={20}
                onNodeClick={handleNodeClick}
                showActions={false}
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
          <li>• <strong>Node Actions</strong> - Edit and remove nodes via dropdown menu</li>
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
