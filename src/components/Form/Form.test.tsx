import '@testing-library/jest-dom';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { renderWithProviders } from '../../utils/test-utils'
import { server } from '../../mocks/server';
import userEvent from '@testing-library/user-event';

import Form, { POST_REQUEST } from "./Form";

describe('Form', () => {
    // Enable API mocking before tests.
    beforeAll(() => server.listen());

    // Reset any runtime request handlers we may add during the tests.
    afterEach(() => server.resetHandlers());

    // Disable API mocking after the tests are done.
    afterAll(() => server.close());

    test('should return a JSON object with a message property when the request is successful', async () => {
        const response = await POST_REQUEST('subscribe', 'test@example.com');
        expect(response).toHaveProperty('message');
    });

    test('should alert the message property when the request is successful', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('subscribe', 'test@example.com');
        expect(spy).toHaveBeenCalledWith(response.message);
        spy.mockRestore();
    });

    test('should return a JSON object with an error property when the request fails', async () => {
        const response = await POST_REQUEST('invalid_endpoint', 'test@example.com');
        expect(response).toHaveProperty('error');
    });

    
    test('should alert the error property when the request fails', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('invalid_endpoint', 'test@example.com');
        expect(spy).toHaveBeenCalledWith(response.error);
        spy.mockRestore();
    });

    const initialEntries: string[] = ['/'];

    test('renders with valid props', async () => {
        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
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
        const input = screen.getByPlaceholderText('Email');
        fireEvent.change(input, { target: { value: 'test@test.com' } });
        userEvent.click(screen.getByText('Subscribe'));
        await waitFor(() => expect(POST_REQUEST).toHaveBeenCalledWith('subscribe', 'test@test.com'));
    });
});