import CameraVue from './camera.vue';
import Camera from './_camera';
import './camera.scss';

const CameraArr = [Camera, CameraVue];

CameraArr.install = function(Vue) {
  Vue.prototype['$camera'] = Camera;
  Vue.component(CameraVue.name, CameraVue);
};

export default CameraArr;
