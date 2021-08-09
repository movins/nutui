<template>
  <div class="nut-drag" @touchstart="touchStart($event)" @mousedown="touchStart($event)">
    <slot></slot>
  </div>
</template>
<script>
import requestAniFrame from '../../utils/raf.js';
/**
 * @module drag
 * @description 拖拽组件，用于页面中需要拖拽的元素
 * @vue-prop {Boolean} [attract=false] - 拖拽元素是否需要自动吸边
 * @vue-prop {String} [direction='all'] - 拖拽元素的拖拽方向
 * @vue-prop {Number | String} [zIndex=11] - 拖拽元素的堆叠顺序
 * @vue-prop {Object} [boundary={top: 0,left: 0,right: 0,bottom: 0}] - 拖拽元素的拖拽边界
 * @vue-data {Number} elWidth 拖拽元素的宽度
 * @vue-data {Number} elHeight 拖拽元素的高度
 * @vue-data {Number} screenWidth 屏幕的宽度
 * @vue-data {Number} screenHeight 屏幕的高度
 * @vue-data {Number} startTop 拖拽元素距离顶部的距离
 * @vue-data {Number} startLeft 拖拽元素距离左侧的距离
 * @vue-data {Object} position 鼠标点击的位置，包含距离x轴和y轴的距离
 */
