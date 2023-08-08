import reducer, { changeVisibility, ShowSectionState } from './showSectionSlice';

describe('showSectionSlice', () => {
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(
            { isVisible: false }
        );
    })

    test('should change the visibility to true', () => {
        const previousState: ShowSectionState = {
            isVisible: false
        };

        expect(reducer(previousState, changeVisibility())).toEqual(
            { isVisible: true }
        );
    })

    test('should change the visibility to false', () => {
        const previousState: ShowSectionState = {
            isVisible: true
        };

        expect(reducer(previousState, changeVisibility())).toEqual(
            { isVisible: false }
        );
    })
});