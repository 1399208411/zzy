<!--  -->
<template>
  <div>
    <x-header><p style="font-size: 14px">图书查询</p></x-header>
    <search :auto-fixed="false" @on-submit="search" v-model="keyword"></search>
  </div>
</template>

<script>
  import {Search , XHeader} from 'vux'
  export default {
    data() {
      return {
        keyword:''
      };
    },

    components: {
      XHeader,
      Search
    },
    methods: {
      search(){
        this.$router.push({path:'/bookList?keyword='+this.keyword})
      }
    }
  }
</script>

<style>

</style>
