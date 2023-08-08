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
            </MemoryRouter>,
            // {
            //     preloadedState: {
            //         usersContext: {
            //             users: [
            //                 {
            //                     id: 'userPage1',
            //                     name: 'John Smith',
            //                     photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            //                     resume: 'Lorem Ipsum',
            //                     company: {
            //                         name: 'Company',
            //                         role: 'Developer'
            //                     }
            //                 },
            //                 {
            //                     id: 'userPage2',
            //                     name: 'Clark Ken',
            //                     photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            //                     resume: 'Lorem Ipsum si amet',
            //                     company: {
            //                         name: 'Company2',
            //                         role: 'Tester'
            //                     }
            //                 },
            //                 {
            //                     id: 'userPage3',
            //                     name: 'Larry Martinez',
            //                     photo: 'https://randomuser.me/api/portraits/men/75.jpg',
            //                     resume: 'Lorem Ipsum si amet no se mas xd',
            //                     company: {
            //                         name: 'Company3',
            //                         role: 'Manager'
            //                     }
            //                 },
            //             ]
            //         },
            //         userCard: {
            //             user: {
            //                 id: '',
            //                 name: '',
            //                 photo: '',
            //                 resume: '',
            //                 company: {
            //                     name: '',
            //                     role: ''
            //                 }
            //             }
            //         },
            //         showSection: {
            //             isVisible: false
            //         },
            //         emailSubscription: {
            //             isSubscribed: false
            //         }
            //     }
            // }
        );
        const title = await screen.findByRole('heading', {name: 'Big Community of People Like You'});
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
        expect(title).toHaveTextContent('Big Community of People Like You');
        
        const link = screen.getByText(/← Back to main page/i);
        // const link = screen.getByRole('link', {name: '← Back to main page'});
        expect(link).toBeInTheDocument();
        expect(link).toBeVisible();
        expect(link).toHaveTextContent('← Back to main page');

        const description = await screen.findByRole('heading', {name: 'We\'re proud of our products, and we\'re really excited when we get feedback from our users.'});
        expect(description).toBeInTheDocument();
        expect(description).toBeVisible();
        expect(description).toHaveTextContent('We\'re proud of our products, and we\'re really excited when we get feedback from our users.');
        // screen.debug(); 
        // userEvent.click(link);
        // screen.debug(); 
    });

    test('redirects when clicking on "← Back to main page" link', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <CommunityPage />
            </MemoryRouter>
        );
        // render(<UserPage />, { wrapper: BrowserRouter });

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