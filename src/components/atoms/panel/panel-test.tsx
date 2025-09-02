import React from 'react';
import { Panel } from './panel';

export const PanelTest: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleToggleLoading = () => {
    setLoading(!loading);
    if (!loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className="p-8 space-y-6 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Panel Component Test</h1>
        
        {/* Basic Panel */}
        <Panel title="Basic Panel" description="A simple panel example">
          <p className="text-muted-foreground">This is a basic panel with title and description.</p>
        </Panel>

        {/* Panel with Icon */}
        <Panel 
          title="Panel with Icon" 
          description="A panel with an icon"
          icon="📁"
        >
          <p className="text-muted-foreground">This panel includes an icon in the header.</p>
        </Panel>

        {/* Panel with Actions */}
        <Panel 
          title="Panel with Actions" 
          description="A panel with action buttons"
          actions={
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                Edit
              </button>
              <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90">
                Delete
              </button>
            </div>
          }
        >
          <p className="text-muted-foreground">This panel has action buttons in the header.</p>
        </Panel>

        {/* Collapsible Panel */}
        <Panel 
          title="Collapsible Panel" 
          description="Click to expand/collapse"
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          icon="📂"
        >
          <p className="text-muted-foreground">This panel can be collapsed and expanded.</p>
          <p className="text-muted-foreground mt-2">Use the arrow button or press Enter/Space to toggle.</p>
        </Panel>

        {/* Loading Panel */}
        <Panel 
          title="Loading Panel" 
          description="A panel with loading state"
          loading={loading}
          loadingText="Loading content..."
        >
          <p className="text-muted-foreground">This panel shows a loading state.</p>
          <button 
            onClick={handleToggleLoading}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Toggle Loading
          </button>
        </Panel>

        {/* Error Panel */}
        <Panel 
          title="Error Panel" 
          description="A panel with error state"
          error
          errorMessage="Something went wrong!"
        >
          <p className="text-muted-foreground">This panel shows an error state.</p>
        </Panel>

        {/* Success Panel */}
        <Panel 
          title="Success Panel" 
          description="A panel with success state"
          success
          successMessage="Operation completed successfully!"
        >
          <p className="text-muted-foreground">This panel shows a success state.</p>
        </Panel>

        {/* Warning Panel */}
        <Panel 
          title="Warning Panel" 
          description="A panel with warning state"
          warning
          warningMessage="Please be careful!"
        >
          <p className="text-muted-foreground">This panel shows a warning state.</p>
        </Panel>

        {/* Info Panel */}
        <Panel 
          title="Info Panel" 
          description="A panel with info state"
          info
          infoMessage="Here's some useful information."
        >
          <p className="text-muted-foreground">This panel shows an info state.</p>
        </Panel>

        {/* Complex Panel */}
        <Panel 
          variant="elevated"
          size="lg"
          shape="xl"
          shadow="lg"
          animation="fade"
          hover="lift"
          title="Complex Panel"
          description="A panel with multiple features"
          icon="⭐"
          actions={
            <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
              Action
            </button>
          }
          header={<div className="text-xs text-muted-foreground">Header Content</div>}
          footer={<div className="text-xs text-muted-foreground">Footer Content</div>}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This is a complex panel that demonstrates multiple features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
              <li>Elevated variant with shadow</li>
              <li>Large size with extra padding</li>
              <li>Extra large rounded corners</li>
              <li>Fade-in animation</li>
              <li>Lift effect on hover</li>
              <li>Icon in the header</li>
              <li>Action button</li>
              <li>Custom header and footer</li>
            </ul>
          </div>
        </Panel>

        {/* Draggable Panel */}
        <Panel 
          title="Draggable Panel" 
          description="Drag this panel around"
          draggable
          icon="🖱️"
        >
          <p className="text-muted-foreground">This panel can be dragged around.</p>
          <p className="text-muted-foreground mt-2">Try dragging it to see the effect.</p>
        </Panel>
      </div>
    </div>
  );
};