export default {
  name: 'nut-drag',
  props: {
    attract: {
      type: Boolean,
      default: false
    },
    direction: {
      type: String,
      default: 'all'
    },
    zIndex: {
      type: [Number, String],
      default: 11
    },
    boundary: {
      type: Object,
      default: function() {
        return {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        };
      }
    }
  },
  data() {
    return {
      elWidth: 0,
      elHeight: 0,
      screenWidth: 0,
      screenHeight: 0,
      startTop: 0,
      startLeft: 0,
      position: { x: 0, y: 0 },
      touchDowned: false
    };
  },
  methods: {
    /**
     * 获取拖拽元素的属性和屏幕的宽高，初始化拖拽元素的位置
     */
    getElementInfo() {
      const el = this.$el;
      const domElem = document.documentElement;
      this.elWidth = el.offsetWidth;
      this.elHeight = el.offsetHeight;
      this.screenWidth = domElem.clientWidth;
      this.screenHeight = domElem.clientHeight;
      el.style.zIndex = this.zIndex;
      if (this.boundary.left && !el.style.left) {
        const left = (this.$remUnit && `${this.boundary.left / this.$remUnit}rem`) || `${this.boundary.left}px`
        el.style.left = left;
      } else if (this.boundary.right && !el.style.right) {
        const right = (this.$remUnit && `${this.boundary.right / this.$remUnit}rem`) || `${this.boundary.right}px`
        el.style.right = right;
      }
      if (this.boundary.top && !el.style.top) {
        const top = (this.$remUnit && `${this.boundary.top / this.$remUnit}rem`) || `${this.boundary.top}px`
        el.style.top = top;
      } else if (this.boundary.bottom && !el.style.bottom) {
        const bottom = (this.$remUnit && `${this.boundary.bottom / this.$remUnit}rem`) || `${this.boundary.bottom}px`
        el.style.bottom = bottom;
      }
    },
    touchStart(e) {
      this.touchDowned = true;
      const target = e.currentTarget;
      this.startTop = target.offsetTop; // 元素距离顶部的距离
      this.startLeft = target.offsetLeft; // 元素距离左侧的距离

      let {touches = []} = e;
      touches = (touches.length && touches[0]) || e;

      this.position.x = touches.clientX; // 鼠标点击的x轴的距离
      this.position.y = touches.clientY; // 鼠标点击的y轴的距离
      this.$el.addEventListener('touchmove', this.touchMove, false);
      this.$el.addEventListener('mousemove', this.touchMove, false);

      this.$el.addEventListener('touchend', this.touchEnd, false);
      this.$el.addEventListener('mouseup', this.touchEnd, false);
    },
    touchMove(e) {
      e.preventDefault();
      if (!this.touchDowned) {
        return;
      }

      let {targetTouches} = e
      targetTouches = targetTouches || [e]

      const target = e.currentTarget || e.target;
      if (targetTouches.length == 1 && target) {
        const touch = targetTouches[0];
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.startLeft + this.nx;
        this.yPum = this.startTop + this.ny;
        const rightLocation = this.screenWidth - this.elWidth - this.boundary.right;
        // 限制左右拖拽边界
        if (Math.abs(this.xPum) > rightLocation) {
          this.xPum = rightLocation;
        } else if (this.xPum <= this.boundary.left) {
          this.xPum = this.boundary.left;
        }
        // 限制上下拖拽边界
        if (this.yPum < this.boundary.top) {
          this.yPum = this.boundary.top;
        } else if (this.yPum > this.screenHeight - this.elHeight - this.boundary.bottom) {
          this.yPum = this.screenHeight - this.elHeight - this.boundary.bottom;
        }
        if (this.direction != 'y') {
          const left = (this.$remUnit && `${this.xPum / this.$remUnit}rem`) || `${this.xPum}px`
          target.style.left = left;
        }
        if (this.direction != 'x') {
          const top = (this.$remUnit && `${this.yPum / this.$remUnit}rem`) || `${this.yPum}px`
          target.style.top = top;
        }
      }
    },
    touchEnd(e) {
      this.touchDowned = false;
      const target = e.currentTarget;

      let {changedTouches = []} = e;
      changedTouches = (changedTouches.length && changedTouches[0]) || e;
      let currX = changedTouches.clientX;

      const rightLocation = this.screenWidth - this.elWidth - this.boundary.right;
      if (currX > rightLocation) {
        currX = rightLocation;
        // console.log('往右划出边界');
      } else if (currX < this.boundary.left) {
        currX = this.boundary.left;
        // console.log('往左划出边界');
      } else {
        currX = currX < this.screenWidth / 2 ? this.boundary.left : rightLocation;
        // console.log('在边界内滑动');
      }
      if (this.direction != 'y' && this.attract) {
        if (currX < this.screenWidth / 2) {
          this.goLeft(target);
        } else {
          this.goRight(target, rightLocation);
        }
      }
      if (this.direction != 'x') {
        const top = (this.$remUnit && `${this.yPum / this.$remUnit}rem`) || `${this.yPum}px`
        target.style.top = top;
      }
    },
    goLeft(target) {
      const split = (this.$remUnit && 'rem') || 'px'
      const val = (this.$remUnit && (10 / this.$remUnit)) || 10
      const left = target.style.left.split(split)[0]
      if (this.boundary.left) {
        if (left > this.boundary.left) {
          target.style.left = left - val + split;
          requestAniFrame(() => {
            this.goLeft(target);
          });
        } else {
          target.style.left = `${this.boundary.left}px`;
        }
      } else {
        if (left > val) {
          target.style.left = left - val + split;
          requestAniFrame(() => {
            this.goLeft(target);
          });
        } else {
          target.style.left = '0px';
        }
      }
    },
    goRight(target, rightLocation) {
      const split = (this.$remUnit && 'rem') || 'px'
      const val = (this.$remUnit && (10 / this.$remUnit)) || 10
      const left = target.style.left.split(split)[0]
      if (rightLocation - parseFloat(left) > val) {
        target.style.left = parseFloat(left) + val + split;
        requestAniFrame(() => {
          this.goRight(target, rightLocation);
        });
      } else {
        rightLocation = (this.$remUnit && `${rightLocation / this.$remUnit}rem`) || `${rightLocation}px`
        target.style.left = rightLocation;
      }
    }
  },
  mounted() {
    this.getElementInfo();
  },
  activated() {
    if (this.keepAlive) {
      this.keepAlive = false;
    }
  },
  deactivated() {
    this.keepAlive = true;
    this.$el.removeEventListener('touchmove', this.handleScroll, false);
    this.$el.removeEventListener('mousemove', this.handleScroll, false);

    this.$el.removeEventListener('touchend', this.handleScroll, false);
    this.$el.removeEventListener('mouseup', this.handleScroll, false);
  },
  destroyed() {
    this.$el.removeEventListener('touchmove', this.handleScroll, false);
    this.$el.removeEventListener('mousemove', this.handleScroll, false);

    this.$el.removeEventListener('touchend', this.handleScroll, false);
    this.$el.removeEventListener('mouseup', this.handleScroll, false);
  }
};
</script>
