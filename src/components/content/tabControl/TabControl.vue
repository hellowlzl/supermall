<template>
  <div class="tab-control">
    <div v-for="(items , index) in title"
         class="tab-control-item"
         :class="{active:index === currentIndex} "
         :key="index"
         @click="itemClick(index)">
      <span>
        {{items}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      title: {
        type: Array,
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(itemIndex){
        this.currentIndex = itemIndex;
        this.$emit('tabClick',this.currentIndex)
      }
    }

  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background: #ffffff;
  }
  .tab-control-item{
    flex: 1;
  }
  .tab-control-item span{
    padding: 5px;
  }
  .active{
    color: var(--color-high-text);
  }
  .active span{
    border-bottom: 3px solid var(--color-tint);
  }
</style>
