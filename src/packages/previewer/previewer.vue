<template>
  <div class="pswp nut-previewer" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="pswp__bg"></div>
    <div class="pswp__scroll-wrap">
      <div class="pswp__container">
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>
      <div class="pswp__ui pswp__ui--hidden">
        <div class="pswp__top-bar">
          <div class="pswp__counter"></div>
          <slot name="button-after"></slot>
          <!-- <img src="../../assets/img/close.png" class="pswp__button pswp__close pswp__button--close" /> -->
          <slot name="button-before"></slot>
          <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>
        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PhotoSwipe from './photoswipe';
import UI from './photoswipe-ui-default';
import locale from '../../mixins/locale';

export default {
  name: 'nut-previewer',
  mixins: [locale],
  props: {
    list: {
      type: Array,
      required: true
    },
    index: {
      type: Number,
      default: 0
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    imgs() {
      return this.list.map(one => {
        if (!one.msrc) {
          one.msrc = one.src;
        }
        if (typeof one.w === 'undefined') {
          one.w = 0;
          one.h = 0;
        }
        return one;
      });
    }
  },
  watch: {
    imgs(newVal, oldVal) {
      if (!this.photoswipe) {
        return;
      }
      if (newVal.length && newVal.length - oldVal.length === -1) {
        const index = this.photoswipe.getCurrentIndex();
        this.photoswipe.invalidateCurrItems();
        this.photoswipe.items.splice(index, 1);
        let goToIndex = index;
        if (goToIndex > this.photoswipe.items.length - 1) {
          goToIndex = 0;
        }
        this.photoswipe.goTo(goToIndex);
        this.photoswipe.updateSize(true);
        this.photoswipe.ui.update();
      } else if (!newVal.length) {
        this.close();
      }
    }
  },
  methods: {
    init(index) {
      const self = this;
      const showItem = this.imgs[index];
      if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
        const img = new Image();
        img.onload = function() {
          showItem.w = this.width;
          showItem.h = this.height;
          self.doInit(index);
        };
        img.src = showItem.src;
      } else {
        this.doInit(index);
      }
    },
    doInit(index) {
      const self = this;
      let options = Object.assign(
        {
          history: false,
          shareEl: false,
          tapToClose: true,
          index: index
        },
        this.options
      );
      this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options);

      this.photoswipe.listen('gettingData', function(index, item) {
        if (!item.w || !item.h || item.w < 1 || item.h < 1) {
          const img = new Image();
          img.onload = function() {
            item.w = this.width;
            item.h = this.height;
            self.photoswipe.updateSize(true);
          };
          img.src = item.src;
        }
      });

      this.photoswipe.init();
      this.photoswipe.listen('close', () => {
        this.$emit('on-close');
        this.photoswipe = null;
      });
      this.photoswipe.listen('pointerDown', () => {
        this.close();
      });
      this.photoswipe.listen('afterChange', (a, b) => {
        this.$emit('on-index-change', {
          currentIndex: this.photoswipe.getCurrentIndex()
        });
      });
    },
    show(index = 0) {
      this.init(index);
    },
    getCurrentIndex() {
      if (this.photoswipe) {
        return this.photoswipe.getCurrentIndex();
      }
    },
    close() {
      this.photoswipe && this.photoswipe.close();
    },
    goTo(index) {
      this.photoswipe && this.photoswipe.goTo(index);
    },
    prev() {
      this.photoswipe && this.photoswipe.prev();
    },
    next() {
      this.photoswipe && this.photoswipe.next();
    }
  }
};
</script>
