import { SAVE_USER_DATA } from './actionType';

export function saveUserData (root: any) {
    return {
        type: SAVE_USER_DATA,
        payload: { root }
    }
}