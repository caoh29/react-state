import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';

import UserPage from "./UserPage";

describe('UserPage', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    const initialEntries: string[] = ['/community/userPage1'];

    test('renders with valid props', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <UserPage />
            </MemoryRouter>
        );

        expect(await screen.findByRole('heading', {name: 'John Smith'})).toBeInTheDocument();
        expect(screen.getByText(/← Back to main page/i)).toBeInTheDocument();
    });

    test('redirects when clicking on "← Back to main page" link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <UserPage />
            </MemoryRouter>
        );

        userEvent.click(screen.getByRole('link', {name: '← Back to main page'}));
        expect(window.location.pathname).toBe('/');
    });
});