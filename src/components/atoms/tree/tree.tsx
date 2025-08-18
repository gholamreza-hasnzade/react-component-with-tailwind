import React, { useState } from 'react';
import { ChevronDown, Folder, FolderOpen, File, FileText, Image, Database, Code, Settings, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TreeNode {
  id: string;
  label: string;
  type?: 'folder' | 'file' | 'document' | 'image' | 'database' | 'code' | 'settings';
  icon?: React.ReactNode;
  children?: TreeNode[];
  data?: Record<string, unknown>;
  isExpanded?: boolean;
}

export interface TreeProps {
  data: TreeNode[];
  className?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeToggle?: (node: TreeNode, isExpanded: boolean) => void;
  showIcons?: boolean;
  indentSize?: number;
  selectable?: boolean;
  selectedNodeId?: string;
  onNodeSelect?: (nodeId: string) => void;
}

const getNodeIcon = (type?: string, isExpanded?: boolean) => {
  switch (type) {
    case 'folder':
      return isExpanded ? <FolderOpen className="w-4 h-4 text-blue-500" /> : <Folder className="w-4 h-4 text-blue-500" />;
    case 'file':
      return <File className="w-4 h-4 text-gray-500" />;
    case 'document':
      return <FileText className="w-4 h-4 text-green-500" />;
    case 'image':
      return <Image className="w-4 h-4 text-purple-500" />;
    case 'database':
      return <Database className="w-4 h-4 text-orange-500" />;
    case 'code':
      return <Code className="w-4 h-4 text-indigo-500" />;
    case 'settings':
      return <Settings className="w-4 h-4 text-red-500" />;
    default:
      return <File className="w-4 h-4 text-gray-400" />;
  }
};

const TreeNode: React.FC<{
  node: TreeNode;
  level: number;
  indentSize: number;
  showIcons: boolean;
  selectable: boolean;
  selectedNodeId?: string;
  onNodeClick?: (node: TreeNode) => void;
  onNodeToggle?: (node: TreeNode, isExpanded: boolean) => void;
  onNodeSelect?: (nodeId: string) => void;
}> = ({
  node,
  level,
  indentSize,
  showIcons,
  selectable,
  selectedNodeId,
  onNodeClick,
  onNodeToggle,
  onNodeSelect,
}) => {
  const [isExpanded, setIsExpanded] = useState(node.isExpanded || false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selectedNodeId === node.id;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren) {
      const newExpandedState = !isExpanded;
      setIsExpanded(newExpandedState);
      onNodeToggle?.(node, newExpandedState);
    }
  };

  const handleClick = () => {
    onNodeClick?.(node);
    if (selectable) {
      onNodeSelect?.(node.id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    } else if (e.key === 'ArrowRight' && hasChildren && !isExpanded) {
      e.preventDefault();
      const fakeEvent = { stopPropagation: () => {} } as React.MouseEvent;
      handleToggle(fakeEvent);
    } else if (e.key === 'ArrowLeft' && hasChildren && isExpanded) {
      e.preventDefault();
      const fakeEvent = { stopPropagation: () => {} } as React.MouseEvent;
      handleToggle(fakeEvent);
    }
  };

  return (
    <div>
      <div
        className={cn(
          'flex items-center gap-2 px-2 py-1 rounded-md cursor-pointer transition-colors duration-150',
          'hover:bg-gray-100 dark:hover:bg-gray-800',
          isSelected && 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        )}
        style={{ paddingLeft: `${level * indentSize + 8}px` }}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Toggle Button */}
        {hasChildren && (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors duration-150"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronLeft className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </button>
        )}
        
        {/* Spacer for nodes without children */}
        {!hasChildren && <div className="w-6" />}

        {/* Node Icon */}
        {showIcons && (
          <div className="flex-shrink-0">
            {node.icon || getNodeIcon(node.type, isExpanded)}
          </div>
        )}

        {/* Node Label */}
        <span className="flex-1 text-sm font-medium truncate">
          {node.label}
        </span>
      </div>

      {/* Children */}
      {hasChildren && isExpanded && (
        <div className="mr-4">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              indentSize={indentSize}
              showIcons={showIcons}
              selectable={selectable}
              selectedNodeId={selectedNodeId}
              onNodeClick={onNodeClick}
              onNodeToggle={onNodeToggle}
              onNodeSelect={onNodeSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const Tree: React.FC<TreeProps> = ({
  data,
  className,
  onNodeClick,
  onNodeToggle,
  showIcons = true,
  indentSize = 20,
  selectable = false,
  selectedNodeId,
  onNodeSelect,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {data.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          level={0}
          indentSize={indentSize}
          showIcons={showIcons}
          selectable={selectable}
          selectedNodeId={selectedNodeId}
          onNodeClick={onNodeClick}
          onNodeToggle={onNodeToggle}
          onNodeSelect={onNodeSelect}
        />
      ))}
    </div>
  );
};