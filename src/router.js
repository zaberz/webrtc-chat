import Vue from 'vue';
import Router from 'vue-router';
import Room from './views/room';
import SelectRoom from './views/select-room';
import ShowRoom from './views/show-rooms';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/room/:roomid',
            name: 'room',
            component: Room,
        },
        {
            path: '/select',
            name: 'select',
            component: SelectRoom,
        },
        {
            path: '/showrooms',
            name: 'showrooms',
            component: ShowRoom,
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
        },
        {
            path: '*',
            redirect: '/select',
        },
    ],
});
