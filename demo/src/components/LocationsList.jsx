import { createElement } from "under-react";
import Location from "./Location.jsx";

export const LocationsList = ({ locations = [], onRemoveLocation = null, onToggleFavorite = null } = {}) =>
    <ul>
        {locations.map((location, idx) =>
            <li key={idx} onRemoveLocation={onRemoveLocation} onToggleFavorite={onToggleFavorite}>
                <Location {...location} />
            </li>
        )}
    </ul>;

export default LocationsList;
