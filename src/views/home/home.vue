<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" >购物街</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <swiper>
        <swiper-item v-for="item in banners">
          <a :href="item.link">
            <img :src=item.image alt=""/>
          </a>
        </swiper-item>
      </swiper>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :title="['流行','新款','精选']"
                   @tabClick="tabClick"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="clickBackTop" v-show="isShowBackTop"/>
  </div>

</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {Swiper, SwiperItem} from 'components/common/swiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import {debounce} from 'common/util'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  export default {
    name: "home",
    components: {
      NavBar,
      Swiper,
      SwiperItem,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list:[]},
          'new': {page: 0, list:[]},
          'sell': {page: 0, list:[]},
        },
        currentType: 'pop',
        saveY: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 1.请求多个数据
      this.getHomeMultidata();
      // 2.请求商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted(){

    },
    destroyed(){
      console.log("销毁");
    },
    beforDestroy(){
    },
    activated(){
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY);
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
      this.$bus.$off('itemImageLoad', this.itemImageLoadLinsn);
    },
   /* beforeRouteUpdate (to, from, next) {
      console.log(to);
      console.log(from);
      next();
    },*/
    methods: {
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page;
        })
      },
      tabClick(index){
        this.currentType = ['pop', 'new', 'sell'][index];
      },
      contentScroll(position){
        this.isShowBackTop = Math.abs(position.y) > 1000;
      },

      loadMore(){
        this.getHomeGoods(this.currentType);
        this.$refs.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: #ffffff;
    position: sticky;
    top: 0;
    z-index: 9;
    width: 100%;
  }

  /*.tab-control{
    position: -webkit-sticky;
    position: sticky;
    top: 43px;
    z-index: 9;
  }*/
  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
  /* .content{
     height: calc(100% - 93px);
     overflow: hidden;
   }*/
</style>
