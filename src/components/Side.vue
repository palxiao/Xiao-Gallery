<template>
  <div>
    <div v-show="!hide" @click="toShare" style="bottom: 178px;" class="flex-layout-center icon_btn"><i class="a-icon picon_share"></i></div>
    <div v-show="!hide" @click="show = true" class="flex-layout-center icon_btn icon_btn-zhankai">
      <i class="a-icon picon_zhankai"></i>
    </div>
    <div v-show="!hide" @click="openPlayer" class="flex-layout-center icon_btn animate__animated" :class="effect?effect:''"><i class="a-icon picon_music"></i></div>

    <van-popup v-model="show" closeable position="right" :style="{ height: '100%', width: '40%' }">
      <div class="class_wrap">
        <div class="title">共 {{long}} 收录</div>
        <div class="flex-layout select_type">
          <i @click="chooseModel(ii)" v-for="(i,ii) in icons" :key="ii" class="a-icon" :class="iconIndex===ii ? 'select picon_'+i : 'picon_'+i" />
        </div>
        <div @click="select()" class="class_box"><span class="class_box-title flex-layout-center"><div class="line-clamp-1">全部</div></span></div>
        <div v-show="!animateReload" @click="select(type)" v-for="(imgs, type, key) in data" :key="key" class="class_box animate__animated animate__rollIn">
          <van-image height="100%" width="100%" fit="cover" :src="imgs[0].url + short">
            <template v-slot:loading>
              <van-loading /> </template>
          </van-image>
          <div class="class_box-title flex-layout-center"><div class="line-clamp-1">{{ type }}</div></div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
import { Popup } from 'vant'
import { widthws3 } from '@/assets/data/constantParams'
@Component({
  components: {
    [Popup.name]: Popup,
  },
})
// const widthws3 = (window.screen.width / 3).toFixed(0);
export default class Name extends VueBase {
  // @Prop(Boolean)
  // private value!: boolean

  @Prop(Object)
  private data!: Type.Object
  @Prop(Boolean)
  private hide!: boolean

  private show: boolean = false
  private animateReload: boolean = false
  private icons: string[] = ['topic', 'year', 'month']
  private iconIndex: number = 0
  private short: string = `?imageMogr2/thumbnail/${widthws3}x/blur/1x0/quality/75`
  private effect: string = ''

  get long() {
    return this.$getters.imgsLength
  }
  private async mounted() {
    await this.$nextTick()
  }

  private select(type: string | null) {
    this.$emit('select', type)
    this.show = false
  }

  private chooseModel(index: number) {
    this.animateReload = true
    setTimeout(() => {
      this.animateReload = false
    }, 10)
    this.iconIndex = index
    this.$emit('choose', this.icons[index])
  }
  private openPlayer() {
    this.$emit('player')
    this.effect = 'animate__fadeOutUp'
  }
  private toShare() {
    this.$emit('share')
  }

  // @Emit('change')
  // private change(e: MouseEvent) {}
  // @Watch('value', { immediate: true, deep: true })
  // private onSideChanged(val: boolean, oldVal: boolean) {
  //   console.log(val)
  // }
}
</script>
<style scoped lang="less">
.class_wrap {
  padding: 30px 0;
  .title {
    margin-left: 10%;
    position: absolute;
    top: 20px;
    font-size: 12px;
    color: #333;
  }
}
.class_box {
  position: relative;
  width: 80%;
  height: 120px;
  margin: 30px 0 0 10%;
  box-shadow: 0 0 0.7rem #999999;
  border-radius: 10px;
  overflow: hidden;
  &-title {
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.37);
    color: #ffffff;
    .line-clamp-1 {
      text-align: center;
      font-weight: 700;
      font-size: 18px;
    }
  }
}

.icon_btn {
  bottom: 30PX;
  position: fixed;
  background: rgba(255, 255, 255, 0.7);
  right: 20Px;
  padding: 10Px;
  border-radius: 50%;
  box-shadow: 0 0 0.7rem #999999;
  width: 44PX;
  height: 44PX;
  &-zhankai {
    bottom: 104Px;
    transform: rotate(180deg);
  }
  .a-icon {
    font-size: 22Px;
  }
  .picon_zhankai {
    font-size: 20Px;
  }
}

.select_type {
  padding-top: 24px;
  margin: 0 10%;
  justify-content: space-between;
  .a-icon {
    font-size: 32px;
    color: rgba(0, 0, 0, 0.2);
  }
  .select {
    color: #333;
  }
}
</style>
