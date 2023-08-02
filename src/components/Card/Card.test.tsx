import { render, screen } from '@testing-library/react';
import Card from "./Card";

// Tests that the component renders without errors
describe('<Card>', () => {
    // Tests that the component renders with valid props
    test('renders with valid props', () => {
        render(<Card content={{id: '1', name: 'John Doe', photo: 'photo.jpg', resume: 'Resume text', company: {name: 'Company Name', role: 'Role'}}} isActive={true} />);
        const cardName = screen.getByText('John Doe');
        expect(cardName).toBeInTheDocument();
    });
});
