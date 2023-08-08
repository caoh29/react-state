import "@testing-library/jest-dom";
import { screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { renderWithProviders } from './utils/test-utils';
import { server } from './mocks/server';
import App from './App';
import ErrorPage from './components/Error/ErrorPage';
import CommunityPage from './components/Community/CommunityPage';
import UserPage from './components/User/UserPage';


const routes = [
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/community',
        element: <CommunityPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/community/:userId',
        element: <UserPage />,
        errorElement: <ErrorPage />,
    },
];

describe('index.tsx', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    test('renders App component on the root path', () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/"],
        });

        renderWithProviders(<RouterProvider router={router} />);

        const title = screen.getByText(/big community of people like you/i);
        expect(title).toBeInTheDocument();

        const subscribeButton = screen.getByRole('button', { name: /subscribe/i });
        expect(subscribeButton).toBeInTheDocument();
    });

    test('renders CommunityPage component on the community path', () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/community"],
        });

        renderWithProviders(<RouterProvider router={router} />);

        const title = screen.getByText(/big community of people like you/i);
        expect(title).toBeInTheDocument();

        const description = screen.getByText(/we're proud of our products, and we're really excited when we get feedback from our users./i);
        expect(description).toBeInTheDocument();
    });

    test('renders UserPage component on the user path', () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/community/userPage1"],
        });

        renderWithProviders(<RouterProvider router={router} />,
        {
            preloadedState: {
                usersContext: {
                    users: []
                },
                userCard: {
                    user: {
                        id: 'userPage1',
                        name: 'John Smith',
                        photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                        resume: 'Lorem Ipsum',
                        company: {
                            name: 'Company',
                            role: 'Developer'
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
        });

        const name = screen.getByText(/john smith/i);
        expect(name).toBeInTheDocument();

        const link = screen.getByText(/← Back to main page/i);
        expect(link).toBeInTheDocument();
    });
});