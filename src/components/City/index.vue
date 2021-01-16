<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading"></Loading>
      <Scroller ref="city_list" v-else>
        <!-- 用div进行包裹 -->
        <div> 
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotList"
                :key="item.cityId"
                @tap="handleToCity(item.cityId, item.name)"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{ item.index.toUpperCase() }}</h2>
              <ul>
                <li
                  v-for="item in item.list"
                  :key="item.cityId"
                  @tap="handleToCity(item.cityId, item.name)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="item.index"
          @touchstart="handleToIndex(index)"
        >
          {{ item.index.toUpperCase() }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList: [],
      hotList: [],
      isLoading: true,
    };
  },
  mounted() {
       
    var cityList = localStorage.getItem("cityList");
    var hotList = localStorage.getItem("hotList");

    if (cityList && hotList) { //判断本地是否存在数据
      this.cityList = JSON.parse(cityList);
      this.hotList = JSON.parse(hotList);
      this.isLoading = false;
    } else {
      this.axios({
        url:
          "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=4271989",

        //设置了请求头的字段
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"15610855429195524981146"}',
          "X-Host": "mall.film-ticket.city.list",
        },
      }).then((res) => {
        if (res.data.msg == "ok") {
          this.isLoading = false;
          var cities = res.data.data.cities;
          // 需要的数据 [{index :A list: [{city:鞍山，id：111}, {city:安庆, id:222}]}]

          //处理数据
          var { cityList, hotList } = this.formatCityList(cities);
          this.cityList = cityList;
          this.hotList = hotList;

          //把城市存在本地
          localStorage.setItem("cityList", JSON.stringify(cityList));
          localStorage.setItem("hotList", JSON.stringify(hotList));
        }
      });
    }
  },

  methods: {
    formatCityList(cities) {
      var cityList = [];
      var hotList = cities.filter((item) => item.isHot == 1);
      //处理cityList
      for (let i = 0; i < cities.length; i++) {
        //获取首字母
        var firstLetter = cities[i].pinyin.substring(0, 1);

        var hasLetter = toCom(firstLetter); //存储字母是否已经存在的bool值

        if (hasLetter) {
          //判断首字母index是否存在 ,存在
          //像已经存在的 目录下添加数据
          for (let j = 0; j < cityList.length; j++) {
            if (firstLetter == cityList[j].index) {
              cityList[j].list.push({
                name: cities[i].name,
                cityId: cities[i].cityId,
              });
            }
          }
        } else {
          //不存在，添加
          cityList.push({
            index: firstLetter,
            list: [{ name: cities[i].name, cityId: cities[i].cityId }],
          });
        }
        function toCom(firstLetter) {
          //遍历cityList
          for (let j = 0; j < cityList.length; j++) {
            if (firstLetter == cityList[j].index) {
              return true;
            }
          }
          return false;
        }
      }

      //排序
      cityList.sort((a1, a2) => {
        if (a1.index > a2.index) {
          return 1;
        } else if (a1.index < a2.index) {
          return -1;
        }
      });
      return {
        cityList,
        hotList,
      };
    },
    handleToIndex(index) {
      var h2 = this.$refs.city_sort.getElementsByTagName("h2");
      // console.log(h2);

      //滚动距离 = 定位距离
      //   this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop);
    },
    handleToCity(id, nm) {
      localStorage.setItem("id", id); //存储id
      localStorage.setItem("nm", encodeURIComponent(nm));
      //转码后存储城市名

      this.$store.commit("city/CITY_INFO", {
        id,
        nm,
      });
      this.$router.push('/movie/nowplaying')
    },
  },
};
</script>

<style scoped>
#content .city_body {
  margin-top: 45px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}

.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_index {
  width: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
</style>