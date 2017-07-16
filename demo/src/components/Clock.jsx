import { createElement, Component } from "under-react";

export class Clock extends Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
        this.alert = () => alert("hi");
    }

    componentDidMount() {
        this.timerID = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }
    render() {
        return (
            <div onClick={this.alert}>
                <h1>Hello, world!</h1>
                <h2>
                    It is {this.state.date.toLocaleTimeString()}.
                </h2>
            </div>
        );
    }
}

export default Clock;
