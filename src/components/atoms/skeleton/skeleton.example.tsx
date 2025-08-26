import { useState, useEffect } from "react";
import { Skeleton } from "./skeleton";

export const SkeletonExample = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showShimmer, setShowShimmer] = useState(false);
  const [animationType, setAnimationType] = useState<"pulse" | "wave" | "none">(
    "pulse"
  );

  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const handleToggleShimmer = () => {
    setShowShimmer(!showShimmer);
  };

  const handleAnimationChange = (animation: "pulse" | "wave" | "none") => {
    setAnimationType(animation);
  };

  return (
    <div className="p-6 space-y-8 max-w-6xl">
      <div>
        <h2 className="text-2xl font-bold mb-4">Skeleton Component Examples</h2>
        <p className="text-gray-600 mb-6">
          This demonstrates various configurations and states of the Skeleton
          component with different variants, sizes, animations, and real-world
          usage patterns.
        </p>
      </div>

      {/* Controls */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Controls</h3>
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleToggleLoading}
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? "Show Content" : "Show Loading"}
            </button>
            <button
              onClick={handleToggleShimmer}
              className="px-3 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              {showShimmer ? "Hide Shimmer" : "Show Shimmer"}
            </button>
            <div className="flex items-center gap-2">
              <label htmlFor="animationSelect" className="text-sm font-medium">
                Animation:
              </label>
              <select
                id="animationSelect"
                value={animationType}
                onChange={(e) =>
                  handleAnimationChange(
                    e.target.value as "pulse" | "wave" | "none"
                  )
                }
                className="px-2 py-1 text-sm border rounded"
                aria-label="Select animation type"
              >
                <option value="pulse">Pulse</option>
                <option value="wave">Wave</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Basic Variants */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Basic Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Text</h4>
            <Skeleton
              variant="text"
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Text skeleton"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Circular</h4>
            <Skeleton
              variant="circular"
              size="lg"
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Circular skeleton"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Rectangular</h4>
            <Skeleton
              variant="rectangular"
              width={120}
              height={80}
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Rectangular skeleton"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Rounded</h4>
            <Skeleton
              variant="rounded"
              width={100}
              height={60}
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Rounded skeleton"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Avatar</h4>
            <Skeleton
              variant="avatar"
              size="xl"
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Avatar skeleton"
            />
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Button</h4>
            <Skeleton
              variant="button"
              animation={animationType}
              shimmer={showShimmer}
              ariaLabel="Button skeleton"
            />
          </div>
        </div>
      </div>

      {/* Different Sizes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Different Sizes</h3>
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Extra Small (xs)</h4>
            <div className="flex gap-4 items-center">
              <Skeleton
                variant="text"
                size="xs"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="circular"
                size="xs"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                size="xs"
                width={60}
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Small (sm)</h4>
            <div className="flex gap-4 items-center">
              <Skeleton
                variant="text"
                size="sm"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="circular"
                size="sm"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                size="sm"
                width={80}
                height={24}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">
              Medium (md) - Default
            </h4>
            <div className="flex gap-4 items-center">
              <Skeleton
                variant="text"
                size="md"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="circular"
                size="md"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                size="md"
                width={100}
                height={28}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Large (lg)</h4>
            <div className="flex gap-4 items-center">
              <Skeleton
                variant="text"
                size="lg"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="circular"
                size="lg"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                size="lg"
                width={120}
                height={32}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Extra Large (xl)</h4>
            <div className="flex gap-4 items-center">
              <Skeleton
                variant="text"
                size="xl"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="circular"
                size="xl"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                size="xl"
                width={140}
                height={36}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Custom Dimensions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Custom Dimensions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Custom Width & Height
            </h4>
            <div className="space-y-3">
              <Skeleton
                variant="text"
                width="100%"
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="75%"
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="50%"
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="25%"
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Pixel Values</h4>
            <div className="space-y-3">
              <Skeleton
                variant="rounded"
                width={200}
                height={30}
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                width={150}
                height={25}
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="rounded"
                width={100}
                height={20}
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Complex Components */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Complex Component Skeletons</h3>
        <div className="space-y-6">
          {/* Card Skeleton */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Card Skeleton</h4>
            <div className="border rounded-lg p-4 max-w-sm">
              <div className="flex items-center space-x-4 mb-4">
                <Skeleton
                  variant="avatar"
                  size="lg"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <div className="flex-1 space-y-2">
                  <Skeleton
                    variant="text"
                    width="60%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
              </div>
              <Skeleton
                variant="text"
                width="100%"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="90%"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="70%"
                animation={animationType}
                shimmer={showShimmer}
              />
              <div className="mt-4 flex gap-2">
                <Skeleton
                  variant="button"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="button"
                  animation={animationType}
                  shimmer={showShimmer}
                />
              </div>
            </div>
          </div>

          {/* List Skeleton */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">List Skeleton</h4>
            <div className="border rounded-lg p-4 max-w-md">
              <Skeleton
                variant="list-item"
                count={5}
                gap="0.75rem"
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          </div>

          {/* Table Skeleton */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Table Skeleton</h4>
            <div className="border rounded-lg p-4 max-w-2xl">
              <div className="space-y-2">
                <Skeleton
                  variant="table-row"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="table-row"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="table-row"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="table-row"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
              </div>
            </div>
          </div>

          {/* Form Skeleton */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Form Skeleton</h4>
            <div className="border rounded-lg p-4 max-w-md">
              <div className="space-y-4">
                <div>
                  <Skeleton
                    variant="text"
                    width="30%"
                    height={16}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="form-field"
                    width="100%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="25%"
                    height={16}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="form-field"
                    width="100%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={16}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="form-field"
                    width="100%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
                <div className="pt-2">
                  <Skeleton
                    variant="button"
                    width={80}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-world Examples */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Real-world Examples</h3>
        <div className="space-y-6">
          {/* User Profile Loading */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              User Profile Loading
            </h4>
            <div className="border rounded-lg p-6 max-w-lg">
              <div className="text-center mb-6">
                <Skeleton
                  variant="avatar"
                  size="xl"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <div className="mt-3 space-y-2">
                  <Skeleton
                    variant="text"
                    width="60%"
                    height={24}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    height={16}
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton
                  variant="text"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="text"
                  width="80%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
              </div>
            </div>
          </div>

          {/* Dashboard Loading */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">
              Dashboard Loading
            </h4>
            <div className="border rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <Skeleton
                    variant="circular"
                    size="xl"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    className="mt-2"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
                <div className="text-center">
                  <Skeleton
                    variant="circular"
                    size="xl"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    className="mt-2"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
                <div className="text-center">
                  <Skeleton
                    variant="circular"
                    size="xl"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="80%"
                    className="mt-2"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <Skeleton
                  variant="text"
                  width="100%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <Skeleton
                  variant="text"
                  width="70%"
                  animation={animationType}
                  shimmer={showShimmer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Interactive Demo</h3>
        <div className="p-4 bg-indigo-50 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-indigo-700 mb-2">
              Toggle between loading and content states
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Skeleton
                  variant="avatar"
                  size="lg"
                  animation={animationType}
                  shimmer={showShimmer}
                />
                <div className="flex-1 space-y-2">
                  <Skeleton
                    variant="text"
                    width="60%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                  <Skeleton
                    variant="text"
                    width="40%"
                    animation={animationType}
                    shimmer={showShimmer}
                  />
                </div>
              </div>
              <Skeleton
                variant="text"
                width="100%"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="90%"
                animation={animationType}
                shimmer={showShimmer}
              />
              <Skeleton
                variant="text"
                width="70%"
                animation={animationType}
                shimmer={showShimmer}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  JD
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">John Doe</h4>
                  <p className="text-gray-600">Software Developer</p>
                </div>
              </div>
              <p className="text-gray-700">
                This is the actual content that would be displayed when loading
                is complete. The skeleton components above show a preview of how
                the content will be structured.
              </p>
              <p className="text-gray-700">
                Skeleton components are great for improving perceived
                performance and user experience during loading states.
              </p>
            </div>
          )}
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
            <li>
              • 10 variants: text, circular, rectangular, rounded, avatar,
              button, card, list-item, table-row, form-field
            </li>
            <li>• 5 sizes: xs, sm, md, lg, xl with appropriate dimensions</li>
            <li>
              • Custom width and height support (pixels, percentages, CSS
              values)
            </li>
            <li>• 3 animation types: pulse, wave, none</li>
            <li>• Shimmer effect for enhanced visual appeal</li>
            <li>• Multiple skeleton rendering with count and gap control</li>
            <li>• Custom colors and background colors</li>
            <li>• Custom border radius support</li>
            <li>• Accessibility features with ARIA attributes</li>
            <li>• Responsive design with Tailwind CSS</li>
            <li>• TypeScript support with comprehensive interfaces</li>
            <li>• Performance optimized with conditional rendering</li>
            <li>• Flexible API for various use cases</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
