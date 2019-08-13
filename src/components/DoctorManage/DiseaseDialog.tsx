import React, {Component} from 'react';
import { MyDialog } from "./../MyDialog";
import '../../assets/style/doctor.scss';
import Api from './../../api';
import store from './../../store';
import {saveAllSymptoms, saveChooseSymptoms} from './../../store/actions/doctor-action';

interface Item {
    symptom_id: string,
    symptom_name: string
}

//患者信息
interface IProp {
    doctor: any
    toggleDiseaseDialogVisible: any
}

interface IState {
    top_text: string,
    bottom_text: string,
    symptoms: Item[],
    data: Item[]
}

interface Disease {
    department_id: string,
    category_id: string,
    disease_id: string,
    disease_name: string
}

export class DiseaseDialog extends Component <IProp, IState> {
    ref: React.RefObject<HTMLDivElement>;
    number: number;
    disease: Disease;
    symptoms: any;
    constructor(props: IProp) {
        super(props);
        this.state = {
            symptoms: [],
            data: [],
            top_text: '',
            bottom_text: ''
        };
        this.disease = this.props.doctor.disease;
        this.ref = React.createRef();
        this.number = 0;
    }

    componentDidMount () {
        if (this.props.doctor.symptoms.length > 0) {
            this.setState({
                symptoms: this.props.doctor.symptomsList,
                data: this.props.doctor.symptoms
            })
        } else {
            this.get_all_symptoms();
        }
    }

    get_all_symptoms = () => {
        Api.get_all_symptoms({
            disease_id: this.disease.disease_id
        }).then((res: any) => {
            let list: any[] = [];
            res.data.forEach((item: any, index: number) => {
                if (Math.floor((index - 1) / 15) < Math.floor(index / 15)) {
                    list.push([]);
                }
                list[Math.floor(index / 15)].push(item);
            });
            this.setState({
                symptoms: list,
                top_text: res.top_text,
                bottom_text: res.bottom_text
            });
            store.dispatch(saveAllSymptoms(list));
        });
    };

    togglePage = (number: number) => {
        if ((this.number === 0 && number === 1) ||
            (this.number + this.state.symptoms.length <= 3 && number === -1)) {
            return;
        }
        this.number += number;
        this.ref.current.style.marginLeft = this.number * 260 + 'px';
    };

    addItem = (item: Item) => {
        this.setState((preState: IState) => {
            if (preState.data.includes(item)) {
                preState.data = preState.data.filter((symptom: Item) => symptom.symptom_id !== item.symptom_id);
            } else {
                preState.data.push(item);
            }
            return preState;
        });
    };

    submit = () => {
        store.dispatch(saveChooseSymptoms(this.state.data));
        this.props.toggleDiseaseDialogVisible(true);
    };

    render() {
        const { symptoms, top_text, bottom_text } = this.state;
        return (
            <MyDialog toggle={() => { this.props.toggleDiseaseDialogVisible(); }}>
                <div className="header">
                    <div className="title">{ this.disease.disease_name }</div>
                    <div className="disease_top_text">{ top_text }</div>
                </div>
                <div className="content disease-dialog-content">
                    <i className="icon left-icon" onClick={() => {this.togglePage(1)}}></i>
                    <i className="icon right-icon" onClick={() => {this.togglePage(-1)}}></i>
                    <div className="scroll-content">
                        <div className="content-columns" style={{
                            width: 260 * symptoms.length + 'px'
                        }} ref={this.ref}>
                            {
                                symptoms.length > 0 &&
                                symptoms.map((column: any, index: number) => (
                                    <div className="column" key={index}>
                                        {
                                            column.map((item: any) => (
                                                <div className={`checkbox-item ${this.state.data.includes(item) ? 'selected' : ''}`}
                                                     key={item.symptom_id}
                                                     onClick={() => {
                                                         this.addItem(item);
                                                     }}>{ item.symptom_name }</div>
                                            ))
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="footer">
                    <div className="disease_bottom_text" title={bottom_text}>{ bottom_text }</div>
                    <button className="confirm-btn" onClick={this.submit}>确定提交</button>
                </div>
            </MyDialog>
        )
    }
}

export default DiseaseDialog
