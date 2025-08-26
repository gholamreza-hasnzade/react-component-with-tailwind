import React, { useState } from "react";
import { Modal } from "./modal";
import { Button } from "@/components/atoms/button/button";
import { Input } from "@/components/atoms/input/input";
import { Badge } from "@/components/atoms/badge/badge";
import { FaBell, FaUser, FaCog, FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";

export const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", email: "" });

  const openModal = (type: string) => {
    setModalType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType("");
    setFormData({ name: "", email: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    closeModal();
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "simple":
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
              <FaInfoCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Simple Information Modal
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This is a simple modal with just content and no footer.
            </p>
            <Button onClick={closeModal} variant="contained">
              Got it!
            </Button>
          </div>
        );

      case "form":
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                label="Name"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <Input
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
          </form>
        );

      case "confirmation":
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <FaExclamationTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Delete Account
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Are you sure you want to delete your account? This action cannot be undone.
            </p>
          </div>
        );

      case "large":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Feature 1</h4>
                <p className="text-sm text-gray-600">
                  This is a detailed description of the first feature.
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Feature 2</h4>
                <p className="text-sm text-gray-600">
                  This is a detailed description of the second feature.
                </p>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
              <p className="text-sm text-blue-700">
                This modal demonstrates the large size variant with complex content layout.
              </p>
            </div>
          </div>
        );

      case "no-backdrop":
        return (
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <FaUser className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Backdrop Modal
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              This modal has no backdrop and won't close on backdrop click.
            </p>
            <Button onClick={closeModal} variant="contained">
              Close
            </Button>
          </div>
        );

      case "custom-footer":
        return (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-amber-50 rounded-lg">
              <FaBell className="h-5 w-5 text-amber-600" />
              <div>
                <h4 className="font-medium text-amber-900">Notification Settings</h4>
                <p className="text-sm text-amber-700">
                  Configure your notification preferences
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Email notifications</span>
                <Badge variant="success" showDot>Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Push notifications</span>
                <Badge variant="warning" showDot>Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">SMS notifications</span>
                <Badge variant="error" showDot>Disabled</Badge>
              </div>
            </div>
          </div>
        );

      case "footer-control":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Footer Control Demo
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This modal demonstrates different footer visibility scenarios
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Scenario 1: No Footer</h4>
                <p className="text-sm text-blue-700 mb-3">
                  When no footer prop is provided, the footer section is completely hidden.
                </p>
                <div className="text-xs text-blue-600">
                  <code>footer=&#123;undefined&#125;</code> or no footer prop
                </div>
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Scenario 2: Simple Footer</h4>
                <p className="text-sm text-green-700 mb-3">
                  Footer with basic content like a single button.
                </p>
                <div className="text-xs text-green-600">
                  <code>footer=&#123;&lt;Button&gt;Close&lt;/Button&gt;&#125;</code>
                </div>
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 mb-2">Scenario 3: Complex Footer</h4>
                <p className="text-sm text-purple-700 mb-3">
                  Footer with multiple actions, status info, or complex layouts.
                </p>
                <div className="text-xs text-purple-600">
                  <code>footer=&#123;&lt;ComplexFooterContent /&gt;&#125;</code>
                </div>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900 mb-2">Scenario 4: Conditional Footer</h4>
                <p className="text-sm text-orange-700 mb-3">
                  Footer that shows/hides based on application state.
                </p>
                <div className="text-xs text-orange-600">
                  <code>footer=&#123;showFooter ? &lt;FooterContent /&gt; : undefined&#125;</code>
                </div>
              </div>
            </div>
          </div>
        );

      case "scrollable":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Scrollable Content Modal
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                This modal demonstrates scrolling content and responsive design
              </p>
            </div>
            
            {/* Long content to demonstrate scrolling */}
            {Array.from({ length: 20 }, (_, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Section {i + 1}
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  This is section {i + 1} of the scrollable content. Each section contains different information
                  to demonstrate how the modal handles overflow content.
                </p>
                <div className="flex items-center space-x-2">
                  <Badge variant="primary" size="sm">Tag {i + 1}</Badge>
                  <Badge variant="secondary" size="sm">Category {i + 1}</Badge>
                </div>
              </div>
            ))}
            
            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
              <h4 className="font-medium text-blue-900 mb-2">Important Note</h4>
              <p className="text-sm text-blue-700">
                This modal uses the <code>scrollable</code> prop to enable content scrolling when content exceeds the modal height.
                It also demonstrates responsive design with mobile-first approach.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderModalFooter = () => {
    switch (modalType) {
      case "form":
        return (
          <>
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          </>
        );

      case "confirmation":
        return (
          <>
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={closeModal}>
              Delete Account
            </Button>
          </>
        );

      case "custom-footer":
        return (
          <>
            <Button variant="text" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="outlined" onClick={closeModal}>
              Reset
            </Button>
            <Button variant="contained" onClick={closeModal}>
              Save Changes
            </Button>
          </>
        );

      default:
        return null;
    }
  };

  const getModalProps = () => {
    const baseProps = {
      isOpen,
      onClose: closeModal,
      showCloseButton: modalType !== "no-backdrop",
      closeOnBackdropClick: modalType !== "no-backdrop",
    };

    switch (modalType) {
      case "simple":
        return {
          ...baseProps,
          title: "Information",
          size: "sm" as const,
        };

      case "form":
        return {
          ...baseProps,
          title: "User Registration",
          size: "md" as const,
          footer: renderModalFooter(),
        };

      case "confirmation":
        return {
          ...baseProps,
          title: "Confirm Action",
          size: "md" as const,
          footer: renderModalFooter(),
        };

      case "large":
        return {
          ...baseProps,
          title: "Feature Overview",
          size: "xl" as const,
          footer: (
            <Button variant="contained" onClick={closeModal}>
              Got it!
            </Button>
          ),
        };

      case "no-backdrop":
        return {
          ...baseProps,
          title: "User Profile",
          size: "md" as const,
          showBackdrop: false,
          closeOnBackdropClick: false,
        };

      case "custom-footer":
        return {
          ...baseProps,
          title: "Settings",
          size: "lg" as const,
          footer: renderModalFooter(),
        };

      case "footer-control":
        return {
          ...baseProps,
          title: "Footer Control Examples",
          size: "xl" as const,
          // No footer prop - demonstrates hidden footer
        };

      case "scrollable":
        return {
          ...baseProps,
          title: "Scrollable Content",
          size: "lg" as const,
          scrollable: true,
          fullscreenOnMobile: true,
          footer: (
            <div className="flex items-center justify-between w-full">
              <div className="text-sm text-gray-500">
                Total sections: 20
              </div>
              <div className="flex gap-2">
                <Button variant="outlined" size="sm" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="contained" size="sm" onClick={closeModal}>
                  Save Changes
                </Button>
              </div>
            </div>
          ),
        };

      default:
        return baseProps;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Modal Component Examples</h2>
        <p className="text-gray-600">
          Click the buttons below to see different modal variants and features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Button
          variant="contained"
          onClick={() => openModal("simple")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaInfoCircle className="h-5 w-5" />
          <span>Simple Modal</span>
        </Button>

        <Button
          variant="outlined"
          onClick={() => openModal("form")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaUser className="h-5 w-5" />
          <span>Form Modal</span>
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={() => openModal("confirmation")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaExclamationTriangle className="h-5 w-5" />
          <span>Confirmation</span>
        </Button>

        <Button
          variant="outlined"
          onClick={() => openModal("large")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaCog className="h-5 w-5" />
          <span>Large Modal</span>
        </Button>

        <Button
          variant="text"
          onClick={() => openModal("no-backdrop")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaBell className="h-5 w-5" />
          <span>No Backdrop</span>
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={() => openModal("custom-footer")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaCog className="h-5 w-5" />
          <span>Custom Footer</span>
        </Button>

        <Button
          variant="outlined"
          color="warning"
          onClick={() => openModal("footer-control")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaCog className="h-5 w-5" />
          <span>Footer Control</span>
        </Button>

        <Button
          variant="contained"
          color="info"
          onClick={() => openModal("scrollable")}
          className="h-20 flex flex-col items-center justify-center space-y-2"
        >
          <FaCog className="h-5 w-5" />
          <span>Scrollable Modal</span>
        </Button>
      </div>

      {/* Modal */}
      <Modal {...getModalProps()}>
        {renderModalContent()}
      </Modal>

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium text-gray-900 mb-2">Features Demonstrated:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Different sizes: sm, md, lg, xl</li>
          <li>• Form handling with controlled inputs</li>
          <li>• Custom footers with multiple buttons</li>
          <li>• Footer visibility control (show/hide)</li>
          <li>• Content scrolling for overflow</li>
          <li>• Responsive design (mobile-first)</li>
          <li>• Escape key handling</li>
          <li>• Focus management and accessibility</li>
          <li>• Body scroll prevention</li>
          <li>• Smooth animations</li>
        </ul>
      </div>
    </div>
  );
};
