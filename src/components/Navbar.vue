<template>
    <nav class="navbar">
        <div class="nav-title-container">
            <img src="@/assets/logo.png" class="nav-logo">
            <h1 class="nav-text">学生成长因素知识库引擎</h1>
        </div>

        <div class="nav-container">
            <ul>
                <li>
                    <router-link to="/stuimage" class="nav-link">
                        <div class="single-nav" @click="resetProfilingPage">
                            <img src="@/assets/img.png" class="nav-img">
                            学生画像
                        </div>
                    </router-link>
                </li>

                <li>
                    <router-link to="/mining" class="nav-link">
                        <div class="single-nav" @click="resetMiningPage">
                            <img src="@/assets/mining.png" class="nav-img">
                            知识挖掘
                        </div>
                    </router-link>
                </li>

                <li>
                    <router-link to="/krepo" class="nav-link">
                        <div class="single-nav">
                            <img src="@/assets/krepo.png" class="nav-img">
                            知识库
                        </div>
                    </router-link>
                </li>

            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        //每次点击到mining的页面都希望重置step
        resetMiningPage() {
            this.$store.commit("setCurrentMiningStep", 1);
            this.$store.commit("setMiningClassNumber", 0);
            this.$store.commit("setMiningTaskDescription", "");
            this.$store.commit("clearMiningRecord");
            this.$store.commit("clearMiningRequest");
            this.$store.commit("clearMiningResult");
            this.$store.commit("clearSelectedNames");
            this.$store.commit("clearKnowledgeList");
        },
        resetProfilingPage() {
            this.$store.commit("clearProfileData");
        },
    },
};
</script>

  <style scoped>
.navbar {
    background-color: #4caf50; /* 主打绿色背景 */
    color: #fff;
    position: fixed; /* 固定在顶部 */
    top: 0;
    left: 0;
    height: 10vh;
    width: 100%;
    display: flex; /* 使用 Flexbox 布局 */
    transition: background-color 0.3s ease-in-out;
    justify-content: space-between; /* 左右对齐 */
}

.nav-title-container {
    margin-left: 1.4em;
    margin-right: 1em;
    display: flex;
    align-items: center; /* 垂直居中导航栏内容 */
}

.nav-logo {
    max-width: 3.8em; /* 限制图片的最大宽度 */
    height: 3.8em; /* 保持纵横比 */
}
.nav-text {
    margin-left: 15px;
    font-size: 2.4em;
}

.nav-container {
    max-width: 120em; /* 限制导航栏的最大宽度 */
    padding: 0 1em; /* 左右内边距，使内容与左右边缘有距离 */
    display: flex;
    align-items: center; /* 垂直居中导航栏内容 */
}

.single-nav {
    display: flex;
    align-items: center; /* 垂直居中导航栏内容 */
    margin-right: 1.6em;
    padding: 0.2em;
    transition: transform 0.3s, box-shadow 0.3s, opacity 0.3s;
    position: relative; /* 添加相对定位 */
}

ul {
    list-style-type: none;
    padding: 0;
    display: flex; /* 水平排列导航链接 */
    align-items: center; /* 垂直居中导航栏内容 */
}

.nav-img {
    max-width: 50px; /* 限制图片的最大宽度 */
    height: 50px; /* 保持纵横比 */
    margin-right: 10px;
    align-items: center; /* 垂直居中导航栏内容 */
    transition: transform 0.3s;
}

.nav-link {
    color: #fff;
    text-decoration: none;
    font-size: 1.6em;
    transition: color 0.3s; /* 添加文字颜色过渡效果 */
}

.single-nav:hover {
    font-weight: bolder;
    transform: scale(1.15);
}
.single-nav:hover::after {
    transform: scaleX(1.02); /* 鼠标悬浮时显示横线 */
}
.single-nav::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.08em; /* 设置横线的高度/粗细 */
    background-color: #fff; /* 设置横线的颜色 */
    transform: scaleX(0); /* 初始时横线不可见 */
    border-radius: 0.1em; /* 设置横线的边框半径，使其圆角化 */
    transform-origin: left;
    transition: transform 0.5s ease-in-out;
}
</style>
  