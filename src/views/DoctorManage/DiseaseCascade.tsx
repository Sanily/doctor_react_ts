import React, {Component} from 'react';
import '../../assets/style/doctor.scss';
import Api from './../../api'
import store from './../../store';
import { chooseOneDisease } from "../../store/actions/doctor-action";

//患者信息
interface IProp {
    visible: boolean,
    doctor: any,
    toggleDiseaseDialogVisible: any,
    toggleMessageVisible: any
}

interface IState {
    departments: any,
    categories: any,
    diseaseList: any,
    disease: string,
    department_id: string,
    category_id: string
}

export class DiseaseCascade extends Component <IProp, IState> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            departments: [],
            categories: [],
            diseaseList: [],
            department_id: '',
            category_id: '',
            disease: ''
        };
    }

    componentDidMount () {
        if (this.props.doctor.disease.disease_id) {
            this.setState({
                departments: this.props.doctor.departments,
                categories: this.props.doctor.categories,
                diseaseList: this.props.doctor.diseaseList,
                department_id: this.props.doctor.disease.department_id,
                category_id: this.props.doctor.disease.category_id,
                disease: this.props.doctor.disease.disease_id
            });
        } else {
            this.get_all_departments();
        }
    }

    get_all_departments = () => {
        Api.get_all_departments({}).then((res: any) => {
            this.setState({
                departments: res.data,
                categories: [],
                diseaseList: [],
                category_id: '',
                disease: '',
            });
        });
    };

    get_all_diseases = (category_type: string, category_id: string) => {
        let patient = this.props.doctor.patient;
        let patientItem = Object.keys(patient).filter((key: string) => {
            return patient[key] !== '';
        });
        // 病人信息未填完整
        if (patientItem.length < 8) {
            this.props.toggleMessageVisible('病人信息未填完整');
            return;
        }
        Api.get_all_diseases({
            category_type,
            category_id
        }).then((res: any) => {
            if (category_type === 'department') {
                let category_id = '';
                if (res.data.length === 1) {
                    category_id = res.data[0].disease_id;
                    this.get_all_diseases('disease', category_id);
                }
                this.setState({
                    categories: res.data,
                    diseaseList: [],
                    category_id: category_id,
                    disease: '',
                });
            } else {
                this.setState({
                    diseaseList: res.data,
                    disease: ''
                });
            }
        });
    };

    choose = (item: any) => {
        this.setState({
            disease: item.disease_id
        });
        store.dispatch(chooseOneDisease({
            department_id: this.state.department_id,
            category_id: this.state.category_id,
            disease_id: item.disease_id,
            disease_name: item.disease_name
        }, this.state.departments, this.state.categories, this.state.diseaseList));
        this.props.toggleDiseaseDialogVisible();
    };

    render() {
        return (
            <div className="diseaseCasecader">
                <div className="col1"><h1>疾病选择</h1>
                    {
                        this.state.departments.map((item: any) => (
                            <span key={item.department_id} className={
                                this.state.department_id === item.department_id ? 'selected' : ''
                            } onClick={() => {
                                this.setState({
                                    department_id: item.department_id
                                });
                                this.get_all_diseases('department', item.department_id)
                            }}>{ item.department_name }</span>
                        ))
                    }
                </div>

                <div className="col2">
                    {
                        this.state.categories.length > 1 &&
                        this.state.categories.map((item: any) => (
                            <span key={item.disease_id} className={
                                this.state.category_id === item.disease_id ? 'selected' : ''
                            } onClick={() => {
                                this.setState({
                                    category_id: item.disease_id
                                });
                                this.get_all_diseases('disease', item.disease_id)
                            }}>{ item.disease_name }</span>
                        ))
                    }
                </div>
                <div className="col3">
                    {
                        this.state.diseaseList.length > 0 &&
                        this.state.diseaseList.map((item: any) => (
                            <span key={item.disease_id} className={
                                this.state.disease === item.disease_id ? 'selected' : ''
                            } onClick={() => {
                                this.choose(item);
                            }}>{ item.disease_name }</span>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default DiseaseCascade;
