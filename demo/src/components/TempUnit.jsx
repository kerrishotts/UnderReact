import { createElement } from "under-react";

export const TempUnit = ({ unit = "F" } = {}) =>
    <span className="unit" style={{ opacity: 0.4 }}>
        &deg;{unit}
    </span>;

export default TempUnit;
