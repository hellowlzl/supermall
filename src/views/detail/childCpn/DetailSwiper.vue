<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="item in topImage">
      <img :src="item"/>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'
  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    props: {
      topImage: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
       imageTops: []
      }
    },
    created(){

    }
  }
</script>

<style scoped>
.detail-swiper{
  height: 300px;
  overflow: hidden;
}
</style>
