import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event';

import ErrorPage from "./ErrorPage";

describe('ErrorPage', () => {

    const initialEntries: string[] = ['/not-found'];

    test('renders with valid props', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <ErrorPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', {name: 'Page Not Found'})).toBeInTheDocument();
        expect(screen.getByText(/Looks like you\'ve followd a broken link or entered a URL that doesn\'t exist on this site/i)).toBeInTheDocument();
        expect(screen.getByRole('link', {name: '← Back to our site'})).toBeInTheDocument();
    });

    test('Redirects to home page after clicking the link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <ErrorPage />
            </MemoryRouter>
        );
        userEvent.click(screen.getByRole('link', {name: '← Back to our site'}));
        await waitFor(() => expect(window.location.pathname).toBe('/'));
    });
});