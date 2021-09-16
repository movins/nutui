<template>
  <div class="demo-list">
    <h4>基本用法</h4>
    <div>
      <nut-cell :is-link="true" :show-icon="true" @click.native="showPreview">
        <span slot="title">
          <label>图片预览</label>
        </span>
      </nut-cell>
    </div>
    <!-- 以标签形式调用Camera -->
    <nut-previewer
      title="标签形式调用"
      :visible="previewerShow"
      :list="list"
      :options="options"
      @ok-btn-click="cameraShow = false"
      @cancel-btn-click="previewerShow = false"
      @close="previewerShow = false"
    >
      <a href="javascript:;" @click="previewerShow = false" :noCancelBtn="true">点我可以直接关闭预览</a>
    </nut-previewer>
  </div>
</template>

<script>
import locale from '../../mixins/locale';
import { locale as i18n } from '../../locales';

export default {
  mixins: [locale],
  data() {
    return {
      previewerShow: false,
      list: [
        { src: 'https://cdn.jemoo.cn/image/202109/07/71xdYnLJswgzP5l73V6p' },
        { src: 'https://cdn.jemoo.cn/image/201903/05/dMMAsqPu2sz3vSWZPYx4' }
      ],
      options: {
        closeOnScroll: false,
        closeOnVerticalDrag: false,
        tapToClose: false
      }
    };
  },
  methods: {
    showPreview() {
      const options = {
        list: this.list,
        options: this.options
      };

      this.$previewer(options).show();
    }
  }
};
</script>
