<!--  -->
<template>
  <div ref="lockView" class="animate__animated lock" :class="animateClass">
    <van-image height="100vh" width="100vw" fit="cover" :src="topImg">
      <template v-slot:loading>
        <van-loading /> </template>
    </van-image>
    <div @click="tap" class="wrap">
      <div class="time">{{ nowTime }}
        <div class="sub_date">{{ nowDate }}</div>
      </div>
      <div class="a-icon picon_zhiwen"></div>
    </div>
    <!-- temp -->
    
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
@Component({
  components: {},
})
export default class Name extends VueBase {
  @Prop(String)
  private value!: string
  private topImg: string = ''
  private animateClass: string = ''
  private nowTime: string = '00:00'
  private nowDate: string = ''
  // get computed() { return 'computed' }
  private created() {
    const topImgs = JSON.parse(localStorage.getItem('top_pic') + '')
    this.topImg = topImgs[localStorage.getItem('top_pic-count') || 0]
  }
  private async mounted() {
    await this.$nextTick()
    this.nowTime = this.$utils.dayjs(new Date()).format('HH:mm')
    this.nowDate = this.$utils.dayjs(new Date()).format('dddd, MMMM DD')
    const el = this.$refs.lockView as any
    el.cloneNode().className = 'lock'
    this.$commit('setShareEl', el)
  }

  private tap() {
    this.animateClass = 'animate__fadeOutUp'
    setTimeout(() => {
      this.$emit('input', 'start')
    }, 100)
  }
}
</script>
<style scoped lang="less">
@keyframes bulingbuling {
  0% {
    opacity: 0.27;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.27;
  }
}
.lock {
  height: 100vh;
  width: 100vw;
  position: fixed;
  overflow: hidden;
  top: 0;
  z-index: 9999;
  .wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    .time {
      text-shadow:1px 1px 7px #777777;
      color: #fff;
      font-weight: 100;
      font-size: 10rem;
      text-align: center;
      width: 100%;
      position: absolute;
      top: 12vh;
      .sub_date {
        font-weight: bolder;
        font-size: 15px;
        padding: 4px 0;
      }
    }
    .picon_zhiwen {
      animation: bulingbuling 2.7s infinite;
      text-align: center;
      margin-top: 77vh;
      color: rgba(255, 255, 255, 0.87);
      font-size: 8.7rem;
    }
  }
}

</style>
