<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
          <md-icon>&#xe63a;</md-icon>
        </md-button>
          <!--<span class="md-title">P2P聊天</span>-->
      </md-app-toolbar>

      <md-app-drawer md-permanent="full" :md-active.sync="menuVisible">
        <md-toolbar class="md-transparent" md-elevation="0">
          导航
        </md-toolbar>

        <md-list>
          <md-list-item to="/select">
              <md-icon>&#xe650;</md-icon>
              <span class="md-list-item-text">选择房间</span>
          </md-list-item>

          <md-list-item @click="reload">
            <md-icon>&#xe6b7;</md-icon>
            <span class="md-list-item-text">重新链接</span>
          </md-list-item>

            <!--<md-list-item>-->
            <!--<md-icon>delete</md-icon>-->
            <!--<span class="md-list-item-text">刷新</span>-->
            <!--</md-list-item>-->

          <md-list-item @click="enterRandomRoom">
            <md-icon>&#xe6cc;</md-icon>
            <span class="md-list-item-text">随机进入</span>
          </md-list-item>

          <md-list-item to="/showRooms">
            <md-icon>&#xe686;</md-icon>
            <span class="md-list-item-text">可用房间</span>
          </md-list-item>

        </md-list>
      </md-app-drawer>

      <md-app-content>
        <router-view></router-view>
      </md-app-content>
    </md-app>

      <!--<div class="container_join" :class="{active: hasJoinRoom}">-->
      <!--<input type="text" placeholder="输房间号" v-model="roomId" class="join_input">-->
      <!--<button @click="join" class="join_btn">join</button>-->
      <!--</div>-->
      <!--<div class="flex">-->
      <!--<div class="card">-->
      <!--<video src="" ref="localVideo" class="video" autoplay muted></video>-->
      <!--<p>本地链路</p>-->
      <!--<p v-for="msg in localMsg">{{msg}}</p>-->
      <!--</div>-->
      <!--<div>-->
      <!--<video src="" ref="remoteVideo" class="video" autoplay muted></video>-->
      <!--<p>远程链路</p>-->
      <!--<p v-for="msg in remoteMsg">{{msg}}</p>-->
      <!--</div>-->
      <!--</div>-->
      <!--<canvas ref="canvas" class="canvas"></canvas>-->
      <!--<button class="btn-photo" @click="snapshoot">合照</button>-->
      <!--<img src="" alt="" ref="snapshoot">-->
  </div>
</template>

<script>
import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import 'vue-material/dist/theme/default-dark.css'; // This line here

import handler from './libs/connect';

Vue.use(VueMaterial);

export default {
    name: 'app',
    components: {},
    data() {
        return {
            menuVisible: false,
            sendTxt: '',
            roomId: '',
            hasJoinRoom: false,
            localMsg: [],
            remoteMsg: [],
        };
    },
    mounted() {
        // handler.debug(this);
        // handler.onMessage = (e) => {
        // };
        // handler.onAddStream = (stream) => {
        //     this.$refs.remoteVideo.srcObject = stream;
        // };
    },
    destroyed() {

    },
    methods: {
        reload() {
            location.reload();
        },
        enterRandomRoom() {

            handler.getAvailableRooms();
            handler.onGetAvailableRooms = (rooms) => {
                if (rooms.length === 0) {
                    alert('暂无房间');
                    return;
                }
                let index = Math.floor(Math.random() * rooms.length);
                this.$router.push(`/room/${rooms[index]}`);
            };
        },
        send() {
            handler.sendMsg(this.sendTxt);
        },
        async join() {
            if (!/\w+/.test(this.roomId)) {
                alert('请输入房间号');
                return;
            }
            let stream = await handler.getMedia();
            if (stream.errorMsg) {
                alert(stream.errorMsg);
                return;
            }
            this.hasJoinRoom = true;
            let elm = this.$refs.localVideo;
            let elm2 = this.$refs.remoteVideo;

            elm.srcObject = stream;

            handler.connectRoom(this.roomId);

            let canvas = this.$refs.canvas;
            canvas.width = 400;
            canvas.height = 300;
            let ctx = canvas.getContext('2d');
            setInterval(() => {
                let width1 = canvas.width / canvas.height * elm.videoHeight / 2;
                let left1 = (elm.videoWidth - width1) / 2;

                let width2 = canvas.width / canvas.height * elm2.videoHeight / 2;
                let left2 = (elm2.videoWidth - width2) / 2;

                // left
                ctx.drawImage(elm, left1, 0, width1, elm.videoHeight, 0, 0, canvas.width / 2, canvas.height);
                // right
                ctx.drawImage(elm2, left2, 0, width2, elm2.videoHeight, canvas.width / 2, 0, canvas.width / 2, canvas.height);
            }, 30);
        },
        snapshoot() {
            let photoElm = this.$refs.snapshoot;
            let canvas = this.$refs.canvas;
            photoElm.src = canvas.toDataURL();
        },
        draw() {
        },
    },
};

</script>
<style lang="scss" src="./scss/index.scss"></style>
<style lang="scss">
    .md-app {
        height: 100vh;
        /*border: 1px solid rgba(#000, .12);*/
    }

    // Demo purposes only
    /*.md-drawer {*/
    /*width: 230px;*/
    /*max-width: calc(100vw - 125px);*/
    /*}*/
</style>
