import React from 'react';
import { Fieldset } from './fieldset';
import { useTextDirection } from '@/hooks/useTextDirection';

export const FieldsetExamples: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { direction, setDirection, toggleDirection } = useTextDirection();

  const handleToggleLoading = () => {
    setLoading(!loading);
    if (!loading) {
      setTimeout(() => setLoading(false), 3000);
    }
  };

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Fieldset Component</h1>
          <p className="text-lg text-muted-foreground">Beautiful, accessible form fieldsets with modern styling</p>
          
          {/* Direction Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
              <span className="text-sm font-medium">Direction:</span>
              <button
                onClick={() => setDirection('ltr')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === 'ltr' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                LTR
              </button>
              <button
                onClick={() => setDirection('rtl')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === 'rtl' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                RTL
              </button>
              <button
                onClick={() => setDirection('auto')}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === 'auto' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
              >
                Auto
              </button>
              <button
                onClick={toggleDirection}
                className="px-3 py-1 rounded text-sm bg-secondary text-secondary-foreground hover:bg-secondary/90 transition-colors"
              >
                Toggle
              </button>
            </div>
          </div>
        </div>
        
        {/* RTL/LTR Demonstration */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">RTL/LTR Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Fieldset 
              direction="ltr"
              legend="LTR Fieldset" 
              description="Left-to-right text direction"
              icon="🌍"
              required
              helpText="This fieldset is explicitly set to LTR direction"
            >
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name (LTR)" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email (LTR)" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>

            <Fieldset 
              direction="rtl"
              legend="RTL Fieldset" 
              description="Right-to-left text direction"
              icon="🌍"
              required
              helpText="This fieldset is explicitly set to RTL direction"
            >
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="أدخل اسمك (RTL)" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="أدخل بريدك الإلكتروني (RTL)" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>
          </div>
        </section>

        {/* Basic Fieldsets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Basic Fieldsets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Fieldset legend="Default Fieldset">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>

            <Fieldset variant="card" legend="Card Fieldset" description="A card-style fieldset with shadow">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>

            <Fieldset variant="elevated" legend="Elevated Fieldset" description="A fieldset with strong shadow">
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Enter your name" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>
          </div>
        </section>

        {/* Interactive Fieldsets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Interactive Fieldsets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Fieldset 
              collapsible 
              collapsed={collapsed}
              onCollapse={setCollapsed}
              legend="Collapsible Fieldset" 
              description="Click to expand/collapse"
              icon="📁"
            >
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="This fieldset can be collapsed" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Use the arrow button or press Enter/Space" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>

            <Fieldset 
              legend="Fieldset with Actions" 
              description="A fieldset with action buttons"
              icon="⚙️"
              actions={
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors duration-200">
                    Save
                  </button>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/90 transition-colors duration-200">
                    Reset
                  </button>
                </div>
              }
            >
              <div className="space-y-4">
                <input 
                  type="text" 
                  placeholder="Field with actions" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
                <input 
                  type="email" 
                  placeholder="Use the action buttons above" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>
            </Fieldset>
          </div>
        </section>

        {/* State Fieldsets */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">State Fieldsets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Fieldset 
              error
              errorMessage="This fieldset has an error" 
              legend="Error Fieldset" 
              description="Fieldset with error state"
            >
              <input 
                type="text" 
                placeholder="This fieldset shows an error state" 
                className="w-full px-4 py-3 border border-destructive/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-destructive/50 focus:ring-2 focus:ring-destructive/20 transition-all duration-200"
              />
            </Fieldset>

            <Fieldset 
              success
              successMessage="This fieldset is valid" 
              legend="Success Fieldset" 
              description="Fieldset with success state"
            >
              <input 
                type="text" 
                placeholder="This fieldset shows a success state" 
                className="w-full px-4 py-3 border border-success/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-success/50 focus:ring-2 focus:ring-success/20 transition-all duration-200"
              />
            </Fieldset>

            <Fieldset 
              loading={loading} 
              loadingText="Loading fieldset..." 
              legend="Loading Fieldset" 
              description="Fieldset with loading state"
            >
              <input 
                type="text" 
                placeholder="This fieldset shows a loading state" 
                className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
              <button 
                onClick={handleToggleLoading}
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors duration-200"
              >
                Toggle Loading
              </button>
            </Fieldset>
          </div>
        </section>

        {/* Complex Fieldset */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Complex Fieldset</h2>
          <Fieldset 
            variant="elevated"
            size="lg"
            shape="xl"
            shadow="lg"
            animation="fade"
            hover="lift"
            legend="Complex Fieldset Example"
            description="A fieldset with multiple features combined"
            icon="⭐"
            actions={
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm hover:bg-primary/90 transition-colors duration-200">
                  Submit
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/90 transition-colors duration-200">
                  Cancel
                </button>
              </div>
            }
            header={
              <div className="text-xs text-muted-foreground">
                Header Content - Additional information
              </div>
            }
            footer={
              <div className="text-xs text-muted-foreground">
                Footer Content - Terms and conditions apply
              </div>
            }
            required
            helpText="This is a complex fieldset demonstrating multiple features working together"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  required
                />
              </div>
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                required
              />
              <textarea 
                placeholder="Additional Comments" 
                rows={3}
                className="w-full px-4 py-3 border border-border/50 rounded-xl bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
              />
            </div>
          </Fieldset>
        </section>
      </div>
    </div>
  );
};