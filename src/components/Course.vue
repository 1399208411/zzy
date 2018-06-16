<!--  -->
<template>
  <div>
    <x-header>
      <p @click="show = true" style="font-size: 14px;">第 {{showweek}} 周</p>
      <a slot="right" @click="flush">更新</a>
    </x-header>

    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr style="background-color: #F7F7F7">
        <th width="12.5%"></th>
        <th width="12.5%">一</th>
        <th width="12.5%">二</th>
        <th width="12.5%">三</th>
        <th width="12.5%">四</th>
        <th width="12.5%">五</th>
        <th width="12.5%">六</th>
        <th width="12.5%">日</th>
      </tr>
      </thead>
    </x-table>
    <div v-transfer-dom>
      <popup v-model="show" position="bottom">
        <popup-header
          left-text="取消"
          right-text="确定"
          title="请选择"
          @on-click-left="show = false"
          @on-click-right="modify"
        >
        </popup-header>
        <picker :data='weeks' v-model="week" @on-change="change"></picker>
      </popup>
    </div>
    <div class="content">
      <table cellpadding="0">
        <tbody>
        <tr>
          <td>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
            <p>12</p>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期一'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
          <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期二'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期三'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期四'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期五'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期六'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
          <td>
            <span v-for="(item,index) in courseList">
              <div v-if="item.day === '星期七'" class="lesson-item"
                   :style="{ top: (item.start-1)*50 + 1 + 'px', height: item.length*50-1 + 'px'}">
                <span>{{item.name}}@{{item.room}}</span>
              </div>
            </span>
          </td>
        </tr>

        </tbody>
      </table>
    </div>
    <div v-transfer-dom>
      <x-dialog style="position: relative; bottom: 500px;" v-model="show2" hide-on-blur @on-show="flushCode">
        <x-input title="验证码" placeholder="验证码" v-model="code"><img id="code" slot="right"
                                                                   width="65" height="30"/></x-input>
        <box gap="8px 8px">
          <x-button type="primary" @click.native="commit">点击更新</x-button>
        </box>
        <div @click="show2=false"><span class="vux-close"></span></div>

      </x-dialog>
    </div>

  </div>
</template>

<script>
  import {
    XHeader,
    XTable,
    PopupPicker,
    PopupHeader,
    Popup,
    Group,
    TransferDom,
    Picker,
    XDialog,
    XInput,
    XButton,
    Box
  } from 'vux'
  import {cookie} from 'vux'

  let weeks = []
  for (var i = 1; i <= 20; i++) {
    weeks.push({
      name: '第' + i + '周',
      value: i + ''
    })
  }
  export default {
    directives: {
      TransferDom
    },
    data() {
      return {
        stuid: '',
        show: false,
        show2: false,
        weeks: [weeks],
        week: ['3'],
        select: '3',
        showweek: '3',
        code: '',
        courseList: []
      }
    },

    components: {
      XHeader,
      XTable,
      PopupPicker,
      PopupHeader,
      Popup,
      Group,
      TransferDom,
      Picker,
      XDialog,
      XInput,
      XButton,
      Box
    },

    computed: {},

    mounted() {
      let stuid = sessionStorage.getItem('jwid');
      if (stuid) {
        this.$http.get(this.BASE_URL + '/student/getCourses?stuid=' + stuid
          + '&week=' + this.select
          + '&xnxq=2017-2018学年第二学期')
          .then((response) => {
            let res = response.data;
            this.courseList = res.data;
          });
      }
    },

    methods: {
      change(value) {
        this.select = value;
        console.log(this.select);
      },
      modify() {
        let stuid = sessionStorage.getItem('jwid');
        if (stuid) {
          this.$http.get(this.BASE_URL + '/student/getCourses?stuid=' + stuid
            + '&week=' + this.select
            + '&xnxq=2017-2018学年第二学期')
            .then((response) => {
              let res = response.data;
              this.courseList = res.data;
            });
        }
        this.showweek = this.select.toString();
        this.show = false;
      },
      flush() {
        this.show2 = true;
      },
      flushCode() {
        document.getElementById('code').src = this.BASE_URL + '/student/code.png?d=' + new Date().getTime();
      },
      commit() {
        let openid = sessionStorage.getItem('openid');
        if (openid) {
          this.$http.post(this.BASE_URL + '/student/flushCourses', {
            openid: openid,
            //openid: "opJG60YTQ3ubY5fb17yj-Hkjbkzg",
            code: this.code
          }).then((response) => {
            let res = response.data;
            if (res.code === 0) {
              this.show2 = false;
              location.reload();
            }
          });
        }
      }
    }
  }
</script>

<style>
  .content {
    position: relative;
  }

  .content table {
    width: 100%;
  }

  .content table tbody tr td {
    width: 12.5%;
    text-align: center;
    border-right: 1px solid #F9F9F9;
  }

  .content table tbody tr td p {
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #868D92;
  }

  .lesson-item {
    position: absolute;
    width: 12.3%;
    border-radius: 5px;
    background: rgb(138, 217, 255);
  }

  .lesson-item span {
    font-size: 12px;
    color: #fff;
    line-height: 15px;
    word-wrap: break-word;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .vux-close {
    margin-top: 8px;
    margin-bottom: 8px;
  }
</style>
