<template>
  <div class="demo">
    <text>{{ msg }}</text>
    <test :title="123">solt</test>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import test from '../../../../test.vue';
// import test from './test.vue';
export default {
  props: {},
  components: {
    test
  },
  setup() {
    const msg = ref('Hello world,Test NutUI');
    return {
      msg
    };
  }
};
</script>
