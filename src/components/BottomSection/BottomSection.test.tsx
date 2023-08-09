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
        expect(screen.getByRole('heading', {name: 'Join Our Program'})).toBeInTheDocument();
        expect(screen.getByText(/Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam/i)).toBeInTheDocument();
    });
});