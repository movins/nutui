import { shallowMount, mount } from '@vue/test-utils'
import Camera from '../camera.vue';
import Vue from 'vue';


describe('Camera.vue', () => {
    const wrapper = shallowMount(Camera, {
    });

    it('可见', () => {
        wrapper.setProps({ visible: true });

        return Vue.nextTick().then(function () {
            expect(wrapper.find('.nut-camera-mask').isVisible()).toBe(true);
            expect(wrapper.find('.nut-camera-box').isVisible()).toBe(true);
        })
    });

    it('隐藏', () => {
        wrapper.setProps({ visible: false });

        return Vue.nextTick().then(function () {
            expect(wrapper.find('.nut-camera-box').isVisible()).toBe(false);
        })
    });
});