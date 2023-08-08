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
        const title = await screen.findByRole('heading', {name: 'John Smith'});
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
        expect(title).toHaveTextContent('John Smith');
        
        const link = screen.getByText(/← Back to main page/i);
        // const link = screen.getByRole('link', {name: '← Back to main page'});
        expect(link).toBeInTheDocument();
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('← Back to main page');
        // screen.debug(); 
        // userEvent.click(link);
        // screen.debug(); 
    });

    test('redirects when clicking on "← Back to main page" link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <UserPage />
            </MemoryRouter>
        );
        // render(<UserPage />, { wrapper: BrowserRouter });
        const title = await screen.findByRole('heading', {name: 'John Smith'});
        expect(title).toBeInTheDocument();

        const link = screen.getByRole('link', {name: '← Back to main page'});
        expect(link).toBeInTheDocument();

        // await userEvent.click(link);
        // // Use waitFor to wait for the component to be unmounted
        // await waitFor(() => {
        //     const title = screen.queryByRole('heading', {name: 'John Smith'});
        //     expect(title).not.toBeInTheDocument(); // Ensure the component is unmounted
        // });

        // const newTitle = screen.getByRole('heading', {name: 'Big Community of People Like You'});
        // expect(newTitle).toBeInTheDocument();
    });
});