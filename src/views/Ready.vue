<!--  -->
<template>
  <router-view v-if="done" />
  <div v-else class="black-07 loading-wrap flex-layout-center">
    <!-- loading... -->
    <div class="pipe">
      <div :style="'width:' + progress + '%;'" class="progress">
        <div style="padding-top:1rem;">{{ progress }}%</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
// import { mapMutations } from 'vuex'
import { Image as VanImage, Lazyload, Loading } from 'vant'
import Preload from '@/utils/widget/preload'
Vue.use(VanImage)
  .use(Loading)
  .use(Lazyload, {
    loading: './favicon.ico',
  })

@Component({
  components: {},
})
export default class Ready extends VueBase {
  private done: boolean = false
  private progress: number = 0

  private async mounted() {
    const { albumId, bucket } = this.$route.params
    await this.$nextTick()
    const short: string = `?imageMogr2/thumbnail/${window.screen.width * 2}x/blur/1x0/quality/95`
    let res = await this.$ajax.qn.getList({ id: albumId, bucket, prefix: 'Top' })
    res = res.data.map((url: string) => {
      return res.domain + url + short
    })
    localStorage.setItem('top_pic', JSON.stringify(res))
    // 随机抽取一张封面图
    // const topImgs = JSON.parse(localStorage.getItem('top_pic') + '')
    const count = this.$utils.random(1, res.length) - 1
    localStorage.setItem('top_pic-count', count + '')

    const preload = new Preload([res[count]])
    const preDone = await preload.imgs((progress: number) => {
      this.progress = +progress.toFixed(0)
    })
    setTimeout(() => {
      this.done = true
    }, 100)

    // this.$commit('loading', '拼命加载ing..');
    // this.done = true
    // this.$commit('loading', false);
  }
}
</script>
<style scoped lang="less">
.loading-wrap {
  height: 100vh;
  .pipe {
    width: 90%;
    height: 4px;
    .progress {
      background: #999;
      text-align: right;
      height: 100%;
    }
  }
}
</style>
