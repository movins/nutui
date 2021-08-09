<template>
  <div class="nut-imagepicker">
    <div class="img-list">
      <transition-group :name="animation ? 'nutEase' : ''">
        <div
          class="img-item"
          v-for="item in this.list"
          :key="item.id"
          :style="itemStyle"
          @click="delMode == 'tap' ? deleteImg(item.id) : preview(item.id)"
          @touchstart="delMode == 'longtap' ? touchStart(item.id) : ''"
          @touchmove="delMode == 'longtap' ? touchMove(item.id) : ''"
          @touchend="delMode == 'longtap' ? touchEnd(item.id) : ''"
        >
          <a href="javascript:;"><img :src="item.src" alt=""/></a>
        </div>
      </transition-group>
      <div class="add-icon" :style="iconStyle" v-show="this.list.length < this.max" @click="handleImageClick">
        <i
          ><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
            <g fill-rule="evenodd">
              <rect y="6" width="16" height="4" rx="2"></rect>
              <rect transform="rotate(90 8 8)" y="6" width="16" height="4" rx="2"></rect>
            </g></svg
        ></i>
        <input v-if="!camera || !hasCamera" type="file" name="files" :multiple="ismultiple ? 'multiple' : ''" :accept="accept" @change="addImg" />
      </div>
    </div>
  </div>
</template>
<script>
import { enumerateDevices } from '../../utils/devices';

export default {
  name: 'nut-imagepicker',
  props: {
    animation: {
      type: [Boolean],
      default: true
    },
    width: {
      type: [String, Number],
      default: 100
    },
    height: {
      type: [String, Number],
      default: 100
    },
    margin: {
      type: [String, Number],
      default: 5
    },
    camera: {
      type: Boolean,
      default: false
    },
    max: {
      //允许上传的最大数量
      type: [Number, String],
      default: 9
    },
    accept: {
      type: [String],
      default: 'image/*'
    },
    ismultiple: {
      //是否开启多图片上传
      type: [Boolean],
      default: false
    },
    delMode: {
      //删除图片的方式，支持tap、longtap
      type: [String],
      default: 'tap'
    },
    longTapTime: {
      type: [Number],
      default: 500
    },
    autoUpload: {
      //选择完图片之后是否自动完成上传
      type: [Boolean, String],
      default: false
    },
    imgList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      timeOutEvent: 0,
      hasCamera: false,
      list: []
    };
  },
  computed: {
    itemStyle () {
      const width = (this.$remUnit && `${this.width / this.$remUnit}rem`) || `${this.width}px`
      const height = (this.$remUnit && `${this.height / this.$remUnit}rem`) || `${this.height}px`
      const marginRight = (this.$remUnit && `${this.margin / this.$remUnit}rem`) || `${this.margin}px`

      return {width, height, marginRight}
    },
    iconStyle () {
      const width = (this.$remUnit && `${this.width / this.$remUnit}rem`) || `${this.width}px`
      const height = (this.$remUnit && `${this.height / this.$remUnit}rem`) || `${this.height}px`
      return {width, height}
    }
  },
  watch: {
    imgList: function(val) {
      this.list = val;
    }
  },
  mounted() {
    this.list = this.imgList;
    this.camera && this.testDevice()
  },
  methods: {
    async testDevice () {
      const [, videoNum,] = await enumerateDevices();
      this.hasCamera = videoNum > 0
    },
    add (files) {
      if (files.length > this.max - this.list.length) {
        files = files.filter((item, index) => index < this.max - this.list.length);
      }

      files.forEach((url, index) => {
        this.list.push({
          id: Math.random(),
          src: url
        });
      });
    },
    addImg(event) {
      let self = this;
      //限制图片上传数量
      let file = event.target.files;

      let fileArr = Array.from(file);

      if (file.length > self.max - self.list.length) {
        fileArr = fileArr.filter((item, index) => index < self.max - self.list.length);
      }

      if (self.autoUpload) {
        //自动上传
        self.$emit('imgMsg', {
          code: 1,
          msg: fileArr
        });
        self.$emit('img-msg', {
          code: 1,
          msg: fileArr
        });
      } else {
        fileArr.forEach((item, index) => {
          let reader = new FileReader();
          reader.onload = function(evt) {
            self.list.push({
              id: Math.random(),
              src: evt.target.result
            });
            event.target.value = '';
          };
          reader.readAsDataURL(item);
        });
        self.$emit('imgMsg', {
          code: 2,
          msg: fileArr
        });
        self.$emit('img-msg', {
          code: 2,
          msg: fileArr
        });
      }
    },
    handleImageClick (e) {
      this.$emit('on-click', this.list.length)
    },
    preview(id) {
      this.$emit('imgMsg', {
        code: 4,
        msg: id
      });
      this.$emit('img-msg', {
        code: 4,
        msg: id
      });
    },
    deleteImg(id) {
      this.list = this.list.filter(item => item.id != id);
      this.$emit('update:imgList', this.list);
      this.$emit('imgMsg', {
        code: 3,
        msg: id
      });
      this.$emit('img-msg', {
        code: 3,
        msg: id
      });
    },
    touchStart(id) {
      // console.log(this.longTapTime);
      this.timeOutEvent = setTimeout(() => {
        this.deleteImg(id);
      }, this.longTapTime);
      return false;
    },
    touchMove(id) {
      clearTimeout(this.timeOutEvent);

      return false;
    },
    touchEnd(id) {
      clearTimeout(this.timeOutEvent); //清除定时器
      this.timeOutEvent = 0;
    }
  }
};
</script>
<style lang="scss" scoped></style>
