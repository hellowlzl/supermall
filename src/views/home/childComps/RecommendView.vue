<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    font-size: 13px;
    text-align: center;
    padding: 5px 0 20px 0;
    border-bottom: 8px solid #eee;
  }
  .recommend-item {
    flex-shrink: 1;
    padding: 1.5%;
  }
  .recommend-item img {
    width: 100%;
  }
</style>
