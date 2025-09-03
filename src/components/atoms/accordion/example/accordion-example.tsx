import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../accordion";

export function AccordionExample() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Enhanced Accordion Component
        </h1>
        <p className="text-muted-foreground">
          A flexible accordion component with multiple icon variants and best practices
        </p>
      </div>

      {/* Basic Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Basic Accordion (LTR)</h2>
        <Accordion type="single" collapsible className="border rounded-lg">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is React?</AccordionTrigger>
            <AccordionContent>
              React is a JavaScript library for building user interfaces. It was developed by Facebook and is used to create interactive web applications with reusable components.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>What is Tailwind CSS?</AccordionTrigger>
            <AccordionContent>
              Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>What is TypeScript?</AccordionTrigger>
            <AccordionContent>
              TypeScript is a superset of JavaScript that adds static typing to the language. It helps catch errors during development and provides better tooling support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* RTL Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">RTL Accordion</h2>
        <Accordion type="single" collapsible className="border rounded-lg" dir="rtl">
          <AccordionItem value="rtl-item-1">
            <AccordionTrigger>ما هو React؟</AccordionTrigger>
            <AccordionContent>
              React هي مكتبة JavaScript لبناء واجهات المستخدم. تم تطويرها بواسطة Facebook وتستخدم لإنشاء تطبيقات ويب تفاعلية بمكونات قابلة لإعادة الاستخدام.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="rtl-item-2">
            <AccordionTrigger>ما هو Tailwind CSS؟</AccordionTrigger>
            <AccordionContent>
              Tailwind CSS هو إطار عمل CSS يعتمد على المرافق يسمح لك ببناء تصميمات مخصصة دون مغادرة HTML. يوفر فئات مرافق منخفضة المستوى تتيح لك بناء تصميمات مخصصة بالكامل.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Multiple Accordion */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Multiple Accordion Example</h2>
        <Accordion type="multiple" defaultValue={["frontend", "backend"]} className="border rounded-lg">
          <AccordionItem value="frontend">
            <AccordionTrigger>Frontend Technologies</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>• React - UI library</li>
                <li>• Vue.js - Progressive framework</li>
                <li>• Angular - Full-featured framework</li>
                <li>• Svelte - Compile-time framework</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="backend">
            <AccordionTrigger>Backend Technologies</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>• Node.js - JavaScript runtime</li>
                <li>• Python - Django, Flask</li>
                <li>• Java - Spring Boot</li>
                <li>• C# - .NET Core</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="database">
            <AccordionTrigger>Database Technologies</AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2">
                <li>• PostgreSQL - Relational database</li>
                <li>• MongoDB - NoSQL database</li>
                <li>• Redis - In-memory database</li>
                <li>• MySQL - Relational database</li>
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Different Icon Variants */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Different Icon Variants</h2>
        
        {/* Chevron Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Chevron Icons (Default)</h3>
          <Accordion type="single" collapsible className="border rounded-lg">
            <AccordionItem value="chevron-1">
              <AccordionTrigger iconVariant="chevron">
                Chevron Icons Example
              </AccordionTrigger>
              <AccordionContent>
                This accordion uses the default chevron icons that rotate and change direction.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Plus/Minus Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Plus/Minus Icons</h3>
          <Accordion type="single" collapsible className="border rounded-lg">
            <AccordionItem value="plus-1">
              <AccordionTrigger iconVariant="plus">
                Plus/Minus Icons Example
              </AccordionTrigger>
              <AccordionContent>
                This accordion uses plus and minus icons that show/hide based on state.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Arrow Icons */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Arrow Icons</h3>
          <Accordion type="single" collapsible className="border rounded-lg">
            <AccordionItem value="arrow-1">
              <AccordionTrigger iconVariant="arrow">
                Arrow Icons Example
              </AccordionTrigger>
              <AccordionContent>
                This accordion uses arrow icons that point in different directions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Custom Styling Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Custom Styling Examples</h2>
        
        {/* Primary Theme Example */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Primary Theme</h3>
          <Accordion type="single" collapsible className="border-2 border-primary/20 rounded-xl bg-gradient-to-r from-primary/5 to-secondary/5">
            <AccordionItem value="primary-1" className="border-primary/20">
              <AccordionTrigger 
                className="text-primary font-semibold hover:bg-primary/10 focus-visible:ring-primary/50"
                iconClassName="text-primary"
              >
                Primary Styled Accordion
              </AccordionTrigger>
              <AccordionContent className="text-primary/80">
                This accordion uses primary colors with gradients and enhanced hover effects.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Success Theme Example */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Success Theme</h3>
          <Accordion type="single" collapsible className="border-2 border-green-200 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50">
            <AccordionItem value="success-1" className="border-green-200">
              <AccordionTrigger 
                className="text-green-700 font-semibold hover:bg-green-100 focus-visible:ring-green-300"
                iconClassName="text-green-600"
              >
                Success Styled Accordion
              </AccordionTrigger>
              <AccordionContent className="text-green-800">
                This accordion uses success colors with green gradients and enhanced styling.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Dark Theme Example */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium text-foreground">Dark Theme</h3>
          <Accordion type="single" collapsible className="border-2 border-gray-600 rounded-xl bg-gradient-to-r from-gray-800 to-gray-900 text-white">
            <AccordionItem value="dark-1" className="border-gray-600">
              <AccordionTrigger 
                className="text-white font-semibold hover:bg-gray-700 focus-visible:ring-gray-500"
                iconClassName="text-gray-300"
              >
                Dark Styled Accordion
              </AccordionTrigger>
              <AccordionContent className="text-gray-200">
                This accordion uses dark colors with gray gradients for a modern look.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* No Icons */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">No Icons</h2>
        <Accordion type="single" collapsible className="border rounded-lg">
          <AccordionItem value="no-icon-1">
            <AccordionTrigger showIcon={false}>
              Accordion Without Icons
            </AccordionTrigger>
            <AccordionContent>
              This accordion doesn't show any icons, just the text content.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* FAQ Style */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">FAQ Style</h2>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="faq-1" className="border rounded-lg bg-card shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-left">
              How do I install the dependencies?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              Run <code className="bg-muted px-2 py-1 rounded text-sm">npm install</code> or <code className="bg-muted px-2 py-1 rounded text-sm">yarn install</code> in your project directory.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2" className="border rounded-lg bg-card shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-left">
              How do I customize the accordion?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              You can customize the accordion by passing different props like <code className="bg-muted px-2 py-1 rounded text-sm">iconVariant</code>, <code className="bg-muted px-2 py-1 rounded text-sm">className</code>, and <code className="bg-muted px-2 py-1 rounded text-sm">showIcon</code>.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3" className="border rounded-lg bg-card shadow-sm">
            <AccordionTrigger className="px-6 py-4 text-left">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4">
              Yes! The accordion is built on top of Radix UI primitives which provide full accessibility features including keyboard navigation, ARIA attributes, and screen reader support.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default AccordionExample 