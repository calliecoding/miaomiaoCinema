<template>
  <div id="detailContainer" class="slide-enter-active">
    <Header title="影片详情">
      <i class="iconfont icon-right" @touchstart="handleToBack"></i>
    </Header>
    <Loading v-if="isLoading"></Loading>

    <div id="content" class="contentDetail" v-else>
      <div class="detail_list">
        <div class="detail_list_bg" :style="{'background-image': `url(${detailMoive.poster})`}"></div>
        <div class="detail_list_filter"></div>
        <div class="detail_list_content">
          <div class="detail_list_img">
            <img :src="detailMoive.poster" alt="" />
          </div>
          <div class="detail_list_info">
            <h2>{{ detailMoive.name }}</h2>
            <p>{{ detailMoive.grade }}</p>
            <p>{{ detailMoive.category }}</p>
            <p>{{ detailMoive.nation }} / {{ detailMoive.runtime }}分钟</p>
            <p>{{ handleTime(detailMoive.premiereAt) }}上映</p>
          </div>
        </div>
      </div>
      <div class="detail_intro">
        <p>
          {{ detailMoive.synopsis }}
        </p>
      </div>

      <div class="detail_player" ref="detail_player">
        <h3>剧照</h3>
        <Swiper perview="2" class="swiper-wrapper stageswiper" myclassname="stageswiper">
          <div
            class="swiper-slide"
            v-for="(item, index) in detailMoive.photos"
            :key="index"
          >
            <div>
              <img :src="item" alt="" />
            </div>
          </div>
        </Swiper>
      </div>
      <div class="detail_player">
        <h3>演职人员</h3>
        <Swiper perview="4" class="actorswiper" myclassname="actorswiper">
          <div
            class="swiper-slide"
            v-for="(item, index) in detailMoive.actors"
            :key="index"
          >
            <img :src="item.avatarAddress" />
            <p>{{ item.name }}</p>
            <p>{{ item.role }}</p>
          </div>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
// 复用头部组件
import Header from "@/components/Header";
import moment from "moment";
import Swiper from "@/components/Swiper";
export default {
  name: "Detail",
  data() {
    return {
      detailMoive: {},
      isLoading: true,
    };
  },
  components: {
    Header,
    Swiper,
  },
  props: ["movieId"],
  methods: {
    //返回按钮
    handleToBack() {
      this.$router.back();
    },
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
  },
  mounted() {
    // console.log(this.movieId);
    this.axios({
      url: `https://m.maizuo.com/gateway?filmId=${this.movieId}&k=746021`,

      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
        "X-Host": "mall.film-ticket.film.info",
      },
    }).then((res) => {
      //   console.log(res);
      if (res.data.msg === "ok") {
          this.detailMoive = res.data.data.film;

        // this.$nextTick(() => {
            //   new Swiper(this.$refs.detail_player, {
                //     slidesPerView: "auto",
        //     freeMode: true,
        //     freeModeSticky: true,
        //   });
        // });
        this.isLoading = false;
      }
    });
  },
};
</script>

<style scoped>
#detailContainer {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 100%; /* min-height 保证最小高度与屏幕是相同的 */
  background: white;
}

#detailContainer.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  background: 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
.detail_player .swiper-slide {
  width: 70px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>>

