<template>
  <div id="Detail">
    <detail-nav-bar class="detail-nav" @clickTitle="titleClick" ref="nav"/>
    <Scroll class="content" ref="scroll"
            :probeType="3"
            @scroll="scroll">
      <DetailSwiper :top-image="topImages"/>
      <detail-base-info :goods = "goods"/>
      <detail-shop-info :shop = "shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info ref="params" :param-info ="itemParams" />
      <detail-comment-info ref="comment" :comment-info = "commentInfo"/>
      <goods-list ref="recommend" :goods="recommends" />
    </Scroll>
    <back-top @click.native="clickBackTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addCart="addCart"></detail-bottom-bar>

  </div>
</template>

<script>

  import DetailNavBar from './childCpn/DetailNavBar'
  import {getDetail, Goods, Shop, getRecommend} from 'network/detail'
  import DetailSwiper from './childCpn/DetailSwiper'
  import DetailBaseInfo from './childCpn/DetailBaseInfo'
  import DetailShopInfo from './childCpn/DetailShopInfo'
  import DetailGoodsInfo from './childCpn/DetailGoodsInfo'
  import DetailParamInfo  from './childCpn/DetailParamInfo'
  import DetailCommentInfo from './childCpn/DetailCommentInfo'
  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'
  import {itemListenerMixin, backTopMixin} from 'common/mixin'
  import {debounce} from "common/util";
  import DetailBottomBar from './childCpn/DetailBottomBar'


  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      Scroll,
      GoodsList,
      DetailBottomBar,
    },
    data(){
      return {
        iid: "",
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [0, 1000 , 2000 ,3000],
        currentIndexs: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],

    created(){
      // 1. 获取参数
      this.iid = this.$route.params.iid;
      // 2. 发送请求
      getDetail(this.iid).then(res => {
        // 获取轮播图
        const data =  res.result;
        this.topImages = data.itemInfo.topImages;
        // 2. 获取商品详细信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3. 获取商家信息
        this.shop = new Shop(data.shopInfo);

        // 4. 获取展示信息
        this.detailInfo = data.detailInfo;

        // 5. 商品参数信息
        this.itemParams = data.itemParams;

        // 6. 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0];
        }
      })

      // 3.获取推荐商品数据
      getRecommend().then(res => {
        this.recommends = res.data.list;
      });
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh();
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0 , -this.themeTopYs[index], 200);
      },
      scroll(position){
        const scrollY = - position.y;
        const length = this.themeTopYs.length -1;
        for(let i = 0; i<this.themeTopYs.length; i++){
          if(this.currentIndexs !== i && ((i<= length && scrollY >= this.themeTopYs[i]
            && scrollY < this.themeTopYs[i+1]) ||
            (i === length && scrollY >= this.themeTopYs[length] ))){
            this.currentIndexs = i;
            this.$refs.nav.currentIndex = this.currentIndexs;
          }
        }
        // 判断值是否大于1000出现backtop
        this.isShowBackTop = scrollY > 1000;
      },
      addCart(){
        // 1.添加需要展示的信息给对象
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid;
        product.checked = false;
        this.$store.dispatch('addCart', product);
      }
    },
    beforDestroy() {
      this.$bus.$off('itemImageLoad', this.itemImageLoadLinsn);
    }
  }
</script>

<style scoped>
  #Detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }

  .content {
    position: relative;
    height: calc(100% - 44px - 50px);
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
    background: #ffffff;
  }
</style>
