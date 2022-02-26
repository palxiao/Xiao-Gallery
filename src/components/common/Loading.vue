<!--  -->
<template>
    <div class="loading">
    </div>
</template>
<script lang='ts'>
import { Prop, Vue } from 'vue-property-decorator'
import VueBase from '@/vueBase'

export default class Name extends VueBase {
  @Prop(String)
  private msg!: string
  // get computed() { return 'computed' }
  private async mounted() {
    await this.$nextTick()
  }
}
</script>
<style scoped lang='less'>
</style>