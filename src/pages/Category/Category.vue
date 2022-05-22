<template>
  <router-view></router-view>
</template>

<script>
import CategoryAll from "../../components/Category/CategoryAll.vue"
import FilterCategory from "../../components/Category/FilterCategory.vue"

export default {
  name:"Category",
  components:{CategoryAll,FilterCategory},
  data() {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
  @import url("../../common/css/mixin.less");
  main{
    height: 100%;
  }
</style>