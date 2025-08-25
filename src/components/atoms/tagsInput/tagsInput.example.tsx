import React, { useState } from "react";
import { TagsInput, type Tag } from "./tagsInput";

export const TagsInputExample: React.FC = () => {
  const [tags, setTags] = useState<Tag[]>([
    { id: "1", label: "React", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { id: "2", label: "TypeScript", color: "bg-blue-100 text-blue-800 border-blue-200" },
    { id: "3", label: "Tailwind CSS", color: "bg-cyan-100 text-cyan-800 border-cyan-200" },
  ]);

  const [skillTags, setSkillTags] = useState<Tag[]>([]);
  const [categoryTags, setCategoryTags] = useState<Tag[]>([]);
  const [emailTags, setEmailTags] = useState<Tag[]>([]);
  const [limitedTags, setLimitedTags] = useState<Tag[]>([]);
  const [requiredTags, setRequiredTags] = useState<Tag[]>([]);
  const [customTags, setCustomTags] = useState<Tag[]>([]);

  const handleTagAdd = (tag: Tag) => {
    console.log("Tag added:", tag);
  };

  const handleTagRemove = (tag: Tag) => {
    console.log("Tag removed:", tag);
  };

  const handleTagUpdate = (oldTag: Tag, newTag: Tag) => {
    console.log("Tag updated:", { old: oldTag, new: newTag });
  };

  // Custom validation function
  const validateEmail = (tag: string): string | null => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(tag)) {
      return "Please enter a valid email address";
    }
    return null;
  };

  // Custom validation for skills (no numbers, minimum 2 characters)
  const validateSkill = (tag: string): string | null => {
    if (tag.length < 2) {
      return "Skill must be at least 2 characters long";
    }
    if (/\d/.test(tag)) {
      return "Skill cannot contain numbers";
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            TagsInput Component Examples
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive showcase of the TagsInput component with all its features
          </p>
        </div>

        {/* Basic TagsInput */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📝 Basic TagsInput
          </h2>
          <div className="space-y-6">
            <TagsInput
              id="basic-tags"
              label="Programming Languages"
              value={tags}
              onChange={setTags}
              placeholder="Add programming languages..."
              helperText="Type and press Enter to add tags. Click on tags to edit them."
              allowEdit={true}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
              onTagUpdate={handleTagUpdate}
            />

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Current Tags:</h3>
              <pre className="text-xs text-gray-600 overflow-x-auto">
                {JSON.stringify(tags, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        {/* Input Variants & Colors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎨 Input Variants & Colors
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Primary Variants</h3>
              <div className="space-y-4">
                <TagsInput
                  id="primary-contained"
                  label="Contained Style"
                  value={[]}
                  onChange={() => {}}
                  variant="contained"
                  color="primary"
                  placeholder="Try adding some tags..."
                  helperText="Contained variant with primary color"
                />
                <TagsInput
                  id="primary-outlined"
                  label="Outlined Style"
                  value={[]}
                  onChange={() => {}}
                  variant="outlined"
                  color="primary"
                  placeholder="Try adding some tags..."
                  helperText="Outlined variant with primary color"
                />
                <TagsInput
                  id="primary-text"
                  label="Text Style"
                  value={[]}
                  onChange={() => {}}
                  variant="text"
                  color="primary"
                  placeholder="Try adding some tags..."
                  helperText="Text variant with primary color"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">Color Variants</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TagsInput
                  id="success"
                  label="Success Style"
                  value={[]}
                  onChange={() => {}}
                  color="success"
                  placeholder="Success tags..."
                  helperText="Success color variant"
                />
                <TagsInput
                  id="error"
                  label="Error Style"
                  value={[]}
                  onChange={() => {}}
                  color="error"
                  placeholder="Error tags..."
                  helperText="Error color variant"
                />
                <TagsInput
                  id="warning"
                  label="Warning Style"
                  value={[]}
                  onChange={() => {}}
                  color="warning"
                  placeholder="Warning tags..."
                  helperText="Warning color variant"
                />
                <TagsInput
                  id="info"
                  label="Info Style"
                  value={[]}
                  onChange={() => {}}
                  color="info"
                  placeholder="Info tags..."
                  helperText="Info color variant"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input Sizes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📏 Input Sizes
          </h2>
          <div className="space-y-4">
            <TagsInput
              id="small"
              label="Small Size"
              value={[]}
              onChange={() => {}}
              size="sm"
              placeholder="Small tags..."
              helperText="Small size variant"
            />
            <TagsInput
              id="medium"
              label="Medium Size (Default)"
              value={[]}
              onChange={() => {}}
              size="md"
              placeholder="Medium tags..."
              helperText="Medium size variant (default)"
            />
            <TagsInput
              id="large"
              label="Large Size"
              value={[]}
              onChange={() => {}}
              size="lg"
              placeholder="Large tags..."
              helperText="Large size variant"
            />
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🚀 Advanced Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TagsInput
              id="skill-tags"
              label="Skills (with validation)"
              value={skillTags}
              onChange={setSkillTags}
              placeholder="Add your skills..."
              helperText="Skills must be at least 2 characters and contain no numbers"
              validateTag={validateSkill}
              allowEdit={true}
              allowDelete={true}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />

            <TagsInput
              id="category-tags"
              label="Categories (no duplicates)"
              value={categoryTags}
              onChange={setCategoryTags}
              placeholder="Add categories..."
              helperText="Duplicate categories are not allowed"
              allowDuplicates={false}
              allowEdit={true}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />

            <TagsInput
              id="email-tags"
              label="Email Addresses"
              value={emailTags}
              onChange={setEmailTags}
              placeholder="Add email addresses..."
              helperText="Only valid email addresses are accepted"
              validateTag={validateEmail}
              separator=";"
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />

            <TagsInput
              id="custom-tags"
              label="Custom Separator (Space)"
              value={customTags}
              onChange={setCustomTags}
              placeholder="Type and press Space to add tags..."
              helperText="Use Space key instead of Enter to add tags"
              separator=" "
              trimWhitespace={false}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />
          </div>
        </div>

        {/* Limits and Constraints */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🔒 Limits and Constraints
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TagsInput
              id="limited-tags"
              label="Limited Tags (Max 5)"
              value={limitedTags}
              onChange={setLimitedTags}
              placeholder="Add up to 5 tags..."
              helperText="Maximum 5 tags allowed"
              maxTags={5}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />

            <TagsInput
              id="required-tags"
              label="Required Tags (Min 3)"
              value={requiredTags}
              onChange={setRequiredTags}
              placeholder="Add at least 3 tags..."
              helperText="Minimum 3 tags required"
              minTags={3}
              required
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
            />
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎮 Interactive Examples
          </h2>
          <div className="space-y-6">
            <TagsInput
              id="editable-tags"
              label="Editable Tags (Click to edit)"
              value={tags}
              onChange={setTags}
              placeholder="Add tags and click to edit..."
              helperText="Click on any tag to edit it. Press Enter to save or Escape to cancel."
              allowEdit={true}
              allowDelete={true}
              onTagAdd={handleTagAdd}
              onTagRemove={handleTagRemove}
              onTagUpdate={handleTagUpdate}
            />

            <TagsInput
              id="readonly-tags"
              label="Read-only Tags"
              value={tags}
              onChange={() => {}}
              placeholder="This input is read-only..."
              helperText="This input is read-only and cannot be modified"
              readOnly
            />

            <TagsInput
              id="disabled-tags"
              label="Disabled Tags"
              value={tags}
              onChange={() => {}}
              placeholder="This input is disabled..."
              helperText="This input is disabled and cannot be interacted with"
              disabled
            />
          </div>
        </div>

        {/* Full Width Example */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📐 Full Width Example
          </h2>
          <TagsInput
            id="fullwidth-tags"
            label="Full Width TagsInput"
            value={[]}
            onChange={() => {}}
            placeholder="This input takes the full width..."
            helperText="This demonstrates the fullWidth prop"
            fullWidth
            allowEdit={true}
          />
        </div>

        {/* Custom Tag Colors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎨 Custom Tag Colors
          </h2>
          <TagsInput
            id="custom-colors"
            label="Custom Color Tags"
            value={[]}
            onChange={() => {}}
            placeholder="Add tags with custom colors..."
            helperText="Each tag gets a different color from the custom palette"
            tagColors={[
              "bg-gradient-to-r from-purple-400 to-pink-400 text-white border-purple-500",
              "bg-gradient-to-r from-blue-400 to-cyan-400 text-white border-blue-500",
              "bg-gradient-to-r from-green-400 to-emerald-400 text-white border-green-500",
              "bg-gradient-to-r from-orange-400 to-red-400 text-white border-orange-500",
              "bg-gradient-to-r from-indigo-400 to-purple-400 text-white border-indigo-500",
            ]}
            allowEdit={true}
          />
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">
            💻 Usage Instructions
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-300 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`<TagsInput
  id="example"
  label="Example Label"
  value={tags}
  onChange={setTags}
  placeholder="Add tags..."
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-green-300 mb-2">With Validation:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`<TagsInput
  id="emails"
  label="Email Addresses"
  value={emailTags}
  onChange={setEmailTags}
  validateTag={(tag) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(tag) ? null : "Invalid email";
  }}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-yellow-300 mb-2">With Limits:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`<TagsInput
  id="skills"
  label="Skills"
  value={skillTags}
  onChange={setSkillTags}
  maxTags={10}
  minTags={3}
  allowDuplicates={false}
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-purple-300 mb-2">With Custom Styling:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
{`<TagsInput
  id="categories"
  label="Categories"
  value={categoryTags}
  onChange={setCategoryTags}
  variant="contained"
  color="success"
  size="lg"
  fullWidth
  allowEdit={true}
  allowDelete={true}
/>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Features Summary */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">
            ✨ Features Summary
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-200 mb-2">Core Features:</h3>
              <ul className="space-y-1 text-blue-100">
                <li>• Add/remove tags with keyboard shortcuts</li>
                <li>• Edit tags inline by clicking on them</li>
                <li>• Custom separators (Enter, comma, space, etc.)</li>
                <li>• Duplicate prevention</li>
                <li>• Tag validation with custom functions</li>
                <li>• Min/max tag limits</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-purple-200 mb-2">Styling & UX:</h3>
              <ul className="space-y-1 text-purple-100">
                <li>• Multiple variants (contained, outlined, text)</li>
                <li>• Color themes (primary, success, error, etc.)</li>
                <li>• Size options (sm, md, lg)</li>
                <li>• Custom tag colors and gradients</li>
                <li>• Responsive design with fullWidth option</li>
                <li>• Accessibility features (ARIA labels, keyboard navigation)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TagsInputExample;
