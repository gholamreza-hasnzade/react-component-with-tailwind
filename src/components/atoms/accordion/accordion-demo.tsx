import React, { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

export function AccordionDemo() {
  const [textDirection, setTextDirection] = useState<"ltr" | "rtl">("ltr")

  const toggleDirection = () => {
    setTextDirection(prev => prev === "ltr" ? "rtl" : "ltr")
    // Also update document direction for global RTL/LTR support
    document.documentElement.dir = textDirection === "ltr" ? "rtl" : "ltr"
    document.body.dir = textDirection === "ltr" ? "rtl" : "ltr"
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Enhanced Accordion Component with RTL/LTR Support
        </h2>
        <p className="text-muted-foreground mb-4">
          A flexible accordion component with multiple variants, sizes, colors, and full RTL/LTR support
        </p>
        
        {/* Direction Toggle */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium">Text Direction:</span>
          <button
            onClick={toggleDirection}
            className={cn(
              "px-4 py-2 rounded-lg border transition-colors",
              textDirection === "ltr" 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-secondary text-secondary-foreground border-secondary hover:bg-secondary/80"
            )}
          >
            {textDirection === "ltr" ? "LTR (Left-to-Right)" : "RTL (Right-to-Left)"}
          </button>
          <span className="text-xs text-muted-foreground">
            Current: {textDirection.toUpperCase()}
          </span>
        </div>
      </div>

      {/* RTL/LTR Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">RTL/LTR Support Examples</h3>
        
        {/* Arabic Text Example */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Arabic Text (RTL)</h4>
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="arabic-1">
              <AccordionTrigger>
                {textDirection === "rtl" ? "ما هو React؟" : "What is React?"}
              </AccordionTrigger>
              <AccordionContent>
                {textDirection === "rtl" 
                  ? "React هي مكتبة JavaScript لبناء واجهات المستخدم. تم تطويرها بواسطة Facebook وتستخدم لإنشاء تطبيقات ويب تفاعلية مع مكونات قابلة لإعادة الاستخدام."
                  : "React is a JavaScript library for building user interfaces. It was developed by Facebook and is used to create interactive web applications with reusable components."
                }
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="arabic-2">
              <AccordionTrigger>
                {textDirection === "rtl" ? "ما هو Tailwind CSS؟" : "What is Tailwind CSS?"}
              </AccordionTrigger>
              <AccordionContent>
                {textDirection === "rtl"
                  ? "Tailwind CSS هو إطار عمل CSS يعتمد على المرافق يسمح لك ببناء تصميمات مخصصة دون مغادرة HTML. يوفر فئات مرافق منخفضة المستوى تتيح لك بناء تصميمات مخصصة تمامًا."
                  : "Tailwind CSS is a utility-first CSS framework that allows you to build custom designs without leaving your HTML. It provides low-level utility classes that let you build completely custom designs."
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Hebrew Text Example */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Hebrew Text (RTL)</h4>
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="hebrew-1">
              <AccordionTrigger>
                {textDirection === "rtl" ? "מה זה React?" : "What is React?"}
              </AccordionTrigger>
              <AccordionContent>
                {textDirection === "rtl"
                  ? "React היא ספריית JavaScript לבניית ממשקי משתמש. היא פותחה על ידי Facebook ומשמשת ליצירת אפליקציות אינטרנט אינטראקטיביות עם רכיבים לשימוש חוזר."
                  : "React is a JavaScript library for building user interfaces. It was developed by Facebook and is used to create interactive web applications with reusable components."
                }
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Mixed Content Example */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium mb-2">Mixed Content (Numbers & Text)</h4>
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="mixed-1">
              <AccordionTrigger>
                {textDirection === "rtl" ? "أمثلة على التقنيات - Examples of Technologies" : "Examples of Technologies - أمثلة على التقنيات"}
              </AccordionTrigger>
              <AccordionContent>
                <div className={textDirection === "rtl" ? "text-right" : "text-left"}>
                  <ul className="space-y-2">
                    <li>• React - مكتبة واجهة المستخدم</li>
                    <li>• Vue.js - إطار عمل تدريجي</li>
                    <li>• Angular - إطار عمل كامل الميزات</li>
                    <li>• Node.js - وقت تشغيل JavaScript</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      
      {/* Size Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Size Variants</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Small (sm)</h4>
            <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
              <AccordionItem value="size-sm">
                <AccordionTrigger size="sm">Small Accordion</AccordionTrigger>
                <AccordionContent>This is a small sized accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Medium (md) - Default</h4>
            <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
              <AccordionItem value="size-md">
                <AccordionTrigger size="md">Medium Accordion</AccordionTrigger>
                <AccordionContent>This is the default medium sized accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Large (lg)</h4>
            <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
              <AccordionItem value="size-lg">
                <AccordionTrigger size="lg">Large Accordion</AccordionTrigger>
                <AccordionContent>This is a large sized accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Extra Large (xl)</h4>
            <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
              <AccordionItem value="size-xl">
                <AccordionTrigger size="xl">Extra Large Accordion</AccordionTrigger>
                <AccordionContent>This is an extra large sized accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Color Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Color Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-primary">
              <AccordionTrigger color="primary">Primary Color</AccordionTrigger>
              <AccordionContent>This accordion uses primary colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-secondary">
              <AccordionTrigger color="secondary">Secondary Color</AccordionTrigger>
              <AccordionContent>This accordion uses secondary colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-success">
              <AccordionTrigger color="success">Success Color</AccordionTrigger>
              <AccordionContent>This accordion uses success colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-warning">
              <AccordionTrigger color="warning">Warning Color</AccordionTrigger>
              <AccordionContent>This accordion uses warning colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-danger">
              <AccordionTrigger color="danger">Danger Color</AccordionTrigger>
              <AccordionContent>This accordion uses danger colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} type="single" collapsible className="border rounded-lg">
            <AccordionItem value="color-default">
              <AccordionTrigger color="default">Default Color</AccordionTrigger>
              <AccordionContent>This accordion uses default colors.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Variant Styles */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Variant Styles</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Default Variant</h4>
            <Accordion dir={textDirection} variant="default" className="border-b">
              <AccordionItem value="variant-default">
                <AccordionTrigger>Default Style</AccordionTrigger>
                <AccordionContent>This is the default variant with bottom borders.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Bordered Variant</h4>
            <Accordion dir={textDirection} variant="bordered" className="border rounded-lg">
              <AccordionItem value="variant-bordered">
                <AccordionTrigger>Bordered Style</AccordionTrigger>
                <AccordionContent>This variant has a border around the entire accordion.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Card Variant</h4>
            <Accordion dir={textDirection} variant="card" className="shadow-sm">
              <AccordionItem value="variant-card">
                <AccordionTrigger>Card Style</AccordionTrigger>
                <AccordionContent>This variant has a card-like appearance with shadows.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Ghost Variant</h4>
            <Accordion dir={textDirection} variant="ghost">
              <AccordionItem value="variant-ghost">
                <AccordionTrigger>Ghost Style</AccordionTrigger>
                <AccordionContent>This variant has minimal styling with hover effects.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Rounded Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Rounded Variants</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Accordion dir={textDirection} rounded="none" className="border">
            <AccordionItem value="rounded-none">
              <AccordionTrigger>No Rounded</AccordionTrigger>
              <AccordionContent>Sharp corners</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} rounded="sm" className="border">
            <AccordionItem value="rounded-sm">
              <AccordionTrigger>Small Rounded</AccordionTrigger>
              <AccordionContent>Slightly rounded</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} rounded="lg" className="border">
            <AccordionItem value="rounded-lg">
              <AccordionTrigger>Large Rounded</AccordionTrigger>
              <AccordionContent>More rounded</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} rounded="full" className="border">
            <AccordionItem value="rounded-full">
              <AccordionTrigger>Full Rounded</AccordionTrigger>
              <AccordionContent>Fully rounded</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Width Control */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Width Control</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Auto Width</h4>
            <Accordion dir={textDirection} fullWidth={false} className="border rounded-lg inline-block">
              <AccordionItem value="width-auto">
                <AccordionTrigger>Auto Width</AccordionTrigger>
                <AccordionContent>This accordion adjusts to content width.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Full Width</h4>
            <Accordion dir={textDirection} fullWidth={true} className="border rounded-lg">
              <AccordionItem value="width-full">
                <AccordionTrigger>Full Width</AccordionTrigger>
                <AccordionContent>This accordion takes the full available width.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* States */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Disabled State</h4>
            <Accordion dir={textDirection} disabled className="border rounded-lg opacity-50">
              <AccordionItem value="disabled" disabled>
                <AccordionTrigger disabled>Disabled Accordion</AccordionTrigger>
                <AccordionContent>This accordion is disabled and cannot be interacted with.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Loading State</h4>
            <Accordion dir={textDirection} className="border rounded-lg">
              <AccordionItem value="loading">
                <AccordionTrigger loading>Loading Accordion</AccordionTrigger>
                <AccordionContent>This accordion shows a loading spinner.</AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Icon Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">Icon Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="icon-chevron">
              <AccordionTrigger iconVariant="chevron">Chevron Icons</AccordionTrigger>
              <AccordionContent>Uses chevron icons that change direction.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="icon-plus">
              <AccordionTrigger iconVariant="plus">Plus/Minus Icons</AccordionTrigger>
              <AccordionContent>Uses plus and minus icons.</AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <Accordion dir={textDirection} className="border rounded-lg">
            <AccordionItem value="icon-arrow">
              <AccordionTrigger iconVariant="arrow">Arrow Icons</AccordionTrigger>
              <AccordionContent>Uses arrow icons pointing in different directions.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* No Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-3">No Icons</h3>
        <Accordion dir={textDirection} className="border rounded-lg">
          <AccordionItem value="no-icon">
            <AccordionTrigger showIcon={false}>
              Accordion Without Icons
            </AccordionTrigger>
            <AccordionContent>
              This accordion doesn't show any icons, just the text content. Perfect for minimalist designs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

// Helper function for conditional classes
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

export default AccordionDemo 