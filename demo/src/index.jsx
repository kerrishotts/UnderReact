import React from "under-react";

const TempUnit = ({ unit = "F" } = {}) =>
    <span className="unit" style={{ opacity: 0.4 }}>
        &deg;{unit}
    </span>;

const Temperature = ({ temperature = undefined, unit = "F" } = {}) =>
    <span className="temperature">
        {temperature}
        <TempUnit unit={unit} />
    </span>;

const DayForecast = ({ high = undefined, low = undefined } = {}) =>
    <div>
        <div className="forecast-high">
            <span>High:</span>
            <Temperature {...high} />
        </div>
        <div className="forecast-low">
            <span>Low:</span>
            <Temperature {...low} />
        </div>
    </div>;

const Forecast = ({ days = [] } = {}) =>
    <div>
        {days.map(day => <DayForecast {...day} />)}
    </div>;

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { date: new Date() };
    }
    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("h1", null, "Hello, world!"),
            React.createElement(
                "h2",
                null,
                "It is ",
                this.state.date.toLocaleTimeString(),
                "."
            )
        );
    }
}

const App = () =>
    <div>
        <Forecast
            days={[
                {
                    high: { temperature: 90, unit: "F" },
                    low: { temperature: 67, unit: "F" },
                },
                {
                    high: { temperature: 92, unit: "F" },
                    low: { temperature: 72, unit: "F" },
                },
                {
                    high: { temperature: 88, unit: "F" },
                    low: { temperature: 65, unit: "F" },
                },
                {
                    high: { temperature: 85, unit: "F" },
                    low: { temperature: 70, unit: "F" },
                },
            ]}
        />
        <Clock />
    </div>;

console.log(React.expandVNodeTree(<App />));

//React.render(<App />, document.getElementById("root"));
