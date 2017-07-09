import { AbstractMethodError } from "./errors.js";

export default class Component {
    constructor(props = {}, context = {}) {
        this.props = props;
        this.state = {};
        this.context = context;

        /* private-ish properties */
        this._dirty = true;
        this._mounted = false;
        this._domNode = null;
    }

    render(props, state, context) {}

    /**
     * sets the component's new state and enqueues a rendering pass
     *
     * @param {any|function} newState
     * @memberof Component
     */
    setState(newState) {
        let state = newState;
        const prevState = Object.assign({}, this.state);
        if (typeof newState === "function") {
            state = newState(this.state, this.props);
        }
        this.state = Object.assign({}, this.state, newState);
        // TODO: trigger lifecycle events?
        // TODO: trigger render pass
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this._dirty;
    }

    componentWillMount() {}
    componentDidMount() {}

    componentWillUnmount() {}

    componentWillReceiveProps(nextProps, nextContext) {}

    componentWillUpdate(nextProps, nextState, nextContext) {}
    componentDidUpdate(prevProps, prevState, prevContext) {}
}
