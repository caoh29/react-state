import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';

import CommunityPage from "./CommunityPage";

describe('CommunityPage', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    const initialEntries: string[] = ['/community'];

    test('renders with valid props', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <CommunityPage />
            </MemoryRouter>
        );

        expect(screen.getByRole('heading', {name: 'Big Community of People Like You'})).toBeInTheDocument();
        expect(screen.getByRole('link', {name: '← Back to main page'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: 'We\'re proud of our products, and we\'re really excited when we get feedback from our users.'})).toBeInTheDocument();
        expect(await screen.findByText(/John Smith/i)).toBeInTheDocument();
        expect(await screen.findByText(/Clark Ken/i)).toBeInTheDocument();
        expect(await screen.findByText(/Larry Martinez/i)).toBeInTheDocument();
    });

    test('redirects when clicking on "← Back to main page" link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <CommunityPage />
            </MemoryRouter>
        );

        userEvent.click(screen.getByRole('link', {name: '← Back to main page'}));
        expect(window.location.pathname).toBe('/');
    });
});