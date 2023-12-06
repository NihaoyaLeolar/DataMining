<template>
    <div id="app">
        <navbar></navbar>
        <div class="page-content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
    name: "App",
    components: {
        Navbar,
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.page-content {
    padding-top: 5.5em; /* 添加足够的上边距，确保内容不被导航栏遮挡 */
}
</style>
