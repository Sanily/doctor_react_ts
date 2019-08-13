import React, {Component} from 'react';
import '../../assets/style/doctor.scss';
import store from './../../store';
import {saveChooseSymptoms} from "../../store/actions/doctor-action";
import Api from './../../api';

//患者信息
interface IProp {
    doctor: any,
    toggleVisible: any,
    toggleDiseaseDialogVisible: any,
    toggleExpertDialogVisible: any,
    toggleMessageVisible: any
}

export class Symptoms extends Component <IProp> {
    submit = () => {
        const {
            symptoms,
            disease: { department_id, disease_id },
            patient: { patient_serial }
        } = this.props.doctor;
        Api.make_prescription({
            patient_serial: patient_serial,
            department_id: department_id,
            disease_id: disease_id,
            symptoms: JSON.stringify(symptoms)
        }).then((res: any) => {
            if (res.flag !== 0) {
                let result = window.confirm(res.confirm_message);
                if (!result) {
                    return;
                }
            }
        }).catch((err: any) => {
            this.props.toggleMessageVisible(err.message);
        });
    };

    render() {
        const { disease: { disease_name: disease }, symptoms } = this.props.doctor;
        return (
            <div className="co-symptoms">
                <div className="header">
                    <button className="left" onClick={this.props.toggleDiseaseDialogVisible}>选择症状</button>
                    <span>{ disease }</span>
                </div>
                <div className="content">
                    {
                        symptoms.length > 0 && symptoms.map((item: any) => (
                            <div className="item" key={item.symptom_id}>
                                { item.symptom_name }
                                <i onClick={() => {
                                    let data = symptoms
                                        .filter((item1: any) => item1.symptom_id !== item.symptom_id);
                                    store.dispatch(saveChooseSymptoms(data));
                                }} />
                            </div>
                        ))
                    }
                    <div className="footer">
                        <button className="left" onClick={() => {
                            this.props.toggleVisible();
                            store.dispatch(saveChooseSymptoms([]));
                        }}>返回主页</button>
                        {/*<button className="right" onClick={this.submit}>确定提交</button>*/}
                    </div>
                </div>
            </div>
        )
    }
}

export default Symptoms;
