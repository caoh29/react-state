import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'

import BottomSection from "./BottomSection";

describe('BottomSection', () => {

    const initialEntries: string[] = ["/"];

    test('renders with valid props', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <BottomSection />
            </MemoryRouter>
        );
        const title = screen.getByRole('heading', {name: 'Join Our Program'});
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
        expect(title).toHaveTextContent('Join Our Program');
        
        const description = screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam/i);
        expect(description).toBeInTheDocument();
        expect(description).toBeVisible();
        expect(description).toHaveTextContent('Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam.');
    });
});