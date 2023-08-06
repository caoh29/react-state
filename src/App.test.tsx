import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from './utils/test-utils'

import App from "./App";

describe('App', () => {

    const initialEntries: string[] = ["/"];

    test('renders both components', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <App />
            </MemoryRouter>
        );
        const topTitle = screen.getByRole('heading', {name: 'Big Community of People Like You'});
        expect(topTitle).toBeInTheDocument();
        expect(topTitle).toBeVisible();
        expect(topTitle).toHaveTextContent('Big Community of People Like You');
        
        const bottomTitle = screen.getByRole('heading', {name: 'Join Our Program'});
        expect(bottomTitle).toBeInTheDocument();
        expect(bottomTitle).toBeVisible();
        expect(bottomTitle).toHaveTextContent('Join Our Program');
    });
});