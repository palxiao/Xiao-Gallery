declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'qrcode'
declare module 'vuejs-datepicker'
declare module 'vuejs-datepicker/dist/locale'
declare module '@antv/f2/*'
declare module 'fastclick'
declare module 'vconsole'

declare module 'vue/types/vue' {
  interface Vue {
    $utils: Type.Object
  }
}

