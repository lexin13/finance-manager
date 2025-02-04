import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { OperationCard } from './OperationCard';
import { AbstractOperation } from 'src/entities/operation/Operation';

const mockOperation: AbstractOperation = {
  id: '1',
  name: 'Test Operation',
  desc: 'This is a test operation',
  amount: 100,
  category: { id: '1', name: 'Test Category' },
  date: '2023-10-01',
  createdAt: '2023-10-01',
  updatedAt: '2023-10-01',
};

describe('OperationCard', () => {
  it('renders the operation details correctly', () => {
    render(<OperationCard {...mockOperation} />);

    expect(screen.getByText(mockOperation.category.name)).toBeInTheDocument();
    expect(screen.getByText(mockOperation.amount.toString())).toBeInTheDocument();
    expect(screen.getByText(mockOperation.name)).toBeInTheDocument();
    expect(screen.getByText(mockOperation.desc)).toBeInTheDocument();
    expect(screen.getByText(mockOperation.date)).toBeInTheDocument();
  });

  it('calls onEditClick when the edit button is clicked', () => {
    const mockOnEditClick = jest.fn();
    render(<OperationCard {...mockOperation} onEditClick={mockOnEditClick} />);

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    expect(mockOnEditClick).toHaveBeenCalledWith(mockOperation.id);
  });

  it('does not render the edit button if onEditClick is not provided', () => {
    render(<OperationCard {...mockOperation} />);

    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });
});
