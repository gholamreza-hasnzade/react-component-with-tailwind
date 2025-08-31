import React, { useState } from "react";
import { Input } from "./input";
import {
  HiEye,
  HiEyeOff,
  HiSearch,
  HiMail,
  HiPhone,
  HiCreditCard,
  HiCurrencyDollar,
  HiIdentification,
  HiLocationMarker,
} from "react-icons/hi";

export const InputExample: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    creditCard: "",
    bankAccount: "",
    nationalId: "",
    postalCode: "",
    customFormat: "",
    customPattern: "",
    search: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  const handleIconClick = (field: string) => () => {
    console.log(`${field} icon clicked!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Input Component Examples
          </h1>
          <p className="text-lg text-gray-600">
            A comprehensive showcase of the Input component with all its
            features
          </p>
        </div>

        {/* Basic Inputs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            📝 Basic Inputs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="name"
              variant="outlined"
              label="Full assafName"
              value={formData.name}
              onChange={handleChange("name")}
              placeholder="Enter your full name"
              required
              helperText="Please enter your legal name as it appears on official documents"
            />

            <Input
              id="email"
              label="Email Address"
              variant="contained"
              value={formData.email}
              onChange={handleChange("email")}
              placeholder="Enter your email"
              type="email"
              required
              iconLeft={<HiMail className="w-5 h-5 text-gray-400" />}
              onIconLeftClick={handleIconClick("email")}
              helperText="We'll never share your email with anyone else"
            />
          </div>
        </div>

        {/* Input Variants & Colors */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎨 Input Variants & Colors
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Primary Variants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Input
                  id="primary-contained"
                  label="Contained"
                  value="Primary Contained"
                  onChange={() => {}}
                  variant="contained"
                  color="primary"
                  readOnly
                />
                <Input
                  id="primary-outlined"
                  label="Outlined"
                  value="Primary Outlined"
                  onChange={() => {}}
                  variant="outlined"
                  color="primary"
                  readOnly
                />
                <Input
                  id="primary-text"
                  label="Text"
                  value="Primary Text"
                  onChange={() => {}}
                  variant="text"
                  color="primary"
                  readOnly
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Color Variants
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Input
                  id="success"
                  label="Success"
                  value="Success Input"
                  onChange={() => {}}
                  color="success"
                  readOnly
                />
                <Input
                  id="error"
                  label="Error"
                  value="Error Input"
                  onChange={() => {}}
                  color="error"
                  readOnly
                />
                <Input
                  id="warning"
                  label="Warning"
                  value="Warning Input"
                  onChange={() => {}}
                  color="warning"
                  readOnly
                />
                <Input
                  id="info"
                  label="Info"
                  value="Info Input"
                  onChange={() => {}}
                  color="info"
                  readOnly
                />
                <Input
                  id="secondary"
                  label="Secondary"
                  value="Secondary Input"
                  onChange={() => {}}
                  color="secondary"
                  readOnly
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              id="small"
              label="Small Input"
              value="Small size"
              onChange={() => {}}
              size="sm"
              readOnly
            />
            <Input
              id="medium"
              label="Medium Input"
              value="Medium size (default)"
              onChange={() => {}}
              size="md"
              readOnly
            />
            <Input
              id="large"
              label="Large Input"
              value="Large size"
              onChange={() => {}}
              size="lg"
              readOnly
            />
          </div>
        </div>

        {/* Numeric Formatting */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🔢 Numeric Formatting
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="creditCard"
              label="Credit Card Number"
              value={formData.creditCard}
              onChange={handleChange("creditCard")}
              type="number"
              formatPattern="credit-card"
              iconLeft={<HiCreditCard className="w-5 h-5 text-gray-400" />}
              helperText="Enter your 16-digit credit card number"
            />

            <Input
              id="bankAccount"
              label="Bank Account Number"
              value={formData.bankAccount}
              onChange={handleChange("bankAccount")}
              type="number"
              formatPattern="bank-account"
              iconLeft={<HiCurrencyDollar className="w-5 h-5 text-gray-400" />}
              helperText="Enter your bank account number"
            />

            <Input
              id="nationalId"
              label="National ID"
              value={formData.nationalId}
              onChange={handleChange("nationalId")}
              type="number"
              formatPattern="national-id"
              iconLeft={<HiIdentification className="w-5 h-5 text-gray-400" />}
              helperText="Enter your national identification number"
            />

            <Input
              id="postalCode"
              label="Postal Code"
              value={formData.postalCode}
              onChange={handleChange("postalCode")}
              type="number"
              formatPattern="postal-code"
              iconLeft={<HiLocationMarker className="w-5 h-5 text-gray-400" />}
              helperText="Enter your postal/zip code"
            />
          </div>
        </div>

        {/* Custom Format */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎯 Custom Format
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="customFormat"
              label="Custom Format (##-###-####)"
              value={formData.customFormat}
              onChange={handleChange("customFormat")}
              type="number"
              formatPattern="custom"
              customFormat="##-###-####"
              helperText="Custom format: 2 digits, 3 digits, 4 digits"
            />

            <Input
              id="phone"
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange("phone")}
              type="number"
              formatPattern="custom"
              customFormat="###-###-####"
              iconLeft={<HiPhone className="w-5 h-5 text-gray-400" />}
              helperText="Format: XXX-XXX-XXXX"
            />
          </div>
        </div>

        {/* Pattern Validation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ✅ Pattern Validation
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="customPattern"
              label="Custom Pattern (Email-like)"
              value={formData.customPattern}
              onChange={handleChange("customPattern")}
              patternRgx="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              patternErrorMessage="Please enter a valid email address"
              placeholder="Enter email address"
              helperText="This input validates against a custom regex pattern"
            />

            <Input
              id="search"
              label="Search with Icon"
              value={formData.search}
              onChange={handleChange("search")}
              placeholder="Search for anything..."
              iconLeft={<HiSearch className="w-5 h-5 text-gray-400" />}
              onIconLeftClick={handleIconClick("search")}
              helperText="Click the search icon to perform search"
            />
          </div>
        </div>

        {/* Interactive Examples */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🎮 Interactive Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="password"
              label="Password with Toggle"
              value={formData.password}
              onChange={handleChange("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              required
              iconRight={
                showPassword ? (
                  <HiEyeOff className="w-5 h-5 text-gray-400" />
                ) : (
                  <HiEye className="w-5 h-5 text-gray-400" />
                )
              }
              onIconRightClick={() => setShowPassword(!showPassword)}
              helperText="Click the eye icon to toggle password visibility"
            />

            <Input
              id="fullWidth"
              label="Full Width Input"
              value="This input takes the full width of its container"
              onChange={() => {}}
              fullWidth
              readOnly
              helperText="This input demonstrates the fullWidth prop"
            />
          </div>
        </div>

        {/* Error States */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            ❌ Error States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="errorExample"
              label="Input with Error"
              value="Invalid input"
              onChange={() => {}}
              error="This field has an error message"
              readOnly
            />

            <Input
              id="validationError"
              label="Pattern Validation Error"
              value="invalid-email"
              onChange={() => {}}
              patternRgx="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              patternErrorMessage="Please enter a valid email address"
              readOnly
            />
          </div>
        </div>

        {/* Read-only & Disabled */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            🔒 Read-only & Disabled States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="readOnly"
              label="Read-only Input"
              value="This value cannot be changed"
              onChange={() => {}}
              readOnly
              helperText="This input is read-only and cannot be modified"
            />

            <Input
              id="disabled"
              label="Disabled Input"
              value="This input is disabled"
              onChange={() => {}}
              disabled
              helperText="This input is disabled and cannot be interacted with"
            />
          </div>
        </div>

        {/* Form Preview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">📋 Form Data Preview</h2>
          <div className="bg-white/20 rounded-lg p-4">
            <pre className="text-sm overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">💻 Usage Instructions</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-medium text-blue-300 mb-2">Basic Usage:</h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`<Input
  id="example"
  label="Example Label"
  value={value}
  onChange={handleChange}
  placeholder="Enter text..."
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-green-300 mb-2">
                With Numeric Formatting:
              </h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`<Input
  id="creditCard"
  label="Credit Card"
  value={creditCard}
  onChange={handleChange}
  type="number"
  formatPattern="credit-card"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-yellow-300 mb-2">
                With Custom Format:
              </h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`<Input
  id="phone"
  label="Phone Number"
  value={phone}
  onChange={handleChange}
  type="number"
  formatPattern="custom"
  customFormat="###-###-####"
/>`}
              </pre>
            </div>

            <div>
              <h3 className="font-medium text-purple-300 mb-2">
                With Pattern Validation:
              </h3>
              <pre className="bg-gray-800 p-3 rounded overflow-x-auto">
                {`<Input
  id="email"
  label="Email"
  value={email}
  onChange={handleChange}
  patternRgx="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
  patternErrorMessage="Please enter a valid email"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputExample;
