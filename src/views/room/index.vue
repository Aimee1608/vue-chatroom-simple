<template>
  <div class="room container">
    <div class="room-header">
      {{username}}<span>（在线人数{{clientNum}}）</span>
      <span class="logout" @click="logout">退出</span>
    </div>
    <div class="room-body">
      <div class="msgbox" v-for="(item, index) in msgList" :key="index">
        <!-- 系统消息 -->
        <div v-if="item.msgType == 'online' || item.msgType == 'offline'" class="sysInfo">
           <div class="sysTime">{{ item.time }}</div>
           <div class="sysInfo-inner">{{ item.username }} 上线</div>
        </div>
        <!-- 聊天信息 -->
        <div v-if="item.msgType == 'clientMsg'" class="chatInfo">
          <div class="sysTime">{{ item.time }}</div>
          <div class='self' v-if="item.username == username">
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
             <div class="user">{{ item.username }}</div>
          </div>
          <div class="others" v-else>
            <div class="user">{{ item.username }}</div>
            <div class="bubble">
              <div class="chatBubble">{{ item.msg }}</div>
              <div class="triangle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="room-footer">
      <input type="text" placeholder="请输入内容" @keydown.enter="send" v-model="msginfo" autofocus>
      <span class="sendbtn" @click="send">enter</span>
    </div>
  </div>
</template>

<script>
let moment = require('moment')
export default {
  data () {
    return {
      username: '',
      clientNum: 0,
      msgList: [],
      socket: null,
      msginfo: ''
    }
  },
  components: { // 组件

  },
  computed: { // 计算

  },
  methods: { // 方法事件
    send () {
      if (this.msginfo && this.msginfo.trim()) {
        this.$socket.emit('msg', {
          msg: this.msginfo,
          username: this.username
        })
        this.msginfo = ''
      } else {
        alert('消息为空！')
      }
    },
    logout () {
      localStorage.removeItem('chatuser')
      this.$router.push('/')
    }
  },
  mounted () { // 加载完成
    // 检测用户是否登录
    if (this.username) {
      // 用户已登录，客户端发送上线信息给服务器
      this.$socket.emit('online', this.username)
    } else {
      // 用户未登录，提醒用户登录并跳转到登录页面
      alert('请先登录')
      this.$router.push('/')
    }

    // 用户上线提示
    this.$socket.on('online', data => {
      this.msgList.push({
        msgType: 'online',
        username: data,
        time: moment().format('HH:mm:ss')
      })
    })

    // 接收消息
    this.$socket.on('broadcastMsg', data => {
      this.msgList.push({
        msgType: 'clientMsg',
        username: data.username,
        msg: data.msg,
        time: moment().format('HH:mm:ss')
      })
    })

    // 用户下线提醒
    this.$socket.on('offline', data => {
      this.msgList.push({
        msgType: 'offline',
        username: data,
        time: moment().format('HH:mm:ss')
      })
    })

    // 监听当前在线人数
    this.$socket.on('clientNum', num => {
      this.clientNum = num
    })
  },
  updated: function () {
    this.$nextTick(function () {
      var oBody = document.querySelector('.room-body')
      oBody.scrollTop = oBody.scrollHeight
    })
  },
  created () { // 创建
    this.username = localStorage.getItem('chatuser')
  }
}
</script>

<style lang='less'>
.room{
  border: 1px solid #e26d6d;
  position: relative;
  .room-header{
    background: #e26d6d;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    color: #ffffff;
    .logout{
      height: 40px;
      line-height: 40px;
      position: absolute;
      right: 10px;
      top: 0;
      cursor: pointer;
      font-size: 12px;
    }
  }
  .room-footer{
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #e26d6d;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 80px 0 10px;
    .sendbtn{
      position: absolute;
      right: 10px;
      top: 7.5px;
      width: 60px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 4px;
      background: #ffffff;
      color: #e26d6d;
      cursor: pointer;
      font-weight: bold;
    }
    input{
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 4px;
    }
  }
  .room-body{
    width: 100%;
    height: calc(100% - 90px);
    background: #efefef;
    overflow-y: auto;
    .msgbox{
      .sysTime{
        text-align: center;
        font-size: 12px;
        padding: 5px 0;
        color: #999;
      }
      .sysInfo{
        text-align: center;
        .sysInfo-inner{
          font-size: 13px;
          padding: 20px;
          color: #666;
        }
      }
      .chatInfo{
        margin-bottom: 10px;
        width: 100%;
        padding: 0 10px;
        .user{
          display: inline-block;
          margin: 0 0 0 20px;
        }
        .bubble {
          display: inline-block;
          position: relative;
          text-align: left;
        }
        .chatBubble {
          min-height: 30px;
          background-color: #e26d6d;
          font-size: 16px;
          color: #333333;
          border-radius: 10px;
          padding: 10px;
        }
        .self{
          position: relative;
          text-align: right;
          display: flex;
          justify-content: flex-end;
          .triangle {
            position: absolute;
            right: -10px;
            top: 10px;
            border-left: 10px solid #e26d6d;
            border-bottom: 10px solid transparent;
          }
          .user{
            display: inline-block;
            margin: 0 0 0 20px;
          }
        }
        .others{
          position: relative;
          text-align: left;
          display: flex;
          justify-content: flex-start;
          .chatBubble {
            background-color: #ffffff;
          }
          .triangle {
            position: absolute;
            left: -10px;
            top: 10px;
            border-right: 10px solid #ffffff;
            border-bottom: 10px solid transparent;
          }
          .user{
            display: inline-block;
            margin: 0 20px 0 0;
          }
        }
      }
    }
  }
}
</style>
