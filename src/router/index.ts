import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LinesView from '@/views/LinesView.vue';
import StopsView from '@/views/StopsView.vue';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'LinesView',
        component: LinesView
    },
    {
        path: '/stops',
        name: 'StopsView',
        component: StopsView
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;
