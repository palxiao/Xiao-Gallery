<template>
  <div class="home">
    <div v-show="visiable" class="animate__animated animate__fadeIn">
      <van-image :height="windowWidth / 1.9" width="100%" fit="cover" class="animate__animated animate__bounceIn" :src="topImg">
        <img @click="topPreview('Top')" class="take_photo" :style="'height:' + windowWidth / 1.9 + 'px;'" :src="require('../assets/images/take_photo.png')" alt="" />
      </van-image>

      <div v-for="(imgs, date, key) in imgList" :key="key">
        <van-divider content-position="left">{{ date }}</van-divider>
        <div class="box-wrapper">
          <van-image @click="preview(date, index)" :src="img.url + short" v-for="(img, index) in imgs" :key="index" lazy-load class="box" :class="isIOS?'spe':'spe spe_f'">
            <template v-slot:loading>
              <van-loading /> </template>
          </van-image>
          <!-- <img @click="preview(date, index)" v-for="(img, index) in imgs" :key="index" v-lazy="img.url+short" class="box" :class="isIOS?'spe':'spe spe_f'" /> -->
        </div>
      </div>

      <van-image-preview v-model="show" :loop="false" :images="images" max-zoom="12" @close="previewClose" @change="previewChange" class-name="image-preview-view" :show-index="true" :startPosition="index">
        <template v-slot:cover>
          <div class="pic_detail-wrap flex-layout">
            <div class="param flex-layout" v-show="detail.val" v-for="(detail, index) in details" :key="index">
              <span class="param-title">{{ detail.name }} :</span>
              <span>{{ detail.val }}</span>
            </div>
          </div>
        </template>
      </van-image-preview>
    </div>

    <lock v-model="visiable" />
    <side v-if="sideShow" :hide="visiable === 'hideSide'" :data="sideList" @player="openPlayer" @select="sideSelect" @choose="chooseModel" @share="visiable='showShare'" />
    <player v-if="palyerShow" v-show="visiable !== 'hideSide'" />
    <share v-model="visiable" v-if="shareShow" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import { ImagePreview, Divider } from 'vant'
import { TRANS_FIELD, GROUP_LEVEL, freezeObject, widthws2 } from '@/assets/data/constantParams'
import Lock from '@/components/Lock.vue'
// import Side from '@/components/Side.vue'
import str2array from '@/utils/widget/str2array'

@Component({
  components: {
    [ImagePreview.Component.name]: ImagePreview.Component,
    [Divider.name]: Divider,
    Lock,
    Side: () => import('@/components/Side.vue'),
    Player: () => import('@/components/Player.vue'),
    Share: () => import('@/components/Share.vue'),
  },
})
export default class Index extends VueBase {
  // public constructor() {
  //   super();
  // }
  private palyerShow: boolean = false
  private sideShow: boolean = false
  private shareShow: boolean = false
  private visiable: string = ''
  private imgList: Type.Object = {} // 图片列表
  private sideList: Type.Object = {} // 侧边列表
  private images: string[] = [] // 预览图组列表
  private show: boolean = false // 展示预览
  private index: number = 0 // 用于设置预览当前页
  private details: Type.Object = {} // 图片EXIF信息
  private topImg: string = '' // 置顶图片
  private orient: string = '?imageMogr2/auto-orient'
  private short: string = `?imageMogr2/auto-orient/thumbnail/${widthws2}x/blur/1x0/quality/95`
  private scrollTop: number = 0

  public get windowWidth(): string | number {
    return this.$getters.windowWidth
  }
  public get isIOS(): boolean {
    return this.$utils.isIOS()
  }

  private async created() {
    const { albumId, bucket } = this.$route.params
    const { data: res, domain } = await this.$ajax.qn.getList({ id: albumId, bucket, limit: 9999 })
    this.$utils.config.IMG_URL = domain

    this.$store.commit('setImgsLength', res.length)
    this.imgList = this.assembly(res)
    freezeObject.allImgList = this.imgList
    freezeObject.topicImgList = this.assembly(res, 'topic')
    freezeObject.yearImgList = this.assembly(res, 'year')
    freezeObject.monthImgList = this.assembly(res, 'month')
    this.sideList = freezeObject.topicImgList
  }
  private async mounted() {
    await this.$nextTick()
    this.topImg = JSON.parse(localStorage.getItem('top_pic') + '')[localStorage.getItem('top_pic-count') || 0]
    // 阻止返回键
    window.history.pushState(null, '', document.URL)
    window.addEventListener('popstate', this.onBrowserBack, false)
    setTimeout(() => {
      this.shareShow = true
      this.sideShow = true
    }, 100)
  }
  private onBrowserBack() {
    setTimeout(() => {
      window.scrollTo(0, this.scrollTop)
    }, 30)
    window.history.pushState(null, '', document.URL)
    // window.history.forward(1)
    this.show = false
  }
  /**
   * 组装图片列表方法
   */
  private assembly(res: Type.Object, type: string = 'time') {
    res = res.filter((item: string) => {
      // 过滤不在规范内的图片
      const { dateTime } = this.parsing(item)
      if (!isNaN(dateTime)) {
        return item && item.trim()
      }
    })
    res = res.map((item: string) => {
      // 组装图片数据
      const { params, dateTime } = this.parsing(item)
      const group = params[params.length - GROUP_LEVEL[type]]
      const date = this.$utils.dayjs(dateTime).format('YYYY-MM-DD')
      const url = this.$utils.config.IMG_URL + item
      return { date, url, group }
    })

    const imgList = new this.$utils.GroupArray(res)
    const result: Type.Object = {}
    const key = type === 'time' ? 'date' : 'group'
    for (const item of imgList.groupByKey(key)) {
      result[item[0][key]] = item
    }
    const check = result.undefined && delete result.undefined
    return this.$utils.GroupArray.sortObj(result)
  }
  private parsing(item: string) {
    const params = item ? item.split('.')[0].split('/') : []
    const dateTime = +params[params.length - 1]
    return { params, dateTime: +params[params.length - 1] }
  }
  /** -- END -- */

