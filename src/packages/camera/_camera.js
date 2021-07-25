import Vue from 'vue';
import settings from './camera.vue';

let CameraConstructor = Vue.extend(settings);

let inst;

let Camera = function(options) {
    options.id = options.id || 'nut-camera-default-id';
    inst = new CameraConstructor({
        propsData: options
    });

    inst.vm = inst.$mount();

    let cameraDom = document.querySelector('#' + options.id);
    if (options.id && cameraDom) {
        cameraDom.parentNode.replaceChild(inst.$el, cameraDom);
    } else {
        document.body.appendChild(inst.$el);
    }

    Vue.nextTick(() => {
        inst.visible = true;
    });
};
Camera.closed = function() {
    if (inst) {
        inst.close()
    }
}
export default Camera;