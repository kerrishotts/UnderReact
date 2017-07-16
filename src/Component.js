import diff from "./diff.js";
import VNode from "./VNode.js";

export default class Component {
    constructor(props = {}, context = {}) {
        this.props = props;
        this.state = {};
        this.context = context;

        /* private-ish properties */
        this._dirty = true;
        this._mounted = false;
        this._domNode = null;
        this._previousRender = null;
    }

    /**
     *
     * @param {any} [props]
     * @param {any} [state]
     * @param {any} [context]
     * @returns {VNode}
     * @memberof Component
     */
    render(props, state, context) {
        return new VNode();
    }

    /**
     * sets the component's new state and enqueues a rendering pass
     *
     * @param {any|function} newState
     * @memberof Component
     */
    setState(newState) {
        let nextState = newState;
        const prevState = Object.assign({}, this.state);
        if (typeof newState === "function") {
            nextState = newState(prevState, this.props);
        }
        this.state = Object.assign({}, this.state, nextState);
        // TODO: trigger lifecycle events?
        // TODO: trigger render pass
        window.requestAnimationFrame(() => {
            const rendering = this.render();
            diff(this._previousRender, rendering, this._domNode);
            this._previousRender = rendering;
        });
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
