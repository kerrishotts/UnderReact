import { createElement } from "under-react";

import TempUnit from "./TempUnit.jsx";

export const Temperature = ({ temperature = undefined, unit = "F" } = {}) =>
    <span className="temperature">
        {temperature}
        <TempUnit unit={unit} />
    </span>;

export default Temperature;
