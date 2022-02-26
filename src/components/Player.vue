<!-- A Player -->
<template>
    <div id="aplayer"></div>
</template>
<script lang='ts'>
import { Component, Prop, Vue, Emit, Watch } from 'vue-property-decorator'
import VueBase from '@/vueBase'
@Component({
  components: {},
})
export default class Name extends VueBase {
  @Prop(String)
  private msg!: string
  // get computed() { return 'computed' }
  private async created() {
    require('@/assets/lib/APlayer.min.css')
    require('@/assets/lib/APlayer.min.js')
  }
  private async mounted() {
    await this.$nextTick()

    const ids: any = []
    const listObj: any = {}
    const resList = await this.$ajax.music.getList()
    for (const x of resList.playlist.tracks) {
      ids.push(x.id)
      listObj[x.id] = { name: x.name, artist: x.ar[0] ? x.ar[0].name : '', cover: x.al.picUrl }
    }
    let audio = await this.$ajax.music.getUrl({ id: ids + '' })
    audio = audio.data.map((x: any) => {
      return Object.assign({ url: x.url }, listObj[x.id])
    })

    const APlayer = (window as any).APlayer
    const ap = new APlayer({
      container: document.getElementById('aplayer'),
      fixed: true,
      autoplay: true,
      audio,
    })
  }
  // @Emit('change')
  // private change(e: MouseEvent) {}
  // @Watch('field', { immediate: true, deep: true })
  // private onPersonChanged(val: string, oldVal: string) {}
}
</script>
<style scoped lang='less'>
</style>