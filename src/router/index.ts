import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { component } from "vue/types/umd";
import Money from "@/views/Money.vue";
import Labels from "@/views/Labels.vue";
import EditLabel from "@/views/EditLabel.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import Me from "@/views/Me.vue";
import Detail from "@/views/Detail.vue";
import Community from "@/views/Community.vue";
import Financial from "@/views/Financial.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        redirect: "/detail",
    },
    {
        path: "/money",
        component: Money,
    },
    {
        path: "/detail",
        component: Detail,
    },
    {
        path: "/labels",
        component: Labels,
    },
    {
        path: "/statistics",
        component: Statistics,
    },
    {
        path: "/community",
        component: Community,
    },
    {
        path: "/financial",
        component: Financial,
    },
    {
        path: "/me",
        component: Me,
    },
    {
        path: "/labels/edit/:id",
        component: EditLabel,
    },
    {
        path: "*",
        component: NotFound,
    },
];

const router = new VueRouter({
    routes,
});

export default router;
