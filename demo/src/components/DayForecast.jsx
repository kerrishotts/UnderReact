import { createElement } from "under-react";
import Temperature from "./Temperature.jsx";

export const DayForecast = ({ high = undefined, low = undefined } = {}) =>
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

export default DayForecast;
