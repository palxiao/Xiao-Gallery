<!--  -->
<template>
    <div>
        <div v-show="currentShow" @click="close" class='share-wrap flex-layout-center column-defalut'>
            <div class="post_card">
                <!-- animate__fadeIn animate__bounceIn -->
                <img class="animate__animated animate__bounceIn" style="width:100%;" :src="cardCache" />
            </div>
            <div class="tip">长按保存或分享</div>
        </div>
        <div ref="insert" class="insert">
            <div class="flex-layout-center"><img class="qrcode" :src="qrcode" /></div>
            <div class="text">我/的/相/册</div>
        </div>
        <div ref="postWrap" class='share-wrap flex-layout-center'></div>
    </div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import QRCode from 'qrcode'
@Component({
  components: {},
})
export default class Name extends VueBase {
  @Prop(String)
  private value!: string
  // get computed() { return 'computed' }
  private html2canvas!: any
  private cardCache: string = ''
  private qrcode: string = ''
  private currentShow: boolean = false

  private get shareView() {
    return this.$getters.shareEl
  }
  private async created() {
    require('@/assets/lib/html2canvas.min.js')
    this.html2canvas = (window as Type.Object).html2canvas
    this.getQRcode()
  }
  private async mounted() {
    await this.$nextTick()
    const postWrap: any = this.$refs.postWrap as any
    postWrap.appendChild(this.shareView.cloneNode(true)).appendChild(this.$refs.insert)
    postWrap.style.left = '-200%'

    this.html2canvas(postWrap as HTMLElement, {
      useCORS: true,
    }).then((canvas: any) => {
      this.cardCache = canvas.toDataURL('image/jpeg', 0.9)
    })
  }
  private async getQRcode(url: string = window.location.href) {
    QRCode.toDataURL(url)
      .then((qrUrl: any) => {
        this.qrcode = qrUrl
      })
      .catch((e: any) => {})
  }
  private close() {
    this.currentShow = false
    this.$emit('input', 'start')
  }
  // @Emit('change')
  // private change(e: MouseEvent) {}
  @Watch('value', { immediate: true, deep: true })
  private onPersonChanged(val: string, oldVal: string) {
    if (val === 'showShare') {
      this.currentShow = true
    }
  }
}
</script>
<style scoped lang='less'>
.share-wrap {
  position: fixed;
  z-index: 99999;
  top: 0;
  width: 100%;
  height: 100%;
  padding: 10vw;
  background: rgba(0, 0, 0, 0.7);
  .tip {
    margin-top: 10px;
    color: #ffffff;
  }
}
.insert {
  width: 100%;
  height: 120px;
  background: #ffffff;
  position: absolute;
  bottom: 0;
  .text {
    color: #333333;
    font-size: 16px;
    text-align: center;
    position: absolute;
    bottom: 22px;
    width: 100%;
  }
  .qrcode {
    width: 132px;
    height: 132px;
    position: absolute;
    top: 0;
    margin-top: -66px;
  }
}
</style>