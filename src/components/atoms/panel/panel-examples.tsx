import React from 'react';
import { Panel } from './panel';

export const PanelExamples: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [info, setInfo] = React.useState(false);

  const handleToggleLoading = () => {
    setLoading(!loading);
    if (!loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  const handleToggleError = () => {
    setError(!error);
    if (!error) {
      setTimeout(() => setError(false), 3000);
    }
  };

  const handleToggleSuccess = () => {
    setSuccess(!success);
    if (!success) {
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  const handleToggleWarning = () => {
    setWarning(!warning);
    if (!warning) {
      setTimeout(() => setWarning(false), 3000);
    }
  };

  const handleToggleInfo = () => {
    setInfo(!info);
    if (!info) {
      setTimeout(() => setInfo(false), 3000);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-8">Panel Component Examples</h1>
        
        {/* Basic Panels */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Basic Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Panel variant="default" title="Default Panel">
              <p className="text-muted-foreground">This is a default panel with basic styling.</p>
            </Panel>

            <Panel variant="card" title="Card Panel" description="A card-style panel with shadow">
              <p className="text-muted-foreground">This panel has a card appearance with subtle shadow.</p>
            </Panel>

            <Panel variant="elevated" title="Elevated Panel" description="A panel with strong shadow">
              <p className="text-muted-foreground">This panel has a more prominent shadow for depth.</p>
            </Panel>

            <Panel variant="outlined" title="Outlined Panel" description="A panel with thick border">
              <p className="text-muted-foreground">This panel uses a thick border instead of background.</p>
            </Panel>

            <Panel variant="filled" title="Filled Panel" description="A panel with filled background">
              <p className="text-muted-foreground">This panel has a filled background color.</p>
            </Panel>

            <Panel variant="ghost" title="Ghost Panel" description="A transparent panel">
              <p className="text-muted-foreground">This panel is completely transparent.</p>
            </Panel>
          </div>
        </section>

        {/* Size Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Size Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Panel size="xs" title="Extra Small" description="xs size">
              <p className="text-muted-foreground">Extra small padding and text.</p>
            </Panel>

            <Panel size="sm" title="Small" description="sm size">
              <p className="text-muted-foreground">Small padding and text.</p>
            </Panel>

            <Panel size="md" title="Medium" description="md size (default)">
              <p className="text-muted-foreground">Medium padding and text.</p>
            </Panel>

            <Panel size="lg" title="Large" description="lg size">
              <p className="text-muted-foreground">Large padding and text.</p>
            </Panel>

            <Panel size="xl" title="Extra Large" description="xl size">
              <p className="text-muted-foreground">Extra large padding and text.</p>
            </Panel>

            <Panel size="2xl" title="2X Large" description="2xl size">
              <p className="text-muted-foreground">2X large padding and text.</p>
            </Panel>
          </div>
        </section>

        {/* Shape Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Shape Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Panel shape="none" title="No Rounded" description="No border radius">
              <p className="text-muted-foreground">Sharp corners.</p>
            </Panel>

            <Panel shape="sm" title="Small Rounded" description="Small border radius">
              <p className="text-muted-foreground">Small rounded corners.</p>
            </Panel>

            <Panel shape="md" title="Medium Rounded" description="Medium border radius">
              <p className="text-muted-foreground">Medium rounded corners.</p>
            </Panel>

            <Panel shape="lg" title="Large Rounded" description="Large border radius">
              <p className="text-muted-foreground">Large rounded corners.</p>
            </Panel>

            <Panel shape="xl" title="Extra Large Rounded" description="Extra large border radius">
              <p className="text-muted-foreground">Extra large rounded corners.</p>
            </Panel>

            <Panel shape="2xl" title="2X Large Rounded" description="2X large border radius">
              <p className="text-muted-foreground">2X large rounded corners.</p>
            </Panel>

            <Panel shape="3xl" title="3X Large Rounded" description="3X large border radius">
              <p className="text-muted-foreground">3X large rounded corners.</p>
            </Panel>

            <Panel shape="full" title="Fully Rounded" description="Fully rounded">
              <p className="text-muted-foreground">Fully rounded corners.</p>
            </Panel>
          </div>
        </section>

        {/* Shadow Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Shadow Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Panel shadow="none" title="No Shadow" description="No shadow">
              <p className="text-muted-foreground">No shadow applied.</p>
            </Panel>

            <Panel shadow="sm" title="Small Shadow" description="Small shadow">
              <p className="text-muted-foreground">Small shadow.</p>
            </Panel>

            <Panel shadow="md" title="Medium Shadow" description="Medium shadow">
              <p className="text-muted-foreground">Medium shadow.</p>
            </Panel>

            <Panel shadow="lg" title="Large Shadow" description="Large shadow">
              <p className="text-muted-foreground">Large shadow.</p>
            </Panel>

            <Panel shadow="xl" title="Extra Large Shadow" description="Extra large shadow">
              <p className="text-muted-foreground">Extra large shadow.</p>
            </Panel>

            <Panel shadow="2xl" title="2X Large Shadow" description="2X large shadow">
              <p className="text-muted-foreground">2X large shadow.</p>
            </Panel>

            <Panel shadow="inner" title="Inner Shadow" description="Inner shadow">
              <p className="text-muted-foreground">Inner shadow.</p>
            </Panel>
          </div>
        </section>

        {/* Animation Variants */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Animation Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Panel animation="fade" title="Fade In" description="Fade animation">
              <p className="text-muted-foreground">Fades in smoothly.</p>
            </Panel>

            <Panel animation="slide" title="Slide In" description="Slide animation">
              <p className="text-muted-foreground">Slides in from bottom.</p>
            </Panel>

            <Panel animation="scale" title="Scale In" description="Scale animation">
              <p className="text-muted-foreground">Scales in smoothly.</p>
            </Panel>

            <Panel animation="bounce" title="Bounce In" description="Bounce animation">
              <p className="text-muted-foreground">Bounces in with energy.</p>
            </Panel>

            <Panel animation="pulse" title="Pulse" description="Pulse animation">
              <p className="text-muted-foreground">Continuously pulses.</p>
            </Panel>

            <Panel animation="spin" title="Spin" description="Spin animation">
              <p className="text-muted-foreground">Continuously spins.</p>
            </Panel>
          </div>
        </section>

        {/* Hover Effects */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Hover Effects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Panel hover="lift" title="Lift on Hover" description="Lifts up on hover">
              <p className="text-muted-foreground">Hover to see the lift effect.</p>
            </Panel>

            <Panel hover="glow" title="Glow on Hover" description="Glows on hover">
              <p className="text-muted-foreground">Hover to see the glow effect.</p>
            </Panel>

            <Panel hover="scale" title="Scale on Hover" description="Scales on hover">
              <p className="text-muted-foreground">Hover to see the scale effect.</p>
            </Panel>

            <Panel hover="opacity" title="Opacity on Hover" description="Changes opacity on hover">
              <p className="text-muted-foreground">Hover to see the opacity change.</p>
            </Panel>
          </div>
        </section>

        {/* State Panels */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">State Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Panel 
              error={error} 
              errorMessage="This is an error message" 
              title="Error Panel" 
              description="Panel with error state"
            >
              <p className="text-muted-foreground">This panel shows an error state.</p>
              <button 
                onClick={handleToggleError}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
              >
                Toggle Error
              </button>
            </Panel>

            <Panel 
              success={success} 
              successMessage="This is a success message" 
              title="Success Panel" 
              description="Panel with success state"
            >
              <p className="text-muted-foreground">This panel shows a success state.</p>
              <button 
                onClick={handleToggleSuccess}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
              >
                Toggle Success
              </button>
            </Panel>

            <Panel 
              warning={warning} 
              warningMessage="This is a warning message" 
              title="Warning Panel" 
              description="Panel with warning state"
            >
              <p className="text-muted-foreground">This panel shows a warning state.</p>
              <button 
                onClick={handleToggleWarning}
                className="mt-2 px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600"
              >
                Toggle Warning
              </button>
            </Panel>

            <Panel 
              info={info} 
              infoMessage="This is an info message" 
              title="Info Panel" 
              description="Panel with info state"
            >
              <p className="text-muted-foreground">This panel shows an info state.</p>
              <button 
                onClick={handleToggleInfo}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Toggle Info
              </button>
            </Panel>

            <Panel 
              loading={loading} 
              loadingText="Loading content..." 
              title="Loading Panel" 
              description="Panel with loading state"
            >
              <p className="text-muted-foreground">This panel shows a loading state.</p>
              <button 
                onClick={handleToggleLoading}
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
              >
                Toggle Loading
              </button>
            </Panel>

            <Panel 
              disabled 
              title="Disabled Panel" 
              description="Panel in disabled state"
            >
              <p className="text-muted-foreground">This panel is disabled.</p>
            </Panel>
          </div>
        </section>

        {/* Interactive Panels */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Interactive Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Panel 
              collapsible 
              collapsed={collapsed}
              onCollapse={setCollapsed}
              title="Collapsible Panel" 
              description="Click to expand/collapse"
              icon="📁"
            >
              <p className="text-muted-foreground">This panel can be collapsed and expanded.</p>
              <p className="text-muted-foreground mt-2">Use the arrow button or press Enter/Space to toggle.</p>
            </Panel>

            <Panel 
              draggable 
              title="Draggable Panel" 
              description="Drag this panel around"
              icon="🖱️"
            >
              <p className="text-muted-foreground">This panel can be dragged around.</p>
              <p className="text-muted-foreground mt-2">Try dragging it to see the effect.</p>
            </Panel>
          </div>
        </section>

        {/* Complex Panel */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Complex Panel</h2>
          <Panel 
            variant="elevated"
            size="lg"
            shape="xl"
            shadow="lg"
            animation="fade"
            hover="lift"
            title="Complex Panel Example"
            description="A panel with multiple features combined"
            icon="⭐"
            actions={
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                  Action 1
                </button>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded text-sm hover:bg-secondary/90">
                  Action 2
                </button>
              </div>
            }
            header={
              <div className="text-xs text-muted-foreground">
                Header Content
              </div>
            }
            footer={
              <div className="text-xs text-muted-foreground">
                Footer Content
              </div>
            }
          >
            <div className="space-y-4">
              <p className="text-muted-foreground">
                This is a complex panel that demonstrates multiple features working together:
              </p>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>Elevated variant with shadow</li>
                <li>Large size with extra padding</li>
                <li>Extra large rounded corners</li>
                <li>Fade-in animation</li>
                <li>Lift effect on hover</li>
                <li>Icon in the header</li>
                <li>Action buttons</li>
                <li>Custom header and footer</li>
              </ul>
            </div>
          </Panel>
        </section>
      </div>
    </div>
  );
};
