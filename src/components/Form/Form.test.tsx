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

    test('should return a JSON object with a message property when the request is successful to Subscribe', async () => {
        const response = await POST_REQUEST('subscribe', 'test@example.com');
        expect(response).toHaveProperty('message');
    });

    test('should alert the message property when the request is successful to Subscribe', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('subscribe', 'test@example.com');
        expect(spy).toHaveBeenCalledWith(response.message);
        spy.mockRestore();
    });

    test('should alert the message property when the request is unsuccessful to Subscribe', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('subscribe', 'forbidden@gmail.com');
        expect(spy).toHaveBeenCalledWith(response.error);
        spy.mockRestore();
    });

    test('should return a JSON object with an error property when the request fails to Subscribe', async () => {
        const response = await POST_REQUEST('subscribe', 'forbidden@gmail.com');
        expect(response).toHaveProperty('error');
    });

    test('should return a JSON object with a message property when the request is successful to Unsubscribe', async () => {
        const response = await POST_REQUEST('unsubscribe', 'forbidden@gmail.com');
        expect(response).toHaveProperty('message');
    });

    test('should alert the message property when the request is successful to Unsubscribe', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('unsubscribe', 'forbidden@gmail.com');
        expect(spy).toHaveBeenCalledWith(response.message);
        spy.mockRestore();
    });

    test('should alert the message property when the request is unsuccessful to Unsubscribe', async () => {
        const spy = jest.spyOn(window, 'alert');
        const response = await POST_REQUEST('unsubscribe', 'test@example.com');
        expect(spy).toHaveBeenCalledWith(response.error);
        spy.mockRestore();
    });

    test('should return a JSON object with an error property when the request fails to Unsubscribe', async () => {
        const response = await POST_REQUEST('unsubscribe', 'test@example.com');
        expect(response).toHaveProperty('error');
    });

    // const initialEntries: string[] = ['/'];

    // test('renders with valid props', async () => {
    //     renderWithProviders(
    //         <MemoryRouter initialEntries={initialEntries}>
    //             <Form />
    //         </MemoryRouter>
    //     );
    //     const input = screen.getByPlaceholderText('Email');
    //     fireEvent.change(input, { target: { value: 'test@test.com' } });
    //     userEvent.click(screen.getByText('Subscribe'));
    //     await waitFor(() => expect(POST_REQUEST).toHaveBeenCalledWith('subscribe', 'test@test.com'));
    // });
});