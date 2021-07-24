import Vue from 'vue';

const MIN_DISTANCE = 10;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    return 'vertical';
  }

  return '';
}

const TouchMixin = Vue.extend({
  data() {
    return { direction: '', touchDowned: false };
  },

  methods: {
    touchStart(event) {
      this.resetTouchStatus();
      this.touchDowned = true
      let {touches = []} = event 
      touches = (touches.length && touches[0]) || event;

      this.startX = touches && touches.clientX;
      this.startY = event.touches[0].clientY;
    },

    touchMove(event) {
      if (!this.touchDowned) {
        return
      }
      let {touches = []} = event 
      touches = (touches.length && touches[0]) || event;

      this.deltaX = touches.clientX - this.startX;
      this.deltaY = touches.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    },

    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
      this.touchDowned = false
    }
  }
});
export default TouchMixin;
