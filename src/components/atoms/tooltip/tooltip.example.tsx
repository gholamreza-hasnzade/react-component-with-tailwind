import React from 'react';
import { Tooltip } from './tooltip';
import { Button } from '../button/button';
import { tooltipStyles } from './tooltipStyles';

export const TooltipExample: React.FC = () => {
  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Tooltip Component Test</h1>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Predefined Styles (Matching Your Palette)</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip 
              content="Primary tooltip with your blue theme"
              {...tooltipStyles.primary}
            >
              <div className="inline-block px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 transition-colors">
                Primary Style
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Success tooltip with your green theme"
              {...tooltipStyles.success}
            >
              <div className="inline-block px-4 py-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700 transition-colors">
                Success Style
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Error tooltip with your red theme"
              {...tooltipStyles.error}
            >
              <div className="inline-block px-4 py-2 bg-red-600 text-white rounded cursor-pointer hover:bg-red-700 transition-colors">
                Error Style
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Warning tooltip with your yellow theme"
              {...tooltipStyles.warning}
            >
              <div className="inline-block px-4 py-2 bg-yellow-500 text-black rounded cursor-pointer hover:bg-yellow-600 transition-colors">
                Warning Style
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Info tooltip with your sky theme"
              {...tooltipStyles.info}
            >
              <div className="inline-block px-4 py-2 bg-sky-500 text-white rounded cursor-pointer hover:bg-sky-600 transition-colors">
                Info Style
              </div>
            </Tooltip>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Custom HTML & Styling</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip 
              content="<strong>Bold text</strong> and <em>italic text</em> with <span style='color: #ff6b6b;'>custom color</span>"
              allowHtml={true}
              contentClassName="text-center"
            >
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors">
                HTML Content Tooltip
              </div>
            </Tooltip>
            
            <Tooltip 
              content="Custom styled tooltip"
              tooltipStyle={{
                backgroundColor: '#10b981',
                color: 'white',
                border: '2px solid #059669',
                borderRadius: '12px',
                padding: '12px 16px',
                fontSize: '16px',
                fontWeight: 'bold',
              }}
              arrowStyle={{
                borderColor: 'transparent transparent #10b981 transparent'
              }}
            >
              <div className="inline-block px-4 py-2 bg-green-500 text-white rounded cursor-pointer hover:bg-green-600 transition-colors">
                Custom Styled Tooltip
              </div>
            </Tooltip>
            
            <Tooltip 
              content={
                <div className="text-center">
                  <div className="font-bold text-lg mb-2">🎯 Custom Content</div>
                  <div className="text-sm opacity-90">This tooltip has custom React content</div>
                  <div className="mt-2 text-xs text-blue-300">With multiple lines and styling</div>
                </div>
              }
              contentStyle={{
                minWidth: '200px',
                textAlign: 'center'
              }}
              tooltipStyle={{
                backgroundColor: '#1e293b',
                border: '1px solid #475569',
                borderRadius: '8px',
                padding: '16px',
              }}
            >
              <div className="inline-block px-4 py-2 bg-slate-500 text-white rounded cursor-pointer hover:bg-slate-600 transition-colors">
                React Content Tooltip
              </div>
            </Tooltip>
          </div>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Simple Div Test</h2>
          <Tooltip content="🎉 This should work!">
            <div 
              className="inline-block px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition-colors"
              style={{ userSelect: 'none' }}
            >
              Click me (simple div)
            </div>
          </Tooltip>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Test Tooltip (Hover Here)</h2>
          <Tooltip content="🎉 Tooltip is working! This is a test tooltip.">
            <div className="inline-block px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors">
              Hover over me to see the tooltip
            </div>
          </Tooltip>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="This is a simple tooltip">
              <Button>Hover me for tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the right" position="right">
              <Button variant="outlined">Right tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the bottom" position="bottom">
              <Button variant="outlined" color="success">Bottom tooltip</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on the left" position="left">
              <Button variant="outlined" color="warning">Left tooltip</Button>
            </Tooltip>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Icon Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="Info icon tooltip">
              <span className="inline-block w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600">
                i
              </span>
            </Tooltip>
            
            <Tooltip content="Question mark tooltip">
              <span className="inline-block w-8 h-8 bg-gray-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-600">
                ?
              </span>
            </Tooltip>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Tooltips</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip content="This is a helpful hint">
              <span className="text-blue-600 underline cursor-pointer hover:text-blue-800">
                Click here for help
              </span>
            </Tooltip>
            
            <Tooltip content="Another helpful tooltip">
              <span className="text-green-600 underline cursor-pointer hover:text-green-800">
                More information
              </span>
            </Tooltip>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">MaxWidth Test</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <Tooltip 
              content="This is a very long tooltip content that should wrap to multiple lines when maxWidth is set to a small value like 100 pixels. This tests the maxWidth functionality."
              maxWidth={100}
            >
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors">
                Small MaxWidth (100px)
              </div>
            </Tooltip>
            
            <Tooltip 
              content="This tooltip has a medium maxWidth of 150 pixels, so it should wrap but not as much as the 100px one."
              maxWidth={150}
            >
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors">
                Medium MaxWidth (150px)
              </div>
            </Tooltip>
            
            <Tooltip 
              content="This tooltip has a large maxWidth of 300 pixels, so it should wrap less and be wider."
              maxWidth={300}
            >
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors">
                Large MaxWidth (300px)
              </div>
            </Tooltip>
            
            <Tooltip 
              content="This tooltip uses a string maxWidth value like '250px' to test string handling."
              maxWidth="250px"
            >
              <div className="inline-block px-4 py-2 bg-purple-500 text-white rounded cursor-pointer hover:bg-purple-600 transition-colors">
                String MaxWidth ("250px")
              </div>
            </Tooltip>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Debug Information</h2>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-gray-600 mb-4">
              If tooltips are not working, check the browser console for errors.
              Make sure the Tooltip component is properly imported and exported.
            </p>
            <div className="text-sm text-gray-500">
              <p>• Hover over the buttons above to see tooltips</p>
              <p>• Tooltips should appear after a short delay (300ms default)</p>
              <p>• Check that the component is mounted and visible</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TooltipExample;
