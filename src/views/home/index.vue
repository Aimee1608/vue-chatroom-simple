<template>
  <div class="home container">
    <h2 class="welcome">
      欢迎进入聊天室
    </h2>
    <div class="nametip">
      请输入您的昵称
    </div>
    <div class="nameinput">
      <input v-model="name" placeholder="昵称" @keydown.enter="gotoroom" autofocus/>
    </div>
    <div class="gotoroom">
      <span @click="gotoroom">GO</span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
  components: { // 组件

  },
  computed: { // 计算

  },
  methods: { // 方法事件
    gotoroom () {
      if (this.name && this.name.trim()) {
        localStorage.setItem('chatuser', this.name)
        this.$router.push({name: 'room'})
      } else {
        alert('请输出昵称')
      }
    }
  },
  mounted () { // 加载完成

  },
  created () { // 创建
  }
}
</script>

<style lang='less'>
.home{
  background: #e26d6d;
  padding: 20px;
  .welcome{
    color: #ffffff;
    text-align: center;
    margin: 30px 0;
  }
  .nametip{
    color: #ffffff;
  }
  .nameinput{
    margin: 20px 0;
    input{
      width:100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
    }
    .input:focus {
      outline: none;
      caret-color: rgb(252, 53, 96);
    }
  }
  .gotoroom{
    padding: 20px 0;
    text-align: center;
    span{
      display: inline-block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      background: #ffffff;
      border-radius: 4px;
      color: #e26d6d;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
