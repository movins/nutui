<template>
  <div class="demo-list">
    <h4>基本用法</h4>
    <div>
      <nut-cell :is-link="true" :show-icon="true" @click.native="showCamera1">
        <span slot="title">
          <label>点击打开照相机</label>
        </span>
      </nut-cell>
    </div>
    <h4>高级用法</h4>
    <p>如果Camera内容有复杂交互，可使用Camera的标签式用法。</p>
    <div>
      <nut-cell :is-link="true" :show-icon="true" @click.native="cameraShow = true">
        <span slot="title">
          <label>以标签形式调用Camera</label>
        </span>
      </nut-cell>
    </div>
    <!-- 以标签形式调用Camera -->
    <nut-camera
      title="标签形式调用"
      :visible="cameraShow"
      :cancel-auto-close="false"
      @ok-btn-click="cameraShow = false"
      @cancel-btn-click="cameraShow = false"
      @close="cameraShow = false"
    >
    <a href="javascript:;" @click="cameraShow = false" :noCancelBtn="true">点我可以直接关闭对话框</a>
    </nut-camera>
  </div>
</template>

<script>
import locale from '../../mixins/locale';
import { locale as i18n } from '../../locales';

export default {
  mixins: [locale],
  data() {
    return {
      cameraShow: false
    };
  },
  methods: {
    showCamera1: async function() {
      const options = {
        closeOnPopstate: true
      };

      const result = await this.$camera(options).show();

      console.info('000000000000000000000000', result);
    }
  }
};
</script>
