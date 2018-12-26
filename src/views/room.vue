<template>
  <div class="home">
    <div class="roomid">房间号：{{$route.params.roomid}}</div>
    <div class="md-layout">
      <div class="md-layout-item md-small-size-100 ms-size-50" id="self">
        <md-card class="">
          <!--<md-card-header>name</md-card-header>-->
          <md-card-media>
            <video ref="localVideo"
                   autoplay muted></video>
          </md-card-media>
          <md-card-actions>
            <!--<md-button @click="openCamera">摄像头</md-button>-->
              <!--<md-button>话筒</md-button>-->
            <md-button @click="requestFullScreen('self')">全屏</md-button>
              <!--<md-button @click="connect">连接</md-button>-->
          </md-card-actions>
        </md-card>
      </div>
      <div class="md-layout-item md-small-size-100 md-size-50" id="other">

        <md-card class="">
          <!--<md-card-header>name</md-card-header>-->
          <md-card-media>
            <video ref="remoteVideo"
                   autoplay muted></video>
          </md-card-media>
          <md-card-actions>
            <!--<md-button>摄像头</md-button>-->
              <!--<md-button>话筒</md-button>-->
            <md-button>全屏</md-button>
          </md-card-actions>
        </md-card>
      </div>

    </div>
  </div>
</template>

<script>
import handler from '../libs/connect';

export default {
    name: 'home',
    components: {},
    mounted() {
        // console.log(this.$route.params);
        this.openCamera().then(() => {
            this.connect();
        });
        this.initHandlerMethods();
    },
    methods: {
        initHandlerMethods() {
            handler.onAddStream = (stream) => {
                this.$refs.remoteVideo.srcObject = stream;
            };
        },
        requestFullScreen(id) {
            let element = document.getElementById(id);
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        },
        exitFullscreen() {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozExitFullScreen) {
                document.mozExitFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        },
        async openCamera() {
            let stream = await handler.getMedia();
            this.$refs.localVideo.srcObject = stream;
        },
        connect() {
            handler.connectRoom(this.$route.params.roomid);
        },
    },
};
</script>
