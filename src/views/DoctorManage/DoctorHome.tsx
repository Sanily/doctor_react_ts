import React, {Component} from 'react';
import '../../assets/style/doctor.scss';
import { DiseaseCascade } from "./DiseaseCascade";
import { PatientForm } from "./PatientForm";
import { PatientSearchDialog } from "./PatientSearchDialog";
import { DiseaseDialog } from "./DiseaseDialog";
import { Symptoms } from "./Symptoms";
import { ExpertDialog } from "./ExpertDialog";
import store from './../../store';
import Message from './../../components/Message';

//患者信息
interface Patient {
    patientSerial: string,
    name: string,
    gender: number,
    ageYear: number,
    ageMonth: number,
    ageDay: number,
    isMarried: number,
    nation: number,
    contact: number,
    address: string
}

interface State {
    patientSerial: string,
    diseaseCasecaderVisible: boolean,
    symptomsVisible: boolean,
    patientDialogVisible: boolean,
    diseaseDialogVisible: boolean,
    expertVisible: boolean,
    messageVisible: boolean,
    message: string
}

export class DoctorHome extends Component <Patient, State> {
    constructor(props: Patient) {
        super(props);
        this.state = {
            patientSerial: '',
            diseaseCasecaderVisible: true,
            symptomsVisible: false,
            patientDialogVisible: false,
            diseaseDialogVisible: false,
            expertVisible: false,
            messageVisible: false,
            message: ''
        };
    }

    togglePatientDialogVisible = () => {
        this.setState((preState: State) => {
            preState.patientDialogVisible = !preState.patientDialogVisible;
            return preState;
        });
    };

    toggleDiseaseDialogVisible = (next: boolean = false) => {
        this.setState((preState: State) => {
            preState.diseaseDialogVisible = !preState.diseaseDialogVisible;
            if (preState.diseaseCasecaderVisible && next) {
                preState.diseaseCasecaderVisible = false;
                preState.symptomsVisible = true;
            }
            return preState;
        });
    };

    toggleExpertDialogVisible = () => {
        this.setState((preState: State) => {
            preState.expertVisible = !preState.expertVisible
            return preState;
        });
    };

    toggleMessageVisible = (message: string = '') => {
        this.setState((preState: State) => {
            preState.messageVisible = !preState.messageVisible;
            preState.message = message;
            return preState;
        });
    }

    toggleVisible = () => {
        this.setState((preState: State) => {
            preState.diseaseCasecaderVisible = true;
            preState.symptomsVisible = false;
            return preState;
        });
    };

    render() {
        const { doctor, user: { root } } = store.getState();
        return (
            <div className="pg-doctor-manage">
                <div className="title">医生主页</div>
                {/*患者表单*/}
                <PatientForm patient={doctor.patient}
                             readOnly={doctor.readOnly}
                             togglePatientDialogVisible={this.togglePatientDialogVisible} />

                {/*选择疾病*/}
                {
                    this.state.diseaseCasecaderVisible &&
                        <DiseaseCascade visible={this.state.diseaseCasecaderVisible}
                                        doctor={doctor}
                                        toggleMessageVisible={this.toggleMessageVisible}
                                        toggleDiseaseDialogVisible={this.toggleDiseaseDialogVisible} /> }
                {/*症状*/}
                {
                    this.state.symptomsVisible &&
                        <Symptoms doctor={doctor}
                                  toggleVisible={this.toggleVisible}
                                  toggleDiseaseDialogVisible={this.toggleDiseaseDialogVisible}
                                  toggleExpertDialogVisible={this.toggleExpertDialogVisible}
                                  toggleMessageVisible={this.toggleMessageVisible} />
                }

                {/*选择疾病弹框*/}
                {
                    this.state.diseaseDialogVisible &&
                    <DiseaseDialog doctor={doctor}
                        toggleDiseaseDialogVisible={this.toggleDiseaseDialogVisible} />
                }

                {/*选择患者弹框*/}
                {
                    this.state.patientDialogVisible &&
                    <PatientSearchDialog togglePatientDialogVisible={this.togglePatientDialogVisible}
                                         root={root} />
                }

                {/*专家介绍*/}
                {
                    this.state.expertVisible &&
                    <ExpertDialog doctor={doctor}
                                  toggleExpertDialogVisible={this.toggleExpertDialogVisible} />
                }

                {
                    this.state.messageVisible &&
                    <Message message={this.state.message} close={this.toggleMessageVisible} />
                }
            </div>
        )
    }
}

export default DoctorHome
