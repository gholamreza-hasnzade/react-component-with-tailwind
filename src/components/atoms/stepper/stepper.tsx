import React from "react";

export interface Step {
  id: string | number;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status: 'completed' | 'current' | 'upcoming';
  // Add custom triggers/actions
  trigger?: React.ReactNode;
  // Add custom styling
  customClassName?: string;
}

export interface StepperProps {
  steps: Step[];
  orientation?: 'horizontal' | 'vertical';
  currentStep?: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
  showStepNumbers?: boolean;
  showStepDescriptions?: boolean;
  // Add prop to show triggers
  showTriggers?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  orientation = 'horizontal',
  currentStep = 0,
  onStepClick,
  className = '',
  showStepNumbers = true,
  showStepDescriptions = false,
  showTriggers = false,
}) => {
  const isHorizontal = orientation === 'horizontal';

  const getStepStatus = (stepIndex: number): 'completed' | 'current' | 'upcoming' => {
    if (stepIndex < currentStep) return 'completed';
    if (stepIndex === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepIcon = (step: Step, stepIndex: number) => {
    if (step.icon) return step.icon;
    
    const status = getStepStatus(stepIndex);
    
    if (status === 'completed') {
      return (
        <svg
          className="w-3.5 h-3.5 text-green-500 dark:text-green-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 12"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5.917 5.724 10.5 15 1.5"
          />
        </svg>
      );
    }
    
    if (status === 'current') {
      return (
        <svg
          className="w-3.5 h-3.5 text-blue-600"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 16"
        >
          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
        </svg>
      );
    }
    
    return (
      <svg
        className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 18 20"
      >
        <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
      </svg>
    );
  };

  const getStepClasses = (stepIndex: number) => {
    const status = getStepStatus(stepIndex);
    
    if (isHorizontal) {
      return {
        container: `flex w-full items-center ${
          stepIndex < steps.length - 1 
            ? 'after:content-[""] after:w-full after:h-1 after:border-b after:border-4 after:inline-block' 
            : ''
        }`,
        connector: stepIndex < steps.length - 1 
          ? status === 'completed' 
            ? 'after:border-blue-600 dark:after:border-blue-500' 
            : 'after:border-gray-200 dark:after:border-gray-700'
          : '',
        step: `flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 transition-colors duration-200 ${
          status === 'completed'
            ? 'bg-blue-600 text-white'
            : status === 'current'
            ? 'bg-blue-100 text-blue-600 dark:bg-blue-800 dark:text-blue-300'
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`,
        text: `ml-3 ${
          status === 'completed'
            ? 'text-blue-600 dark:text-blue-500'
            : status === 'current'
            ? 'text-blue-600 dark:text-blue-500 font-medium'
            : 'text-gray-500 dark:text-gray-400'
        }`,
      };
    } else {
      // Vertical stepper with left border line design - fixed styling
      return {
        container: `relative mb-10 ms-6 ${
          stepIndex === steps.length - 1 ? 'mb-0' : ''
        }`,
        step: `absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-white dark:ring-gray-900 ${
          status === 'completed'
            ? 'bg-green-200 dark:bg-green-900'
            : status === 'current'
            ? 'bg-blue-200 dark:bg-blue-800'
            : 'bg-gray-100 dark:bg-gray-700'
        }`,
        text: `ml-6 ${
          status === 'completed'
            ? 'text-green-600 dark:text-green-400'
            : status === 'current'
            ? 'text-blue-600 dark:text-blue-400 font-medium'
            : 'text-gray-500 dark:text-gray-400'
        }`,
      };
    }
  };

  return (
    <div className={`${isHorizontal ? 'w-full' : ''} ${className}`}>
      <ol className={`${
        isHorizontal 
          ? 'flex items-center w-full' 
          : 'relative text-gray-500 border-s border-gray-200 dark:border-gray-700 dark:text-gray-400'
      }`}>
        {steps.map((step, index) => {
          const classes = getStepClasses(index);
          const isClickable = onStepClick && index <= currentStep + 1;
          
          return (
            <li
              key={step.id}
              className={`${classes.container} ${
                isClickable ? 'cursor-pointer' : ''
              }`}
              onClick={() => isClickable && onStepClick(index)}
            >
              <span className={classes.step}>
                {showStepNumbers && !step.icon ? (
                  <span className="text-sm font-medium">
                    {index + 1}
                  </span>
                ) : (
                  getStepIcon(step, index)
                )}
              </span>
              
              <div className={classes.text}>
                <h3 className="font-medium leading-tight">{step.title}</h3>
                {showStepDescriptions && step.description && (
                  <p className="text-sm mt-1">{step.description}</p>
                )}
                
                {/* Add step triggers */}
                {showTriggers && step.trigger && (
                  <div className="mt-3">
                    {step.trigger}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
