import React, {Component} from 'react';
import './../assets/style/index.scss';

interface IProp {
    toggle: any
}

export class MyDialog extends Component<IProp> {
    render () {
        return (
            <div className="co-my-dialog">
                <div className="mask"></div>
                <div className="container">
                    <i className="close-btn" onClick={this.props.toggle}></i>
                    { this.props.children }
                </div>
            </div>
        );
    }
}

export default MyDialog;
