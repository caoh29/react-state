import '@testing-library/jest-dom';
import { screen, fireEvent, } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';

import TopSection from "./TopSection";

describe('TopSection', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    const initialEntries: string[] = ['/'];

    test('renders with valid props', () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <TopSection />
            </MemoryRouter>
        );
        const title = screen.getByRole('heading', {name: 'Big Community of People Like You'});
        expect(title).toBeInTheDocument();
        expect(title).toBeVisible();
        expect(title).toHaveTextContent('Big Community of People Like You');
        
        // const link = screen.getByText(/← Back to main page/i);
        const showButton = screen.getByRole('button', {name: 'Show section'});
        expect(showButton).toBeInTheDocument();
        expect(showButton).toBeVisible();
        expect(showButton).toHaveTextContent('Show section');
        // screen.debug(); 
        // fireEvent.click(showButton);
        // screen.debug(); 
    });

    test('Displays cards after clicking on "Show section" button', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <TopSection />
            </MemoryRouter>,
            {
                preloadedState: {
                    usersContext: {
                        users: [
                            {
                                id: 'userPage1',
                                name: 'John Smith',
                                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                                resume: 'Lorem Ipsum',
                                company: {
                                    name: 'Company',
                                    role: 'Developer'
                                }
                            },
                            {
                                id: 'userPage2',
                                name: 'Clark Ken',
                                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                                resume: 'Lorem Ipsum si amet',
                                company: {
                                    name: 'Company2',
                                    role: 'Tester'
                                }
                            },
                            {
                                id: 'userPage3',
                                name: 'Larry Martinez',
                                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                                resume: 'Lorem Ipsum si amet no se mas xd',
                                company: {
                                    name: 'Company3',
                                    role: 'Manager'
                                }
                            },
                        ]
                    },
                    userCard: {
                        user: {
                            id: '',
                            name: '',
                            photo: '',
                            resume: '',
                            company: {
                                name: '',
                                role: ''
                            }
                        }
                    },
                    showSection: {
                        isVisible: false
                    },
                    emailSubscription: {
                        isSubscribed: false
                    }
                }
            }
        );
        
        // const link = screen.getByText(/← Back to main page/i);
        const showButton = screen.getByRole('button', {name: 'Show section'});
        expect(showButton).toBeInTheDocument();
        // screen.debug(); 
        await userEvent.click(showButton);
        // screen.debug();
        const subTitle = screen.getByRole('heading', {name: 'We\'re proud of our products, and we\'re really excited when we get feedback from our users.'});
        expect(subTitle).toBeInTheDocument();
    });

});