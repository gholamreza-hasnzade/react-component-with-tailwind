import { useState } from "react";
import { Stepper } from "./stepper";
import type { Step } from "./stepper";

export const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [showTriggers, setShowTriggers] = useState(false);

  // Sample steps for different use cases
  const basicSteps: Step[] = [
    {
      id: 1,
      title: "Account Setup",
      description: "Create your account and verify email",
      status: "completed",
    },
    {
      id: 2,
      title: "Profile Information",
      description: "Fill in your personal details",
      status: "current",
    },
    {
      id: 3,
      title: "Preferences",
      description: "Set your account preferences",
      status: "upcoming",
    },
    {
      id: 4,
      title: "Confirmation",
      description: "Review and confirm your setup",
      status: "upcoming",
    },
  ];

  const onboardingSteps: Step[] = [
    {
      id: "welcome",
      title: "Welcome",
      description: "Get started with our platform",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      status: "completed",
      trigger: (
        <button className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200">
          Edit
        </button>
      ),
    },
    {
      id: "personal",
      title: "Personal Info",
      description: "Tell us about yourself",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
            clipRule="evenodd"
          />
        </svg>
      ),
      status: "current",
      trigger: (
        <button className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
          Continue
        </button>
      ),
    },
    {
      id: "verification",
      title: "Verification",
      description: "Verify your identity",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      status: "upcoming",
      trigger: (
        <button
          className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full cursor-not-allowed"
          disabled
        >
          Locked
        </button>
      ),
    },
    {
      id: "complete",
      title: "Complete",
      description: "You're all set!",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      ),
      status: "upcoming",
      trigger: (
        <button
          className="px-3 py-1 text-xs bg-gray-100 text-gray-500 rounded-full cursor-not-allowed"
          disabled
        >
          Locked
        </button>
      ),
    },
  ];

  const orderSteps: Step[] = [
    {
      id: "cart",
      title: "Shopping Cart",
      description: "Review your items",
      status: "completed",
    },
    {
      id: "shipping",
      title: "Shipping Details",
      description: "Enter delivery address",
      status: "current",
    },
    {
      id: "payment",
      title: "Payment",
      description: "Choose payment method",
      status: "upcoming",
    },
    {
      id: "review",
      title: "Review Order",
      description: "Confirm your order",
      status: "upcoming",
    },
    {
      id: "confirmation",
      title: "Order Confirmed",
      description: "Thank you for your order",
      status: "upcoming",
    },
  ];

  const handleStepClick = (stepIndex: number) => {
    if (stepIndex <= currentStep + 1) {
      setCurrentStep(stepIndex);
    }
  };

  const updateStepStatuses = (steps: Step[], current: number): Step[] => {
    return steps.map((step, index) => ({
      ...step,
      status:
        index < current
          ? "completed"
          : index === current
          ? "current"
          : "upcoming",
    }));
  };

  const getUpdatedSteps = (steps: Step[]) =>
    updateStepStatuses(steps, currentStep);

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Stepper Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Stepper
          component with different orientations, step states, and interactive
          features.
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Controls</h3>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label htmlFor="currentStepInput" className="text-sm font-medium">Current Step:</label>
            <input
              id="currentStepInput"
              type="number"
              min="0"
              max={basicSteps.length - 1}
              value={currentStep}
              onChange={(e) => setCurrentStep(parseInt(e.target.value) || 0)}
              className="w-16 px-2 py-1 border rounded text-sm"
              aria-label="Current step number"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showDescriptions"
              checked={showDescriptions}
              onChange={(e) => setShowDescriptions(e.target.checked)}
              className="rounded"
              aria-label="Show step descriptions"
            />
            <label htmlFor="showDescriptions" className="text-sm font-medium">
              Show Descriptions
            </label>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showTriggers"
              checked={showTriggers}
              onChange={(e) => setShowTriggers(e.target.checked)}
              className="rounded"
              aria-label="Show step triggers"
            />
            <label htmlFor="showTriggers" className="text-sm font-medium">
              Show Triggers
            </label>
          </div>

          <button
            onClick={() => setCurrentStep(0)}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reset to Start
          </button>

          <button
            onClick={() => setCurrentStep(basicSteps.length - 1)}
            className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600"
          >
            Go to End
          </button>
        </div>
      </div>

      {/* Basic Horizontal Stepper */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Horizontal Stepper</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Stepper
            steps={getUpdatedSteps(basicSteps)}
            orientation="horizontal"
            currentStep={currentStep}
            onStepClick={handleStepClick}
            showStepDescriptions={showDescriptions}
            showTriggers={showTriggers}
          />
        </div>
        <p className="text-xs text-gray-500">
          Click on steps to navigate (only completed and next step are
          clickable)
        </p>
      </div>

      {/* Vertical Stepper */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Vertical Stepper</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <Stepper
            steps={getUpdatedSteps(basicSteps)}
            orientation="vertical"
            currentStep={currentStep}
            onStepClick={handleStepClick}
            showStepDescriptions={showDescriptions}
            showTriggers={showTriggers}
          />
        </div>
      </div>

      {/* Onboarding Stepper with Icons */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Onboarding Stepper with Icons</h3>
        <div className="p-4 bg-blue-50 rounded-lg">
          <Stepper
            steps={getUpdatedSteps(onboardingSteps)}
            orientation="horizontal"
            currentStep={currentStep}
            onStepClick={handleStepClick}
            showStepDescriptions={showDescriptions}
            showTriggers={showTriggers}
            showStepNumbers={false}
          />
        </div>
        <p className="text-xs text-blue-700">
          Custom icons for each step with action triggers
        </p>
      </div>

      {/* E-commerce Order Flow */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">E-commerce Order Flow</h3>
        <div className="p-4 bg-green-50 rounded-lg">
          <Stepper
            steps={getUpdatedSteps(orderSteps)}
            orientation="horizontal"
            currentStep={currentStep}
            onStepClick={handleStepClick}
            showStepDescriptions={showDescriptions}
            showTriggers={showTriggers}
          />
        </div>
        <p className="text-xs text-green-700">
          Multi-step order process with progress tracking
        </p>
      </div>

      {/* Custom Styling Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Styling Examples</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-purple-50 rounded-lg">
            <h4 className="font-medium text-purple-900 mb-2">
              Compact Horizontal
            </h4>
            <Stepper
              steps={getUpdatedSteps(basicSteps.slice(0, 3))}
              orientation="horizontal"
              currentStep={Math.min(currentStep, 2)}
              onStepClick={(index) => setCurrentStep(Math.min(index, 2))}
              showStepDescriptions={false}
              className="max-w-md"
            />
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <h4 className="font-medium text-orange-900 mb-2">
              Compact Vertical
            </h4>
            <Stepper
              steps={getUpdatedSteps(basicSteps.slice(0, 3))}
              orientation="vertical"
              currentStep={Math.min(currentStep, 2)}
              onStepClick={(index) => setCurrentStep(Math.min(index, 2))}
              showStepDescriptions={false}
              className="max-w-xs"
            />
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-indigo-700 mb-2">
              Current step: {currentStep + 1} of {basicSteps.length}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() =>
                  setCurrentStep((prev) =>
                    Math.min(basicSteps.length - 1, prev + 1)
                  )
                }
                disabled={currentStep === basicSteps.length - 1}
                className="px-3 py-1 text-sm bg-indigo-500 text-white rounded hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>

          <Stepper
            steps={getUpdatedSteps(basicSteps)}
            orientation="horizontal"
            currentStep={currentStep}
            onStepClick={handleStepClick}
            showStepDescriptions={showDescriptions}
            showTriggers={showTriggers}
          />
        </div>
      </div>

      {/* Usage Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Usage Examples</h3>
        <div className="space-y-4">
          <div className="p-4 bg-yellow-50 rounded-lg">
            <h4 className="font-medium text-yellow-900 mb-2">Form Wizard</h4>
            <p className="text-sm text-yellow-700 mb-3">
              Multi-step form with validation and progress tracking
            </p>
            <Stepper
              steps={[
                { id: 1, title: "Personal Info", status: "completed" },
                { id: 2, title: "Contact Details", status: "current" },
                { id: 3, title: "Preferences", status: "upcoming" },
                { id: 4, title: "Review & Submit", status: "upcoming" },
              ]}
              orientation="horizontal"
              currentStep={1}
              showStepDescriptions={false}
            />
          </div>

          <div className="p-4 bg-teal-50 rounded-lg">
            <h4 className="font-medium text-teal-900 mb-2">Onboarding Flow</h4>
            <p className="text-sm text-teal-700 mb-3">
              User onboarding with guided steps and progress indicators
            </p>
            <Stepper
              steps={[
                { id: 1, title: "Welcome", status: "completed" },
                { id: 2, title: "Setup Account", status: "completed" },
                { id: 3, title: "Choose Plan", status: "current" },
                { id: 4, title: "Get Started", status: "upcoming" },
              ]}
              orientation="horizontal"
              currentStep={2}
              showStepDescriptions={false}
            />
          </div>
        </div>
      </div>

      {/* Features Showcase */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Features Showcase</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-pink-50 rounded-lg">
            <h4 className="font-medium text-pink-900 mb-2">Step Triggers</h4>
            <p className="text-xs text-pink-700 mb-2">
              Custom action buttons for each step
            </p>
            <Stepper
              steps={[
                {
                  id: 1,
                  title: "Step 1",
                  status: "completed",
                  trigger: (
                    <button className="px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded">
                      Edit
                    </button>
                  ),
                },
                {
                  id: 2,
                  title: "Step 2",
                  status: "current",
                  trigger: (
                    <button className="px-2 py-1 text-xs bg-pink-100 text-pink-700 rounded">
                      Continue
                    </button>
                  ),
                },
              ]}
              orientation="horizontal"
              currentStep={1}
              showTriggers={true}
              showStepDescriptions={false}
            />
          </div>

          <div className="p-4 bg-cyan-50 rounded-lg">
            <h4 className="font-medium text-cyan-900 mb-2">Custom Icons</h4>
            <p className="text-xs text-cyan-700 mb-2">
              Replace step numbers with custom icons
            </p>
            <Stepper
              steps={[
                {
                  id: 1,
                  title: "Start",
                  status: "completed",
                  icon: <span className="text-lg">🚀</span>,
                },
                {
                  id: 2,
                  title: "Process",
                  status: "current",
                  icon: <span className="text-lg">⚙️</span>,
                },
                {
                  id: 3,
                  title: "Finish",
                  status: "upcoming",
                  icon: <span className="text-lg">✅</span>,
                },
              ]}
              orientation="horizontal"
              currentStep={1}
              showStepNumbers={false}
              showStepDescriptions={false}
            />
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Technical Information</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-2">
            Component Features:
          </h4>
          <ul className="text-xs text-gray-700 space-y-1 ml-4">
            <li>• 2 orientations: horizontal and vertical</li>
            <li>• 3 step statuses: completed, current, upcoming</li>
            <li>• Custom icons support for each step</li>
            <li>• Step descriptions with toggle option</li>
            <li>• Custom triggers/actions for each step</li>
            <li>• Interactive step navigation</li>
            <li>• Responsive design with Tailwind CSS</li>
            <li>• Accessibility features with proper ARIA attributes</li>
            <li>• TypeScript support with comprehensive interfaces</li>
            <li>• Custom styling and className support</li>
            <li>• Step number display toggle</li>
            <li>• Click handlers for step navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
