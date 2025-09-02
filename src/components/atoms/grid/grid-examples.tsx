import React from "react";
import { Grid } from "./grid";
import { useTextDirection } from "@/hooks/useTextDirection";

export const GridExamples: React.FC = () => {
  const { direction, setDirection, toggleDirection } = useTextDirection();

  return (
    <div className="p-8 space-y-8 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Grid Component
          </h1>
          <p className="text-lg text-muted-foreground">
            Powerful, flexible CSS Grid component with RTL/LTR support
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

        {/* Basic Grid Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Basic Grid Layouts
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 3 Column Grid */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                3 Column Grid
              </h3>
              <Grid
                cols={3}
                gap={4}
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
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 4
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  Item 5
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 6
                </div>
              </Grid>
            </div>

            {/* 4 Column Grid */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                4 Column Grid
              </h3>
              <Grid
                cols={4}
                gap={3}
                background="muted"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-3 rounded-lg text-center text-sm">
                  Item 1
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg text-center text-sm">
                  Item 2
                </div>
                <div className="bg-accent/20 p-3 rounded-lg text-center text-sm">
                  Item 3
                </div>
                <div className="bg-primary/20 p-3 rounded-lg text-center text-sm">
                  Item 4
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg text-center text-sm">
                  Item 5
                </div>
                <div className="bg-accent/20 p-3 rounded-lg text-center text-sm">
                  Item 6
                </div>
                <div className="bg-primary/20 p-3 rounded-lg text-center text-sm">
                  Item 7
                </div>
                <div className="bg-secondary/20 p-3 rounded-lg text-center text-sm">
                  Item 8
                </div>
              </Grid>
            </div>
          </div>
        </section>

        {/* Grid Spanning Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Grid Spanning
          </h2>
          
          <div className="space-y-6">
            {/* Column Spanning */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Column Spanning
              </h3>
              <Grid
                cols={4}
                gap={4}
                background="subtle"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 1
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 2' }}>
                  Item 2 (span 2)
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 3
                </div>
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 4
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 3' }}>
                  Item 5 (span 3)
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 6
                </div>
              </Grid>
            </div>

            {/* Row Spanning */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Row Spanning
              </h3>
              <Grid
                cols={3}
                rows={3}
                gap={4}
                background="muted"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 1
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center" style={{ gridRow: 'span 2' }}>
                  Item 2 (span 2 rows)
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center">
                  Item 3
                </div>
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 4
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  Item 5
                </div>
                <div className="bg-accent/20 p-4 rounded-lg text-center" style={{ gridRow: 'span 2' }}>
                  Item 6 (span 2 rows)
                </div>
                <div className="bg-primary/20 p-4 rounded-lg text-center">
                  Item 7
                </div>
                <div className="bg-secondary/20 p-4 rounded-lg text-center">
                  Item 8
                </div>
              </Grid>
            </div>
          </div>
        </section>

        {/* Auto Flow Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Auto Flow
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Row Dense */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Row Dense
              </h3>
              <Grid
                cols={4}
                autoFlow="row-dense"
                gap={3}
                background="subtle"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-3 rounded text-sm">1</div>
                <div className="bg-secondary/20 p-3 rounded text-sm" style={{ gridColumn: 'span 2' }}>
                  2 (span 2)
                </div>
                <div className="bg-accent/20 p-3 rounded text-sm">3</div>
                <div className="bg-primary/20 p-3 rounded text-sm">4</div>
                <div className="bg-secondary/20 p-3 rounded text-sm">5</div>
                <div className="bg-accent/20 p-3 rounded text-sm" style={{ gridColumn: 'span 2' }}>
                  6 (span 2)
                </div>
                <div className="bg-primary/20 p-3 rounded text-sm">7</div>
                <div className="bg-secondary/20 p-3 rounded text-sm">8</div>
              </Grid>
            </div>

            {/* Column Dense */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Column Dense
              </h3>
              <Grid
                cols={3}
                rows={4}
                autoFlow="col-dense"
                gap={3}
                background="muted"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-3 rounded text-sm">1</div>
                <div className="bg-secondary/20 p-3 rounded text-sm" style={{ gridRow: 'span 2' }}>
                  2 (span 2 rows)
                </div>
                <div className="bg-accent/20 p-3 rounded text-sm">3</div>
                <div className="bg-primary/20 p-3 rounded text-sm">4</div>
                <div className="bg-secondary/20 p-3 rounded text-sm">5</div>
                <div className="bg-accent/20 p-3 rounded text-sm" style={{ gridRow: 'span 2' }}>
                  6 (span 2 rows)
                </div>
                <div className="bg-primary/20 p-3 rounded text-sm">7</div>
                <div className="bg-secondary/20 p-3 rounded text-sm">8</div>
              </Grid>
            </div>
          </div>
        </section>

        {/* Alignment Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Alignment
          </h2>
          
          <div className="space-y-6">
            {/* Justify Content */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Justify Content
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Start</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="start"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Center</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="center"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">End</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="end"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Between</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="between"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Around</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="around"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Evenly</p>
                  <Grid
                    cols={3}
                    gap={2}
                    justifyContent="evenly"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
              </div>
            </div>

            {/* Align Items */}
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                Align Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Start</p>
                  <Grid
                    cols={3}
                    gap={2}
                    alignItems="start"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Center</p>
                  <Grid
                    cols={3}
                    gap={2}
                    alignItems="center"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-2">End</p>
                  <Grid
                    cols={3}
                    gap={2}
                    alignItems="end"
                    background="subtle"
                    shape="md"
                    size="sm"
                    border="default"
                    className="h-20"
                  >
                    <div className="bg-primary/20 p-2 rounded text-xs">1</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">2</div>
                    <div className="bg-primary/20 p-2 rounded text-xs">3</div>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RTL/LTR Examples */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            RTL/LTR Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                LTR Layout
              </h3>
              <Grid
                direction="ltr"
                cols={4}
                gap={4}
                background="subtle"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded text-sm">Start</div>
                <div className="bg-secondary/20 p-4 rounded text-sm">Middle</div>
                <div className="bg-accent/20 p-4 rounded text-sm">End</div>
                <div className="bg-primary/20 p-4 rounded text-sm">Last</div>
              </Grid>
            </div>

            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">
                RTL Layout
              </h3>
              <Grid
                direction="rtl"
                cols={4}
                gap={4}
                background="subtle"
                shape="lg"
                size="md"
                border="default"
              >
                <div className="bg-primary/20 p-4 rounded text-sm">Start</div>
                <div className="bg-secondary/20 p-4 rounded text-sm">Middle</div>
                <div className="bg-accent/20 p-4 rounded text-sm">End</div>
                <div className="bg-primary/20 p-4 rounded text-sm">Last</div>
              </Grid>
            </div>
          </div>
        </section>

        {/* Complex Example */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Complex Layout Example
          </h2>
          <Grid
            cols={12}
            rows={6}
            gap={4}
            background="card"
            shape="xl"
            size="lg"
            border="default"
            shadow="lg"
            hover="lift"
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="bg-primary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 12' }}>
              <div className="font-semibold">Header (span 12)</div>
            </div>

            {/* Sidebar */}
            <div className="bg-secondary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 3', gridRow: 'span 4' }}>
              <div className="font-medium">Sidebar</div>
              <div className="text-sm mt-2">(span 3 cols, 4 rows)</div>
            </div>

            {/* Main Content */}
            <div className="bg-accent/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 6', gridRow: 'span 2' }}>
              <div className="font-medium">Main Content</div>
              <div className="text-sm mt-2">(span 6 cols, 2 rows)</div>
            </div>

            {/* Right Panel */}
            <div className="bg-primary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 3', gridRow: 'span 2' }}>
              <div className="font-medium">Right Panel</div>
              <div className="text-sm mt-2">(span 3 cols, 2 rows)</div>
            </div>

            {/* Content Area */}
            <div className="bg-secondary/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 9', gridRow: 'span 2' }}>
              <div className="font-medium">Content Area</div>
              <div className="text-sm mt-2">(span 9 cols, 2 rows)</div>
            </div>

            {/* Footer */}
            <div className="bg-accent/20 p-4 rounded-lg text-center" style={{ gridColumn: 'span 12' }}>
              <div className="font-semibold">Footer (span 12)</div>
            </div>
          </Grid>
        </section>
      </div>
    </div>
  );
};
