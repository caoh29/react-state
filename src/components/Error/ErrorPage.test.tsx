import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
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
        const title = screen.getByRole('heading', {name: 'Page Not Found'});
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
        expect(title).toHaveTextContent('Page Not Found');
        
        // const link = screen.getByText(/← Back to main page/i);
        const description = screen.getByText(/Looks like you\'ve followd a broken link or entered a URL that doesn\'t exist on this site/i);
        expect(description).toBeInTheDocument();
        expect(description).toBeVisible();
        expect(description).toHaveTextContent('Looks like you\'ve followd a broken link or entered a URL that doesn\'t exist on this site.');
        
        const link = screen.getByRole('link', {name: '← Back to our site'});
        expect(link).toBeInTheDocument();
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('← Back to our site');
        // screen.debug(); 
        // fireEvent.click(showButton);
        // screen.debug(); 
    });

    test('Redirects to home page after clicking the link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <ErrorPage />
            </MemoryRouter>
        );
        const link = screen.getByRole('link', {name: '← Back to our site'});
        expect(link).toBeInTheDocument();

        await userEvent.click(link);

        // const title = screen.getByRole('heading', {name: 'Big Community of People Like You'});
        // expect(title).toBeInTheDocument();
    });

});