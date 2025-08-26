import React, { useState, useCallback, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/atoms/button/button';

export interface Step {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepProps>;
  validation?: (data: Record<string, unknown>) => boolean | Promise<boolean>;
  isOptional?: boolean;
}

export interface StepProps {
  data: Record<string, unknown>;
  onDataChange: (data: Record<string, unknown>) => void;
  onNext: () => void;
  onPrevious: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepIndex: number;
  totalSteps: number;
}

export interface MultiStepFormProps {
  steps: Step[];
  initialData?: Record<string, unknown>;
  onComplete: (finalData: Record<string, unknown>) => void;
  onStepChange?: (stepIndex: number, stepData: Record<string, unknown>) => void;
  showStepNumbers?: boolean;
  showProgressBar?: boolean;
  className?: string;
  submitButtonText?: string;
  nextButtonText?: string;
  previousButtonText?: string;
  allowStepNavigation?: boolean;
}

export const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  initialData = {},
  onComplete,
  onStepChange,
  showStepNumbers = true,
  showProgressBar = true,
  className = '',
  submitButtonText = 'Submit',
  nextButtonText = 'Next',
  previousButtonText = 'Previous',
  allowStepNavigation = true,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  const updateFormData = useCallback((newData: Record<string, unknown>) => {
    setFormData((prev: Record<string, unknown>) => ({ ...prev, ...newData }));
  }, []);

  const validateCurrentStep = useCallback(async (): Promise<boolean> => {
    if (!currentStep.validation) return true;
    
    try {
      const isValid = await currentStep.validation(formData);
      if (!isValid) {
        setValidationErrors(prev => ({
          ...prev,
          [currentStep.id]: 'Validation failed for this step'
        }));
      } else {
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[currentStep.id];
          return newErrors;
        });
      }
      return isValid;
    } catch {
      setValidationErrors(prev => ({
        ...prev,
        [currentStep.id]: 'Validation error occurred'
      }));
      return false;
    }
  }, [currentStep, formData]);

  const goToNextStep = useCallback(async () => {
    const isValid = await validateCurrentStep();
    if (!isValid) return;

    if (onStepChange) {
      onStepChange(currentStepIndex, formData);
    }

    if (isLastStep) {
      setIsSubmitting(true);
      try {
        await onComplete(formData);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setCurrentStepIndex(prev => prev + 1);
    }
  }, [currentStepIndex, isLastStep, formData, onComplete, onStepChange, validateCurrentStep]);

  const goToPreviousStep = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex(prev => prev - 1);
    }
  }, [isFirstStep]);

  const goToStep = useCallback((stepIndex: number) => {
    if (allowStepNavigation && stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStepIndex(stepIndex);
    }
  }, [allowStepNavigation, steps.length]);

  const canGoToStep = useCallback((stepIndex: number): boolean => {
    if (!allowStepNavigation) return false;
    
    // Allow going to previous steps or current step
    if (stepIndex <= currentStepIndex) return true;
    
    // Check if all previous steps are valid
    for (let i = 0; i < stepIndex; i++) {
      if (steps[i].validation) {
        // For now, we'll allow navigation to future steps
        // In a more strict implementation, you might want to validate all previous steps
        continue;
      }
    }
    
    return true;
  }, [allowStepNavigation, currentStepIndex, steps]);

  const stepProps: StepProps = useMemo(() => ({
    data: formData,
    onDataChange: updateFormData,
    onNext: goToNextStep,
    onPrevious: goToPreviousStep,
    isFirstStep,
    isLastStep,
    currentStepIndex,
    totalSteps: steps.length,
  }), [formData, updateFormData, goToNextStep, goToPreviousStep, isFirstStep, isLastStep, currentStepIndex, steps.length]);

  const CurrentStepComponent = currentStep.component;

  return (
    <div className={`w-full max-w-4xl mx-auto ${className}`}>
      {/* Progress Bar */}
      {showProgressBar && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Step Navigation */}
      {showStepNumbers && (
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const canNavigate = canGoToStep(index);
            
            return (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? 'flex-1' : ''
                }`}
              >
                <button
                  onClick={() => goToStep(index)}
                  disabled={!canNavigate}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-green-500 border-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-500'
                  } ${
                    canNavigate && !isCurrent
                      ? 'hover:border-blue-400 hover:text-blue-600 cursor-pointer'
                      : 'cursor-default'
                  }`}
                  aria-label={`Go to step ${index + 1}: ${step.title}`}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </button>
                
                <div className="ml-3 flex-1">
                  <h3 className={`text-sm font-medium ${
                    isCurrent ? 'text-blue-600' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  {step.description && (
                    <p className="text-xs text-gray-500">{step.description}</p>
                  )}
                </div>
                
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Current Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {currentStep.title}
          </h2>
          {currentStep.description && (
            <p className="text-gray-600">{currentStep.description}</p>
          )}
        </div>

        {/* Validation Error Display */}
        {validationErrors[currentStep.id] && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{validationErrors[currentStep.id]}</p>
          </div>
        )}

        <CurrentStepComponent {...stepProps} />
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              variant="outlined"
              onClick={goToPreviousStep}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>{previousButtonText}</span>
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          {currentStep.isOptional && (
            <Button
              variant="text"
              onClick={goToNextStep}
              className="text-gray-600"
            >
              Skip
            </Button>
          )}
          
          <Button
            onClick={goToNextStep}
            disabled={isSubmitting}
            className="flex items-center space-x-2"
          >
            <span>{isLastStep ? submitButtonText : nextButtonText}</span>
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};