  /**
   * 图片预览相关
   */
  private topPreview(type: string) {
    this.images = freezeObject.topicImgList[type].map((item: Type.Object) => {
      return item.url + this.orient
    })
    this.preview('', 0)
  }
  private async preview(date: string, index: number) {
    this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop

    this.visiable = 'hideSide'
    if (date) {
      this.images = this.imgList[date].map((item: Type.Object) => {
        return item.url + this.orient
      })
    }
    this.index = index
    this.show = true
    this.loadEXIF(index)
  }
  private previewClose() {
    this.visiable = 'start'
    this.images = []
    this.details = []
    this.index = 0
  }
  private previewChange(index: number) {
    this.loadEXIF(index)
  }
  /** END */
  /** EXIF显示相关 */
  private async loadEXIF(index: number) {
    if (!this.images[index]) {
      return
    }
    const res = await this.$ajax.qn.getExif(this.images[index].split('?')[0])
    const transField = TRANS_FIELD.map((Item: any) => {
      const item = Object.assign({}, Item)
      item.val = this.makingEXIF(item, res) // 处理数据
      return item
    })
    this.details = transField
  }
  private makingEXIF(item: any, res: any) {
    const kv = str2array(item.val)
    let val = item.val
    const is =
      val &&
      kv.keys.forEach((key: string, index: number) => {
        try {
          val = val.toString().replace(kv.values[index], res[key].val)
        } catch (e) {
          val = ''
        }
      })
    const dayjs = this.$utils.dayjs
    if (item.key === 'DateTime' && res[item.key] && dayjs(res[item.key].val).isValid()) {
      try {
        res[item.key].val = dayjs(res[item.key].val).format('YYYY-MM-DD hh:mm:ss')
      } catch (e) {}
    }
    return val ? val.replace(' sec.', '') : res[item.key] ? res[item.key].val : ''
  }
  /** END */
  private sideSelect(type: string | null) {
    if (!type) {
      this.imgList = freezeObject.allImgList
      return
    }
    const obj: Type.Object = {}
    obj[type] = this.sideList[type]
    this.imgList = obj
  }
  private chooseModel(type: string) {
    this.sideList = freezeObject[`${type}ImgList`]
  }
  private openPlayer() {
    this.palyerShow = true
  }

  private destroyed() {
    // 当页面销毁必须要移除这个事件，vue不刷新页面，不移除会重复执行这个事件
    window.removeEventListener('popstate', this.onBrowserBack, false)
  }
}
</script>

<style>
.image-preview-view {
  background: #000000;
}
</style>

<style lang="less" scoped>
.home::-webkit-scrollbar {
  display: none; /* Chrome Safari */
  width: 0 !important;
}
.home {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
  padding-bottom: 18.6vw;
}

.take_photo {
  position: absolute;
  top: 0;
  width: 100%;
}

.pic_detail-wrap {
  color: #fff;
  position: fixed;
  width: 100%;
  bottom: 0;
  flex-wrap: wrap;
  padding: 1rem 0;
  background: rgba(0, 0, 0, 0.6);
  .param {
    min-width: 50%;
    padding: 0.27rem 1rem;
  }
  .param-title {
    text-align: center;
    width: 42px;
  }
}

.box {
  -moz-page-break-inside: avoid;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid;
  break-inside: avoid;
  box-sizing: border-box;
}
.spe {
  vertical-align: top;
  margin-bottom: 1rem;
  width: 100%;
  height: auto;
  overflow: hidden;
  // box-shadow: 0 0 0.7rem #777777;
  border-radius: 4px;
  &_f {
    float: left;
  }
}
.box-wrapper {
  width: 100vw;
  padding: 1rem;
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  -moz-column-gap: 1rem;
  -webkit-column-gap: 1rem;
  column-gap: 1rem;
  column-width: 10px;
}
@media (max-width: 1280px) {
  .box-wrapper {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}
</style>
