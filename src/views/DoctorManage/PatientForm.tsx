import React, {Component} from 'react';
import '../../assets/style/doctor.scss';
import Api from './../../api';
import store from './../../store';
import {savePatientData} from "../../store/actions/doctor-action";

interface IForm {
    [patient_serial: string]: string,
    patient_name: string,
    patient_age: string,
    patient_month: string,
    patient_day: string,
    patient_telephone: string,
    patient_address: string,
    patient_nation_id: string,
    patient_gender: string,
    patient_is_married: string
}

//患者信息
interface IProp {
    patient: IForm,
    readOnly: boolean,
    togglePatientDialogVisible: any
}

interface Input {
    name: string,
    readOnly: boolean,
    defaultValue: string,
    value: string,
    setQuery: any,
    className?: string,
    blur: any,
    type?: string,
    options?: any[]
}

export class RenderInput extends Component <Input>{
    render () {
        const { defaultValue, value, setQuery, name, className, type, options, readOnly } = this.props;
        if (type === 'select') {
            let query: any = {};
            return (
                <select className={className} onChange={event => {
                    let value = event.target.value;
                    setQuery(name, value);
                    query[name] = value;
                    this.props.blur(query);
                }} disabled={readOnly}>
                    {
                        options.map(item => (
                            <option key={item.value} value={item.value} selected={defaultValue === item.value.toString()}>{item.label}</option>
                        ))
                    }
                </select>
            );
        }

        return readOnly ? (
            <input className={className} value={defaultValue}  id={name} readOnly={true} />
        ) : (
            <input className={className} value={value} onChange={(event) => {
                let value = event.target.value;
                setQuery(name, value);
            }} id={name} onBlur={() => {
                if (!this.props.value) {
                    return;
                }
                this.props.blur();
            }} />

        );
    }
}

export class PatientForm extends Component <IProp, IForm> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            patient_serial: '',
            patient_name: '',
            patient_age: '1',
            patient_month: '0',
            patient_day: '0',
            patient_telephone: '',
            patient_address: '',
            patient_nation_id: '0',
            patient_gender: '0',
            patient_is_married: '0'
        };
    }

    // 保存新病人信息
    updatePatient = (query = {}) => {
        if (!this.state.patient_serial) {
            return;
        }
        Api.update_patient(Object.assign(this.state, query)).then(() => {
            store.dispatch(savePatientData(this.state, false));
        });
    };

    onNewPatientClick = (): void => {
        Api.create_new_patient_file({}).then((res: any) => {
            let state = Object.assign(this.state, { patient_serial: res.data.patient_serial });
            this.setState(state);
            store.dispatch(savePatientData(state));
        });
    };

    setQuery = (type: string, value: string) => {
        this.setState((preState: IForm) => {
            type in preState && (preState[type] = value);
            return preState;
        });
    };

    filterOptions = (options: string[]) => {
        return options.map((item, index) => ({
            label: item || index.toString(), value: index.toString()
        }));
    };

    ageOptions = this.filterOptions(new Array(100).fill(''));
    monthOptions = this.filterOptions(new Array(12).fill(''));
    dayOptions = this.filterOptions(new Array(31).fill(''));
    marryOptions = this.filterOptions(['未婚', '已婚', '未知']);
    genderOptions = this.filterOptions(['男', '女', '中性', '不祥']);
    nationOptions = this.filterOptions(['汉族','壮族','满族','回族','苗族','维吾尔族','土家族','彝族','蒙古族','藏族','布依族','侗族','瑶族','朝鲜族','白族','哈尼族','哈萨克族','黎族','傣族','畲族','傈僳族','仡佬族','东乡族','高山族','拉祜族','水族','佤族','纳西族','羌族','土族','仫佬族','锡伯族','柯尔克孜族','达斡尔族','景颇族','毛南族','撒拉族','布朗族','塔吉克族','阿昌族','普米族','鄂温克族','怒族','京族','基诺族','德昂族','保安族','俄罗斯族','裕固族','乌孜别克族','门巴族','鄂伦春族','独龙族','塔塔尔族','赫哲族','珞巴族']);

    render() {
        let {
            patient_name,
            patient_age,
            patient_month,
            patient_day,
            patient_telephone,
            patient_address,
            patient_nation_id,
            patient_is_married,
            patient_gender
        } = this.state;
        let readOnly = !!this.props.readOnly;
        let patient: IForm = this.props.patient;

        return (
            <div className="co-patient-form">
                <span>输入病患信息</span>
                <button onClick={this.onNewPatientClick}>新患者</button>
                <button onClick={this.props.togglePatientDialogVisible}>查询患者</button>
                <br/>
                <label htmlFor="patient_serial">病历号：</label>
                <span className="patient_serial">{patient.patient_serial}</span>
                <br/>
                <label className="label" htmlFor="patient_name">姓名：</label>
                <RenderInput defaultValue={patient.patient_name}
                             value={patient_name}
                             name="patient_name"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <label className="label" htmlFor="patient_gender">性别：</label>
                <RenderInput defaultValue={patient.patient_gender}
                             value={patient_gender}
                             name="patient_gender"
                             type="select"
                             options={this.genderOptions}
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <label className="label" htmlFor="patient_age">年龄：</label>
                <RenderInput defaultValue={patient.patient_age || '1'}
                             value={patient_age}
                             name="patient_age"
                             type="select"
                             options={this.ageOptions}
                             className="short_input"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <span className="short-label">岁</span>
                <RenderInput defaultValue={patient.patient_month}
                             value={patient_month}
                             name="patient_month"
                             type="select"
                             options={this.monthOptions}
                             className="short_input"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <span className="short-label">月</span>
                <RenderInput defaultValue={patient.patient_day}
                             value={patient_day}
                             name="patient_day"
                             type="select"
                             options={this.dayOptions}
                             className="short_input"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <span className="short-label">天</span>
                <br/>
                <label className="label" htmlFor="patient_is_married">婚姻：</label>
                <RenderInput defaultValue={patient.patient_is_married}
                             value={patient_is_married}
                             name="patient_is_married"
                             type="select"
                             options={this.marryOptions}
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <label className="label" htmlFor="patient_nation">族别：</label>
                <RenderInput defaultValue={patient.patient_nation_id}
                             value={patient_nation_id}
                             name="patient_nation_id"
                             type="select"
                             options={this.nationOptions}
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <label className="long-label" htmlFor="patient_telephone">联系电话：</label>
                <RenderInput defaultValue={patient.patient_telephone}
                             value={patient_telephone}
                             name="patient_telephone"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
                <br/>
                <label className="long-label" htmlFor="patient_address">通信地址：</label>
                <RenderInput defaultValue={patient.patient_address}
                             value={patient_address}
                             name="patient_address"
                             className="long_input"
                             readOnly={readOnly}
                             setQuery={this.setQuery}
                             blur={this.updatePatient} />
            </div>
        )
    }
}

export default PatientForm;
