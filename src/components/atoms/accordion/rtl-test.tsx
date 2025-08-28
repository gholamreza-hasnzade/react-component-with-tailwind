import React, { useState } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion"

export function RTLTest() {
  const [direction, setDirection] = useState<"ltr" | "rtl">("ltr")

  const toggleDirection = () => {
    const newDirection = direction === "ltr" ? "rtl" : "ltr"
    setDirection(newDirection)
    
    // Update document direction for global RTL/LTR support
    document.documentElement.dir = newDirection
    document.body.dir = newDirection
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">
          RTL/LTR Accordion Test
        </h2>
        
        <button
          onClick={toggleDirection}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          Switch to {direction === "ltr" ? "RTL" : "LTR"}
        </button>
        
        <p className="mt-2 text-sm text-muted-foreground">
          Current direction: <strong>{direction.toUpperCase()}</strong>
        </p>
      </div>

      {/* Test Accordion */}
      <Accordion dir={direction} className="border rounded-lg">
        <AccordionItem value="test-1">
          <AccordionTrigger>
            {direction === "rtl" ? "ما هو React؟" : "What is React?"}
          </AccordionTrigger>
          <AccordionContent>
            {direction === "rtl" 
              ? "React هي مكتبة JavaScript لبناء واجهات المستخدم. تم تطويرها بواسطة Facebook."
              : "React is a JavaScript library for building user interfaces. Developed by Facebook."
            }
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="test-2">
          <AccordionTrigger>
            {direction === "rtl" ? "ما هو Tailwind CSS؟" : "What is Tailwind CSS?"}
          </AccordionTrigger>
          <AccordionContent>
            {direction === "rtl"
              ? "Tailwind CSS هو إطار عمل CSS يعتمد على المرافق."
              : "Tailwind CSS is a utility-first CSS framework."
            }
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="test-3">
          <AccordionTrigger>
            {direction === "rtl" ? "ما هو TypeScript؟" : "What is TypeScript?"}
          </AccordionTrigger>
          <AccordionContent>
            {direction === "rtl"
              ? "TypeScript هو لغة برمجة تضيف أنواع ثابتة إلى JavaScript."
              : "TypeScript is a programming language that adds static types to JavaScript."
            }
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Direction Info */}
      <div className="bg-muted p-4 rounded-lg">
        <h3 className="font-semibold mb-2">How it works:</h3>
        <ul className="text-sm space-y-1">
          <li>• Set <code>dir="rtl"</code> or <code>dir="ltr"</code> on the Accordion</li>
          <li>• Or set <code>dir="rtl"</code> on <code>&lt;html&gt;</code> or <code>&lt;body&gt;</code></li>
          <li>• Component automatically detects and adjusts layout</li>
          <li>• Icons, text alignment, and spacing adjust automatically</li>
        </ul>
      </div>
    </div>
  )
}

export default RTLTest 