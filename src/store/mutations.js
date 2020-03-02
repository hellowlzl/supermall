export default     {
  addCarts(state, replay){
    state.cartItemList.push(replay);
  },
  addCartNumber(state, replay){
    replay.count++;
  }
}
