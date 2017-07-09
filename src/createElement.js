import VNode from "./VNode.js";
export default function createElement(tag, props, ...children) {
    return new VNode(tag, props, ...children);
}
