import React, {Component} from 'react';
import { MyDialog } from "./../MyDialog";
import '../../assets/style/doctor.scss';
import Api from './../../api';


//患者信息
interface IProp {
    doctor: any
    toggleExpertDialogVisible: any
}

interface State {
    url: string
}

export class ExpertDialog extends Component <IProp, State> {
    constructor(props: IProp) {
        super(props);
        this.state = {
            url: ''
        };
    }

    componentDidMount () {
        this.getExpert();
    }

    getExpert = () => {
        Api.get_expert({
            disease_id: this.props.doctor.disease.disease_id
        }).then((res: any) => {
            this.setState({
                url: res.data.expert_img
            })
        });
    };

    render() {
        return (
            <MyDialog toggle={() => { this.props.toggleExpertDialogVisible(); }}>
                <div className="header"></div>
                <div className="content expert-dialog-content">
                    <img src={this.state.url} width={'100%'} alt="专家"/>
                </div>
            </MyDialog>
        )
    }
}

export default ExpertDialog;
