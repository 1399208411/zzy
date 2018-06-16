<!--  -->
<template>
  <div>
    <div style="position:fixed; width: 100%;height:37px;z-index:1">
      <x-header><p style="font-size: 14px">借阅信息</p></x-header>
    </div>
    <div style="height:90px;"></div>
    <div>
      <group style="position: absolute;top: 20%;width: 100%;">
        <x-input title="验证码" placeholder="验证码" style="position: fixed;left: 10%;top:45px;width: 37%;" v-model="code">
        </x-input>
      </group>
      <img id="code" slot="right" style="position: fixed;left: 55%;top:50px;;height: 32px;" @click="flushCode">

      <x-button slot="right" type="primary" mini style="position: fixed;left: 75%;top:48px;height: 37px;" @click.native="getBorrowList">查询</x-button>
    </div>
    <div class="mystyle" v-for="(item,inex) in borrowList">
      <card :header="{title: '图书信息' }">
        <div slot="content" class="card-padding">
          <span>
            书名：{{item.name}}
            <!--<x-button :mini=true class="borrowbutton">续借</x-button>-->
          </span>
          <p title="ISBN">ISBN：{{item.isbn}}</p>
          <p title="借阅日期">借阅日期：{{item.borrowdate}}</p>
          <p title="归还日期">归还时间：{{item.returndate}}</p>
          <p title="馆藏地">馆藏地：{{item.position}}</p>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import {XHeader, Card, XButton, XInput,Group} from 'vux'
  import {cookie} from 'vux'

  export default {
    data() {
      return {
        //openid: 'opJG60YTQ3ubY5fb17yj-Hkjbkzg',
        code: '',
        borrowList: []
      };
    },

    components: {
      XHeader,
      Card,
      XButton,
      XInput,
      Group
    },

    mounted() {
      document.getElementById('code').src = this.BASE_URL + '/library/code.png?d=' + new Date().getTime();
    },

    methods: {
      getBorrowList() {
        let openid = sessionStorage.getItem('openid');
        if (openid) {
          this.$http.post(this.BASE_URL + '/library/flushBorrowInfo', {
            openid: openid,
            //openid: this.openid,
            code: this.code,
          }).then((response) => {
            let res = response.data;
            if(res.code === 0){
              this.borrowList = res.data;
            }else{
              this.borrowList = [];
            }
          });
        }

      },
      flushCode(){
        document.getElementById('code').src = this.BASE_URL + '/library/code.png?d=' + new Date().getTime();
      }
    }
  }
</script>

<style>
  .card-padding {
    position: relative;
    text-align: left;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    color: #999999;
    left: 5%;
    width: 95%;
  }

  .mystyle {
    font-size: 14px;
    text-align: center;
  }
</style>
