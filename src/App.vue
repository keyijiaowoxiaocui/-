<template>
  <div id="app">

    <router-view />
  </div>
</template>

<script>
import { getRouters } from '@/api/api.js'
export default {
  data() {
    return {

    }
  },

  created() {
    getRouters().then(res => {
      console.log(res);
      // for (let index = 0; index < res.data.data.length; index++) {
        // this.$router.addRoute('各期简书博客', { path: res.data.data[index].name, component: res.data.data[index].name })
        // console.log(res.data.data[index].name);
        // this.$router.addRoute('各期简书博客', { name: res.data.data[index].name + '', path: '/' + res.data.data[index].name })
      // }
    })
    // console.log('asd');
    console.log(this.$router.getRoutes());
  }

}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
* {
  margin: 0;
  padding: 0;
}
</style>
