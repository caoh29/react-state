import reducer, { subscribe, unsubscribe, EmailSubscriptionState } from './emailSubscriptionSlice';

describe('emailSubscriptionSlice', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            { isSubscribed: false }
        );
    })

    test('should change the isSubscribe to true', () => {
        const previousState: EmailSubscriptionState = {
            isSubscribed: false
        };

        expect(reducer(previousState, subscribe())).toEqual(
            { isSubscribed: true }
        );
    })

    test('should change the isSubscribe to false', () => {
        const previousState: EmailSubscriptionState = {
            isSubscribed: true
        };

        expect(reducer(previousState, unsubscribe())).toEqual(
            { isSubscribed: false }
        );
    })
});