<!--  -->
<template>
  <div>
    <x-header><p style="font-size: 14px">教务网绑定</p></x-header>
    <div>
      <group label-width="4.5em" label-margin-right="2em" label-align="justify">
        <x-input title="学号" placeholder="学号" v-model="stuid"></x-input>
        <x-input title="密码" type="password" placeholder="密码" v-model="passwd"></x-input>
        <x-input title="验证码" placeholder="验证码" v-model="code"><img id="code" slot="right"
                                                                   width="65" height="30"/></x-input>
      </group>
      <br/>
      <box gap="10px 10px">
        <x-button type="primary" @click.native="bind">绑定教务账号</x-button>
      </box>
    </div>
  </div>
</template>

<script>
  import {XHeader, Group, XInput, XButton, Box} from 'vux'
  import {cookie} from 'vux'

  export default {
    data() {
      return {
        stuid: '',
        passwd: '',
        code: '',
      }
    },

    components: {
      XHeader,
      Group,
      XInput,
      XButton,
      Box
    },

    computed: {},

    mounted() {
      document.getElementById('code').src = this.BASE_URL + '/student/code.png?d=' + new Date().getTime();
    },

    methods: {
      bind() {
        let openid = sessionStorage.getItem('openid');
        if (openid) {
          this.$http.post(this.BASE_URL + '/student/bind', {
            openid: openid,
            stuid: this.stuid,
            passwd: this.passwd,
            code: this.code
          }).then((response) => {
            let res = response.data;
            if (res.code === 0) {
              window.location.href = this.AUTHORIZE_URL;
            } else {
              document.getElementById('code').src = this.BASE_URL + '/student/code.png?d=' + new Date().getTime();
            }
          })
        }

      }

    }
  }
</script>

<style>

</style>
