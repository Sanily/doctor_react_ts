import {
    SAVE_PATIENT_DATA,
    CHOOSE_ONE_DISEASE,
    SAVE_ALL_SYMPTOMS,
    SAVE_CHOOSE_SYMPTOMS
} from './actionType';

export function savePatientData (patient: any, readOnly: boolean = false) {
    return {
        type: SAVE_PATIENT_DATA,
        payload: { patient, readOnly }
    }
}

export function chooseOneDisease (disease: any, departments: any, categories: any, diseaseList: any) {
    return {
        type: CHOOSE_ONE_DISEASE,
        payload: { disease, departments, categories, diseaseList }
    }
}

export function saveAllSymptoms (symptomsList: any) {
    return {
        type: SAVE_ALL_SYMPTOMS,
        payload: { symptomsList }
    }
}

export function saveChooseSymptoms (symptoms: any) {
    return {
        type: SAVE_CHOOSE_SYMPTOMS,
        payload: { symptoms }
    }
}