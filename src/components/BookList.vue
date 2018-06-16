<!--  -->
<template>
  <div>
    <div style="position:fixed; width: 100%;z-index:1">
      <x-header><p style="font-size: 14px">查询结果</p></x-header>
    </div>
    <div style="height:40px;"></div>
    <div class="mystyle">
      <div v-for="(item,inex) in bookList" @click="toPosition(item.CtrlNo,item.CtrlRd)">
        <card :on-click-footer="toPosition" :header="{title: '图书信息' }" :footer="{title: '点击查看图书位置'}">
          <div slot="content" class="card-padding">
            <p>书名：{{item.Title}}</p>
            <p>作者：{{item.Author}}</p>
            <p>出版社：{{item.Publish}}</p>
            <p>ISBN：{{item.Isbn}}</p>
          </div>
        </card>
      </div >
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20" v-show="!busy">
        加载中...
      </div>
    </div>
  </div>
</template>

<script>
  import {XHeader, Card,Scroller} from 'vux'

  export default {
    data() {
      return {
        busy: false,
        rollShow: true,
        pageno: '1',
        bookList: [ ],
      };
    },

    components: {
      XHeader,
      Card,
      Scroller
    },
    mounted() {
      this.getBookList()
    },

    methods: {
      getBookList(flag) {
        let keyword = this.$route.query.keyword;
        let param = {
          keyword: keyword,
          pageno: this.pageno
        }
        this.$http.get(this.BASE_URL + '/library/searchBooks', {
          params: param
        }).then((response) => {
          let res = response.data;
          if (res.error === "0") {
            if (flag) {
              this.bookList = this.bookList.concat(res.find_ifa_FindFullPage_list1);
              if (res.find_ifa_FindFullPage_list1.length === 0) {
                this.busy = true;
//                this.rollShow = false;
              } else {
                this.busy = false;
              }
            } else {
              this.bookList = res.find_ifa_FindFullPage_list1;
              this.busy = false;
            }
          } else {
            this.bookList = [];
          }
        });
      },
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.pageno++;
          this.getBookList(true);
        }, 500);
      },
      toPosition(CtrlNo,CtrlRd) {
        this.$router.push({
          path: '/bookPosition?CtrlNo=' + CtrlNo + '&CtrlRd=' + CtrlRd
        });
      }
    }
  }
</script>

<style>
  .card-padding {
    position: relative;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif;
    color: #999999;
    text-align: left;
    left: 5%;
    width: 95%;
  }
  .mystyle {
    text-align: center;
    font-size: 14px;
  }

</style>
