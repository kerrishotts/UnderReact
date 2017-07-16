import diff from "./diff.js";
import VNode from "./VNode.js";
import expandVNodeTree from "./expandVNodeTree.js";

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
        if (this.state === newState) {
            return;
        }

        this._dirty = true;

        let nextState = newState;
        const prevState = Object.assign({}, this.state),
            prevProps = Object.assign({}, this.props),
            prevContext = Object.assign({}, this.context);

        if (typeof newState === "function") {
            nextState = newState(prevState, this.props);
        }

        this.state = Object.assign({}, this.state, nextState);

        // trigger a render at the next frame
        window.requestAnimationFrame(() => {
            let rendering = this._previousRender;
            if (this.shouldComponentUpdate(this.props, this.state, this.context)) {
                this.componentWillUpdate(this.props, this.state, this.context);
                rendering = expandVNodeTree(this.render(this.props, this.state, this.context), this.context);
                this.componentDidUpdate(prevProps, prevState, prevContext);
            }
            rendering._component = this;
            diff(this._previousRender, rendering, this._domNode, this.context);
            this._previousRender = rendering;
            this._dirty = false;
        });
    }

    /**
     * Determine whether or not the component should update. If `false` is
     * returned, the component may not be updated.
     *
     * @param {any} nextProps
     * @param {any} nextState
     * @param {any} nextContext
     * @returns
     * @memberof Component
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this._dirty;
    }

    /**
     * Fires before the component is officially added to the DOM. (In our case,
     * it's already there, but the component doesn't know that)
     *
     * @memberof Component
     */
    componentWillMount() {}

    /**
     * Fires after the component is officially added to the DOM.
     *
     * @memberof Component
     */
    componentDidMount() {}

    /**
     * Fires before a component is removed from the DOM.
     *
     * @memberof Component
     */
    componentWillUnmount() {}

    /**
     * Fires when a component receives new props
     *
     * @param {any} nextProps
     * @param {any} nextContext
     * @memberof Component
     */
    componentWillReceiveProps(nextProps, nextContext) {
        this.props = nextProps;
    }

    /**
     * Called before the component is about to be rendered
     *
     * @param {any} nextProps
     * @param {any} nextState
     * @param {any} nextContext
     * @memberof Component
     */
    componentWillUpdate(nextProps, nextState, nextContext) {}

    /**
     * Called after the component has been rendered
     *
     * @param {any} prevProps
     * @param {any} prevState
     * @param {any} prevContext
     * @memberof Component
     */
    componentDidUpdate(prevProps, prevState, prevContext) {}
}
