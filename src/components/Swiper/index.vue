<template>
  <div class="swiper-container filmswiper" >
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <!-- 如果需要分页器 -->
    <!-- <div class="swiper-pagination film-swiper-pagination"></div> -->
  </div>
</template>

<script>
export default {
  props: ["perview", "myclassname"],
  mounted() {
      
      this.$nextTick(() => {
        //   console.log(this.perview);
        new Swiper("." + this.myclassname, {
          slidesPerView: this.perview,
          spaceBetween: this.myclassname === "actorswiper" ? 20 : 10,
          freeMode: true,
          freeModeSticky: true,
        });
      });
   
  },
};
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: 100%;
  }
}
</style>
