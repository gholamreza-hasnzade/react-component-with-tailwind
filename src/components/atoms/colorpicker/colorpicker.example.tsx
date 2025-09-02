import React, { useState } from "react";
import { ColorPicker } from "./colorpicker";

export const ColorPickerExamples = () => {
  const [basicColor, setBasicColor] = useState("#3B82F6");
  const [advancedColor, setAdvancedColor] = useState("#EF4444");
  const [formColor, setFormColor] = useState("#10B981");
  const [disabledColor, setDisabledColor] = useState("#8B5CF6");
  const [errorColor, setErrorColor] = useState("#F59E0B");


  return (
    <div className="p-8 space-y-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">ColorPicker Component Examples</h1>
        
        {/* Basic Usage */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Usage</h2>
          <div className="space-y-4">
            <ColorPicker
              id="basic-color"
              label="Choose a color"
              value={basicColor}
              onChange={setBasicColor}
              helperText="This is a basic color picker with default settings"
            />
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">Selected color: <span className="font-mono">{basicColor}</span></p>
            </div>
          </div>
        </section>

        {/* Different Sizes */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Different Sizes</h2>
          <div className="space-y-4">
            <ColorPicker
              id="small-color"
              label="Small Size"
              size="sm"
              value="#3B82F6"
              onChange={() => {}}
            />
            <ColorPicker
              id="medium-color"
              label="Medium Size (Default)"
              size="md"
              value="#3B82F6"
              onChange={() => {}}
            />
            <ColorPicker
              id="large-color"
              label="Large Size"
              size="lg"
              value="#3B82F6"
              onChange={() => {}}
            />
          </div>
        </section>

        {/* Different Variants */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Different Variants</h2>
          <div className="space-y-4">
            <ColorPicker
              id="contained-color"
              label="Contained Variant"
              variant="contained"
              value="#3B82F6"
              onChange={() => {}}
            />
            <ColorPicker
              id="outlined-color"
              label="Outlined Variant (Default)"
              variant="outlined"
              value="#3B82F6"
              onChange={() => {}}
            />
            <ColorPicker
              id="text-color"
              label="Text Variant"
              variant="text"
              value="#3B82F6"
              onChange={() => {}}
            />
          </div>
        </section>

        {/* Different Colors */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Different Colors</h2>
          <div className="space-y-4">
            <ColorPicker
              id="primary-color"
              label="Primary Color"
              color="primary"
              value="#3B82F6"
              onChange={() => {}}
            />
            <ColorPicker
              id="success-color"
              label="Success Color"
              color="success"
              value="#10B981"
              onChange={() => {}}
            />
            <ColorPicker
              id="warning-color"
              label="Warning Color"
              color="warning"
              value="#F59E0B"
              onChange={() => {}}
            />
            <ColorPicker
              id="error-color"
              label="Error Color"
              color="error"
              value="#EF4444"
              onChange={() => {}}
            />
          </div>
        </section>

        {/* Advanced Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Advanced Configuration</h2>
          <div className="space-y-4">
            <ColorPicker
              id="advanced-color"
              label="Advanced Color Picker"
              value={advancedColor}
              onChange={setAdvancedColor}
              format="rgb"
              showFormatSelector={true}
              showInput={true}
              showPreview={true}
              fullWidth={true}
              helperText="This color picker has all features enabled"
            />
            <div className="p-4 bg-gray-100 rounded-md">
              <p className="text-sm text-gray-600">Selected color: <span className="font-mono">{advancedColor}</span></p>
            </div>
          </div>
        </section>

        {/* Form Integration */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Form Integration</h2>
          <form className="space-y-4">
            <ColorPicker
              id="form-color"
              label="Theme Color"
              value={formColor}
              onChange={setFormColor}
              required={true}
              helperText="This field is required"
            />
            <div className="flex gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Submit
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>

        {/* Disabled State */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Disabled State</h2>
          <div className="space-y-4">
            <ColorPicker
              id="disabled-color"
              label="Disabled Color Picker"
              value={disabledColor}
              onChange={setDisabledColor}
              disabled={true}
              helperText="This color picker is disabled"
            />
            <ColorPicker
              id="readonly-color"
              label="Read Only Color Picker"
              value="#8B5CF6"
              onChange={() => {}}
              readOnly={true}
              helperText="This color picker is read only"
            />
          </div>
        </section>

        {/* Error State */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Error State</h2>
          <ColorPicker
            id="error-color"
            label="Color with Error"
            value={errorColor}
            onChange={setErrorColor}
            error="Please select a valid color"
            helperText="This shows an error state"
          />
        </section>



        {/* Minimal Configuration */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Minimal Configuration</h2>
          <div className="space-y-4">
            <ColorPicker
              id="minimal-color"
              value="#3B82F6"
              onChange={() => {}}
              showInput={false}
              showFormatSelector={false}
            />
            <ColorPicker
              id="preview-only"
              value="#3B82F6"
              onChange={() => {}}
              showInput={false}
              showFormatSelector={false}
              label="Preview Only"
            />
          </div>
        </section>

        {/* Format Examples */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Different Formats</h2>
          <div className="space-y-4">
            <ColorPicker
              id="hex-format"
              label="HEX Format"
              value="#3B82F6"
              onChange={() => {}}
              format="hex"
            />
            <ColorPicker
              id="rgb-format"
              label="RGB Format"
              value="#3B82F6"
              onChange={() => {}}
              format="rgb"
            />
            <ColorPicker
              id="hsl-format"
              label="HSL Format"
              value="#3B82F6"
              onChange={() => {}}
              format="hsl"
            />
          </div>
        </section>

        {/* Full Width */}
        <section className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Full Width</h2>
          <ColorPicker
            id="fullwidth-color"
            label="Full Width Color Picker"
            value="#3B82F6"
            onChange={() => {}}
            fullWidth={true}
            helperText="This color picker takes the full width of its container"
          />
        </section>
      </div>
    </div>
  );
};
