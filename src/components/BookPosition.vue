<template>
  <div>
    <di style="position:fixed; width: 100%;height:20%;z-index:1">
      <x-header><p style="font-size: 14px">图书位置</p></x-header>
    </di>
    <div style="height:40px;"></div>
    <div class="mystyle" v-for="(item,inex) in positionList">
      <card  :header="{title: '位置信息' }">
        <div slot="content" class="card-padding">
          <p title="校区">校区：{{item.Sublib}}</p>
          <p title="书库" >书库：{{item.Room2}}</p>
          <p title="具体位置">具体位置：{{item.Site}}</p>
          <div v-for="(items,index) in positionList2">
            <p title="" v-if="item.Callo===items.Callo">状态：{{items.Barcode}}  {{items.Status.split('<')[0]}}</p>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
  import {XHeader, Card} from 'vux'

  export default {

    data() {
      return {
        positionList: [],
        positionList2: [],
      };
    },
    components: {
      XHeader,
      Card
    },
    mounted() {
      this.getBookPosition();
    },
    methods: {
      getBookPosition() {
        let ctrlno = this.$route.query.CtrlNo;
        let ctrlrd = this.$route.query.CtrlRd;
        let param = {
          rd: ctrlrd,
          no: ctrlno
        };
        this.$http.get(this.BASE_URL + '/library/getBookLocation', {
          params: param
        }).then((response) => {
          let res = response.data;
          if (res.error === '0') {
            this.positionList = res.find_ifa_GetSiteColl_list1;
            this.positionList2 = res.find_ifa_GetSiteColl_list2;

          } else {
            this.positionList = [];
          }
        });
      }
    }
  }
</script>

<style>
  .card-padding{
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
