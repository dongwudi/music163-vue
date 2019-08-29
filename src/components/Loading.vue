<template>
  <div class="loading-container">
    <div class="loading">
      <img src="../assets/ld.gif" alt />
      <p class="tip">{{tip}}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tip: {
      type: String,
      default: "Loading"
    }
  }
};
</script>

<style lang="scss" scoped>
.loading-container {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}
.loading {
  width: 100%;
  text-align: center;
  .tip {
    line-height: 20px;
    font-size: 14px;
    color: #333;
  }
}
</style>