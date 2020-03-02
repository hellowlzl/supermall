<template>
  <div class="cart" id="cart">
    <nav-bar class="cartNavBar">
      <div slot="center" class="centerNavBar">购物车({{getcartItemLenth}})</div>
    </nav-bar>
    <CartList/>
    <cart-buttom-bar/>
  </div>
</template>

<script>
  import  NavBar from 'components/common/navbar/NavBar'
  import {mapGetters} from 'vuex'
  import CartList from './childCpn/CartList'
  import CartButtomBar from './childCpn/CartButtomBar'
  export default {
    name: "cart",
    components: {
      NavBar,
      CartList,
      CartButtomBar,
    },
    computed: {
      ...mapGetters(['getcartItemLenth'])
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .cartNavBar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
