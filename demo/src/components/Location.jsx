import { createElement, Component } from "under-react";
import Temperature from "./Temperature.jsx";
import getWeather from "../util/getWeather.js";

export class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conditions: {
                temp: "unknown",
                text: "unknown",
            },
            forecast: [],
        }; // for now; we want to request additional information async
    }

    async componentDidMount() {
        const weather = await getWeather(this.props.location);
        this.setState({
            conditions: {
                temp: weather.channel.item.condition.temp,
                text: weather.channel.item.condition.text,
            },
        });
    }

    render() {
        return (
            <div>
                <h2>
                    {this.props.location}
                </h2>
                <p>
                    Temperature: <Temperature temperature={this.state.conditions.temp} />
                </p>
                <p>
                    Description: {this.state.conditions.text}
                </p>
            </div>
        );
    }
}

export default Location;
