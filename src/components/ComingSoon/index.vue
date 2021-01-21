<template>
  <div class="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller v-else>
      <ul>
        <li
          v-for="item in filmList"
          :key="item.filmId"
          @tap="handleToDetail(item.filmId)"
        >
          <div class="pic_show"><img v-lazy="item.poster" /></div>
          <div class="info_list">
            <h2>
              {{ item.name
              }}<span v-if="item.filmType.value === 1" class="item">2D</span>
            </h2>
            <p><span class="person">17746</span> 人想看</p>
            <p>主演:{{ item.actors | actorFilter}}</p>
            <p>{{ handleTime(item.premiereAt) }}上映</p>
          </div>
          <div class="btn_pre">预售</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
import Vue from "vue";
import moment from "moment";
Vue.filter("actorFilter", function (actors) {
   if(!actors)return;
     
  var newList = actors.map((item) => item.name).join();
  return newList;
});

export default {
  name: "ComingSoon",

  data() {
    return {
      filmList: null,
      total: null,
      isLoading: true,
      preCityId: -1, //城市id可能是负数
      pageSize:10,
      pageNum:1
    };
  },
  activated() {
    var cityId = this.$store.state.city.id;
    if (cityId === this.preCityId) {
      // 判断是否切换城市
      //   this.isLoading = false;
      return;
    }
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.pageNum}&pageSize=${this.pageSize}&type=2&k=7343916`,

      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      if (res.data.msg === "ok") {
        this.preCityId = cityId;
        this.isLoading = false;
        this.filmList = res.data.data.films;
        this.total = res.data.data.total;
      }
    });
  },

  methods: {
    handleTime(premiereAt) {
      var res = null;
      //上日日期-当前日期 = 时间差
      var date = new Date(Number(premiereAt + "000"));
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var arr = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];

      var week = arr[moment(date).format("d")];

      res = `${week} ${month}月${day}日 `;
      return res;
    },
    handleToDetail(movieId) {
     //  console.log(movieId);
      //传递详情页面id
      //调整到详情页，动态路由
      this.$router.push("/movie/detail/2/" + movieId);
    },
  },
};
</script>

<style scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 16px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .item {
  display: inline-block;
  margin-left: 5px;
  font-size: 10px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  vertical-align: middle;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>