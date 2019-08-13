import { SAVE_USER_DATA } from "../actions/actionType";

const initialState = {
    root: {}
}

const userReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SAVE_USER_DATA: {
            return Object.assign({}, state, {...action.payload});
        }
        default: {
            return state;
        }
    }
};

export default userReducer;