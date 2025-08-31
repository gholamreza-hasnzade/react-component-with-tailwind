import { render, screen, fireEvent } from '@testing-library/react';
import { TimePicker } from './timePicker';

describe('TimePicker', () => {
  const defaultProps = {
    value: '',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<TimePicker {...defaultProps} />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays label when provided', () => {
    render(<TimePicker {...defaultProps} label="Meeting Time" />);
    expect(screen.getByText('Meeting Time')).toBeInTheDocument();
  });

  it('displays placeholder text', () => {
    render(<TimePicker {...defaultProps} placeholder="Select time" />);
    expect(screen.getByPlaceholderText('Select time')).toBeInTheDocument();
  });

  it('opens dropdown when input is focused', () => {
    render(<TimePicker {...defaultProps} />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    // Check if dropdown content is visible
    expect(screen.getByText('Hours')).toBeInTheDocument();
    expect(screen.getByText('Minutes')).toBeInTheDocument();
  });

  it('calls onChange when time is selected', () => {
    const mockOnChange = jest.fn();
    render(<TimePicker {...defaultProps} onChange={mockOnChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    // Click on hour 9
    const hourButton = screen.getByText('09');
    fireEvent.click(hourButton);
    
    // Click on minute 30
    const minuteButton = screen.getByText('30');
    fireEvent.click(minuteButton);
    
    expect(mockOnChange).toHaveBeenCalledWith('09:30');
  });

  it('displays error message when provided', () => {
    render(<TimePicker {...defaultProps} error="Invalid time" />);
    expect(screen.getByText('Invalid time')).toBeInTheDocument();
  });

  it('displays helper text when provided', () => {
    render(<TimePicker {...defaultProps} helperText="Choose a time" />);
    expect(screen.getByText('Choose a time')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<TimePicker {...defaultProps} disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('shows required indicator when required is true', () => {
    render(<TimePicker {...defaultProps} label="Time" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('supports 12-hour format', () => {
    render(<TimePicker {...defaultProps} format="12h" />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    // Should show AM/PM options
    expect(screen.getByText('AM')).toBeInTheDocument();
    expect(screen.getByText('PM')).toBeInTheDocument();
  });

  it('supports seconds when showSeconds is true', () => {
    render(<TimePicker {...defaultProps} showSeconds />);
    const input = screen.getByRole('textbox');
    fireEvent.focus(input);
    
    // Should show seconds section
    expect(screen.getByText('Seconds')).toBeInTheDocument();
  });
});
