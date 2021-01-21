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
        <li
          v-for="item in filmList"
          :key="item.filmId"
          @tap="handleToDetail(item.filmId)"
        >
          <div class="pic_show"><img v-lazy="item.poster" /></div>
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
            <p v-if="item.actors">主演: {{ actorFilter(item.actors) }}</p>
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
      preCityId: -1, //记录切换前的城市Id；城市id可能是负数
      pageNum: 1, //存放pagesize
      pageSize: 10,
    };
  },
  activated() {
    //keep-live 的activated 生命周期
    var cityId = this.$store.state.city.id; //获取切换后的城市Id

    if (cityId === this.preCityId) {
      // 判断是否切换城市
      // this.isLoading = false;
      return;
    }
    //   console.log(this.pageNum);
    this.axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=6940610`,

      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
    //   console.log(res.data);
      if (res.data.msg === "ok") {
        this.preCityId = cityId; //更新preCityId
        this.isLoading = false;
        var filmData = res.data.data;
        this.filmList = filmData.films;
        this.total = filmData.total;
      }
    });
  },

  methods: {
    actorFilter(actors) {
    if(!actors)return;
      var newList = actors.map((item) => item.name).join();
      return newList;
    },
    handleToDetail(movieId) {
      // console.log(movieId);
      //传递详情页面id
      //调整到详情页，动态路由
      this.$router.push("/movie/detail/1/" + movieId);
    },
    handleToScroll(pos) {
      //   console.log("handleToScroll");
      if (pos.y > 30) {
        this.pullDownMsg = "正在更新";
      }
    },
    handleToTouchEnd(pos) {
      //   console.log("handleToTouchEnd");
      var cityId = this.$store.state.city.id;

      if (this.pageNum * this.pageSize > this.total) {
        this.pullDownMsg = "敬请期待更多";
        setTimeout(() => {
            this.pullDownMsg = "";
        }, 2000);
        return;
      }
      this.pageNum++;

      if (pos.y > 30) {
        this.axios({
          url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=${this.pageNum}&pageSize=10&type=1&k=6940610`,

          headers: {
            "X-Client-Info":
              '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
            "X-Host": "mall.film-ticket.film.list",
          },
        })
          .then((res) => {
            this.pullDownMsg = "更新成功";
            setTimeout(() => {
              var filmData = res.data.data;
              this.filmList = filmData.films;
              this.total = filmData.total;
              this.pullDownMsg = "";
            }, 2000);
          })
          .catch((err) => {
            console.log(err);
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
