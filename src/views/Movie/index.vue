<template>
  <div id="main">
    <Header title="喵喵电影" />
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/movie/city" class="city_name active">
          <span>{{ $store.state.city.nm }}</span
          ><i class="iconfont icon-lower-triangle"></i>
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/movie/nowplaying" class="hot_item"
            >正在热映</router-link
          >
          <router-link tag="div" to="/movie/comingsoon" class="hot_item"
            >即将上映</router-link
          >
        </div>
        <router-link tag="div" to="/movie/search" class="search_entry">
          <i class="iconfont icon-sousuo"></i>
        </router-link>
      </div>
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <TabBar />

    <router-view name="detail" />
  </div>
</template>


<script>
import Header from "@/components/Header";
import TabBar from "@/components/TabBar";
import { messageBox } from "@/components/JS";

export default {
  name: "Movie",
  components: {
    Header,
    TabBar,
  },
  mounted() {
    //进入组件时，弹窗+定位城市
    var _this = this;
    
    //通过定时器模拟异步请求，并弹窗
    setTimeout(() => {  
      // console.log(1);
      //   var nm = returnCitySN.cname;
      //   var id = returnCitySN.cid;
      //   console.log(nm, id);
      //   if (this.$store.state.city.id == id) {
      //     return;
      //   }
      messageBox({
        title: "定位",
        content: "自动获取失败",
        cancel: "取消",
        ok: "切换定位",
        handleCancel() {
        //   window.localStorage.setItem("nowNm", nm);
        //   window.localStorage.setItem("nowId", id);
        //   window.location.reload();
        },
        handleOk() {
            
        if(_this.$router.history.current.path === '/movie/city')return
          _this.$router.push("/movie/city");
        },
      });
    }, 1000);


    //异步接口+弹窗
 /*    this.axios.get("/api/cityjson?ie=utf-8").then((res) => {
      var msg = res.data.msg;
      if (msg === "ok") {
        var nm = res.data.data.nm;
        var id = res.data.data.id;
        if (this.$store.state.city.id == id) {
          return;
        }
        messageBox({
          title: "定位",
          content: nm,
          cancel: "取消",
          ok: "切换定位",
          handleOk() {
            window.localStorage.setItem("nowNm", nm);
            window.localStorage.setItem("nowId", id);
            window.location.reload();
          },
          handleCancel() {
            this.$router.push("/movie");
          },
        });
      }
    }); */

  },
  methods: {},
};
</script>

<style scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
}
.movie_menu .city_name {
  margin-left: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry i {
  font-size: 24px;
  color: red;
}
</style>