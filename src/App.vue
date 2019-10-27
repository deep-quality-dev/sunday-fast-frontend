<template>
  <transition name="fade">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  created() {}
};
</script>
<style>
.tips {
  margin-left: 20px;
  font-size: 12px;
  color: #999;
}
</style>

