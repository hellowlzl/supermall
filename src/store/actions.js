export default  {
  addCart(context, replay){
    let oldProduct = context.state.cartItemList.find(item => item.iid === replay.iid);
    if(oldProduct) {
      // 已经存在商品，直接让数量添加1
      context.commit('addCartNumber', oldProduct);
    } else {
      replay.count = 1;
      // 不存在商品，需要添加对象
      context.commit('addCarts', replay);
    }
  }
}
