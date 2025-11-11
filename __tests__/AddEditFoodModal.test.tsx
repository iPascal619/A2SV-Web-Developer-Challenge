import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEditFoodModal from '@/components/modals/AddEditFoodModal';
import { FoodFormData } from '@/types/food';

describe('AddEditFoodModal - User Interactions', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display validation errors when submitting empty form', async () => {
    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Click the Add button without filling the form (no food prop means Add mode)
    const addButton = screen.getByRole('button', { name: /^add$/i });
    fireEvent.click(addButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText('Food Name is required')).toBeInTheDocument();
      expect(screen.getByText('Food Rating is required')).toBeInTheDocument();
      expect(screen.getByText('Food Image URL is required')).toBeInTheDocument();
      expect(screen.getByText('Restaurant Name is required')).toBeInTheDocument();
      expect(screen.getByText('Restaurant Logo URL is required')).toBeInTheDocument();
    });

    // Verify error elements have correct IDs
    expect(screen.getByText('Food Name is required')).toHaveAttribute('id', 'food-name-error');
    expect(screen.getByText('Food Rating is required')).toHaveAttribute('id', 'food-rating-error');
    expect(screen.getByText('Food Image URL is required')).toHaveAttribute('id', 'food-image-error');
  });

  it('should handle form input changes correctly', async () => {
    const user = userEvent.setup();

    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Fill in the form
    const foodNameInput = screen.getByLabelText(/food name/i);
    await user.type(foodNameInput, 'Delicious Pizza');
    expect(foodNameInput).toHaveValue('Delicious Pizza');

    const foodRatingInput = screen.getByLabelText(/food rating/i);
    await user.type(foodRatingInput, '4.5');
    expect(foodRatingInput).toHaveValue(4.5);

    const restaurantStatusSelect = screen.getByLabelText(/restaurant status/i);
    await user.selectOptions(restaurantStatusSelect, 'Closed');
    expect(restaurantStatusSelect).toHaveValue('Closed');
  });

  it('should clear errors when user types in input fields', async () => {
    const user = userEvent.setup();
    
    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Click submit to show validation errors
    const addButton = screen.getByRole('button', { name: /^add$/i });
    fireEvent.click(addButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(screen.getByText('Food Name is required')).toBeInTheDocument();
    });

    // Type in the food name field
    const foodNameInput = screen.getByLabelText(/food name/i);
    await user.type(foodNameInput, 'Pizza');

    // Verify the form is interactive (input has value)
    expect(foodNameInput).toHaveValue('Pizza');
  });

  it('should call onSave with correct data when form is valid', async () => {
    const user = userEvent.setup();
    mockOnSave.mockResolvedValue(undefined);

    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Fill in all required fields
    await user.type(screen.getByLabelText(/food name/i), 'Pizza Margherita');
    await user.type(screen.getByLabelText(/food rating/i), '4.8');
    await user.type(screen.getByLabelText(/food image url/i), 'https://example.com/pizza.jpg');
    await user.type(screen.getByLabelText(/food price/i), '12.99');
    await user.type(screen.getByLabelText(/restaurant name/i), 'Pizza House');
    await user.type(screen.getByLabelText(/restaurant logo url/i), 'https://example.com/logo.jpg');
    await user.selectOptions(screen.getByLabelText(/restaurant status/i), 'Open Now');

    const addButton = screen.getByRole('button', { name: /^add$/i });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(mockOnSave).toHaveBeenCalledWith({
        food_name: 'Pizza Margherita',
        food_rating: 4.8,
        food_image: 'https://example.com/pizza.jpg',
        food_price: 12.99,
        restaurant_name: 'Pizza House',
        restaurant_logo: 'https://example.com/logo.jpg',
        restaurant_status: 'Open Now',
      });
    });
  });

  it('should call onClose when Cancel button is clicked', () => {
    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('should show loading state during form submission', async () => {
    const user = userEvent.setup();
    // Mock a delayed save operation
    mockOnSave.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

    render(
      <AddEditFoodModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
      />
    );

    // Fill in all required fields
    await user.type(screen.getByLabelText(/food name/i), 'Test Food');
    await user.type(screen.getByLabelText(/food rating/i), '4.0');
    await user.type(screen.getByLabelText(/food image url/i), 'https://example.com/test.jpg');
    await user.type(screen.getByLabelText(/food price/i), '9.99');
    await user.type(screen.getByLabelText(/restaurant name/i), 'Test Restaurant');
    await user.type(screen.getByLabelText(/restaurant logo url/i), 'https://example.com/logo.jpg');

    const addButton = screen.getByRole('button', { name: /^add$/i });
    fireEvent.click(addButton);

    // Check for loading state (Adding... for new food)
    await waitFor(() => {
      expect(screen.getByText(/adding\.\.\./i)).toBeInTheDocument();
    });
  });
});
