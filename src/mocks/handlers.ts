// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
    rest.get('http://localhost:4000/community/:userId', (req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json({
                id: 'userPage1',
                name: 'John Smith',
                photo: 'https://randomuser.me/api/portraits/men/75.jpg',
                resume: 'Lorem Ipsum',
                company: {
                    name: 'Company',
                    role: 'Developer'
                }
            }), 
            ctx.delay(150))
    }),
    rest.get('http://localhost:4000/community', (req, res, ctx) => {
        return res(
            ctx.status(200), 
            ctx.json([
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
            ]), 
            ctx.delay(150))
    })
];