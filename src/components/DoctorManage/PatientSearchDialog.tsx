import React, {Component} from 'react';
import './../../assets/style/index.scss';
import './../../assets/style/doctor.scss';
import { MyDialog } from "./../MyDialog";
import Api from './../../api';
import store from './../../store';
import { savePatientData } from './../../store/actions/doctor-action';

//患者信息
interface IProp {
    root: any,
    togglePatientDialogVisible: any
}

interface Query {
    [patient_serial: string]: string,
    patient_name: string,
    patient_age: string,
    patient_contact: string,
    patient_address: string,
    // patient_nation_id: string,
    patient_gender: string
}

interface IState {
    query: Query,
    patient: any
}

export class PatientSearchDialog extends Component <IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            query: {
                patient_serial: '',
                patient_name: '',
                patient_age: '',
                patient_contact: '',
                patient_address: '',
                // patient_nation_id: '',
                patient_gender: ''
            },
            patient: []
        };
    }

    componentDidMount () {
        this.patientQuery();
    }

    patientQuery () {
        Api.patient_query(this.state.query).then((res: any) => {
            this.setState({
                patient: res.data.patients
            });
        })
    }

    setQuery = (type: string, value: string) => {
        this.setState((preState: IState) => {
            let query = preState.query
            type in query && (preState.query[type] = value);
            this.patientQuery();
            return preState;
        });
    };

    render () {
        const { id, user_serial } = this.props.root;

        let {query: {
            patient_serial,
            patient_name,
            patient_age,
            patient_contact,
            patient_address,
            // patient_nation_id: '',
            patient_gender
        }, patient} = this.state;
        return (
            <MyDialog toggle={() => { this.props.togglePatientDialogVisible(); }}>
                <div className="header">
                    <div className="title">医生个人中心</div>
                </div>
                <div className="content patient-search-dialog-content">
                    <div className="doctor-title">医生资料</div>
                    <div className="doctor-content">
                        <span>序号：{ id }</span>&nbsp;&nbsp;&nbsp;&nbsp;
                        <span>医生编号：{ user_serial }</span>
                        {/*<div className="button">剩余次数{}, <button>充值</button></div>*/}
                    </div>
                    <div className="table">
                        <table cellPadding={0} cellSpacing={0}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>患者病历号</th>
                                    <th>患者姓名</th>
                                    <th>手机号</th>
                                    <th>性别</th>
                                    <th>年龄</th>
                                    {/*<th>民族</th>*/}
                                    <th>地址</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="tsearch">
                                    <td></td>
                                    <td><input value={patient_serial} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_serial', value);
                                    }} /></td>
                                    <td><input value={patient_name} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_name', value);
                                    }} /></td>
                                    <td><input value={patient_contact} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_contact', value);
                                    }} /></td>
                                    <td><input value={patient_gender} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_gender', value);
                                    }} /></td>
                                    <td><input value={patient_age} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_age', value);
                                    }} /></td>
                                    <td><input value={patient_address} onChange={(event) => {
                                        let value = event.target.value
                                        this.setQuery('patient_address', value);
                                    }} /></td>
                                </tr>
                                {
                                    patient.map((item: any, index: number) => (
                                        <tr key={item.id} onClick={() => {
                                            this.props.togglePatientDialogVisible();
                                            item.readOnly = true;
                                            store.dispatch(savePatientData(item, true));
                                        }}>
                                            <td>{ index + 1 }</td>
                                            <td>{ item.patient_serial }</td>
                                            <td>{ item.patient_name }</td>
                                            <td>{ item.patient_telephone }</td>
                                            <td>{ item.patient_gender }</td>
                                            <td>{ item.patient_age }</td>
                                            <td>{ item.patient_address }</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </MyDialog>
        );
    }
}

export default PatientSearchDialog;
