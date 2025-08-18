import React from 'react';
import { Button } from '../button/button';
import { useToast } from './useToast';

export const ToastExample: React.FC = () => {
  const { showToast, showSuccessToast, showErrorToast, showWarningToast, showInfoToast, showLoadingToast, clearToasts } = useToast();

  const showDefaultToast = () => {
    console.log('Showing default toast');
    showToast({
      title: 'Default Toast',
      description: 'This is a default toast notification',
    });
  };

  const handleShowSuccessToast = () => {
    showSuccessToast({
      title: 'Success!',
      description: 'Your action was completed successfully',
    });
  };

  const handleShowErrorToast = () => {
    showErrorToast({
      title: 'Error Occurred',
      description: 'Something went wrong. Please try again.',
    });
  };

  const handleShowWarningToast = () => {
    showWarningToast({
      title: 'Warning',
      description: 'Please review your input before proceeding',
    });
  };

  const handleShowInfoToast = () => {
    showInfoToast({
      title: 'Information',
      description: 'Here is some useful information for you',
    });
  };

  const handleShowLoadingToast = () => {
    showLoadingToast({
      title: 'Processing',
      description: 'Please wait while we process your request',
    });
  };

  const showToastWithAction = () => {
    window.showToast({
      title: 'Action Required',
      description: 'Please confirm this action',
      action: (
        <Button
          variant="outlined"
          size="sm"
          color="primary"
          onClick={() => console.log('Action clicked!')}
        >
          Confirm
        </Button>
      ),
    });
  };

  const showCustomIconToast = () => {
    window.showToast({
      title: 'Custom Icon',
      description: 'This toast has a custom icon',
      icon: <span className="text-2xl">🎉</span>,
    });
  };

  const showPersistentToast = () => {
    window.showToast({
      title: 'Persistent Toast',
      description: 'This toast will not auto-close',
      persistent: true,
      autoClose: false,
    });
  };

  const showLargeToast = () => {
    window.showToast({
      title: 'Large Toast',
      description: 'This is a large toast with more content',
      size: 'lg',
    });
  };

  const showSmallToast = () => {
    window.showToast({
      title: 'Small Toast',
      description: 'This is a small toast',
      size: 'sm',
    });
  };

  const clearAllToasts = () => {
    clearToasts();
  };

  return (
    <div className="p-8 space-y-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Toast Component Examples</h1>
        <p className="text-gray-600">
          Click the buttons below to see different toast variants in action.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Button onClick={showDefaultToast} color="primary">
          Default Toast
        </Button>
        
        <Button onClick={handleShowSuccessToast} color="success">
          Success Toast
        </Button>
        
        <Button onClick={handleShowErrorToast} color="error">
          Error Toast
        </Button>
        
        <Button onClick={handleShowWarningToast} color="warning">
          Warning Toast
        </Button>
        
        <Button onClick={handleShowInfoToast} color="info">
          Info Toast
        </Button>
        
        <Button onClick={handleShowLoadingToast} color="primary">
          Loading Toast
        </Button>
        
        <Button onClick={showToastWithAction} color="secondary">
          Toast with Action
        </Button>
        
        <Button onClick={showCustomIconToast} color="primary">
          Custom Icon
        </Button>
        
        <Button onClick={showPersistentToast} color="warning">
          Persistent Toast
        </Button>
        
        <Button onClick={showLargeToast} color="info">
          Large Toast
        </Button>
        
        <Button onClick={showSmallToast} color="secondary">
          Small Toast
        </Button>
        
        <Button onClick={clearAllToasts} color="error" variant="outlined">
          Clear All
        </Button>
      </div>
    </div>
  );
};
