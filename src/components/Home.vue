<template>
  <div>
    <x-header :left-options="{showBack: false}"><p style="font-size: 14px">在仲园</p></x-header>
    <group-title>账号</group-title>
    <group>
      <cell v-if="isShow1" title="教务网账号" value="已绑定" is-link></cell>
      <cell v-else title="教务网账号" value="未绑定" is-link link="/jwBind"></cell>
      <cell v-if="isShow2" title="图书馆账号" value="已绑定" is-link></cell>
      <cell v-else title="图书馆账号" value="未绑定" is-link link="/libBind"></cell>
    </group>
    <group-title>功能</group-title>
    <group>
      <grid :cols="3">
        <grid-item link="/course">
          <img slot="icon" src="../assets/lesson.png">
          <span slot="label">课表</span>
        </grid-item>
        <grid-item link="/grade">
          <img slot="icon" src="../assets/grade.png">
          <span slot="label">成绩</span>
        </grid-item>
        <grid-item link="/bookSearch">
          <img slot="icon" src="../assets/book.png">
          <span slot="label">图书查询</span>
        </grid-item>
        <grid-item link="/borrow">
          <img slot="icon" src="../assets/borrow.png">
          <span slot="label">借阅查询</span>
        </grid-item>
      </grid>
    </group>
  </div>
</template>

<script>
  import {Grid, GridItem, GroupTitle, Group, Cell, XHeader, Divider} from 'vux'
  import {cookie} from 'vux'

  export default {
    data() {
      return {
        show1: false,
        show2: false
      }
    },

    components: {
      XHeader,
      Grid,
      GridItem,
      GroupTitle,
      Group,
      Cell,
      Divider
    },

    computed: {
      isShow1() {
        return this.show1
      },
      isShow2() {
        return this.show2
      }
    },

    mounted() {
      sessionStorage.clear();
      let openid = this.$route.query.openid;
      if (openid) {
        sessionStorage.setItem('openid', openid);
        this.$http.get(this.BASE_URL + '/student/get?openid=' + openid)
          .then((response) => {
            let res = response.data;
            if (res.code === 0) {
              this.show1 = true;
              sessionStorage.setItem('jwid', res.data.stuid);
            }
          });
        this.$http.get(this.BASE_URL + '/library/get?openid=' + openid)
          .then((response) => {
            let res = response.data;
            if (res.code === 0) {
              this.show2 = true;
              sessionStorage.setItem('libid', res.data.stuid);
            }
          })
      }
    },

    methods: {}
  }
</script>

<style>
</style>
