<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>

      <div class="navbar-center" slot="center" >
        <div v-for="(item ,index) in navbarItem"
             class="center-item"
             :class="{active: index === currentIndex}"
             @click="centerItemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return {
        navbarItem: ['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      centerItemClick(index){
        this.currenIndex = index;
        this.$emit('clickTitle', index);
      },
      backClick(){
        this.$router.back();
      }
    },
  }
</script>

<style scoped>
  .navbar-center{
    display: flex;
    font-size: 13px;
  }
  .center-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text)
  }
  .back img{
    margin-top: 12px;
  }
</style>


