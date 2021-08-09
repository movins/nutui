<template>
  <div v-if="destroy" :class="['nut-camera-wrapper', customClass]" :id="id">
    <transition :name="animation ? 'nutFade' : ''">
      <div class="nut-camera-video" @click="modalClick" v-show="curVisible"><video ref='video' @error="handleVideoError"></video></div>
    </transition>
    <transition :name="animation ? 'nutEase' : ''">
      <div class="nut-camera-box" v-show="curVisible" @click="modalClick">
        <div class="nut-camera-body">
          <slot></slot>
        </div>
        <a href="javascript:;" v-if="closeBtn" @click="closeBtnClick" class="nut-camera-close"></a>
      </div>
    </transition>
  </div>
</template>
<script>
import locale from '../../mixins/locale';
import { getUserMedia } from '../../utils/devices';

const lockMaskScroll = (bodyCls => {
  let scrollTop;
  return {
    afterOpen: function() {
      scrollTop = document.scrollingElement.scrollTop || document.body.scrollTop;
      document.body.classList.add(bodyCls);
      const top = (this.$remUnit && `${-scrollTop / this.$remUnit}rem`) || `${-scrollTop}px`
      document.body.style.top = top;
    },
    beforeClose: function() {
      if (document.body.classList.contains(bodyCls)) {
        document.body.classList.remove(bodyCls);
        document.scrollingElement.scrollTop = scrollTop;
      }
    }
  };
})('camera-open');
const oneOf = (value, validList) => {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}
export default {
  name: 'nut-camera',
  mixins: [locale],
  props: {
    id: {
      type: String,
      default: ''
    },
    orient: {
      validator (value) {
        return oneOf(value, ['auto', 'portrait', 'landscape'])
      },
      default: 'auto'
    },
    width: {
      type: Number,
      default: 480
    },
    height: {
      type: Number,
      default: 320
    },
    animation: {
      type: Boolean,
      default: true
    },
    lockBgScroll: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    closeBtn: {
      type: Boolean,
      default: false
    },
    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    onCloseBtn: {
      type: Function,
      default: null
    },
    closeCallback: {
      type: Function,
      default: null
    },
    canDestroy: {
      type: Boolean,
      default: true
    },
    customClass: {
      type: String,
      default: ''
    },
    closeOnPopstate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      curVisible: false,
      destroy: false,
      canvasDom: null
    };
  },
  created() {
    this.destroy = true;
  },
  mounted() {
    var that = this;
    if (that.closeOnPopstate) {
      window.addEventListener('popstate', function() {
        that.close();
      });
    }
  },
  computed: {
    canvas () {
      return this.canvasDom || (this.canvasDom = document.createElement('canvas'))
    }
  },
  methods: {
    toDataURL (source, w, h, type) {
      this.canvas.width = w || 0;
      this.canvas.height = h || 0;
      const context = this.canvas.getContext('2d');
      context.drawImage(source, 0, 0, w, h, 0, 0, w, h)
      return this.canvas.toDataURL(type || 'image/png')
    },
    // 将录像成图片
    snapshot (imageType) {
      const video = this.$refs.video;
      return (video && this.toDataURL(video, this.width, this.height, imageType)) || null;
    },
    handleVideoError () {
      const video = this.$refs.video;
      video && video.stop();
    },
    // 获取录像流到video中
    async startCamera () {

    },
    modalClick() {
      if (!this.closeOnClickModal) {
        return;
      }
      this.close('modal');
    },
    todestroy() {
      this.canDestroy ? '' : (this.destroy = false);
    },
    close(target) {
      this.$emit('close', target);
      this.$emit('close-callback', target);
      this.todestroy();
      if (typeof this.closeCallback === 'function' && this.closeCallback(target) === false) {
        return;
      }
      this.curVisible = false;
    },
    async show () {
      this.curVisible = true;
      let result = false;
      try {
        const stream = await getUserMedia({ video: { width: this.width, height: this.height } });
        if (stream) {
          const video = this.$refs.video;
          const CompatibleURL = window.URL || window.webkitURL;
          video.src = CompatibleURL.createObjectURL(stream);
          video.play();
          result = true;
        }
      } catch (error) {
      }
      return result;
    },

    cancelBtnClick(autoClose) {
      this.$emit('cancel-btn-click');
      if (!autoClose) {
        return;
      }
      if (typeof this.onCancelBtn === 'function') {
        if (this.onCancelBtn.call(this) === false) {
          return;
        }
      }
      this.close('cancelBtn');
    },
    closeBtnClick() {
      if (typeof this.onCloseBtn === 'function') {
        if (this.onCloseBtn.call(this) === false) {
          return;
        }
      }
      this.close('closeBtn');
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.curVisible = val;
      },
      immediate: true
    },
    curVisible(val) {
      if (this.lockBgScroll) {
        //锁定or解锁页面滚动
        lockMaskScroll[val ? 'afterOpen' : 'beforeClose']();
      }
    }
  }
};
</script>
