import React from "react";
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertSuccess,
  AlertError,
  AlertWarning,
  AlertInfo,
} from "./alert";
import { Button } from "../button/button";

export function AlertExamples() {
  const [showDismissible, setShowDismissible] = React.useState(true);
  const [showCustom, setShowCustom] = React.useState(true);

  return (
    <div className="space-y-8 p-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold mb-2">Alert Component Examples</h1>
        <p className="text-gray-600 mb-8">
          Comprehensive examples of the Alert component with all variants,
          features, and use cases.
        </p>
      </div>

      {/* Basic Alerts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Basic Alerts</h2>
        <div className="space-y-4">
          <Alert>
            <AlertTitle>Default Alert</AlertTitle>
            <AlertDescription>
              This is a default alert with title and description.
            </AlertDescription>
          </Alert>

          <Alert variant="default">
            <AlertTitle>Simple Alert</AlertTitle>
            <AlertDescription>
              A simple alert without custom styling.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* Variant Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Alert Variants</h2>
        <div className="space-y-4">
          <AlertSuccess
            title="Success!"
            description="Your operation completed successfully. All changes have been saved."
          />

          <AlertError
            title="Error Occurred"
            description="Something went wrong. Please try again or contact support if the problem persists."
          />

          <AlertWarning
            title="Warning"
            description="Please review your input before proceeding. Some fields may need attention."
          />

          <AlertInfo
            title="Information"
            description="Here's some helpful information about the current process or feature."
          />
        </div>
      </section>

      {/* Sizes */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Alert Sizes</h2>
        <div className="space-y-4">
          <AlertSuccess
            size="sm"
            title="Small Alert"
            description="This is a small sized alert."
          />
          <AlertInfo
            size="md"
            title="Medium Alert"
            description="This is a medium sized alert (default)."
          />
          <AlertWarning
            size="lg"
            title="Large Alert"
            description="This is a large sized alert with more padding."
          />
        </div>
      </section>

      {/* Dismissible Alerts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">
          Dismissible Alerts with Animations
        </h2>
        <div className="space-y-4">
          {showDismissible && (
            <AlertSuccess
              title="Animated Dismissible Success"
              description="This alert has smooth animations when showing and hiding. Click the X to see the exit animation."
              dismissible
              onDismiss={() => setShowDismissible(false)}
              animated={true}
              animationDuration={400}
            />
          )}

          <AlertError
            title="Fast Animation Error"
            description="This error alert has a faster animation duration (200ms)."
            dismissible
            onDismiss={() => console.log("Error alert dismissed")}
            animated={true}
            animationDuration={200}
          />

          <AlertWarning
            title="No Animation Warning"
            description="This warning alert has animations disabled."
            dismissible
            animated={false}
          />

          {!showDismissible && (
            <Button
              onClick={() => setShowDismissible(true)}
              variant="outlined"
              size="sm"
            >
              Show Animated Alert Again
            </Button>
          )}
        </div>
      </section>

      {/* Custom Icons */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Custom Icons</h2>
        <div className="space-y-4">
          <Alert
            variant="info"
            title="Custom Icon"
            description="This alert uses a custom icon instead of the default."
            icon={<span className="text-2xl">🚀</span>}
          />

          <Alert
            variant="success"
            title="Another Custom Icon"
            description="You can use any React node as an icon."
            icon={<span className="text-2xl">✨</span>}
          />

          <Alert
            variant="warning"
            title="No Icon"
            description="This alert has icons disabled."
            showIcon={false}
          />
        </div>
      </section>

      {/* RTL Support */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">RTL Support</h2>
        <div className="space-y-4">
          <AlertSuccess
            title="نجح العمل"
            description="تم حفظ التغييرات بنجاح. يمكنك الآن المتابعة."
            dir="rtl"
            dismissible
          />

          <AlertError
            title="خطأ في النظام"
            description="حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى."
            dir="rtl"
          />

          <AlertInfo
            title="معلومات مهمة"
            description="هذه معلومات مهمة حول العملية الحالية."
            dir="rtl"
            icon={<span className="text-2xl">ℹ️</span>}
          />
        </div>
      </section>

      {/* Complex Content */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Complex Content</h2>
        <div className="space-y-4">
          <AlertWarning>
            <AlertTitle>System Maintenance</AlertTitle>
            <AlertDescription>
              <p className="mb-2">Scheduled maintenance will occur on:</p>
              <ul className="list-disc list-inside mb-2 space-y-1">
                <li>Date: December 15, 2024</li>
                <li>Time: 2:00 AM - 4:00 AM UTC</li>
                <li>Duration: Approximately 2 hours</li>
              </ul>
              <p>Please save your work before the maintenance window.</p>
            </AlertDescription>
          </AlertWarning>

          <AlertInfo>
            <AlertTitle>New Feature Available</AlertTitle>
            <AlertDescription>
              <p className="mb-3">
                We've added a new feature that might interest you:
              </p>
              <div className="bg-blue-50 p-3 rounded-md mb-3">
                <strong>Advanced Analytics Dashboard</strong>
                <p className="text-sm text-blue-700 mt-1">
                  Get detailed insights into your data with our new analytics
                  tools.
                </p>
              </div>
              <Button size="sm" variant="outlined">
                Learn More
              </Button>
            </AlertDescription>
          </AlertInfo>
        </div>
      </section>

      {/* Animation Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Animation Examples</h2>
        <div className="space-y-4">
          <AlertInfo
            title="CSS Animation Features"
            description="The Alert component supports smooth enter/exit animations using pure CSS transitions and Tailwind classes."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AlertSuccess
              title="Slow Animation"
              description="This alert has a slower, more dramatic animation (600ms)."
              dismissible
              animated={true}
              animationDuration={600}
            />

            <AlertWarning
              title="Quick Animation"
              description="This alert has a fast, snappy animation (150ms)."
              dismissible
              animated={true}
              animationDuration={150}
            />
          </div>

          <AlertError
            title="Default Animation"
            description="This alert uses the default animation settings (300ms duration)."
            dismissible
            animated={true}
          />
        </div>
      </section>

      {/* Interactive Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Interactive Examples</h2>
        <div className="space-y-4">
          {showCustom && (
            <Alert
              variant="info"
              title="Interactive Alert"
              description="This alert demonstrates custom dismiss behavior with animations."
              dismissible
              animated={true}
              animationDuration={400}
              onDismiss={() => {
                setShowCustom(false);
                alert("Alert dismissed!");
              }}
            />
          )}

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => setShowCustom(true)}
              variant="outlined"
              size="sm"
            >
              Show Animated Alert
            </Button>
            <Button
              onClick={() => {
                const alert = document.createElement("div");
                alert.innerHTML = `
                   <div class="fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50 transition-all duration-300 ease-in-out transform translate-y-0 opacity-100">
                     <strong>Dynamic Alert!</strong>
                     <p>This alert was created dynamically with CSS transitions.</p>
                   </div>
                 `;
                document.body.appendChild(alert);

                // Add exit animation
                setTimeout(() => {
                  alert.style.transform = "translateY(-20px)";
                  alert.style.opacity = "0";
                  setTimeout(() => alert.remove(), 300);
                }, 2700);
              }}
              variant="outlined"
              size="sm"
            >
              Create Dynamic Alert
            </Button>
          </div>
        </div>
      </section>

      {/* Form Integration */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Form Integration</h2>
        <div className="space-y-4">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>

            <AlertError
              title="Validation Error"
              description="Please enter a valid email address."
              size="sm"
            />

            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>

            <AlertWarning
              title="Password Requirements"
              description="Password must be at least 8 characters long and contain at least one number."
              size="sm"
            />

            <Button type="submit" className="w-full">
              Submit Form
            </Button>
          </form>
        </div>
      </section>

      {/* Accessibility Features */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Accessibility Features</h2>
        <div className="space-y-4">
          <AlertSuccess
            title="Accessible Alert"
            description="This alert includes proper ARIA attributes, keyboard navigation, and screen reader support."
            dismissible
          />

          <AlertInfo>
            <AlertTitle>Screen Reader Support</AlertTitle>
            <AlertDescription>
              <p>This alert is fully accessible with:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Proper ARIA roles and labels</li>
                <li>Keyboard navigation support</li>
                <li>Screen reader announcements</li>
                <li>Focus management for dismissible alerts</li>
                <li>High contrast color schemes</li>
              </ul>
            </AlertDescription>
          </AlertInfo>
        </div>
      </section>

      {/* Code Examples */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
        <div className="space-y-4">
          <AlertInfo
            title="Usage Examples"
            description="Here are some common usage patterns for the Alert component."
          />

          <div className="bg-gray-100 p-4 rounded-lg">
            <pre className="text-sm overflow-x-auto">
              {`// Basic usage
 <Alert>
   <AlertTitle>Heads up!</AlertTitle>
   <AlertDescription>
     You can add components to your app using the cli.
   </AlertDescription>
 </Alert>

 // Success alert with dismiss and animations
 <AlertSuccess 
   title="Success!" 
   description="Your changes have been saved."
   dismissible
   animated={true}
   animationDuration={400}
   onDismiss={() => console.log('Dismissed')}
 />

 // RTL support
 <AlertError 
   title="خطأ" 
   description="حدث خطأ في النظام"
   dir="rtl"
   animated={true}
 />

 // Custom icon with fast animation
 <AlertWarning 
   title="Warning" 
   description="Please check your input"
   icon={<CustomIcon />}
   animated={true}
   animationDuration={200}
 />

 // Disable animations
 <AlertInfo 
   title="No Animation" 
   description="This alert has animations disabled"
   animated={false}
 />`}
            </pre>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AlertExamples;
