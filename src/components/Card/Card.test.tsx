import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";

import Card from "./Card";

describe('<Card />', () => {
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

        const cardRole = screen.getByText(/developer/i);
        expect(cardRole).toBeInTheDocument();
        expect(cardRole).toBeVisible();
        expect(cardRole).toHaveTextContent('Developer');

        const cardCompanyName = screen.getByText(/awesome company/i);
        expect(cardCompanyName).toBeInTheDocument();
        expect(cardCompanyName).toBeVisible();
        expect(cardCompanyName).toHaveTextContent('Awesome Company');

        const cardImage = screen.getByAltText(/username/i);
        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toBeVisible();

        const cardResume = screen.getByText(/lorem ipsilum/i);
        expect(cardResume).toBeInTheDocument();
        expect(cardResume).toBeVisible();
        expect(cardResume).toHaveTextContent('Lorem ipsilum');

        const cardName = screen.getByText(/username/i);
        expect(cardName).toBeInTheDocument();
        expect(cardName).toBeVisible();
        expect(cardName).toHaveTextContent('UserName');
    });

    test('renders with valid props with path="/community"', () => {
        const initialIndex: number = 1;

        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const cardRole = screen.getByText(/developer/i);
        expect(cardRole).toBeInTheDocument();
        expect(cardRole).toBeVisible();
        expect(cardRole).toHaveTextContent('Developer');

        const cardCompanyName = screen.getByText(/awesome company/i);
        expect(cardCompanyName).toBeInTheDocument();
        expect(cardCompanyName).toBeVisible();
        expect(cardCompanyName).toHaveTextContent('Awesome Company');

        const cardImage = screen.getByAltText(/username/i);
        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toBeVisible();

        const cardResume = screen.getByText(/lorem ipsilum/i);
        expect(cardResume).toBeInTheDocument();
        expect(cardResume).toBeVisible();
        expect(cardResume).toHaveTextContent('Lorem ipsilum');

        const cardName = screen.getByText(/username/i);
        expect(cardName).toBeInTheDocument();
        expect(cardName).toBeVisible();
        expect(cardName).toHaveTextContent('UserName');
    });

    test('renders with valid props with path="/community/:userId"', () => {
        const initialIndex: number = 2;

        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const cardRole = screen.getByText(/developer/i);
        expect(cardRole).toBeInTheDocument();
        expect(cardRole).toBeVisible();
        expect(cardRole).toHaveTextContent('Developer');

        const cardCompanyName = screen.getByText(/awesome company/i);
        expect(cardCompanyName).toBeInTheDocument();
        expect(cardCompanyName).toBeVisible();
        expect(cardCompanyName).toHaveTextContent('Awesome Company');

        const cardImage = screen.getByAltText(/username/i);
        expect(cardImage).toBeInTheDocument();
        expect(cardImage).toBeVisible();

        const cardResume = screen.getByText(/lorem ipsilum/i);
        expect(cardResume).toBeInTheDocument();
        expect(cardResume).toBeVisible();
        expect(cardResume).toHaveTextContent('Lorem ipsilum');
    });

    test('redirects to "community/:userId" on NavLink click', () => {
        const initialIndex: number = 0;

        render(
            <MemoryRouter initialIndex={initialIndex} initialEntries={initialEntries}>
                <Card content={content} isActive={true} />
            </MemoryRouter>
        );

        const cardName = screen.getByText(/username/i);

        fireEvent.click(cardName);
        expect(cardName).not.toBeInTheDocument();
        // expect(window.location.pathname).toBe('/community/user1');
    });
});