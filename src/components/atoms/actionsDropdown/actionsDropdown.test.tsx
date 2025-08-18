import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ActionsDropdown } from './actionsDropdown';
import { FaBeer } from 'react-icons/fa';

describe('ActionsDropdown', () => {
  const actions = [
    { label: 'Edit', onClick: vi.fn(), icon: <FaBeer data-testid="edit-icon" /> },
    { label: 'Delete', onClick: vi.fn() },
  ];

  it('renders the actions button', () => {
    render(<ActionsDropdown actions={actions} row={{}} />);
    expect(screen.getByLabelText('Actions')).toBeInTheDocument();
  });

  it('opens and closes the dropdown on button click', () => {
    render(<ActionsDropdown actions={actions} row={{}} />);
    const btn = screen.getByLabelText('Actions');
    fireEvent.click(btn);
    expect(screen.getByText('Edit')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
    // Close
    fireEvent.click(btn);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('calls action onClick and closes dropdown', () => {
    render(<ActionsDropdown actions={actions} row={{}} />);
    fireEvent.click(screen.getByLabelText('Actions'));
    const editBtn = screen.getByText('Edit');
    fireEvent.click(editBtn);
    expect(actions[0].onClick).toHaveBeenCalled();
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('renders action icon if provided', () => {
    render(<ActionsDropdown actions={actions} row={{}} />);
    fireEvent.click(screen.getByLabelText('Actions'));
    expect(screen.getByTestId('edit-icon')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', () => {
    render(
      <div>
        <ActionsDropdown actions={actions} row={{}} />
        <button data-testid="outside">Outside</button>
      </div>
    );
    fireEvent.click(screen.getByLabelText('Actions'));
    expect(screen.getByText('Edit')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByTestId('outside'));
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
}); 