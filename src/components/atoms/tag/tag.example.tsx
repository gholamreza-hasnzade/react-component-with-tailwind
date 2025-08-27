import React, { useState } from "react";
import { Tag } from "./tag";
import { FaUser, FaStar, FaHeart, FaCheck, FaExclamationTriangle } from "react-icons/fa";

export const TagExample: React.FC = () => {
  const [tags, setTags] = useState([
    { id: 1, text: "React", variant: "primary" as const },
    { id: 2, text: "TypeScript", variant: "secondary" as const },
    { id: 3, text: "Tailwind CSS", variant: "success" as const },
    { id: 4, text: "Frontend", variant: "info" as const },
  ]);

  const [clickedTag, setClickedTag] = useState<string>("");
  const [loadingTag, setLoadingTag] = useState<number | null>(null);
  const [pressedTags, setPressedTags] = useState<Set<number>>(new Set());

  const handleTagClick = (text: string) => {
    setClickedTag(`Clicked: ${text}`);
    setTimeout(() => setClickedTag(""), 2000);
  };

  const handleTagDismiss = (id: number) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleLoadingTag = (id: number) => {
    setLoadingTag(id);
    setTimeout(() => setLoadingTag(null), 3000);
  };

  const handleTagPress = (id: number) => {
    setPressedTags(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tag Component Examples</h1>
        <p className="text-gray-600">A comprehensive showcase of the Tag component features</p>
      </div>

      {/* Basic Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Basic Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="default">Default</Tag>
          <Tag variant="primary">Primary</Tag>
          <Tag variant="secondary">Secondary</Tag>
          <Tag variant="success">Success</Tag>
          <Tag variant="warning">Warning</Tag>
          <Tag variant="error">Error</Tag>
          <Tag variant="info">Info</Tag>
          <Tag variant="outline">Outline</Tag>
          <Tag variant="ghost">Ghost</Tag>
        </div>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          <Tag size="sm" variant="primary">Small</Tag>
          <Tag size="md" variant="primary">Medium</Tag>
          <Tag size="lg" variant="primary">Large</Tag>
        </div>
      </section>

      {/* Rounded Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Rounded Variants</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="primary" rounded={false}>Square</Tag>
          <Tag variant="primary" rounded={true}>Rounded</Tag>
          <Tag variant="success" rounded={true}>Success Rounded</Tag>
          <Tag variant="warning" rounded={true}>Warning Rounded</Tag>
        </div>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">With Icons</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="primary" icon={<FaUser />}>User</Tag>
          <Tag variant="success" icon={<FaCheck />} iconPosition="right">Verified</Tag>
          <Tag variant="warning" icon={<FaExclamationTriangle />}>Warning</Tag>
          <Tag variant="info" icon={<FaStar />}>Featured</Tag>
          <Tag variant="error" icon={<FaHeart />}>Favorite</Tag>
          <Tag variant="secondary" showDefaultIcon>Default Icon</Tag>
        </div>
      </section>

      {/* Clickable Tags */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Clickable Tags</h2>
        <div className="flex flex-wrap gap-3">
          <Tag 
            variant="primary" 
            clickable 
            pressed={pressedTags.has(1)}
            onClick={() => {
              handleTagClick("Primary Tag");
              handleTagPress(1);
            }}
          >
            Click Me
          </Tag>
          <Tag 
            variant="success" 
            clickable 
            icon={<FaStar />}
            pressed={pressedTags.has(2)}
            onClick={() => {
              handleTagClick("Star Tag");
              handleTagPress(2);
            }}
          >
            Star Tag
          </Tag>
          <Tag 
            variant="warning" 
            clickable 
            rounded
            pressed={pressedTags.has(3)}
            onClick={() => {
              handleTagClick("Rounded Tag");
              handleTagPress(3);
            }}
          >
            Rounded Clickable
          </Tag>
        </div>
        {clickedTag && (
          <div className="mt-2 p-2 bg-blue-100 text-blue-800 rounded-md">
            {clickedTag}
          </div>
        )}
      </section>

      {/* Dismissible Tags */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Dismissible Tags</h2>
        <div className="flex flex-wrap gap-3">
          {tags.map(tag => (
            <Tag
              key={tag.id}
              variant={tag.variant}
              dismissible
              onDismiss={() => handleTagDismiss(tag.id)}
            >
              {tag.text}
            </Tag>
          ))}
        </div>
        <button
          onClick={() => setTags([
            { id: 1, text: "React", variant: "primary" as const },
            { id: 2, text: "TypeScript", variant: "secondary" as const },
            { id: 3, text: "Tailwind CSS", variant: "success" as const },
            { id: 4, text: "Frontend", variant: "info" as const },
          ])}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset Tags
        </button>
      </section>

      {/* Loading States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Loading States</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="primary" loading>Loading...</Tag>
          <Tag variant="success" loading icon={<FaCheck />}>Processing</Tag>
          <Tag variant="warning" loading rounded>Updating</Tag>
          <Tag 
            variant="info" 
            loading={loadingTag === 1}
            clickable
            onClick={() => handleLoadingTag(1)}
          >
            Click to Load
          </Tag>
        </div>
      </section>

      {/* Disabled States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Disabled States</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="primary" disabled>Disabled</Tag>
          <Tag variant="success" disabled icon={<FaCheck />}>Disabled with Icon</Tag>
          <Tag variant="warning" disabled clickable>Disabled Clickable</Tag>
          <Tag variant="error" disabled dismissible>Disabled Dismissible</Tag>
        </div>
      </section>

      {/* Truncation and Max Width */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Truncation & Max Width</h2>
        <div className="flex flex-wrap gap-3">
          <Tag variant="primary" maxWidth={120} truncate>
            Very Long Tag Text That Will Be Truncated
          </Tag>
          <Tag variant="success" maxWidth={100} truncate>
            Another Long Tag
          </Tag>
          <Tag variant="warning" maxWidth={80} truncate>
            Long Tag
          </Tag>
        </div>
      </section>

      {/* Pressed State Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Pressed State Demo</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-3">
            Click tags to see them change to pressed state (bold background and shadow)
          </p>
          <div className="flex flex-wrap gap-3">
            <Tag 
              variant="primary" 
              clickable 
              pressed={pressedTags.has(4)}
              onClick={() => handleTagPress(4)}
            >
              Toggle Pressed
            </Tag>
            <Tag 
              variant="success" 
              clickable 
              rounded
              pressed={pressedTags.has(5)}
              onClick={() => handleTagPress(5)}
            >
              Rounded Pressed
            </Tag>
            <Tag 
              variant="warning" 
              clickable 
              icon={<FaStar />}
              pressed={pressedTags.has(6)}
              onClick={() => handleTagPress(6)}
            >
              Star Pressed
            </Tag>
          </div>
          <div className="mt-3 text-sm text-gray-600">
            <p>Pressed tags have: <strong>bold text</strong>, <strong>deeper shadow</strong>, and <strong>slightly larger size</strong></p>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Interactive Demo</h2>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-3">
            Try clicking on tags, dismissing them, or using keyboard navigation (Tab + Enter/Space)
          </p>
          <div className="flex flex-wrap gap-3">
            <Tag 
              variant="primary" 
              clickable 
              icon={<FaUser />}
              onClick={() => alert("User tag clicked!")}
            >
              Interactive User
            </Tag>
            <Tag 
              variant="success" 
              clickable 
              dismissible
              icon={<FaCheck />}
              onClick={() => alert("Success tag clicked!")}
              onDismiss={() => alert("Success tag dismissed!")}
            >
              Interactive Success
            </Tag>
            <Tag 
              variant="warning" 
              clickable 
              rounded
              onClick={() => alert("Warning tag clicked!")}
            >
              Interactive Warning
            </Tag>
          </div>
        </div>
      </section>

      {/* Accessibility Features */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">Accessibility Features</h2>
        <div className="p-4 bg-blue-50 rounded-lg">
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Proper ARIA labels for dismissible tags</li>
            <li>• Keyboard navigation support (Tab, Enter, Space)</li>
            <li>• Focus management with visible focus rings</li>
            <li>• Screen reader friendly with proper roles</li>
            <li>• High contrast color schemes</li>
            <li>• Proper button semantics for interactive tags</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
