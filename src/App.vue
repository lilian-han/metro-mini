<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app';
import monitor from '@/utils/alipayLogger.js';
onLaunch((options) => {
  monitor.init({
    pid: 'fmc/kmydtsx9xesm+x3hmg==',
    options: options,
    sample: 1,
    autoReportApi: true,
    autoReportPage: true,
    // Http请求返回数据中状态码字段名称
    code: ['rtnCode'],
    // Http返回数据中的error message字段名称
    msg: ['rtnMessage'],
    token: {
      service_monitor: 'l9thgli7a6neqmrhaw+ruw==',
      qrcode_monitor: 'crtfhuykb3slwrlgufujkw==',
      event_monitor: 'vl+ze4dmn7ms2gxxzimp9g==',
    },
  });
});
onShow(() => {});
onHide(() => {
  console.log('App Hide');
});
</script>
<style lang="scss">
@import 'uview-plus/index.scss';
</style>
