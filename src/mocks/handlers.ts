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
            }) 
        )
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
        )
    }),
    rest.post('http://localhost:4000/subscribe', async (req, res, ctx) => {
        let subscribedEmails = ['forbidden@gmail.com'];
        const { data } = await req.json();
        if (subscribedEmails.includes(data)) {
            return res(
                ctx.status(422), 
                ctx.json({
                    error: "Email is already in use"
                }), 
            )
        } else {
            subscribedEmails.push(data);
            return res(
                ctx.status(200), 
                ctx.json({
                    message: "Thank you for subscribing!"
                }), 
            )
        }
    }),
    rest.post('http://localhost:4000/unsubscribe', async (req, res, ctx) => {
        let subscribedEmails = ['forbidden@gmail.com'];
        const { data } = await req.json();
        if (subscribedEmails.includes(data)) {
            const index = subscribedEmails.findIndex((item) => item === data);
            if (index !== -1) {
                subscribedEmails.splice(index, 1);
            }
            return res(
                ctx.status(200), 
                ctx.json({
                    message: "We will miss you!"
                }), 
            )
        } else {
            return res(
                ctx.status(422), 
                ctx.json({
                    error: "Email does not exist"
                }),
            )
        }
    }),
];