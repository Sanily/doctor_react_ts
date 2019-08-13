import instance from "./instance";

const user_login = (opts: object): any => {
    return instance({
        type: 'post',
        url: '/user/login',
        opts: opts
    })
};

const send_login_sms = (opts: object): any => {
    return instance({
        type: 'post',
        url: '/user/send-login-sms',
        opts: opts
    })
};

const create_new_patient_file = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/user-doctor/create-patient',//这个接口生成病人编号，后续再用update接口完善病人信息
        opts: opts
    })
};

// 医生界面获取科室
const get_all_departments = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/user-doctor/get-all-departments',
        opts: opts
    })
};

// 医生界面获取疾病菜单
const get_all_diseases = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/user-doctor/get-all-diseases',
        opts: opts
    })
};

// 医生界面获取症状菜单
const get_all_symptoms = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/user-doctor/get-all-symptoms',
        opts: opts
    })
};

// 提交症状-获取处方
const make_prescription = (opts: object): any => {
    return instance({
        type: 'post',
        url: '/user-doctor/make-prescription',
        opts: opts
    })
};

// 获取专家介绍
const get_expert = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/user-doctor/get-expert',
        opts: opts
    })
};

// 保存新病人信息
const update_patient = (opts: object): any => {
    return instance({
        type: 'post',
        url: '/user-doctor/update-patient',
        opts: opts
    })
};

// 查询患者
const patient_query = (opts: object): any => {
    return instance({
        type: 'get',
        url: '/patient/query',
        opts: opts
    })
};

export default {
    user_login,
    send_login_sms,
    create_new_patient_file,
    get_all_departments,
    get_all_diseases,
    get_all_symptoms,
    make_prescription,
    get_expert,
    update_patient,
    patient_query
};