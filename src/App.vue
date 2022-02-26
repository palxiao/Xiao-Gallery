<!--  -->
<template>
  <router-view></router-view>
</template>
<script lang='ts'>
import { Component, Vue, Watch } from 'vue-property-decorator';
import VueBase from '@/vueBase';
@Component({
  components: {}
})
export default class AppMain extends VueBase {
  // public get online(): Type.Object {
  //   return this.$getters.online;
  // }
  private async mounted() {
    await this.$nextTick();
    console.log('welcome');
  }
}
</script>
<style scoped lang='less'>
</style>