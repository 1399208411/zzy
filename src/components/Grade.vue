<!--  -->
<template>
  <div>
    <x-header><p style="font-size: 14px">成绩查询</p></x-header>

    <group>
      <popup-picker title="请选择" :data="list" :columns="3" v-model="value" show-name
                    @on-change="onChange"></popup-picker>
    </group>

    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th>课程</th>
        <th>类型</th>
        <th>成绩</th>
      </tr>
      </thead>
      <tbody style="font-size: 14px">
      <tr v-for="(item,index) in gradeList">
        <td width="40%">{{item.name}}</td>
        <td width="30%">{{item.type}}</td>
        <td width="30%">{{item.score}}</td>
      </tr>
      </tbody>
    </x-table>

    <x-dialog v-model="show" hide-on-blur @on-show="flush">
      <x-input title="验证码" placeholder="验证码" v-model="code"><img id="code" slot="right"
                                                                 width="65" height="30"/></x-input>
      <box gap="8px 8px">
        <x-button type="primary" @click.native="query">点击查询</x-button>
      </box>
      <div @click="show=false"><span class="vux-close"></span></div>

    </x-dialog>

  </div>
</template>

<script>
  import {XHeader, PopupPicker, Group, XDialog, XInput, XButton, Box, XTable} from 'vux'
  import {cookie} from 'vux'

  export default {

    data() {
      return {
        code: '',
        queryStr: '',
        gradeList: [],
        show: false,
        value: [],
        list: [{
          name: '2017-2018年第一学期',
          value: '20170'
        }, {
          name: '2016-2017年第二学期',
          value: '20161'
        }, {
          name: '2016-2017年第一学期',
          value: '20160'
        }, {
          name: '2015-2016年第二学期',
          value: '20151'
        }, {
          name: '2015-2016年第一学期',
          value: '20150'
        }, {
          name: '2014-2015年第二学期',
          value: '20141'
        }, {
          name: '2014-2015年第一学期',
          value: '20140'
        }]
      }
    },

    components: {
      XHeader,
      Group,
      PopupPicker,
      XDialog,
      XInput,
      XButton,
      Box,
      XTable
    },

    computed: {},


    mounted() {

    },

    methods: {
      onChange(val) {
        this.show = !this.show;
        this.queryStr = val.toString();
      },
      flush() {
        document.getElementById('code').src = this.BASE_URL + '/student/code.png?d=' + new Date().getTime();
      },
      query() {
        let openid = sessionStorage.getItem('openid');
        if (openid) {
          this.$http.post('http://cark.mynatapp.cc/student/getGrades', {
            openid: openid,
            year: this.queryStr.slice(0, 4),
            semester: this.queryStr[4],
            code: this.code
          }).then((response) => {
            let res = response.data;
            if (res.code === 0) {
              this.gradeList = res.data;
              this.show = false;
            }
          });
        }

      }
    }
  }
</script>

<style>
  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
