<template>
    <div class="tailContainer">
        <div class="left">
            <div>
                <slot name="button"></slot>

            </div>
            <img src="@/assets/right.png">

            <div class="text-container">

                <div class="text">
                    <span>{{ miningTaskDescription }}</span>
                </div>
            </div>

        </div>
        <div class="right">
            <slot name="nextbutton"></slot>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        miningTaskDescription() {
            return this.$store.state.miningTaskDescription;
        },
    },
};
</script>


<style scoped>
.tailContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 94%;
    height: 100%;
    margin-top: 3em;
    padding-bottom: 2em;
}
img {
    width: 3.5em;
    height: auto;
}

button {
    background-color: #ffffff; /* 设置背景颜色 */
    border: solid #5ac15e 0.15em;
    border-radius: 0.5em; /* 设置圆角 */
    color: #5ac15e; /* 设置文字颜色 */
    font-weight: 600;
    padding: 0.2em; /* 设置内边距 */
    cursor: pointer; /* 显示指针光标 */
    font-size: 16px; /* 设置字体大小 */
    transition: background-color 0.6s, color 0.3s, box-shadow 0.3s; /* 添加过渡效果 */
    box-shadow: 0 0.1em 0.3em rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
    width: 5em;
    height: 100%;
}

/* 鼠标悬停时的样式 */
button:hover {
    background-color: #5ac15e; /* 设置背景颜色 */
    color: #ffffff; /* 设置文字颜色 */
    font-weight: 900;
}

/* 激活状态下的样式 */
button:active {
    font-weight: 500;
}

.text-container {
    border-radius: 0.5em;
    background-color: #5ac15e; /* 设置背景颜色 */
    color: #ffffff; /* 设置文字颜色 */
    padding: 0.5em;
    text-align: left;
    margin-left: 0.2em;
}
.text {
    font-weight: 600;
}

.left {
    display: flex;
    flex-direction: row;
    margin-right: 2em;
    height: 100%;
}

span {
    font-size: 1.2em;
}
</style>