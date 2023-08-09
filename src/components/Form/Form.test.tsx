import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
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

    const initialEntries: string[] = ['/'];

    test('renders correctly', async () => {

        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
            </MemoryRouter>
        );
        
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Subscribe'})).toBeInTheDocument();
        expect(screen.getByRole('heading', {name: 'Fill the input and click here if you want to unsubscribe from our newsletter'})).toBeInTheDocument();
    });

    test('should subscribe a new user when clicking on "Subscribe" button', async () => {
        const spy = jest.spyOn(window, 'alert');

        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
            </MemoryRouter>
        );
        
        const input = screen.getByPlaceholderText('Email');
        userEvent.type(input, 'test@test.com');
        userEvent.click(screen.getByText('Subscribe'));
        await waitFor(() => expect(spy).toHaveBeenCalledWith('Thank you for subscribing!'));
    });

    test('should alert an error when a subscribed user clicks on "Subscribe" button', async () => {
        const spy = jest.spyOn(window, 'alert');

        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
            </MemoryRouter>
        );
        
        const input = screen.getByPlaceholderText('Email');
        userEvent.type(input, 'forbidden@gmail.com');
        userEvent.click(screen.getByText('Subscribe'));
        await waitFor(() => expect(spy).toHaveBeenCalledWith('Email is already in use'));
    });

    test('should alert an error when a new user when clicking on "Fill the input and click here if you want to unsubscribe from our newsletter"', async () => {
        const spy = jest.spyOn(window, 'alert');

        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
            </MemoryRouter>
        );
        
        const input = screen.getByPlaceholderText('Email');
        userEvent.type(input, 'test@test.com');
        userEvent.click(screen.getByRole('heading', {name: 'Fill the input and click here if you want to unsubscribe from our newsletter'}));
        await waitFor(() => expect(spy).toHaveBeenCalledWith('Email does not exist'));
    });

    test('should alert a message when a subscribed user clicks on "Fill the input and click here if you want to unsubscribe from our newsletter"', async () => {
        const spy = jest.spyOn(window, 'alert');

        renderWithProviders(
            <MemoryRouter initialEntries={initialEntries}>
                <Form />
            </MemoryRouter>
        );
        
        const input = screen.getByPlaceholderText('Email');
        userEvent.type(input, 'forbidden@gmail.com');
        userEvent.click(screen.getByRole('heading', {name: 'Fill the input and click here if you want to unsubscribe from our newsletter'}));
        await waitFor(() => expect(spy).toHaveBeenCalledWith('We will miss you!'));
    });
});