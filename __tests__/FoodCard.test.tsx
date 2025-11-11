import { render, screen } from '@testing-library/react';
import FoodCard from '@/components/common/FoodCard';
import { Food } from '@/types/food';

describe('FoodCard Component', () => {
  const mockFood: Food = {
    id: '1',
    name: 'Beef Burger',
    rating: 4.5,
    price: 8.99,
    image: '/images/Food image 3.png',
    restaurant: {
      name: 'Burger Palace',
      logo: '/images/Logo image 3.png',
      status: 'Open Now',
    },
    createdAt: new Date().toISOString(),
  };

  const mockHandlers = {
    onEdit: jest.fn(),
    onDelete: jest.fn(),
  };

  it('should render food card with correct information', () => {
    render(<FoodCard food={mockFood} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />);

    // Check if food name is displayed
    expect(screen.getByText('Beef Burger')).toBeInTheDocument();

    // Check if price is displayed with correct format
    expect(screen.getByText('$8.99')).toBeInTheDocument();

    // Check if rating is displayed with correct format
    expect(screen.getByText('4.5')).toBeInTheDocument();

    // Check if restaurant name is in logo alt text
    expect(screen.getByAltText('Burger Palace')).toBeInTheDocument();

    // Check if restaurant status is displayed (shows "Open" for "Open Now")
    expect(screen.getByText('Open')).toBeInTheDocument();
  });

  it('should render food card with closed restaurant status', () => {
    const closedFood: Food = {
      ...mockFood,
      restaurant: {
        ...mockFood.restaurant,
        status: 'Closed',
      },
    };

    render(<FoodCard food={closedFood} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />);

    // Check if closed status is displayed
    expect(screen.getByText('Closed')).toBeInTheDocument();
  });

  it('should display food image with correct alt text', () => {
    render(<FoodCard food={mockFood} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />);

    const foodImage = screen.getAllByAltText('Beef Burger')[0];
    expect(foodImage).toBeInTheDocument();
    expect(foodImage).toHaveAttribute('src');
  });

  it('should display restaurant logo with correct alt text', () => {
    render(<FoodCard food={mockFood} onEdit={mockHandlers.onEdit} onDelete={mockHandlers.onDelete} />);

    const restaurantLogo = screen.getByAltText('Burger Palace');
    expect(restaurantLogo).toBeInTheDocument();
  });
});
