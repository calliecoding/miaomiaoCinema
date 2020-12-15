<template>
  <div class="movie_body">
    <Loading v-if="isLoading"></Loading>
    <Scroller
      :handleToScroll="handleToScroll"
      :handleToTouchEnd="handleToTouchEnd"
      v-else
    >
      <ul>
        <li>{{ pullDownMsg }}</li>
        <li v-for="item in filmList" :key="item.filmId" @tap="handleToDetail">
          <div class="pic_show"><img :src="item.poster" /></div>
          <div class="info_list">
            <h2>
              {{ item.name }}
              <img
                v-if="item.filmType.value === 1"
                src="@/assets/maxs.png"
                alt=""
              />
            </h2>
            <p>
              观众评 <span class="grade">{{ item.grade }}</span>
            </p>
            <p>主演: {{ actorFilter(item.actors) }}</p>
            <p>分类: {{ item.category }}</p>
          </div>
          <div class="btn_mall">购票</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>

<script>
export default {
  name: "Nowplaying",
  data() {
    return {
      filmList: [],
      total: null, //记录正在热映的所有电影的数量
      pullDownMsg: "",
      isLoading: true,
      preCityId: -1, //城市id可能是负数
    };
  },
  activated() { //activated keep-live
    var cityId = this.$store.state.city.id;
    if (cityId === this.preCityId) {
        // 判断是否切换城市
    //   this.isLoading = false;
      return;
    }
//   console.log(123);
    this.axios({
      url:
        `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=6940610`,

      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      if (res.data.msg === "ok") {
        this.preCityId = cityId;
        this.isLoading = false;
        var filmData = res.data.data;
        this.filmList = filmData.films;
        this.total = filmData.total;
      }
    });
  },

  methods: {
    actorFilter(actors) {
      var newList = actors.map((item) => item.name).join();
      return newList;
    },
    handleToDetail() {
      //   console.log("handleToDetail");
    },
    handleToScroll(pos) {
      //   console.log("handleToScroll");
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新";
      }
    },
    handleToTouchEnd(pos) {
      //   console.log("handleToTouchEnd");
      if (pos.y > 30) {
        this.axios({
          url:
            "https://m.maizuo.com/gateway?cityId=110100&pageNum=2&pageSize=10&type=1&k=6940610",

          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
            "X-Host": "mall.film-ticket.film.list",
          },
        }).then((res) => {
          this.pullDownMsg = "更新成功";
          setTimeout(() => {
            var filmData = res.data.data;
            this.filmList = filmData.films;
            this.total = filmData.total;
            this.pullDownMsg = "";
          }, 2000);
        });
      }
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
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
</style>>
