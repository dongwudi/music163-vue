<template>
  <div id="j-app" class="u-height">
    <div class="root">
      <div class="m-home">
        <router-view></router-view>
        <footer class="footer"></footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style lang="scss">
.footer {
  height: 20px;
  text-align: center;
  line-height: 20px;
}
</style>