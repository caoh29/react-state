import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import Card from "./Card";
import userEvent from '@testing-library/user-event';

describe('Card', () => {
    const content = {
        id: 'user1',
        photo: 'url-to-photo',
        resume: 'Lorem ipsilum',
        name: 'UserName',
        company: {
            role: 'Developer',
            name: 'Awesome Company',
        },
    };

    const initialEntries: string[] = ["/", "/community", "/community/user1"];

    test('renders with valid props with path="/"', () => {
        const initialIndex: number = 0;
        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const ELEMENTS_LIST = [
            { element: screen.getByText(/developer/i)},
            { element: screen.getByText(/awesome company/i)},
            { element: screen.getByText(/lorem ipsilum/i)},
            { element: screen.getByText(/username/i)},
            { element: screen.getByAltText(/username/i)},
        ];

        for (const item of ELEMENTS_LIST) {
            expect(item.element).toBeInTheDocument();
        }
    });

    test('renders with valid props with path="/community"', () => {
        const initialIndex: number = 1;
        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const ELEMENTS_LIST = [
            { element: screen.getByText(/developer/i)},
            { element: screen.getByText(/awesome company/i)},
            { element: screen.getByText(/lorem ipsilum/i)},
            { element: screen.getByText(/username/i)},
            { element: screen.getByAltText(/username/i)},
        ];

        for (const item of ELEMENTS_LIST) {
            expect(item.element).toBeInTheDocument();
        }
    });

    test('renders with valid props with path="/community/:userId"', () => {
        const initialIndex: number = 2;
        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const ELEMENTS_LIST = [
            { element: screen.getByText(/developer/i)},
            { element: screen.getByText(/awesome company/i)},
            { element: screen.getByText(/lorem ipsilum/i)},
            { element: screen.getByAltText(/username/i)},
        ];

        for (const item of ELEMENTS_LIST) {
            expect(item.element).toBeInTheDocument();
        }
    });

    test('redirects to "community/:userId" on NavLink click', async () => {
        const initialIndex: number = 0;
        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const cardName = screen.getByText(/username/i);
        userEvent.click(cardName);
        expect(cardName).not.toBeInTheDocument();
    });
});