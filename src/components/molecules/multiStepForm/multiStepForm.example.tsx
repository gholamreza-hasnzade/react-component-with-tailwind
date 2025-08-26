import React, { useState } from "react";
import { MultiStepForm, type Step, type StepProps } from "./multiStepForm";
import { Input } from "@/components/atoms/input/input";
import { Select } from "@/components/atoms/select/select";
import { Checkbox } from "@/components/atoms/checkbox/checkbox";
import { Textarea } from "@/components/atoms/textarea/textarea";
import { useToast } from "@/components/atoms/toast/useToast";

// Step 1: Personal Information
const PersonalInfoStep: React.FC<StepProps> = ({ data, onDataChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            id="firstName"
            label="First Name *"
            value={(data.firstName as string) || ""}
            onChange={(e) => onDataChange({ firstName: e.target.value })}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div>
          <Input
            id="lastName"
            label="Last Name *"
            value={(data.lastName as string) || ""}
            onChange={(e) => onDataChange({ lastName: e.target.value })}
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>

      <div>
        <Input
          id="email"
          label="Email Address *"
          type="email"
          value={(data.email as string) || ""}
          onChange={(e) => onDataChange({ email: e.target.value })}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div>
        <Input
          id="phone"
          label="Phone Number"
          value={(data.phone as string) || ""}
          onChange={(e) => onDataChange({ phone: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>
    </div>
  );
};

// Step 2: Professional Information
const ProfessionalInfoStep: React.FC<StepProps> = ({ data, onDataChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Input
          id="company"
          label="Company *"
          value={(data.company as string) || ""}
          onChange={(e) => onDataChange({ company: e.target.value })}
          placeholder="Enter your company name"
          required
        />
      </div>

      <div>
        <Input
          id="position"
          label="Job Position *"
          value={(data.position as string) || ""}
          onChange={(e) => onDataChange({ position: e.target.value })}
          placeholder="Enter your job position"
          required
        />
      </div>

      <div>
        <Select
          id="department"
          label="Department"
          titleKey="label"
          valueKey="value"
          value={(data.department as string) || ""}
          onChange={(value) => onDataChange({ department: (value as { value: string }).value })}
          options={[
            { value: "", label: "Select department" },
            { value: "engineering", label: "Engineering" },
            { value: "marketing", label: "Marketing" },
            { value: "sales", label: "Sales" },
            { value: "hr", label: "Human Resources" },
            { value: "finance", label: "Finance" },
            { value: "other", label: "Other" }
          ]}
        />
      </div>

      <div>
        <Select
          id="experience"
          label="Years of Experience"
          titleKey="label"
          valueKey="value"
          value={(data.experience as string) || ""}
          onChange={(value) => onDataChange({ experience: (value as { value: string }).value })}
          options={[
            { value: "", label: "Select experience level" },
            { value: "0-1", label: "0-1 years" },
            { value: "2-3", label: "2-3 years" },
            { value: "4-5", label: "4-5 years" },
            { value: "6-10", label: "6-10 years" },
            { value: "10+", label: "10+ years" }
          ]}
        />
      </div>

      
    </div>
  );
};

// Step 3: Preferences
const PreferencesStep: React.FC<StepProps> = ({ data, onDataChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="space-y-2 mt-2">
          {[
            "Web Development",
            "Mobile Development",
            "Data Science",
            "AI/ML",
            "DevOps",
            "UI/UX",
          ].map((interest) => (
            <div key={interest} className="flex items-center space-x-2">
              <Checkbox
                id={interest}
                label={interest}
                checked={((data.interests as string[]) || []).includes(
                  interest
                )}
                onCheckedChange={(checked) => {
                  const currentInterests = (data.interests as string[]) || [];
                  if (checked) {
                    onDataChange({
                      interests: [...currentInterests, interest],
                    });
                  } else {
                    onDataChange({
                      interests: currentInterests.filter((i) => i !== interest),
                    });
                  }
                }}
              />
              
            </div>
          ))}
        </div>
      </div>

      <div>
        <Textarea
          id="bio"
          label="Bio"
          value={(data.bio as string) || ""}
          onChange={(e) => onDataChange({ bio: e.target.value })}
          placeholder="Tell us about yourself..."
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="newsletter"
          label="Subscribe to our newsletter for updates and insights"
          checked={(data.newsletter as boolean) || false}
          onCheckedChange={(checked) => onDataChange({ newsletter: checked })}
        />
        
      </div>
    </div>
  );
};

// Step 4: Review and Submit
const ReviewStep: React.FC<StepProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Name:</span> {(data.firstName as string) || ""}{" "}
            {(data.lastName as string) || ""}
          </div>
          <div>
            <span className="font-medium">Email:</span> {(data.email as string) || ""}
          </div>
          {(data.phone as string) && (
            <div>
              <span className="font-medium">Phone:</span> {(data.phone as string)}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">
          Professional Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium">Company:</span> {(data.company as string) || ""}
          </div>
          <div>
            <span className="font-medium">Position:</span> {(data.position as string) || ""}
          </div>
          {(data.department as string) && (
            <div>
              <span className="font-medium">Department:</span> {(data.department as string)}
            </div>
          )}
          {(data.experience as string) && (
            <div>
              <span className="font-medium">Experience:</span> {(data.experience as string)}
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-900 mb-3">Preferences</h3>
        <div className="space-y-2 text-sm">
          {(data.interests as string[]) && (data.interests as string[]).length > 0 && (
            <div>
              <span className="font-medium">Interests:</span>{" "}
              {(data.interests as string[]).join(", ")}
            </div>
          )}
          {(data.bio as string) && (
            <div>
              <span className="font-medium">Bio:</span> {(data.bio as string)}
            </div>
          )}
          <div>
            <span className="font-medium">Newsletter:</span>{" "}
            {(data.newsletter as boolean) ? "Yes" : "No"}
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Please review your information above. If everything looks correct,
          click Submit to complete your registration.
        </p>
      </div>
    </div>
  );
};

// Validation functions
const validatePersonalInfo = (data: Record<string, unknown>): boolean => {
  return !!(data.firstName && data.lastName && data.email);
};

const validateProfessionalInfo = (data: Record<string, unknown>): boolean => {
  return !!(data.company && data.position);
};

export const MultiStepFormExample: React.FC = () => {
  const { showSuccessToast } = useToast();
  const [isCompleted, setIsCompleted] = useState(false);

  const steps: Step[] = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Please provide your basic personal details",
      component: PersonalInfoStep,
      validation: validatePersonalInfo,
    },
    {
      id: "professional-info",
      title: "Professional Information",
      description: "Tell us about your work experience",
      component: ProfessionalInfoStep,
      validation: validateProfessionalInfo,
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Share your interests and preferences",
      component: PreferencesStep,
      isOptional: true,
    },
    {
      id: "review",
      title: "Review & Submit",
      description: "Review your information and submit",
      component: ReviewStep,
    },
  ];

  const handleComplete = async (finalData: Record<string, unknown>) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Form submitted with data:", finalData);
    setIsCompleted(true);

    showSuccessToast({
      title: "Success!",
      description: "Your registration has been completed successfully.",
    });
  };

  const handleStepChange = (
    stepIndex: number,
    stepData: Record<string, unknown>
  ) => {
    console.log(`Step ${stepIndex + 1} data:`, stepData);
  };

  if (isCompleted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Registration Complete!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for completing the registration form.
        </p>
        <button
          onClick={() => setIsCompleted(false)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Multi-Step Registration Form
          </h1>
          <p className="text-gray-600">
            Complete the form below to register for our platform
          </p>
        </div>

        <MultiStepForm
          steps={steps}
          onComplete={handleComplete}
          onStepChange={handleStepChange}
          showStepNumbers={true}
          showProgressBar={true}
          submitButtonText="Complete Registration"
          nextButtonText="Continue"
          previousButtonText="Go Back"
          allowStepNavigation={true}
        />
      </div>
    </div>
  );
};
