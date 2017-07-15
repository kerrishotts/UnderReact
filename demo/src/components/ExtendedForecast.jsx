import { createElement } from "under-react";
import DayForecast from "./DayForecast.jsx";

export const ExtendedForecast = ({ days = [] } = {}) =>
    <div>
        {days.map(day => <DayForecast {...day} />)}
    </div>;

export default ExtendedForecast;
