import PreviewerVue from './previewer.vue';
import Previewer from './_previewer';
import './previewer.scss';

const PreviewerArr = [Previewer, PreviewerVue];

PreviewerArr.install = function(Vue) {
  Vue.prototype['$previewer'] = Previewer;
  Vue.component(PreviewerVue.name, PreviewerVue);
};

export default PreviewerArr;
