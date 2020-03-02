import {debounce} from './util'
import BackTop from 'components/content/backTop/backTop'

export const itemListenerMixin = {
  data(){
    return {
      itemImageLoadLinsn: null
    }
  },
  mounted(){
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.itemImageLoadLinsn = () => {
      refresh();
    }
    this.$bus.$on('itemImageLoad',this.itemImageLoadLinsn);
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false
    }
  },
methods: {
  clickBackTop(){
    this.$refs.scroll.scrollTo(0, 0, 500);
  }
}
}
