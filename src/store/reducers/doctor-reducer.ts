import {
    SAVE_PATIENT_DATA,
    CHOOSE_ONE_DISEASE,
    SAVE_ALL_SYMPTOMS,
    SAVE_CHOOSE_SYMPTOMS
} from "../actions/actionType";

const initialState = {
    patient: {},
    disease: {},
    symptoms: {}
};

const doctorReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case SAVE_PATIENT_DATA: {
            return Object.assign({}, state, {...action.payload});
        }
        case CHOOSE_ONE_DISEASE: {
            return Object.assign({}, state, {...action.payload});
        }
        case SAVE_ALL_SYMPTOMS: {
            return Object.assign({}, state, {...action.payload});
        }
        case SAVE_CHOOSE_SYMPTOMS: {
            return Object.assign({}, state, {...action.payload});
        }
        default: {
            return state;
        }
    }
};

export default doctorReducer;