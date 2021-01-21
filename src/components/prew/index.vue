<template>
  <div>
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid blue'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

export default {
  data() {
    return {
      list: [
        {
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 600
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    }
  }
}
</script>

<style scoped>
#test{
    height: 100px;
}
#test div,img,ul,li{
    height: 100%;
}
</style>