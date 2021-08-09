<template>
  <div class="nut-rate">
    <span
      class="nut-rate-item"
      :class="[{ 'nut-rate-active': n <= current }]"
      v-for="n in total"
      :key="n"
      @click="onClick($event, n)"
      :style="itemStyle(n)"
    ></span>
  </div>
</template>
<script>
import './rate.scss';
export default {
  name: 'nut-rate',
  props: {
    total: {
      type: [String, Number],
      default: 5
    },
    value: {
      type: [String, Number],
      default: 3
    },
    size: {
      type: [String, Number],
      default: 25
    },
    uncheckedIcon: {
      type: String,
      default: null
    },
    checkedIcon: {
      type: String,
      default: null
    },
    readOnly: {
      type: Boolean,
      default: false
    },
    spacing: {
      type: [String, Number],
      default: 20
    }
  },
  data() {
    return {
      current: 3
    };
  },
  created() {
    this.current = this.value;
  },
  methods: {
    itemStyle (n) {
      const width = (this.$remUnit && `${this.size / this.$remUnit}rem`) || `${this.size}px`
      const height = (this.$remUnit && `${this.size / this.$remUnit}rem`) || `${this.size}px`
      const marginRight = (this.$remUnit && `${this.spacing / this.$remUnit}rem`) || `${this.spacing}px`
      const backgroundImage = n <= this.current ? this.checkedIcon : this.uncheckedIcon
      return {width, height, marginRight, backgroundImage}
    },
    onClick($event, idx) {
      if (this.readOnly) {
        this.$emit('input', this.current);
        this.$emit('click', this.current);
      } else {
        if (this.current == idx) {
          this.current = 0;
        } else {
          this.current = idx;
        }
        this.$emit('input', this.current);
        this.$emit('click', this.current);
      }
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.current = newVal;
    }
  }
};
</script>
