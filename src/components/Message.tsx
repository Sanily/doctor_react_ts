import React, {Component} from 'react';

interface Prop {
    message: string,
    close: any
}

class Message extends Component<Prop>{
    ref: React.RefObject<HTMLDivElement>;
    constructor (props: Prop) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount () {
        setTimeout(() => {
            this.ref.current && (this.ref.current.style.top = 300 + 'px');
        }, 0);

        setTimeout(() => {
            this.ref.current && (this.ref.current.style.top = 0 + 'px');
        }, 2000);

        setTimeout(() => {
            this.props.close();
        }, 3000);
    }

    render () {
        return (
            <div className="co-message-container" ref={this.ref}>
                { this.props.message }
            </div>
        )
    }
}

export default Message;