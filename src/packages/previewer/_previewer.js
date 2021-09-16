import Vue from 'vue';
import settings from './previewer.vue';

let PreviewerConstructor = Vue.extend(settings);

let inst;

let Previewer = function(options) {
  options.id = options.id || 'nut-Previewer-default-id';
  inst = new PreviewerConstructor({
    propsData: options
  });

  inst.vm = inst.$mount();

  let PreviewerDom = document.querySelector('#' + options.id);
  if (options.id && PreviewerDom) {
    PreviewerDom.parentNode.replaceChild(inst.$el, PreviewerDom);
  } else {
    document.body.appendChild(inst.$el);
  }

  return inst;
  // Vue.nextTick(() => {
  //     inst.visible = true;
  // });
};
Previewer.show = function(index = 0) {
  return (inst && inst.show(index)) || false;
};
Previewer.close = function() {
  inst && inst.close();
};
export default Previewer;
