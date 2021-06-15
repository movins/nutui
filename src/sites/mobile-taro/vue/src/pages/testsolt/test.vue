<template>
  <view class="test">
    <text>{{ msg }}</text>
    <view @click="titleclick">{{ title }}</view>
    <slot></slot>
  </view>
</template>

<script>
import { ref } from 'vue';
export default {
  props: {
    title: String
  },
  setup() {
    const msg = ref('test');
    const titleclick = () => {
      console.log('title click');
    };
    return {
      msg,
      titleclick
    };
  }
};
</script>

<style>
.test {
  border: 1px solid red;
}
</style>
