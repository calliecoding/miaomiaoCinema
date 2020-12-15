<template>
  <div class="wraper" ref="wraper">
    <slot></slot>
  </div>
</template>
 
<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props: {
    handleToScroll: {
      type: Function,
      default: function () {},
    },
    handleToTouchEnd: {
      type: Function,
      default: function () {},
    },
  },
  created() {
    this.$nextTick(() => {
    //   if (!this.scroll) {
    //     this.scroll = new Bscroll(this.$refs.wrapper, {});
    //     this.scroll.on("touchend", (pos) => {
    //       // 下拉动作
    //       if (pos.y > 50) {
    //         this.loadData();
    //       }
    //     });
    //   } else {
    //     this.scroll.refresh();
    //   }
      
      var scroll = new BScroll(this.$refs.wraper, {
        tap: "tap",
        probeType: 2,
      });
    //   console.log(scroll);
      this.scroll = scroll;

      scroll.on("scroll", (pos) => {
        this.handleToScroll(pos);
      });
      scroll.on("touchEnd", (pos) => {
        this.handleToTouchEnd(pos);
      });
    });
  },
  methods: {
    toScrollTop(y) {
      this.scroll.scrollTo(0, y);
    },
  },
};
</script>

<style scoped>
.wraper {
  height: 100%;
}
</style>