import React from 'react';
import { MeterGroup, Meter } from './MeterGroup';

export const MeterGroupExample: React.FC = () => {
  const horizontalMeters = [
    {
      label: 'CPU Usage',
      segments: [
        { value: 25, variant: 'success' as const, label: 'System' },
        { value: 40, variant: 'info' as const, label: 'User' },
        { value: 20, variant: 'warning' as const, label: 'I/O' },
        { value: 15, variant: 'error' as const, label: 'Idle' }
      ],
      size: 'md' as const
    },
    {
      label: 'Memory',
      segments: [
        { value: 60, variant: 'success' as const, label: 'Used' },
        { value: 25, variant: 'info' as const, label: 'Cached' },
        { value: 15, variant: 'warning' as const, label: 'Free' }
      ],
      size: 'md' as const
    },
    {
      label: 'Disk Space',
      segments: [
        { value: 70, variant: 'success' as const, label: 'Available' },
        { value: 20, variant: 'warning' as const, label: 'Used' },
        { value: 10, variant: 'error' as const, label: 'System' }
      ],
      size: 'md' as const
    }
  ];

  const verticalMeters = [
    {
      label: 'Battery',
      segments: [
        { value: 80, variant: 'success' as const, label: 'Charged' },
        { value: 20, variant: 'warning' as const, label: 'Remaining' }
      ],
      size: 'lg' as const
    },
    {
      label: 'Storage',
      segments: [
        { value: 45, variant: 'success' as const, label: 'Free' },
        { value: 35, variant: 'info' as const, label: 'Apps' },
        { value: 20, variant: 'warning' as const, label: 'Media' }
      ],
      size: 'lg' as const
    },
    {
      label: 'Network',
      segments: [
        { value: 50, variant: 'success' as const, label: 'Download' },
        { value: 30, variant: 'info' as const, label: 'Upload' },
        { value: 20, variant: 'default' as const, label: 'Idle' }
      ],
      size: 'lg' as const
    }
  ];

  // Debug logging for vertical meters
  console.log('Vertical meters data:', verticalMeters);

  const individualMeters = [
    {
      label: 'Project Progress',
      segments: [
        { value: 60, variant: 'success' as const, label: 'Completed' },
        { value: 25, variant: 'info' as const, label: 'In Progress' },
        { value: 15, variant: 'warning' as const, label: 'Pending' }
      ],
      size: 'lg' as const
    },
    {
      label: 'Team Performance',
      segments: [
        { value: 40, variant: 'success' as const, label: 'Excellent' },
        { value: 35, variant: 'info' as const, label: 'Good' },
        { value: 20, variant: 'warning' as const, label: 'Average' },
        { value: 5, variant: 'error' as const, label: 'Poor' }
      ],
      size: 'md' as const
    },
    {
      label: 'Resource Usage',
      segments: [
        { value: 70, variant: 'success' as const, label: 'Available' },
        { value: 20, variant: 'warning' as const, label: 'Used' },
        { value: 10, variant: 'error' as const, label: 'Critical' }
      ],
      size: 'sm' as const
    },
    {
      label: 'Incomplete Data Example',
      segments: [
        { value: 45, variant: 'success' as const, label: 'Known' },
        { value: 25, variant: 'info' as const, label: 'Estimated' }
      ],
      size: 'md' as const
    }
  ];

  const handleSegmentClick = (meterIndex: number, segment: { label?: string; value: number }) => {
    console.log(`Clicked on meter ${meterIndex}, segment: ${segment.label} (${segment.value}%)`);
    // You can add your custom logic here
  };

  const handleIndividualSegmentClick = (segment: { label?: string; value: number }) => {
    console.log(`Clicked on segment: ${segment.label} (${segment.value}%)`);
    // You can add your custom logic here
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive Segmented Horizontal Meters</h2>
        <p className="text-gray-600 mb-4">Click on any colored segment to interact with it!</p>
        <MeterGroup 
          meters={horizontalMeters} 
          layout="horizontal" 
          gap="lg"
          onSegmentClick={handleSegmentClick}
          className="p-4 bg-gray-50 rounded-lg"
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive Segmented Vertical Meters</h2>
        <p className="text-gray-600 mb-4">Click on any colored segment to interact with it!</p>
        <p className="text-xs text-blue-600 mb-2">Debug: {verticalMeters.length} meters loaded</p>
        <div className="p-4 bg-gray-50 rounded-lg max-w-md border-2 border-blue-200">
          <MeterGroup 
            meters={verticalMeters} 
            layout="vertical" 
            gap="md"
            onSegmentClick={handleSegmentClick}
            className="w-full"
          />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Interactive Individual Segmented Meters</h2>
        <p className="text-gray-600 mb-4">Click on any colored segment or legend item to interact!</p>
        <div className="space-y-6">
          {individualMeters.map((meter, index) => (
            <Meter
              key={index}
              {...meter}
              onSegmentClick={handleIndividualSegmentClick}
              className="max-w-md"
            />
          ))}
        </div>
      </div>

      
    </div>
  );
};
