import { createElement } from "under-react";
import ExtendedForecast from "./ExtendedForecast.jsx";
import Clock from "./Clock.jsx";

export const App = () =>
    <div>
        <ExtendedForecast
            days={[
                {
                    key: 1,
                    high: { temperature: 90, unit: "F" },
                    low: { temperature: 67, unit: "F" },
                },
                {
                    key: 2,
                    high: { temperature: 92, unit: "F" },
                    low: { temperature: 72, unit: "F" },
                },
                {
                    key: 3,
                    high: { temperature: 88, unit: "F" },
                    low: { temperature: 65, unit: "F" },
                },
                {
                    key: 4,
                    high: { temperature: 85, unit: "F" },
                    low: { temperature: 70, unit: "F" },
                },
            ]}
        />
        <Clock />
    </div>;

export default App;
