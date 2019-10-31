import resolve from "rollup-plugin-node-resolve";
import legacy from 'rollup-plugin-legacy';
export default {
    plugins: [resolve(), legacy({
        'node_modules/three/examples/js/vr/WebVR.js': "WEBVR"
    })]
};
