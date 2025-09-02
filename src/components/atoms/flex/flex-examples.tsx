import React from "react";
import { Flex } from "./flex";
import { useTextDirection } from "@/hooks/useTextDirection";

export const FlexExamples: React.FC = () => {
  const { direction, setDirection, toggleDirection } = useTextDirection();

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Flex Component
          </h1>
          <p className="text-lg text-muted-foreground">
            Powerful, flexible layout component with RTL/LTR support
          </p>

          {/* Direction Controls */}
          <div className="mt-6 flex justify-center gap-4">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg p-3">
              <span className="text-sm font-medium">Direction:</span>
              <button
                onClick={() => setDirection("ltr")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === "ltr"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                LTR
              </button>
              <button
                onClick={() => setDirection("rtl")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === "rtl"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                RTL
              </button>
              <button
                onClick={() => setDirection("auto")}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  direction === "auto"
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
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

        {/* Basic Flex Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Basic Flex Layouts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Row Layout */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Row Layout
              </h3>
              <Flex
                flexDirection="row"
                /* gap={12} */
                 gapX={4}
                /*gapY={4} */
                background="subtle"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 1
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  Item 2
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 3
                </div>
              </Flex>
            </div>

            {/* Column Layout */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Column Layout
              </h3>
              <Flex
                flexDirection="col"
                gapX={4}
                background="muted"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 1
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  Item 2
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 3
                </div>
              </Flex>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
