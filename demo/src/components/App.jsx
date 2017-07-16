import { createElement, Component } from "under-react";
import ExtendedForecast from "./ExtendedForecast.jsx";
import Clock from "./Clock.jsx";
import LocationsList from "./LocationsList.jsx";

const defaultLocations = [
    {
        location: "New York City, NY",
        favorite: false,
    },
    {
        location: "San Jose, CA",
        favorite: false,
    },
];

export class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            locations: defaultLocations,
        };
    }
    toggleFavorite(el) {
        // TODO
    }
    removeLocation(el) {
        // TODO
    }
    addLocation() {
        // TODO
    }
    render() {
        return (
            <div>
                <h1>Current Weather Conditions</h1>
                <LocationsList
                    locations={this.state.locations}
                    onToggleFavorite={evt => this.toggleFavorite(evt.target)}
                    onRemoveLocation={evt => this.removeLocation(evt.target)}
                />
                <Clock />
            </div>
        );
    }
}

export default App;
