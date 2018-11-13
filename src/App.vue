<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
  box-sizing: border-box;
  height: 100vh;
}
*{
    box-sizing: border-box;
}
input,
input[type="text"],
input[type="button"],
input[type="submit"],
input[type="search"] {
  border-radius: 0;
  outline: none;
  box-shadow: none;
  appearance: none;
}
.container{
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
}
@media screen and (min-width: 1025px){
  #app{
    width: 600px;
    height: 800px;
    margin: 30px auto;
  }
}
</style>
