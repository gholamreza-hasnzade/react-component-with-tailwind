import React from 'react';
import {
  Typography,
  H1, H2, H3, H4, H5, H6,
  P, Lead, Large, Small, Muted,
  Code, Blockquote, List, InlineCode
} from './typography';

export const TypographyExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="p-8 space-y-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="space-y-4">
            <H1>Typography Component</H1>
            <Lead align="center" className="max-w-3xl mx-auto">
              A comprehensive typography system with multiple variants, colors, sizes, and utilities designed for modern web applications
            </Lead>
          </div>
          <div className="flex justify-center space-x-4">
            <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              🎨 Modern Design
            </div>
            <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              📱 Responsive
            </div>
            <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              ⚡ Fast & Light
            </div>
          </div>
        </div>

        {/* Headings */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H2 className="mb-6">Headings</H2>
          <div className="space-y-4">
            <H1>Heading 1 - Main Title</H1>
            <H2>Heading 2 - Section Title</H2>
            <H3>Heading 3 - Subsection</H3>
            <H4>Heading 4 - Minor Section</H4>
            <H5>Heading 5 - Small Section</H5>
            <H6>Heading 6 - Tiny Section</H6>
          </div>
        </section>

        {/* Text Variants */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Text Variants</H3>
          <div className="space-y-4">
            <P>This is a regular paragraph with default styling and improved readability.</P>
            <Lead>This is a lead paragraph that stands out from regular text with enhanced spacing and typography.</Lead>
            <Large>This is large text for emphasis and important content.</Large>
            <Small>This is small text for fine print, captions, and secondary information.</Small>
            <Muted>This is muted text for secondary information and subtle content.</Muted>
          </div>
        </section>

        {/* Colors */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Color Variants</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <P color="default">Default color text</P>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <P color="primary">Primary color text</P>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <P color="accent">Accent color text</P>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <P color="destructive">Destructive color text</P>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg">
              <P color="success">Success color text</P>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg">
              <P color="warning">Warning color text</P>
            </div>
            <div className="p-4 bg-sky-50 rounded-lg">
              <P color="info">Info color text</P>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <P color="muted">Muted color text</P>
            </div>
            <div className="p-4 bg-slate-50 rounded-lg">
              <P color="slate">Slate color text</P>
            </div>
          </div>
        </section>

        {/* Sizes */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Size Variants</H3>
          <div className="space-y-3">
            <P size="xs">Extra small text (xs) - Perfect for labels and captions</P>
            <P size="sm">Small text (sm) - Great for secondary information</P>
            <P size="base">Base text (base) - Standard body text size</P>
            <P size="lg">Large text (lg) - Enhanced readability</P>
            <P size="xl">Extra large text (xl) - Prominent content</P>
            <P size="2xl">2XL text (2xl) - Section headers</P>
            <P size="3xl">3XL text (3xl) - Major emphasis</P>
          </div>
        </section>

        {/* Font Weights */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Font Weights</H3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <P weight="thin">Thin weight text</P>
              <P weight="light">Light weight text</P>
              <P weight="normal">Normal weight text</P>
              <P weight="medium">Medium weight text</P>
            </div>
            <div className="space-y-2">
              <P weight="semibold">Semibold weight text</P>
              <P weight="bold">Bold weight text</P>
              <P weight="extrabold">Extrabold weight text</P>
              <P weight="black">Black weight text</P>
            </div>
          </div>
        </section>

        {/* Text Alignment */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Text Alignment</H3>
          <div className="space-y-4">
            <P align="left">Left aligned text (default) - This is the standard alignment for most content.</P>
            <P align="center">Center aligned text - Perfect for headings and call-to-action text.</P>
            <P align="right">Right aligned text - Useful for numbers and specific layouts.</P>
            <P align="justify">
              Justified text that spreads across the full width of the container. 
              This creates even left and right margins for a clean, professional look that's commonly used in print design.
            </P>
          </div>
        </section>

        {/* Text Utilities */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Text Utilities</H3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <P truncate>
                This is a very long text that will be truncated with an ellipsis when it overflows its container. 
                This is useful for maintaining consistent layouts and preventing text from breaking the design.
              </P>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <P noWrap>This text will not wrap to the next line and maintains its formatting</P>
            </div>
            <div className="space-y-2">
              <P underline>Underlined text for emphasis</P>
              <P italic>Italic text for quotes and emphasis</P>
              <P uppercase>uppercase text for headings</P>
              <P lowercase>LOWERCASE TEXT for special effects</P>
              <P capitalize>capitalized text for titles</P>
            </div>
          </div>
        </section>

        {/* Code and Technical */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Code & Technical</H3>
          <div className="space-y-4">
            <P>
              Use <InlineCode>InlineCode</InlineCode> for inline code snippets and technical terms.
            </P>
            <Code>const example = "This is a code block with enhanced styling";</Code>
            <Blockquote>
              "This is a blockquote that can be used for highlighting important quotes, citations, or testimonials. 
              It features a beautiful left border and subtle background styling."
            </Blockquote>
          </div>
        </section>

        {/* Lists */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Lists</H3>
          <List>
            <li>First list item with enhanced spacing and typography</li>
            <li>Second list item that demonstrates improved readability</li>
            <li>Third list item with longer text to show proper wrapping and line height</li>
            <li>Fourth list item for complete demonstration</li>
          </List>
        </section>

        {/* Tables */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Tables</H3>
          <div className="space-y-4">
            {/* Basic Table */}
            <div>
              <H4>Basic Table</H4>
              <Typography as="table" variant="table" className="border-collapse">
                <thead>
                  <tr>
                    <Typography as="th" variant="tableHeader">Name</Typography>
                    <Typography as="th" variant="tableHeader">Email</Typography>
                    <Typography as="th" variant="tableHeader">Role</Typography>
                    <Typography as="th" variant="tableHeader">Status</Typography>
                  </tr>
                </thead>
                <tbody>
                  <Typography as="tr" variant="tableRow">
                    <Typography as="td" variant="tableCell">John Doe</Typography>
                    <Typography as="td" variant="tableCell">john@example.com</Typography>
                    <Typography as="td" variant="tableCell">Admin</Typography>
                    <Typography as="td" variant="tableCell">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        Active
                      </span>
                    </Typography>
                  </Typography>
                  <Typography as="tr" variant="tableRow">
                    <Typography as="td" variant="tableCell">Jane Smith</Typography>
                    <Typography as="td" variant="tableCell">jane@example.com</Typography>
                    <Typography as="td" variant="tableCell">User</Typography>
                    <Typography as="td" variant="tableCell">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Pending
                      </span>
                    </Typography>
                  </Typography>
                  <Typography as="tr" variant="tableRow">
                    <Typography as="td" variant="tableCell">Bob Johnson</Typography>
                    <Typography as="td" variant="tableCell">bob@example.com</Typography>
                    <Typography as="td" variant="tableCell">Editor</Typography>
                    <Typography as="td" variant="tableCell">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                        Review
                      </span>
                    </Typography>
                  </Typography>
                </tbody>
              </Typography>
            </div>

            {/* Advanced Table with Custom Styling */}
            <div>
              <H4>Advanced Table with Custom Styling</H4>
              <Typography as="table" variant="table" className="border-collapse w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <Typography as="th" variant="tableHeader" className="py-3 px-4">
                      Product
                    </Typography>
                    <Typography as="th" variant="tableHeader" align="center">
                      Price
                    </Typography>
                    <Typography as="th" variant="tableHeader" align="center">
                      Stock
                    </Typography>
                    <Typography as="th" variant="tableHeader" align="center">
                      Rating
                    </Typography>
                    <Typography as="th" variant="tableHeader" align="center">
                      Actions
                    </Typography>
                  </tr>
                </thead>
                <tbody>
                  <Typography as="tr" variant="tableRow" className="hover:bg-gray-50">
                    <Typography as="td" variant="tableCell" className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          📱
                        </div>
                        <div>
                          <div className="font-medium">iPhone 15 Pro</div>
                          <div className="text-sm text-gray-500">Smartphone</div>
                        </div>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center" className="font-semibold">
                      $999
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                        In Stock
                      </span>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="ml-1 text-sm text-gray-600">4.9</span>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                        Edit
                      </button>
                    </Typography>
                  </Typography>
                  <Typography as="tr" variant="tableRow" className="hover:bg-gray-50">
                    <Typography as="td" variant="tableCell" className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          💻
                        </div>
                        <div>
                          <div className="font-medium">MacBook Air</div>
                          <div className="text-sm text-gray-500">Laptop</div>
                        </div>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center" className="font-semibold">
                      $1,199
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                        Low Stock
                      </span>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-500">★★★★☆</span>
                        <span className="ml-1 text-sm text-gray-600">4.7</span>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
                        Edit
                      </button>
                    </Typography>
                  </Typography>
                  <Typography as="tr" variant="tableRow" className="hover:bg-gray-50">
                    <Typography as="td" variant="tableCell" className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          ⌚
                        </div>
                        <div>
                          <div className="font-medium">Apple Watch</div>
                          <div className="text-sm text-gray-500">Smartwatch</div>
                        </div>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center" className="font-semibold">
                      $399
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                        Out of Stock
                      </span>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <div className="flex items-center justify-center">
                        <span className="text-yellow-500">★★★★★</span>
                        <span className="ml-1 text-sm text-gray-600">4.8</span>
                      </div>
                    </Typography>
                    <Typography as="td" variant="tableCell" align="center">
                      <button className="px-3 py-1 bg-gray-400 text-white rounded-md cursor-not-allowed text-sm">
                        Edit
                      </button>
                    </Typography>
                  </Typography>
                </tbody>
              </Typography>
            </div>

            {/* Responsive Table */}
            <div>
              <H4>Responsive Table</H4>
              <div className="overflow-x-auto">
                <Typography as="table" variant="table" className="border-collapse min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Order ID
                      </Typography>
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Customer
                      </Typography>
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Product
                      </Typography>
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Amount
                      </Typography>
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Date
                      </Typography>
                      <Typography as="th" variant="tableHeader" className="whitespace-nowrap">
                        Status
                      </Typography>
                    </tr>
                  </thead>
                  <tbody>
                    <Typography as="tr" variant="tableRow" className="hover:bg-gray-50">
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        #12345
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        Alice Cooper
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        Wireless Headphones
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap font-semibold">
                        $89.99
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        2024-01-15
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Delivered
                        </span>
                      </Typography>
                    </Typography>
                    <Typography as="tr" variant="tableRow" className="hover:bg-gray-50">
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        #12346
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        Bob Wilson
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        Gaming Mouse
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap font-semibold">
                        $59.99
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        2024-01-16
                      </Typography>
                      <Typography as="td" variant="tableCell" className="whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          Shipped
                        </span>
                      </Typography>
                    </Typography>
                  </tbody>
                </Typography>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Elements */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Custom Elements</H3>
          <div className="space-y-4">
            <Typography as="span" variant="p" color="primary">
              This renders as a span element instead of a paragraph
            </Typography>
            <Typography as="div" variant="large" color="success" align="center">
              This renders as a div with large variant and success color
            </Typography>
          </div>
        </section>

        {/* Responsive Example */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Responsive Typography</H3>
          <div className="space-y-4">
            <H1 size="4xl" className="lg:text-6xl xl:text-7xl">
              Responsive Heading
            </H1>
            <P size="lg" className="lg:text-xl xl:text-2xl">
              This text scales responsively across different screen sizes
            </P>
          </div>
        </section>

        {/* Interactive Example */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Interactive Typography</H3>
          <div className="space-y-4">
            <Typography
              as="button"
              variant="large"
              color="primary"
              className="hover:text-blue-700 transition-colors cursor-pointer"
              onClick={() => alert('Typography can be interactive!')}
            >
              Click me! (Typography as button)
            </Typography>
          </div>
        </section>

        {/* Usage Examples */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <H3 className="mb-6">Usage Examples</H3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <H4>Basic Usage</H4>
            <Code>
              {`<Typography variant="h1" color="primary">
  Hello World
</Typography>`}
            </Code>
            
            <H4>Convenience Components</H4>
            <Code>
              {`<H1 color="blue">Title</H1>
<P size="lg">Content</P>
<Lead align="center">Lead text</Lead>`}
            </Code>
            
            <H4>With Custom Element</H4>
            <Code>
              {`<Typography as="span" variant="p" color="success">
  Inline text
</Typography>`}
            </Code>
          </div>
        </section>
      </div>
    </div>
  );
};
