<template>
  <div>
    <md-empty-state md-rounded
                    :md-size="300"
                    md-icon=""
                    md-label="没有可用房间"
                    md-description="暂时没有可用房间，快去创建一个试试吧"
    ></md-empty-state>
    <md-card class="md-primary" md-with-hover v-for="item in rooms" @click.native="$router.push(`/room/${item}`)">
      <md-ripple>
        <md-card-content>房间号：{{item}}</md-card-content>
      </md-ripple>
    </md-card>

  </div>
</template>

<script>
import handler from '../libs/connect';

export default {
    name: 'home',
    components: {},
    data: () => ({
        rooms: [],
    }),
    mounted() {
        handler.onGetAvailableRooms = (rooms) => {
            this.rooms = rooms;
        };
        handler.getAvailableRooms();
    },
    methods: {
        ttt() {
            console.log(1);
            //
        },
    },
};
</script>

<style>
  .md-card {
      margin: 4px;
  }
</style>